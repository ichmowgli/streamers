/* eslint-disable @typescript-eslint/no-unsafe-return */
// /* eslint-disable @typescript-eslint/restrict-template-expressions */
// /* eslint-disable @typescript-eslint/no-unsafe-return */

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

export const LIKED_STREAMERS = new Set<string>();
export const DISLIKED_STREAMERS = new Set<string>();

export const fetchStreamers = (): Promise<Streamer[]> => {
  return fetch(`${API_URL}/streamers`).then((data) => data.json());
};

export const fetchStreamer = (id: string): Promise<Streamer> => {
  return fetch(`${API_URL}/streamers/${id}`).then((data) => data.json());
};

export const placeVote = async (
  id: string,
  direction: "UP" | "DOWN"
): Promise<{ ok: boolean }> => {
  if (direction == "UP" && LIKED_STREAMERS.has(id)) return { ok: false };
  if (direction == "DOWN" && DISLIKED_STREAMERS.has(id)) return { ok: false };

  await fetch(`${API_URL}/streamers/${id}/vote`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ direction }),
  }).then((data) => data.json());

  if (direction == "UP") LIKED_STREAMERS.add(id);
  if (direction == "DOWN") DISLIKED_STREAMERS.add(id);

  return { ok: true };
};


export const createStreamer = async (streamer: {
  name: string,
  description: string,
  platforms: Platform[],
}): Promise<Streamer> => {
  const response = await fetch(`${API_URL}/streamers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(streamer)
  });

  console.log('Server response:', response);

  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    throw new Error(message);
  }

  return response.json();
}
