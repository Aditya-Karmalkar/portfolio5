// @flow strict
import Link from "next/link";

function Navbar() {
  return (
    <nav className="bg-transparent">
      <div className="flex items-center justify-between py-5">
        {/* Logo/Name */}
        <div className="flex flex-shrink-0 items-center">
          <Link
            href="/"
            className="text-[#16f2b3] text-3xl font-bold">
            Aditya Karmalkar
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="mt-4 flex h-screen max-h-0 w-full flex-col items-start text-sm opacity-0 md:mt-0 md:h-auto md:max-h-screen md:w-auto md:flex-row md:space-x-1 md:border-0 md:opacity-100" id="navbar-default">
          <li>
            <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#about">
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">ABOUT</div>
            </Link>
          </li>
          <li>
            <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#experience">
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">EXPERIENCE</div>
            </Link>
          </li>
          <li>
            <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#skills">
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">SKILLS</div>
            </Link>
          </li>
          <li>
            <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#education">
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">EDUCATION</div>
            </Link>
          </li>
          {/* <li>
            <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/blog">
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">BLOGS</div>
            </Link>
          </li> */}
          <li>
            <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#projects">
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">PROJECTS</div>
            </Link>
          </li>
        </ul>

        {/* Button for alternate portfolio */}
        <div className="hidden md:block">
          <a
            href="https://adityakarmalkar.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 rounded-md bg-[#16f2b3] px-4 py-2 text-sm font-semibold text-black transition-all duration-300 hover:bg-pink-600 hover:text-white"
          >
            View Alternate Portfolio
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
