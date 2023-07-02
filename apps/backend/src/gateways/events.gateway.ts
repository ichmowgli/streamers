import {
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Streamer } from 'src/streamers/schemas/streamer.schema';

@WebSocketGateway(3002, {
  cors: true,
})
export class EventsGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server;

  handleConnection(client: any): void {
    console.log('Client connected:', client.id);
  }

  emit(eventType: 'STREAMER_UPDATE' | 'STREAMER_CREATED', data: Streamer) {
    console.log('emitting', {
      eventType,
      data,
    });
    this.server.emit('events', {
      eventType,
      data,
    });
  }
}
