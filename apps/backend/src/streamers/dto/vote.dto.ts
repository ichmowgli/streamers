import { IsEnum } from 'class-validator';

export enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
}

export class VoteDto {
  @IsEnum(Direction)
  direction: Direction;
}
