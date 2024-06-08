import * as React from "react";

function IconImage({ src, alt }) {
  return (
    <div className="flex justify-center items-center p-1 bg-zinc-100">
      <img loading="lazy" src={src} alt={alt} className="aspect-[1.2] fill-indigo-500 w-[18px]" />
    </div>
  );
}

function Stats() {
  return (
    <div className="flex justify-evenly flex-wrap">


    
    <section className="flex flex-col justify-center w-full px-4 py-5 bg-white rounded border border-solid border-neutral-200 max-w-[270px]">
      <div className="flex gap-2 justify-between">
        <IconImage src="https://cdn.builder.io/api/v1/image/assets/TEMP/1e67c3d0928dedaa270526c4f4affdb024bb387afb276ec9661057742a3cef10?apiKey=da0e5699a0964f23ab3a2091e7f935a3&" alt="Icon image description" />
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/10674ca93776d9ab980456bdb3513a84ad1b11167dea6116dcbdd911c1e1ae3f?apiKey=da0e5699a0964f23ab3a2091e7f935a3&" alt="Decorative icon" className="shrink-0 my-auto w-3 aspect-square" />
      </div>
      <header className="mt-3 text-sm font-medium leading-5 text-indigo-400">Contacts</header>
      <p className="mt-1 text-xl font-medium leading-6 text-zinc-800">1,251 Contacts</p>
    </section>
    
    <section className="flex flex-col justify-center px-16 py-5 bg-white rounded border border-solid border-neutral-200 max-w-[270px]">
      <div className="flex gap-2 justify-between">
        <IconImage src="https://cdn.builder.io/api/v1/image/assets/TEMP/1e67c3d0928dedaa270526c4f4affdb024bb387afb276ec9661057742a3cef10?apiKey=da0e5699a0964f23ab3a2091e7f935a3&" alt="Icon image description" />
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/10674ca93776d9ab980456bdb3513a84ad1b11167dea6116dcbdd911c1e1ae3f?apiKey=da0e5699a0964f23ab3a2091e7f935a3&" alt="Decorative icon" className="shrink-0 my-auto w-3 aspect-square" />
      </div>
      <header className="mt-3 text-sm font-medium leading-5 text-indigo-400">Contacts</header>
      <p className="mt-1 text-xl font-medium leading-6 text-zinc-800">1,251 Contacts</p>
    </section>
    
    <section className="flex flex-col justify-center px-16 py-5 bg-white rounded border border-solid border-neutral-200 max-w-[270px]">
      <div className="flex gap-2 justify-between">
        <IconImage src="https://cdn.builder.io/api/v1/image/assets/TEMP/1e67c3d0928dedaa270526c4f4affdb024bb387afb276ec9661057742a3cef10?apiKey=da0e5699a0964f23ab3a2091e7f935a3&" alt="Icon image description" />
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/10674ca93776d9ab980456bdb3513a84ad1b11167dea6116dcbdd911c1e1ae3f?apiKey=da0e5699a0964f23ab3a2091e7f935a3&" alt="Decorative icon" className="shrink-0 my-auto w-3 aspect-square" />
      </div>
      <header className="mt-3 text-sm font-medium leading-5 text-indigo-400">Contacts</header>
      <p className="mt-1 text-xl font-medium leading-6 text-zinc-800">1,251 Contacts</p>
    </section>
    <section className="flex flex-col justify-center px-16 py-5 bg-white rounded border border-solid border-neutral-200 max-w-[270px]">
      <div className="flex gap-2 justify-between">
        <IconImage src="https://cdn.builder.io/api/v1/image/assets/TEMP/1e67c3d0928dedaa270526c4f4affdb024bb387afb276ec9661057742a3cef10?apiKey=da0e5699a0964f23ab3a2091e7f935a3&" alt="Icon image description" />
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/10674ca93776d9ab980456bdb3513a84ad1b11167dea6116dcbdd911c1e1ae3f?apiKey=da0e5699a0964f23ab3a2091e7f935a3&" alt="Decorative icon" className="shrink-0 my-auto w-3 aspect-square" />
      </div>
      <header className="mt-3 text-sm font-medium leading-5 text-indigo-400">Contacts</header>
      <p className="mt-1 text-xl font-medium leading-6 text-zinc-800">1,251 Contacts</p>
    </section>
    </div>

  );
}

export default Stats;