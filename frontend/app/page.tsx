'use client';
import { useState, useEffect } from "react";
import {scanRequest} from "../config/scan.api"

export default function Home() {

  const[loading, setLoading]= useState(false);
  const[inputUrl, setInputUrl]= useState("");
  const[scanid,setScanid]= useState("")


  const handleSubmit = async () => {
    try{
    setLoading(true)
    const startScan= await scanRequest(inputUrl);  
    const scanId= startScan.scanId;
    setScanid(scanId);

    }
    catch(err){
      setLoading(false);
      console.log("",err)
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-8 py-16 text-center bg-[radial-gradient(circle_at_50%_50%,rgba(100,100,255,0.05)_0%,transparent_50%)]">
      <section className="max-w-[800px] mx-auto">
        <h1 className="text-6xl font-extrabold leading-[1.1] mb-6 tracking-tighter bg-gradient-to-b from-[var(--foreground)] to-[rgba(var(--foreground),0.7)] bg-clip-text text-transparent dark:from-white dark:to-[#aaa]">
          Stop Losing Customers. <br />
          Get Your Conversion Score.
        </h1>
        <p className="text-xl leading-relaxed text-[var(--foreground)] opacity-70 mb-12 max-w-[600px] mx-auto">
          Deterministic analysis of your website's conversion blockers.
          No fluff, just fixable insights based on proven UX principles.
        </p>

        <form
        className="flex gap-4 max-w-[500px] mx-auto w-full"
        onSubmit={(e) =>{e.preventDefault()
        handleSubmit()} }>
          
          <input
            type="url"
            value={inputUrl}
            onChange={(e)=>setInputUrl(e.target.value)}
            placeholder="Enter your website URL (e.g., https://example.com)"
            className="flex-1 px-6 py-4 rounded-full border border-black/10 bg-white/50 text-base transition-all outline-none focus:border-[#0070f3] focus:ring-4 focus:ring-[#0070f3]/10 focus:bg-white dark:bg-white/5 dark:border-white/10 dark:text-white dark:focus:bg-black/50"
            required
          />

          <button type="submit"
          disabled={loading}
          className="px-8 py-4 rounded-full border-0 bg-gradient-to-br from-[#7051c3] to-[#ff70cc] text-white font-semibold text-base cursor-pointer transition-all hover:bg-[#0051a2] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,118,255,0.3)] whitespace-nowrap">
            {loading ? "Loading" : "Analyze my site"}
          </button>
        </form>


      </section>

      <section className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8 max-w-[1000px] w-full mt-24 mx-auto">
        <div className="p-8 bg-white/[0.03] border border-white/10 rounded-2xl text-left transition-transform duration-200 hover:-translate-y-1 hover:bg-white/5">
          <h3 className="text-xl font-bold mb-2">Deterministic Scoring</h3>
          <p className="text-[0.95rem] opacity-70 leading-normal">No random LLM guesses. Our scoring engine follows strict, repeatable heuristic rules.</p>
        </div>
        <div className="p-8 bg-white/[0.03] border border-white/10 rounded-2xl text-left transition-transform duration-200 hover:-translate-y-1 hover:bg-white/5">
          <h3 className="text-xl font-bold mb-2">Deep Performance Analysis</h3>
          <p className="text-[0.95rem] opacity-70 leading-normal">We check load times, interactivity delays, and layout shifts that kill conversions.</p>
        </div>
        <div className="p-8 bg-white/[0.03] border border-white/10 rounded-2xl text-left transition-transform duration-200 hover:-translate-y-1 hover:bg-white/5">
          <h3 className="text-xl font-bold mb-2">Actionable Fixes</h3>
          <p className="text-[0.95rem] opacity-70 leading-normal">Get a prioritized list of specific changes to improve your conversion rate today.</p>
        </div>
      </section>
    </div>
  );
}
