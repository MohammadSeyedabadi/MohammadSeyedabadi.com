"use client";

import { useContext, useEffect } from "react";
import ThemeContext from "@/store/theme-context";

export default function SetLang({ otherPageSlug }) {
  const { setOtherPageSlug } = useContext(ThemeContext);
  useEffect(() => {
    setOtherPageSlug(otherPageSlug);
  }, [otherPageSlug]);
  return <></>;
}
