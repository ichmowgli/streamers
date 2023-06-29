/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from "react";
import { BiDislike, BiLike } from "react-icons/bi";
import {
  DISLIKED_STREAMERS,
  LIKED_STREAMERS,
  placeVote,
} from "~/services/requests";
import { cn } from "~/services/utils";

const LikeDislike = ({
  id,
  like,
  dislike,
}: {
  id: string;
  like: number;
  dislike: number;
}) => {
  const [likeCount, setLikeCount] = useState(like);
  const [dislikeCount, setDislikeCount] = useState(dislike);
  const [disabled, setDisabled] = useState(false);

  const handleLike = async () => {
    try {
      const { ok } = await placeVote(id, "UP");
      if (ok) {
        setLikeCount(likeCount + 1);
        setDisabled(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDislike = async () => {
    try {
      const { ok } = await placeVote(id, "DOWN");
      if (ok) {
        setDislikeCount(dislikeCount + 1);
        setDisabled(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const likeColor = LIKED_STREAMERS.has(id)
    ? "text-[#665dac]"
    : "hover:text-[#665dac]";
  const dislikeColor = DISLIKED_STREAMERS.has(id)
    ? "text-red-500 text-red-500"
    : "hover:text-red-500 focus:text-red-500";

  return (
    <div className="mt-4 flex flex-row gap-5">
      <div
        className={cn(
          "flex cursor-pointer flex-row items-center gap-2 text-neutral-500 transition duration-300 ease-in-out",
          likeColor
        )}
      >
        <p>{likeCount}</p>
        <button onClick={() => handleLike()} disabled={disabled}>
          <BiLike size={25} />
        </button>
      </div>
      <div
        className={cn(
          "flex cursor-pointer flex-row items-center gap-2 text-neutral-500 transition  duration-300 ease-in-out",
          dislikeColor
        )}
      >
        <p>{dislikeCount}</p>
        <button onClick={() => handleDislike()} disabled={disabled}>
          <BiDislike size={25} />
        </button>
      </div>
    </div>
  );
};

export default LikeDislike;
