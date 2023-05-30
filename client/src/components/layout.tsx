import type { PropsWithChildren } from "react";

import CryptoTicker from "~/components/crypto-ticker";
import Footer from "~/components/footer";
import Header from "~/components/header";

export const Layout = (props: PropsWithChildren) => {
  return (
    <div className="align-center relative flex min-h-screen w-full flex-col justify-between">
      <Header />
      <CryptoTicker />
      <main className="nowrap flex w-full flex-auto flex-col">
        <div className="relative z-10 mx-auto flex h-full w-full flex-col">
          {props.children}
        </div>
      </main>
      <Footer />
    </div>
  );
};
