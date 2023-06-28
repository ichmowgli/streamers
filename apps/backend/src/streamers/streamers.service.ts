import { Injectable } from '@nestjs/common';
import { CreateStreamerDto } from './dto/create-streamer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Streamer, StreamerDocument } from './schemas/streamer.schema';
import { Model } from 'mongoose';

@Injectable()
export class StreamersService {
  constructor(
    @InjectModel(Streamer.name) private streamerModel: Model<Streamer>,
  ) {}

  create(data: CreateStreamerDto): Promise<StreamerDocument> {
    return this.streamerModel.create(data);
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
    return { ok: true };
  }

  async downvote(id: string) {
    await this.streamerModel
      .updateOne({ _id: id }, { $inc: { dislike: 1 } })
      .exec();

    return { ok: true };
  }
}
