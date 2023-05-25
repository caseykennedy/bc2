import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

import { LogoSymbol } from "~/components/logoSymbol";

import nav from "../../config/nav.json";

const Navigation = () => {
  return (
    <ul className="flex">
      {nav.map((item, idx) => (
        <li className="mx-3" key={idx}>
          <Link href={item.link} className="capitalize text-lg">
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
    <header className="overflow-none flex w-full border-b border-zinc-800 bg-zinc-900 py-6">
      <div className="flex w-full flex-row justify-between md:max-w-[1440px] mx-auto px-4">
        <div className="flex-1 text-lg">
          <Link href="/" className="flex flex-row items-center gap-4">
            <LogoSymbol />
            BC Leaks
          </Link>
        </div>

        <div className="hidden flex-4 flex-row items-center justify-center md:flex">
          <Navigation />
        </div>

        <div className="flex-1 flex items-center justify-end">
          {!isSignedIn ? (
            <div className="flex justify-center hover:text-green-300">
              <SignInButton />
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
