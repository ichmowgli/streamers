import React, { useEffect, useState } from "react";
import StreamerCard from "../components/StreamerCard";
import { type Streamer, fetchStreamers } from "~/services/requests";

const StreamerList = () => {
  const [streamers, setStreamers] = useState<Streamer[]>();

  useEffect(() => {
    const fetchStreamerData = async () => {
      setStreamers([]);
      try {
        const streamers = await fetchStreamers();
        setStreamers(streamers);
      } catch (error) {
        console.error("Error fetching streamer data:", error);
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchStreamerData();
  }, []);

  if (!streamers) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8">
      {streamers.length
        ? streamers.map((item) => (
            <StreamerCard key={item._id} streamer={item} />
          ))
        : "none"}
    </div>
  );
};

export default StreamerList;
