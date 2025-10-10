"use client";

import React, { useEffect, useRef } from "react";
import HiroComponet from "@/component/HiroCompoent/Page";
// import RegistroCumplimientoServices from "@/lib/services/RegistroCumplimientosServices";
// import { useRegionesStore } from "@/Store/regionesStore";
import Image from "next/image";


const Page = () => {



  return (
    <div className="w-full px-80 flex flex-col ">
      <HiroComponet />
      <div className="w-full flex flex-col gap-25">
        <section className="flex gap-10 pt-25">
          <div className="bg-[#002855] p-4 shadow-md">
            <h1 className="text-2xl font-bold text-center my-4">Lorem</h1>
            <p className="text-gray-300 font-light ">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores, accusamus maxime ipsum autem amet
              quidem consequatur explicabo culpa quam? Ratione id aliquid ipsam, iste nobis culpa? Omnis id non dolorem.
            </p>
          </div>

          <div className="bg-[#002855] p-4 shadow-md">
            <h2 className="text-2xl font-bold text-center my-4">Lorem</h2>
            <p className="text-gray-300 font-light ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam animi vero ipsum velit eos modi suscipit
              earum ab nesciunt amet assumenda quo sed debitis mollitia ex in, ad nulla inventore?
            </p>
          </div>

          <div className="bg-[#002855] p-4 shadow-md">
            <h2 className="text-2xl font-bold text-center my-4">Lorem</h2>
            <p className="text-gray-300 font-light ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam animi vero ipsum velit eos modi suscipit
              earum ab nesciunt amet assumenda quo sed debitis mollitia ex in, ad nulla inventore?
            </p>
          </div>
        </section>
        <section className="flex flex-col gap-10 pt-25">
          <div>
            <div className="bg-[#002855] p-4 shadow-md flex gap-4 justify-between min-h-[400px]">
              <div className=" flex flex-1 flex-col items-center justify-center gap-4 py-8 px-20">
                <h2 className="text-5xl font-bold ">Lorem</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid culpa deleniti dolore minus. Velit
                  enim accusantium impedit sed rem quos a ipsam veniam aspernatur! Laboriosam eveniet cupiditate
                  excepturi doloremque itaque.
                </p>

                <button className="bg-[#e63946] w-50 h-9 ">Precionar</button>
              </div>
              <div>
                <Image className="w-100" src="/imgs/imgGenerica2.jpg" alt="" width={500} height={400} />
              </div>
            </div>
          </div>
          <div>
            <div className="bg-[#002855] p-4 shadow-md flex gap-4 justify-between min-h-[400px]">
              <div>
                <Image className="w-100" src="/imgs/imgGenerica2.jpg" alt="" width={500} height={400} />
              </div>
              <div className="flex flex-1 flex-col items-center justify-center gap-4 py-8 px-20">
                <h2 className="text-5xl font-bold ">Lorem</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid culpa deleniti dolore minus. Velit
                  enim accusantium impedit sed rem quos a ipsam veniam aspernatur! Laboriosam eveniet cupiditate
                  excepturi doloremque itaque.
                </p>

                <button className="bg-[#e63946] w-50 h-9 ">Precionar</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;
