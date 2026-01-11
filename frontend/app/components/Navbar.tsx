"use client"
import Link from 'next/link';
import React,{useState} from "react"

export default function Navbar() {

    const[login, setLogin] = useState(false);


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

        <div className='relative'>
            <button
                type='button'
                onClick={() => setLogin(!login)}
                className='fixed top-1 right-2 text-right m-4 text-black border rounded-full px-4 py-2 hover:cursor-pointer bg-gradient-to-br from-[#FF6B6B] to-[#556270]'>L
            </button>

            <div>
                <Link href='/login'
                className='block px-4 py-2 text-sm hover:bg-gray-100'>
                    Login</Link>
            </div> 

            {login && (
                <div>
                   <Link href='/'
                   className='block px-4 py-2 text-sm hover:bg-gray-100'>
                    Logout</Link> 
                </div>
            )}
        </div>
        </div>
    );
}
