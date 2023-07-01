/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import LikeDislike from "~/components/LikeDislike";
import PlatformIcon from "~/components/PlatformIcon";

import { fetchStreamer, type Streamer } from "~/services/requests";

const streamerPage: NextPage = () => {
  const { query } = useRouter();
  const streamerId = query.id as string;

  const [streamer, setStreamer] = useState<Streamer | null>(null);

  useEffect(() => {
    if (streamerId) {
      void fetchStreamer(streamerId).then((data) => setStreamer(data));
    }
  }, [streamerId]);

  if (!streamer) {
    return <p>loading...</p>;
  }

  return (
    <>
      <main className="main-content">
        <div className="wrapper">
          <Link href="/">
            <BsArrowLeft fill="#8578E6" size={30} />
          </Link>

          <div className="flex flex-col pt-4 lg:pt-10">
            <h1 className="pb-5 text-center text-xl font-bold md:pb-8 md:text-start md:text-2xl">
              {streamer.name}
            </h1>
            <div className="flex flex-col gap-8 sm:flex-row lg:w-full">
              <img
                src={streamer.imageUrl}
                alt={streamer.name}
                className="w-30 sm:w-50 sm:h-50 h-30 rounded-lg object-contain"
              />

              <div className="flex w-fit flex-col justify-between">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <p className="font-semibold md:text-lg">Streams on:</p>
                    <div className="flex flex-row gap-2 text-[#8578E6]">
                      {streamer.platforms.map((platform) => (
                        <PlatformIcon platform={platform} key={platform} />
                      ))}
                    </div>
                  </div>
                  <p className="">{streamer.description}</p>
                </div>
                <LikeDislike id={streamer._id} like={streamer.like} dislike={streamer.dislike} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default streamerPage;
