import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

import Icon from "~/components/icons";
import { LogoSymbol } from "~/components/logo-symbol";

import nav from "../../config/nav.json";

const BtnEllipse = () => (
  <button className="btn btn-outline btn-primary btn-icon group flex items-center">
    <Icon
      name="ellipses"
      className="rotate-[0deg]"
      fill="fill-primary-500 group-hover:fill-black"
    />
  </button>
);

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

const Header = () => {
  const { isLoaded: userLoaded, isSignedIn } = useUser();
  return (
    <header className="overflow-none h-header sticky top-0 z-40 flex w-full items-center border-b border-zinc-800 bg-black/80 backdrop-blur-lg">
      <div className="gutter-x mx-auto flex w-full flex-row justify-between md:max-w-[1440px]">
        <div className="flex flex-1 justify-start md:justify-start">
          <Link href="/" className="flex items-center gap-4">
            <LogoSymbol />
            {/* <span className="font-mono uppercase">BC&bull;Leaks</span> */}
          </Link>
        </div>

        <div className="flex-4 hidden flex-row items-center justify-center md:flex">
          <Navigation />
        </div>

        <div className="flex flex-1 items-center justify-end gap-1">
          {!isSignedIn ? (
            <div>
              <SignInButton mode="modal">
                <button className="btn btn-primary btn-outline">Sign in</button>
              </SignInButton>
            </div>
          ) : (
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: {
                    width: 32,
                    height: 32,
                  },
                },
              }}
            />
          )}
          <div className="">
            <BtnEllipse />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
