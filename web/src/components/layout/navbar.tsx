import * as React from "react";
import { getNavigation, getSiteSettings } from "@/lib/sanity";
import { NavbarClient } from "./navbar-client";

export async function Navbar() {
  const [navigation, settings] = await Promise.all([
    getNavigation(),
    getSiteSettings()
  ]);

  return <NavbarClient navigation={navigation} settings={settings} />;
}
