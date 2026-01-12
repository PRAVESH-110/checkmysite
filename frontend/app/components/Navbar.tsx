"use client"
import Link from 'next/link';
import React,{useState} from "react"
import {useAuth} from "../../context/AuthContext";

export default function Navbar() {

    const[login, setLogin] = useState(false);
    const[open, setOpen] = useState(false);
    const { isAuthenticated, logout } = useAuth();


    return (
        <div className='flex'>
        <nav className="fixed left-1/2 -translate-x-1/2 w-[70%] gap-2 z-[600] flex justify-between align-center items-center mt-3 mx-2 px-5 py-1 bg-white/5 backdrop-blur-md border-white border-2 rounded-full transition-all duration-300 dark:bg-black/20 dark:border-white/10">
            <Link href="/" className="text-2xl font-bold tracking-tight bg-gradient-to-br from-[#FF6B6B] to-[#556270] bg-clip-text text-transparent decoration-0">
                Webolution
            </Link>
            <ul className="flex gap-8 list-none m-0 p-0">
                <li>
                    <Link href="/pricing" className="text-[var(--foreground)] text-[0.95rem] font-medium opacity-80 decoration-0 transition-all duration-200 hover:opacity-100 hover:-translate-y-[1px]">
                        Pricing
                    </Link>
                </li>
                <li>
                    <Link href="/about" className="text-[var(--foreground)] text-[0.95rem] font-medium opacity-80 decoration-0 transition-all duration-200 hover:opacity-100 hover:-translate-y-[1px]">
                        About Us
                    </Link>
                </li>
                <li>
                    <Link href="/contact" className="text-[var(--foreground)] text-[0.95rem] font-medium opacity-80 decoration-0 transition-all duration-200 hover:opacity-100 hover:-translate-y-[1px]">
                        Contact
                    </Link>
                </li>
            </ul>
            <Link href="/get-started" className="bg-[var(--foreground)] text-[var(--background)] px-5 py-2 my-1 rounded-full font-semibold text-sm transition-transform duration-200 shadow-sm hover:scale-105 hover:shadow-lg decoration-0">
                Get Score
            </Link>
        </nav>


      <div className="fixed right-4 top-5 z-[1000]">
      {/* Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className=" z-[1001] hover:cursor-pointer right-2 top-4 text-black border rounded-full px-4 py-2 bg-gradient-to-br from-[#FF6B6B] to-[#556270]"
      >
        L
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 rounded-xl bg-white shadow-lg border border-gray-200 overflow-hidden z-50">
          
          {!isAuthenticated ? (
            <Link
              href="/login"
              className="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              Login/ Sign Up
            </Link>
          ) : (
            <button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              Logout
            </button>
          )}

        </div>
      )}
    </div>
        </div>
    );
}
