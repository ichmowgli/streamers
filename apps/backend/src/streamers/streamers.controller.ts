import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { StreamersService } from './streamers.service';
import { CreateStreamerDto } from './dto/create-streamer.dto';
import { Direction, VoteDto } from './dto/vote.dto';

@Controller(['streamer', 'streamers'])
export class StreamersController {
  constructor(private readonly streamersService: StreamersService) {}

  @Post()
  create(@Body() data: CreateStreamerDto) {
    return this.streamersService.create(data);
  }

  @Get()
  findAll() {
    return this.streamersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.streamersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.streamersService.remove(id);
  }

  @Put(':id/vote')
  vote(@Param('id') id: string, @Body() data: VoteDto) {
    if (data.direction == Direction.UP) {
      return this.streamersService.upvote(id);
    }

    return this.streamersService.downvote(id);
  }
}
