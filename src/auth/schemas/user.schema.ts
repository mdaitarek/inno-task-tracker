import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../../common';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    unique: true,
    index: true,
    match: [emailRegex, 'Please fill a valid email address'],
  })
  email: string;

  @Prop({
    type: String,
    trim: true,
    select: false,
    required: [true, 'Password is required'],
  })
  passwordHash: string;

  @Prop({ enum: Role, required: true })
  role: Role;

  @Prop({ type: Boolean, default: true, index: true })
  status: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
