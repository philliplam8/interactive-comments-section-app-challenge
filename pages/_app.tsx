import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import { NavProvider } from "../context/NavContext";
import { CommentsProvider } from "../context/CommentsContext";
import { DarkModeProvider } from "../context/DarkModeContext";
import "../styles/globals.css";

// Create a client
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <DarkModeProvider>
        <CommentsProvider>
          <NavProvider>
            <Component {...pageProps} />
          </NavProvider>
        </CommentsProvider>
      </DarkModeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
