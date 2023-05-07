import type { PropsWithChildren } from "react";

export const Layout = (props: PropsWithChildren) => {
  return (
    <main className="flex overflow-none">
      <div className="flex flex-col h-full w-full">
        {props.children}
      </div>
    </main>
  );
};
