import { type Streamer } from "~/services/requests";
import LikeDislike from "./LikeDislike";
import PlatformIcon from "./PlatformIcon";

const StreamerCard = ({ streamer }: { streamer: Streamer }) => {
  const { imageUrl, name, platform, description, like, dislike } = streamer;

  return (
    <div className="mx-auto max-w-xs rounded-lg border-2 border-gray-300 p-4 hover:border-[#8578E6]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="rounded-lg object-contain" src={imageUrl} alt="Image" />

      <div className="flex flex-col p-4">
        {/* TODO: refer to the profile page */}
        <a href="#">
          <h3 className="text-xl font-semibold">{name}</h3>
        </a>
        {/* TODO: refer to platform link (example: https://{platform.link}/streamer.name) */}
        <a className="">
          <PlatformIcon platform={platform} />
        </a>
        <p className="pt-3 text-sm text-neutral-600">{description}</p>
        <LikeDislike like={like} dislike={dislike} id={streamer._id} />
      </div>
    </div>
  );
};

export default StreamerCard;
