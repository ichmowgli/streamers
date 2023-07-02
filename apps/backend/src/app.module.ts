import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StreamersModule } from './streamers/streamers.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsGateway } from './gateways/events.gateway';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://mongo:Vy9weZiJXR8FWebKj3iZ@containers-us-west-145.railway.app:7825',
      { dbName: 'streamers' },
    ),
    StreamersModule,
  ],
  controllers: [AppController],
  providers: [AppService, EventsGateway],
})
export class AppModule {}
