import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Role } from '../common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto';

interface ValidatedUser {
  _id: string;
  email: string;
  role: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async signup(email: string, password: string, role: Role): Promise<User> {
    const exists = await this.userModel.findOne({ email });
    if (exists) throw new ConflictException('Email already taken');
    const passwordHash = await bcrypt.hash(password, 10);
    return await this.userModel.create({
      email,
      passwordHash,
      role,
    });
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<ValidatedUser | null> {
    const user = await this.userModel
      .findOne({ email, status: true })
      .select('+passwordHash');

    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) return null;

    return {
      _id: (user._id as Types.ObjectId).toString(),
      email: user.email,
      role: user.role,
    };
  }

  async getUser(email: string): Promise<User | null> {
    return this.userModel.findOne({ email, status: true });
  }

  login(loginDto: LoginDto) {
    const payload = {
      email: loginDto.email,
      password: loginDto.password,
    };
    const expDateTime = this._expireDateTime(
      Number(this.configService.get('JWT').ACCESS_TOKEN_VALIDITY),
    );
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get('JWT').ACCESS_TOKEN_VALIDITY + 'h',
    });
    return {
      accessToken,
      expDateTime,
    };
  }

  private _expireDateTime(hour: number) {
    const curDate = new Date();
    const nextDate = new Date();
    nextDate.setHours(hour, 0, 0);
    if (curDate.getHours() >= nextDate.getHours()) {
      nextDate.setDate(nextDate.getDate() + 1);
    }
    return nextDate;
  }
}
