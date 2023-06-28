import { useState, useEffect } from "react";
import axios from "axios";
import { BiDislike, BiLike } from "react-icons/bi";

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

  const handleLike = async () => {
    try {
      setLikeCount(likeCount + 1);
      console.log({ id });
      await axios.put(`http://localhost:3001/streamer/${id}/vote`, {
        direction: "UP",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDislike = async () => {
    try {
      setDislikeCount(dislikeCount + 1);

      await axios.put(`http://localhost:3001/streamer/${id}/vote`, {
        direction: "DOWN",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-row gap-5 pt-4">
      <div className="flex cursor-pointer flex-row items-center gap-2 text-neutral-500 transition ">
        <p>{likeCount}</p>
        <button onClick={handleLike}>
          <BiLike
            className="transition duration-300 ease-in-out hover:fill-[#8578E6]"
            size={25}
          />
        </button>
      </div>
      <div className="flex cursor-pointer flex-row items-center gap-2 text-neutral-500 transition">
        <p>{dislikeCount}</p>
        <button onClick={handleDislike}>
          <BiDislike
            className="transition duration-300 ease-in-out hover:fill-red-500"
            size={25}
          />
        </button>
      </div>
    </div>
  );
};

export default LikeDislike;
