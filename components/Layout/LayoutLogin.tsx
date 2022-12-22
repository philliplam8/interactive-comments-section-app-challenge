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
        <title>Login | Interactive Comments Section</title>
        <meta
          name="description"
          content="Frontend Mentor - Interactive Comments Section"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="min-h-screen h-full flex flex-col justify-between">
          <Nav showAvatar={false} />
          <div className="max-w-[500px] w-full mx-auto">{children}</div>
          <Footer />
        </div>
      </main>
    </>
  );
}
