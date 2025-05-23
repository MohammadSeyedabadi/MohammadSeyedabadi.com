"use client";

import { useContext, useEffect } from "react";
import PreferencesContext from "@/store/preferences-context";

export default function SetLang({ otherPageSlug }) {
  const { setOtherPageSlug } = useContext(PreferencesContext);
  useEffect(() => {
    setOtherPageSlug(otherPageSlug);
  }, [otherPageSlug]);
  return <></>;
}
