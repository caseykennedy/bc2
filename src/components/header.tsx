import Link from "next/link";
import { LogoSymbol } from "~/components/logoSymbol";

export const Header = () => {
  return (
    <header className="overflow-none flex w-full bg-zinc-900 p-4 md:max-w-[16rem]">
      <div className="flex w-full flex-col">
        <Link href="/">
          <LogoSymbol />
        </Link>
      </div>
    </header>
  );
};
