"use client"
import Link from 'next/link';
import { usePathname } from "next/navigation";
import React, { useState, useRef, useEffect, useLayoutEffect } from "react"
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
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;
  const navListRef = useRef<HTMLUListElement>(null);
  const navLinkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [activeBar, setActiveBar] = useState<{ left: number; width: number; visible: boolean }>({
    left: 0,
    width: 0,
    visible: false,
  });
  const navLinks = [
    { href: "/pricing", label: "Plans" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

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

  useLayoutEffect(() => {
    const updateActiveBar = () => {
      const listEl = navListRef.current;
      if (!listEl) {
        setActiveBar({ left: 0, width: 0, visible: false });
        return;
      }

      const activeIndex = navLinks.findIndex((link) => isActive(link.href));
      const activeEl = navLinkRefs.current[activeIndex];
      if (!activeEl) {
        setActiveBar({ left: 0, width: 0, visible: false });
        return;
      }

      const listRect = listEl.getBoundingClientRect();
      const activeRect = activeEl.getBoundingClientRect();
      const left = activeRect.left - listRect.left;
      setActiveBar({ left, width: activeRect.width, visible: true });
    };

    const raf = requestAnimationFrame(updateActiveBar);
    window.addEventListener("resize", updateActiveBar);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", updateActiveBar);
    };
  }, [pathname]);


  return (
    <div className='flex flex-row'>
      <nav className="fixed left-1/2 -translate-x-1/2 w-[95%] md:w-[70%] gap-2 z-[600] flex justify-between align-center items-center mt-3 mx-2 px-3 md:px-5 py-1 bg-white/5 backdrop-blur-md border-white border-2 rounded-full transition-all duration-300 dark:bg-black/20 dark:border-white/10">
        <Link href="/" className="text-lg md:text-2xl font-bold tracking-tight bg-gradient-to-br from-[#7051c3] to-[#ff70cc] bg-clip-text text-transparent decoration-0 font-montserrat">
          checkmysite
        </Link>
        <ul ref={navListRef} className="relative flex gap-3 md:gap-8 list-none m-0 p-0 pb-2">
          {navLinks.map((link, index) => (
            <li key={link.href}>
              <Link
                href={link.href}
                ref={(el) => {
                  navLinkRefs.current[index] = el;
                }}
                className="relative inline-flex flex-col items-center text-[var(--foreground)] text-xs md:text-[0.95rem] font-medium opacity-80 decoration-0 transition-all duration-200 hover:opacity-100 hover:-translate-y-[1px]"
              >
                <span>{link.label}</span>
              </Link>
            </li>
          ))}
          <span
            className={`pointer-events-none absolute bottom-0 h-[2px] rounded-full bg-gradient-to-r from-[#7051c3] to-[#ff70cc] transition-[transform,opacity] duration-300 ease-out`}
            style={{
              transform: `translateX(${activeBar.left}px)`,
              width: `${activeBar.width}px`,
              opacity: activeBar.visible ? 1 : 0,
            }}
          />
        </ul>

        <div className="flex items-center gap-2">
          <Userbtn />
          {/* Mobile P Button (Inside Navbar) */}
          <div className="md:hidden relative z-[1000]">
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className={`z-[1001] relative flex items-center justify-center w-9 h-9 md:w-8 md:h-8 rounded-full font-bold text-sm shadow-md transition-all duration-300 border border-white/20
                ${open ? 'ring-2 ring-purple-400 scale-105' : 'active:scale-95'}
                bg-gradient-to-br from-[#7051c3] to-[#ff70cc] text-white
              `}
            >
              {isAuthenticated && user?.fname ? (
                user.fname.charAt(0).toUpperCase()
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              )}
            </button>
            {/* Mobile Dropdown */}
            {open && (
              <div className="absolute right-0 top-full mt-3 w-48 rounded-xl bg-white/90 dark:bg-[#0f0f0f]/95 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] ring-1 ring-white/10 overflow-hidden z-[1002] animate-in fade-in slide-in-from-top-2 duration-200 origin-top-right p-1.5">
                {!isAuthenticated ? (
                  <div className="flex flex-col gap-1">
                    <div className="px-3 py-2 text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider opacity-80">
                      Account
                    </div>
                    <Link
                      href="/signin"
                      className="flex items-center px-3 py-2 text-sm font-semibold text-gray-700 dark:text-white rounded-lg hover:bg-purple-500/10 hover:text-purple-500 transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="flex items-center justify-center px-3 py-2 mt-1 text-sm font-bold text-white bg-gradient-to-r from-[#7051c3] to-[#ff70cc] rounded-lg shadow-md hover:opacity-90 transition-opacity"
                      onClick={() => setOpen(false)}
                    >
                      Get Started
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-1">
                    <div className="px-3 py-2 border-b border-black/5 dark:border-white/5 mb-1">
                      <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user?.fname}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                    </div>
                    <Link
                      href="/settings"
                      onClick={() => setOpen(false)}
                      className="flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-300 rounded-lg hover:bg-black/5 dark:hover:bg-white/10"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setOpen(false);
                        showToast("Successfully logged out!", "success");
                      }}
                      className="flex items-center w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
