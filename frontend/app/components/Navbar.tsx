"use client"
import Link from 'next/link';
import React, { useState, useRef, useEffect } from "react"
import { useAuth } from "../../context/AuthContext";
import SignIn from "../@modal/signin/page";
import { useToast } from "../providers/ToastProvider";
import Userbtn from './Userbtn';

export default function Navbar() {

  const [login, setLogin] = useState(false);
  const [open, setOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();
  const { showToast } = useToast();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);


  return (
    <div className='flex flex-row'>
      <nav className="fixed left-1/2 -translate-x-1/2 w-[95%] md:w-[70%] gap-2 z-[600] flex justify-between align-center items-center mt-3 mx-2 px-3 md:px-5 py-1 bg-white/5 backdrop-blur-md border-white border-2 rounded-full transition-all duration-300 dark:bg-black/20 dark:border-white/10">
        <Link href="/" className="text-lg md:text-2xl font-bold tracking-tight bg-gradient-to-br from-[#7051c3] to-[#ff70cc] bg-clip-text text-transparent decoration-0">
          checkmysite
        </Link>
        <ul className="flex gap-3 md:gap-8 list-none m-0 p-0">
          <li>
            <Link href="/pricing" className="text-[var(--foreground)] text-xs md:text-[0.95rem] font-medium opacity-80 decoration-0 transition-all duration-200 hover:opacity-100 hover:-translate-y-[1px]">
              Plans
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-[var(--foreground)] text-xs md:text-[0.95rem] font-medium opacity-80 decoration-0 transition-all duration-200 hover:opacity-100 hover:-translate-y-[1px]">
              About Us
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-[var(--foreground)] text-xs md:text-[0.95rem] font-medium opacity-80 decoration-0 transition-all duration-200 hover:opacity-100 hover:-translate-y-[1px]">
              Contact
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <Link href="/get-started" className="hidden md:block bg-[var(--foreground)] text-[var(--background)] px-5 py-2 my-1 rounded-full font-semibold text-sm transition-transform duration-200 shadow-sm hover:scale-105 hover:shadow-lg decoration-0">
            Get Score
          </Link>

          {/* Mobile L Button (Inside Navbar) */}
          <div className="md:hidden relative z-[1000]">
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className={`z-[1001] relative flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm shadow-md transition-all duration-300 border-[1.5px]
                ${open ? 'ring-2 ring-purple-400 scale-105' : 'active:scale-95'}
                bg-gradient-to-br from-[#7051c3] to-[#ff70cc] border-white/20 text-white
              `}
            >
              {isAuthenticated && user?.fname ? user.fname.charAt(0).toUpperCase() : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              )}
            </button>
            {/* Mobile Dropdown */}
            {open && (
              <div className="absolute right-[-10px] top-full mt-2 w-40 rounded-xl bg-white shadow-lg border border-gray-200 overflow-hidden z-[1002]">
                {!isAuthenticated ? (
                  <Link href="/signin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setOpen(false)}>Login/ Sign Up</Link>
                ) : (
                  <button onClick={() => {
                    logout();
                    setOpen(false);
                    showToast("Successfully logged out!", "success");
                  }} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Logout</button>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Desktop L Button (Outside Navbar, Fixed Position) */}
      <Userbtn />
    </div>
  );
}
