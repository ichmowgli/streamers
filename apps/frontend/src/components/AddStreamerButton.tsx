import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { BsPlus } from "react-icons/bs";
import AddStreamerForm from "./AddStreamerForm";

const AddStreamerButton = () => {
  return (
    <Dialog.Root>
      <div className="flex flex-row items-center justify-end gap-3">
        <p className="">Add new streamer</p>
        <Dialog.Trigger asChild>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8578E6] hover:bg-[#665DAC]"
          >
            <BsPlus fill="white" className="h-10 w-10" />
          </button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-blackA9 data-[state=open]:animate-overlayShow" />
          <Dialog.Content className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
            <AddStreamerForm />
          </Dialog.Content>
        </Dialog.Portal>
      </div>
    </Dialog.Root>
  );
};

export default AddStreamerButton;
