import React, { useState } from "react";
import { auth } from "../wrapper/authWrapper";
import { NavLink, useNavigate } from "react-router-dom";
const Navbar: React.FC = () => {
  const { isUserLoggedIn, handlelogout, theme, setTheme } = auth();
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  return (
    <nav className="position sticky top-0 z-50 bg-zinc-800/20 backdrop-blur-2xl flex justify-between items-center px-6 py-4 border-b border-b-zinc-600 mb-6 transition-all delay-200 ease-in-out">
      <h1 className="text-xl font-bold">File Sharing App</h1>
      <div className="flex items-center justify-center gap-4">
        {!isUserLoggedIn && (
          <button
            className="text-current z-20 focus:outline-none cursor-pointer active:scale-95 hover:underline underline-offset-4 "
            onClick={() => navigate("/signin")}
          >
            Login
          </button>
        )}
        {!isUserLoggedIn && (
          <button
            className="text-current z-20 focus:outline-none cursor-pointer active:scale-95 hover:underline underline-offset-4"
            onClick={() => navigate("/signup")}
          >
            Register
          </button>
        )}
        <NavLink
          to="/"
          end
          className={({ isActive }: { isActive: boolean }) =>
            `text-current z-20 focus:outline-none cursor-pointer active:scale-95 hover:underline underline-offset-4 ${
              isActive ? "underline" : ""
            }`
          }
        >
          Home
        </NavLink>
         {theme == "dark" ? (
          <button
            type="button"
            className="shadow-2xs z-20 shadow-amber-100 rounded-full border border-zinc-400 p-0.5"
            onClick={()=> setTheme("light")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
          </button>
        ) : (
          <button type="button"
          className="shadow-current z-20 rounded-full border border-zinc-400 p-0.5"
          onClick={()=> setTheme("dark")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              />
            </svg>
          </button>
        )}
        {/* <NavLink
          to="/private"
          end
          className={({ isActive }: { isActive: boolean }) =>
            `text-current z-20 focus:outline-none cursor-pointer active:scale-95 hover:underline underline-offset-4 ${
              isActive ? "underline" : ""
            }`
          }
        >
          Private
        </NavLink> */}
        {isUserLoggedIn && (
          <button
            className=" relative text-current z-20 focus:outline-none cursor-pointer"
            onClick={() => setIsUserMenuOpen((prev) => !prev)}
          >
            <img
              src="user.png"
              className="size-8 rounded-full hover:scale-95"
            />
          </button>
        )}

   

        {isUserMenuOpen && (
          <div className="absolute flex flex-col right-7 top-13 rounded-2xl rounded-tr-sm bg-zinc-400/60 border-2 border-zinc-600">
            <button
              type="button"
              className="active:scale-95 cursor-pointer hover:underline rounded-2xl rounded-tr-sm p-2 pb-0"
              onClick={() => {
                setIsUserMenuOpen(false);
                navigate("/user");
              }}
            >
              Profile{" "}
            </button>
            <button
              type="button"
              className="text-red-500 active:scale-95 cursor-pointer rounded-2xl hover:underline p-2"
              onClick={() => {
                setIsUserMenuOpen(false);
                handlelogout();
              }}
            >
              Logout{" "}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
