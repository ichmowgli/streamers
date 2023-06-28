import LikeDislike from "./LikeDislike";
import PlatformIcon, { type Platform } from "./PlatformIcon";

export type Streamer = {
  _id: string;
  imageUrl: string;
  name: string;
  platform: Platform;
  description: string;
  like: number;
  dislike: number;
};

const StreamerCard = ({ streamer }: { streamer: Streamer }) => {
  const { imageUrl, name, platform, description, like, dislike } = streamer;

  return (
    <div className="rounded-lg border-2 border-gray-300 p-4 hover:border-[#8578E6] mx-auto max-w-xs">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="rounded-lg object-contain" src={imageUrl} alt="Image" />

      <div className="flex flex-col p-4">
        <a href="#">
          <h3 className="text-xl font-semibold">{name}</h3>
        </a>
        <p className="">
          <PlatformIcon platform={platform} />
        </p>
        <p className="pt-3 text-sm text-neutral-600">{description}</p>
        <LikeDislike like={like} dislike={dislike} id={streamer._id} />
      </div>
    </div>
  );
};

export default StreamerCard;
