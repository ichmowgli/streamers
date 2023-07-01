import { type AppType } from "next/dist/shared/lib/utils";
import * as Dialog from "@radix-ui/react-dialog";
import * as Toast from "@radix-ui/react-toast";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Dialog.Root>
      <Toast.Provider>
        <Component {...pageProps} />
      </Toast.Provider>
    </Dialog.Root>
  );
};

export default MyApp;
