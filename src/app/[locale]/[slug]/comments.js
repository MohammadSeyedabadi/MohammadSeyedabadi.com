"use client"
import Giscus from "@giscus/react";
import { useContext } from "react";
import PreferencesContext from "@/store/preferences-context";
export default function Comments({locale}) {
  const { ariaActive } = useContext(PreferencesContext);
  return (
    <div className="lg:grid lg:grid-cols-12 gap-24 max-w-6xl mx-auto px-4 lg:px-8">
      <section className="lg:col-span-8 mt-12 lg:mt-4">
        <Giscus
          id="comments"
          repo="MohammadSeyedabadi/MohammadSeyedabadi.com"
          repoId="R_kgDOKeamUQ"
          category="Announcements"
          categoryId="DIC_kwDOKeamUc4CbDQi"
          mapping="pathname"
          term="Welcome to @giscus/react component!"
          reactionsEnabled="0"
          emitMetadata="0"
          inputPosition="top"
          theme={ariaActive ? "dark" : "light"}
          lang={locale}
          loading="lazy"
        />
      </section>
      <div className="lg:col-span-4" />
    </div>
  );
}
