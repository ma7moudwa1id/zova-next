"use client";
import { AppStore, createStore, PreloadedState } from "@/app/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode, useRef } from "react";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

export default function Providers({
  children,
  preloaded,
}: {
  children: ReactNode;
  preloaded: PreloadedState;
}) {
  const myClient = new QueryClient();
  const myStore = useRef<null | AppStore>(null);
  if (!myStore.current) {
    myStore.current = createStore(preloaded);
  }
  return (
    <>
      <Provider store={myStore.current}>
        <QueryClientProvider client={myClient}>
          {children}
          <Toaster richColors={true} position="top-right" />
          <ReactQueryDevtools initialIsOpen={false} position="bottom" />
        </QueryClientProvider>
      </Provider>
    </>
  );
}
