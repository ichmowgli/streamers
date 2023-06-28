import { type AppType } from "next/dist/shared/lib/utils";
import * as Toast from "@radix-ui/react-toast";
import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Toast.Provider>
      <Component {...pageProps} />
    </Toast.Provider>
  );
};

export default MyApp;
