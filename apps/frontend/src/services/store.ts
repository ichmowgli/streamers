/* eslint-disable @typescript-eslint/no-unsafe-return */
import { create } from "zustand";

export enum Platform {
  TWITCH = "TWITCH",
  YOUTUBE = "YOUTUBE",
  KICK = "KICK",
  RUMBLE = "RUMBLE",
  TIKTOK = "TIKTOK",
}
export type Streamer = {
  _id: string;
  imageUrl: string;
  name: string;
  platforms: Platform[];
  description: string;
  like: number;
  dislike: number;
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const API_URL = process.env.NEXT_PUBLIC_API_URL!;

const fetchStreamers = (): Promise<Streamer[]> => {
  return fetch(`${API_URL}/streamers`).then((data) => data.json());
};

const fetchStreamer = (id: string): Promise<Streamer> => {
  return fetch(`${API_URL}/streamers/${id}`).then((data) => data.json());
};

const placeVote = async (
  id: string,
  direction: "UP" | "DOWN"
): Promise<{ ok: boolean }> => {
  await fetch(`${API_URL}/streamers/${id}/vote`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ direction }),
  }).then((data) => data.json());

  return { ok: true };
};

const createStreamer = async (streamer: {
  name: string;
  description: string;
  platforms: Platform[];
}): Promise<Streamer> => {
  const response = await fetch(`${API_URL}/streamers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(streamer),
  });

  console.log("Server response:", response);

  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    throw new Error(message);
  }

  return response.json();
};

type Store = {
  streamers: Map<string, Streamer> | null;
  streamerArr: () => Streamer[];
  reactions: { liked: Set<string>; disliked: Set<string> };

  fetchStreamers: () => Promise<void>;
  fetchStreamer: (id: string) => Promise<Streamer>;
  placeVote: (id: string, direction: "UP" | "DOWN") => Promise<Streamer>;
  createStreamer: (data: {
    name: string;
    description: string;
    platforms: Platform[];
  }) => Promise<Streamer>;
};

export const useStreamerStore = create<Store>((set, get) => ({
  streamers: null,
  reactions: {
    liked: new Set(),
    disliked: new Set(),
  },
  streamerArr: () =>
    [...(get().streamers || new Map<string, Streamer>())].map(
      ([_, data]) => data
    ),
  fetchStreamers: async () => {
    const data = await fetchStreamers();

    const streamers = new Map();

    for (const streamer of data) {
      streamers.set(streamer._id, streamer);
    }

    set({ streamers });
  },
  fetchStreamer: async (id: string) => {
    const data = await fetchStreamer(id);

    const streamers = get().streamers || new Map();

    streamers.set(data._id, data);
    set({ streamers });
    return data;
  },
  placeVote: async (id, direction) => {
    const { reactions } = get();

    if (reactions.liked.has(id) || reactions.disliked.has(id)) {
      return get().fetchStreamer(id);
    }

    const d = await placeVote(id, direction);

    if (d.ok) {
      if (direction === "UP") {
        reactions.liked.add(id);
      } else {
        reactions.disliked.add(id);
      }

      return get().fetchStreamer(id);
    }

    set({ reactions });
    return get().fetchStreamer(id);
  },

  createStreamer: async (streamer) => {
    const data = await createStreamer(streamer);

    const streamers = get().streamers || new Map();
    streamers.set(data._id, data);

    set({ streamers });
    return data;
  },
}));
