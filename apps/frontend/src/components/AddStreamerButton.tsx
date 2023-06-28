import React, { type FC } from "react";
import { BsPlus } from "react-icons/bs";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AddStreamerButtonProps {}

const AddStreamerButton: FC<AddStreamerButtonProps> = ({}) => {
  return (
    <>
      <div className="flex flex-row items-center justify-end gap-3">
        <p className="">Add new streamer</p>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8578E6] hover:bg-[#665DAC]"
        >
          <BsPlus fill="white" className="h-10 w-10" />
        </button>
      </div>
    </>
  );
};

export default AddStreamerButton;
