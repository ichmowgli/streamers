import { Module } from '@nestjs/common';
import { StreamersService } from './streamers.service';
import { StreamersController } from './streamers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Streamer, StreamerSchema } from './schemas/streamer.schema';
import { EventsGateway } from 'src/gateways/events.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: StreamerSchema, name: Streamer.name },
    ]),
  ],
  controllers: [StreamersController],
  providers: [StreamersService, EventsGateway],
})
export class StreamersModule {}
