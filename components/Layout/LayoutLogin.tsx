// components/Layout.tsx

import Head from "next/head";
import { Nav } from "../Nav";
import { Footer } from "../Footer";

type LayoutProps = {
  children: React.ReactNode;
};

export default function LayoutLogin({ children }: LayoutProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Interactive Comments Section | Login</title>
        <meta
          name="description"
          content="Frontend Mentor - Interactive Comments Section"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="min-h-screen h-full flex flex-col justify-between">
          <Nav showAvatar={false} />
          <div className="max-w-[1180px] mx-8">{children}</div>
          <Footer />
        </div>
      </main>
    </>
  );
}
