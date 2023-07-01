import Head from "next/head";
import AddStreamerButton from "~/components/AddStreamerButton";
import StreamerList from "~/components/StreamerList";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main-content">
        <AddStreamerButton />
        <div className="wrapper">
          <StreamerList />
        </div>
      </main>
    </>
  );
}
