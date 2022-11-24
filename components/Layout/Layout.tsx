// components/Layout.tsx

import Head from "next/head";
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
        <div className="min-h-screen h-full mx-4 md:mx-auto pt-14 flex flex-col justify-between">
          <div>{children}</div>
          <Footer />
        </div>
      </main>
    </>
  );
}
