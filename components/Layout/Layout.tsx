// components/Layout.tsx

import Head from "next/head";
import { Nav } from "../Nav";
import { Modal } from "../Modal";
import { Footer } from "../Footer";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Interactive Comments Section</title>
        <meta
          name="description"
          content="Frontend Mentor - Interactive Comments Section"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Modal />
        <div className="min-h-screen h-full flex flex-col justify-between">
          <Nav showAvatar={true} />
          <div className="max-w-[1180px] m-4 md:mx-auto">{children}</div>
          <Footer />
        </div>
      </main>
    </>
  );
}
