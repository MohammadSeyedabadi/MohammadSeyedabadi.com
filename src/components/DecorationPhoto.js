"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
export default function DecorationPhoto() {
  const lang = useParams().locale;

  return (
    <>
      {lang === "fa" ? (
        <Image
          src="/images/ram.png"
          alt="RAM Ram"
          className="image hero-image"
          title="RAM Ram"
          width={440}
          height={350}
          quality={100}
          style={{ transform: "scaleX(-1)" }}
        />
      ) : (
        <Image
          src="/images/ram.png"
          alt="RAM Ram"
          className="image hero-image"
          title="RAM Ram"
          width={440}
          height={350}
          quality={100}
        />
      )}
    </>
  );
}
