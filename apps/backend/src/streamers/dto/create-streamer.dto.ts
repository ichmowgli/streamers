import { IsEnum, IsString } from 'class-validator';
import { Platform } from '../schemas/streamer.schema';
import { env } from '../../env.js';

export class CreateStreamerDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsEnum(Platform, { each: true })
  platforms: Platform[];

  @IsString()
  imageUrl: string = env.DEFAULT_IMAGE_URL;
}
