import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CommentsProvider } from "../context/CommentsContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CommentsProvider>
      <Component {...pageProps} />
    </CommentsProvider>
  );
}
