import { Injectable } from '@nestjs/common';
import { CreateStreamerDto } from './dto/create-streamer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Streamer, StreamerDocument } from './schemas/streamer.schema';
import { Model } from 'mongoose';
import { EventsGateway } from 'src/gateways/events.gateway';

@Injectable()
export class StreamersService {
  constructor(
    @InjectModel(Streamer.name) private streamerModel: Model<Streamer>,
    private eventGateway: EventsGateway,
  ) {}

  async create(data: CreateStreamerDto): Promise<StreamerDocument> {
    const streamer = await this.streamerModel.create(data);
    this.eventGateway.emit('STREAMER_CREATED', streamer);
    return streamer;
  }

  findAll() {
    return this.streamerModel.find();
  }

  findOne(id: string): Promise<StreamerDocument> {
    return this.streamerModel.findById(id);
  }

  remove(id: string) {
    return this.streamerModel.findByIdAndDelete(id).exec();
  }

  async upvote(id: string) {
    await this.streamerModel
      .updateOne({ _id: id }, { $inc: { like: 1 } })
      .exec();

    const streamer = await this.findOne(id);
    this.eventGateway.emit('STREAMER_UPDATE', streamer);

    return { ok: true };
  }

  async downvote(id: string) {
    await this.streamerModel
      .updateOne({ _id: id }, { $inc: { dislike: 1 } })
      .exec();

    const streamer = await this.findOne(id);
    this.eventGateway.emit('STREAMER_UPDATE', streamer);

    return { ok: true };
  }
}
