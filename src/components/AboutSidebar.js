"use client";
import { useContext } from "react";
import ThemeContext from "@/store/theme-context";
import { useParams } from "next/navigation";

export default function AboutSidebar() {
  const { ariaActive } = useContext(ThemeContext);
  const lang = useParams().locale;
  return (
    <aside className="post-sidebar">
      <div className="post-sidebar-card" style={{ width: "fit-content" }}>
        <h2>{lang === "en" ? "Me" : "من"}</h2>
        <img
          src="/images/me2.jpg"
          alt="Mohammad"
          style={ariaActive ? null : { display: "none" }}
        />
        <img
          src="/images/me1.jpg"
          alt="Mohammad"
          style={ariaActive ? { display: "none" } : null}
        />
      </div>
    </aside>
  );
}
