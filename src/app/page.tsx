"use client";

import NavbarGuest from "@/components/Guest/NavbarGuest";
import Hero from "@/components/Guest/Landing/Hero";
import About from "@/components/Guest/Landing/About";
import { Spacer } from "@nextui-org/react"



export default function Home() {
  return (
    <>
      <main className="flex flex-col items-center justify-between bg-white min-h-screen">
      <NavbarGuest />
        <section className="flex flex-col w-full h-full items-center">
          <Hero />
          <Spacer y={40}/>
          <About />
          <div aria-label="Why Us?">

          </div>
          <div aria-label="Contact">
            
          </div>
        </section>
      </main>
    </>
  );
}
