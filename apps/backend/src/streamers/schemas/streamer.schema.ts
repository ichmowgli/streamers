import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum Platform {
  TWITCH = 'TWITCH',
  YOUTUBE = 'YOUTUBE',
  KICK = 'KICK',
  RUMBLE = 'RUMBLE',
  TIKTOK = 'TIKTOK',
}

@Schema()
export class Streamer {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  platforms: Platform[];

  @Prop({ default: 0, required: true })
  like: number;

  @Prop({ default: 0, required: true })
  dislike: number;

  @Prop()
  imageUrl?: string;
}

export const StreamerSchema = SchemaFactory.createForClass(Streamer);

export type StreamerDocument = HydratedDocument<Streamer>;
