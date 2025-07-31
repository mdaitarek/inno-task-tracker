import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

@Schema({ timestamps: true })
export class Task extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ type: String, trim: true, default: '' })
  description?: string;

  @Prop({
    type: Date,
    nullable: true,
    default: null,
  })
  dueDate?: Date;

  @Prop({ enum: TaskStatus, default: TaskStatus.OPEN })
  status: TaskStatus;
}

export const TaskSchema = SchemaFactory.createForClass(Task);