import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

import Icon from "~/components/icons";
import { LogoSymbol } from "~/components/logo-symbol";

import nav from "../../config/nav.json";

const Navigation = () => {
  return (
    <ul className="flex">
      {nav.map((item, idx) => (
        <li className="px-4" key={idx}>
          <Link href={item.link} className="font-display text-base uppercase">
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const Footer = () => {
  const { isLoaded: userLoaded, isSignedIn } = useUser();
  return (
    <footer className="gutter-y flex flex-grow border-t border-zinc-800 bg-black">
      <div className="gutter-x mx-auto flex w-full flex-row justify-between md:max-w-[1440px]">
        <div>
          <Link
            href="/"
            className="flex flex-row flex-nowrap items-center gap-4"
          >
            <LogoSymbol width={44} />
            <span className="font-display text-lg uppercase">
              BC&bull;Leaks
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
