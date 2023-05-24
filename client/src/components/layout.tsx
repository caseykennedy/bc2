import type { PropsWithChildren } from "react";

import Header from "~/components/Header";

export const Layout = (props: PropsWithChildren) => {
  return (
    <div className="align-center relative flex min-h-screen w-full flex-col justify-between">
      <Header />
      <main className="nowrap flex w-full flex-auto flex-col">
        <div className="relative z-10 mx-auto flex h-full w-full flex-col md:max-w-[1440px]">
          {props.children}
        </div>
      </main>
      {/* <footer className="p-4">footer</footer> */}
    </div>
  );
};
