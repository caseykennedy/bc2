import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

import { LogoSymbol } from "~/components/logoSymbol";

import nav from "../../config/nav.json";

const Navigation = () => {
  return (
    <ul className="flex">
      {nav.map((item, idx) => (
        <li className="px-4" key={idx}>
          <Link href={item.link} className="font-display uppercase">
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
    <header className="overflow-none h-header sticky top-0 z-40 flex items-center w-full bg-black/80 backdrop-blur-lg">
      <div className="gutter-x mx-auto flex w-full flex-row justify-between md:max-w-[1440px]">
        <div className="flex-1 text-lg">
          <Link href="/" className="flex flex-row items-center gap-4">
            <LogoSymbol />
            BC Leaks
          </Link>
        </div>

        <div className="flex-4 hidden flex-row items-center justify-center md:flex">
          <Navigation />
        </div>

        <div className="flex flex-1 items-center justify-end">
          {!isSignedIn ? (
            <div>
              <SignInButton mode="modal">
                <button className="btn btn-outline">Sign in</button>
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
        </div>
      </div>
    </header>
  );
};

export default Header;
