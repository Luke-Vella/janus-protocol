"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Analytics } from "@vercel/analytics/next";
import { Navbar02 } from "@/components/ui/shadcn-io/navbar-02";

export default function HomePage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const router = useRouter();

  const handleCtaClick = () => {
    router.push("/signup");
  };

  return (
    <div className="font-nunito h-screen flex justify-center">
      <div className="w-full grid grid-rows-[60px_1fr_40px] gap-4 px-6 lg:px-">
        <header className="g-header flex items-center justify-between">
          <Navbar02 onCtaClick={() => handleCtaClick()} />
        </header>

        <main className="g-body flex flex-col gap-6 items-center px-4 py-30 overflow-y-auto min-h-0">
          <div className="flex flex-col gap-20">
            <div className="flex flex-col items-center gap-10">
              <div className="flex flex-col">
                <h1 className="text-8xl">LUKE VELLA</h1>

                <div className="flex text-sm  gap-2 lg:gap-4 flex-wrap justify-start">
                  <div className="whitespace-nowrap">
                    Senior front-end Developer
                  </div>
                  <div>|</div>
                  <div className="whitespace-nowrap">Game Dev Hobbyist</div>
                  <div>|</div>
                  <div className="whitespace-nowrap">Coffee Addict</div>
                </div>
              </div>
            </div>

            <div className="g-row">
              <p className="text-2xl text-muted-foreground self-center text-center py-4">
                Welcome to my world.
              </p>
            </div>

            <div className="g-row flex flex-col gap-8">
              <h2 className="text-2xl">{`Components, fresh out the oven.`}</h2>

              <div className="g-row items-start flex flex-col gap-4 border-b pb-8">
                <h3 className="text-xl">{`Button Variants`}</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="default">Default</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>
              </div>

              <div className="g-row items-start flex flex-col gap-4 border-b pb-8">
                <h3 className="text-xl">{`Calendar`}</h3>
                <div className="flex self-center flex-wrap gap-4">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-lg border"
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
        <div className="g-footer">test</div>

        <Analytics />
      </div>
    </div>
  );
}
