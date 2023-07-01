import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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

const schema = z.object({
  username: z.string().min(1, "Username is required"),
  description: z.string().min(1, "Description is required"),
  platform: z.enum(["TWITCH", "YOUTUBE", "KICK", "RUMBLE", "TIKTOK"]),
  ...Object.fromEntries(platforms.map(({ id }) => [id, z.boolean()])),
});

const CheckboxOption = ({ control, name }: { control: any; name: string }) => (
  <li>
    <label className="flex items-center rounded p-2 hover:bg-[#777777]">
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <input {...field} type="checkbox" className="h-4 w-4 rounded" />
        )}
      />
      <span className="ml-2 w-full rounded">{name}</span>
    </label>
  </li>
);

const AddStreamerForm = () => {
  const {
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <div className="z-2000 mx-auto flex w-full max-w-2xl flex-col gap-8 rounded-xl bg-[#222222] p-8 text-[#f5f5f5]">
      <div>
        <Dialog.Title className="text-lg font-semibold">
          New Streamer
        </Dialog.Title>

        <Dialog.Description className="mt-2 text-sm leading-normal text-gray-400">
          Add new streamer here. Click add when you are done.
        </Dialog.Description>
      </div>

      <form className="flex flex-col gap-5">
        <label
          className="flex w-full flex-col gap-2 text-sm"
          htmlFor="username"
        >
          <span>Username</span>
          <Controller
            control={control}
            name="username"
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className="h-8 rounded-md bg-[#252525] p-2 text-start shadow focus:outline-none focus:ring-2 focus:ring-[#8578E6]"
                placeholder="Enter username"
                required
              />
            )}
          />
          {errors.username && typeof errors.username.message === "string" && (
            <p>{errors.username.message}</p>
          )}
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
                <CheckboxOption key={id} control={control} name={id} />
              ))}
            </ul>
          </div>
        </div>

        <label
          className="flex w-full flex-col gap-2 text-sm"
          htmlFor="description"
        >
          <span className="text-start">Description</span>
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <textarea
                {...field}
                className="min-h-2/5 h-min resize-none rounded-md border-none bg-[#252525] p-2 text-start shadow focus:border focus:outline-none focus:ring-2 focus:ring-[#8578E6]"
                placeholder="Enter description"
                required
                rows={5}
              />
            )}
          />
          {errors.description &&
            typeof errors.description.message === "string" && (
              <p>{errors.description.message}</p>
            )}
        </label>

        <div className="flex flex-row gap-2">
          <Dialog.Close className="w-full">
            <button
              type="button"
              className="w-full cursor-pointer items-center justify-center rounded-lg bg-[#252525] p-2 shadow hover:bg-[#777777]"
            >
              Cancel
            </button>
          </Dialog.Close>
          <button
            type="submit"
            className="w-full cursor-pointer items-center justify-center rounded-lg bg-[#8578E6] p-2 shadow hover:bg-[#665DAC]"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStreamerForm;
