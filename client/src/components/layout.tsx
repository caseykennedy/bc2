import type { PropsWithChildren } from "react";
import { Header } from "~/components/header";

export const Layout = (props: PropsWithChildren) => {
  return (
    <div
      id="app__layout"
      className="align-center relative flex min-h-screen w-full flex-col justify-between md:flex-row"
    >
      <Header />
      <main id="page__layout" className="nowrap flex w-full flex-auto flex-col bg-zinc-950">
        <div className="relative z-10 mx-auto flex h-full w-full flex-col md:max-w-[1680px]">
          {props.children}
        </div>
      </main>
      {/* <footer className="p-4">footer</footer> */}
    </div>
  );
};
