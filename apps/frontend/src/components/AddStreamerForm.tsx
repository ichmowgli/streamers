import { useState, useRef, useEffect } from "react";
import { cn } from "~/services/utils";

export enum Platform {
  TWITCH = "TWITCH",
  YOUTUBE = "YOUTUBE",
  KICK = "KICK",
  RUMBLE = "RUMBLE",
  TIKTOK = "TIKTOK",
}
type PlatformOption = {
  id: string;
  name: string;
};

const platforms: PlatformOption[] = Object.keys(Platform).map((key) => ({
  id: key.toLowerCase(),
  name: key,
}));

const CheckboxOption = ({ id, name }: PlatformOption) => (
  <li>
    <div className="flex items-center rounded p-2 hover:bg-[#777777]">
      <input type="checkbox" id={id} className="h-4 w-4 rounded" />
      <label htmlFor={id} className="ml-2 w-full rounded">
        {name}
      </label>
    </div>
  </li>
);

const AddStreamerForm = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <div className="z-2000 mx-auto flex w-full max-w-2xl flex-col gap-8 rounded-xl bg-[#222222] p-8 text-[#f5f5f5]">
      <h2 className="text-lg font-semibold">New Streamer</h2>

      <form className="flex flex-col gap-5">
        <label
          className="flex w-full flex-col gap-2 text-sm"
          htmlFor="username"
        >
          <span>Username</span>
          <input
            type="text"
            id="username"
            className="h-8 rounded-md bg-[#252525] p-2 text-start shadow focus:outline-none focus:ring-2 focus:ring-[#8578E6]"
            placeholder="Enter username"
            required
          />
        </label>

        <div className="w-content flex flex-col gap-2 rounded-lg bg-[#252525] text-sm shadow">
          <button
            className={cn(
              "inline-flex items-center rounded-lg bg-[#8578E6] px-4 py-2.5 text-center text-sm text-white hover:bg-[#665DAC]",
              {
                "rounded-b-none": dropdownOpen,
              }
            )}
            type="button"
            onClick={toggleDropdown}
          >
            Set the platform{" "}
            <svg
              className="ml-2 h-4 w-4"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>

          <div className={`z-2000 ${dropdownOpen ? "block" : "hidden"} w-full`}>
            <ul className="space-y-1 p-3 text-sm ">
              {platforms.map(({ id, name }) => (
                <CheckboxOption key={id} id={id} name={name} />
              ))}
            </ul>
          </div>
        </div>

        <label
          className="flex w-full flex-col gap-2 text-sm"
          htmlFor="description"
        >
          <span className="text-start">Description</span>
          <textarea
            id="description"
            className="min-h-2/5 h-min resize-none rounded-md border-none bg-[#252525] p-2 text-start shadow focus:border focus:outline-none focus:ring-2 focus:ring-[#8578E6] "
            placeholder="Enter description"
            required
            rows={5}
          />
        </label>
      </form>

      <div className="flex flex-row gap-2">
        <button
          type="submit"
          className="w-full cursor-pointer items-center justify-center rounded-lg bg-[#252525] p-2 shadow hover:bg-[#777777]"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="w-full cursor-pointer items-center justify-center rounded-lg bg-[#8578E6] p-2 shadow hover:bg-[#665DAC]"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddStreamerForm;
