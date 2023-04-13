import toPX from "to-px";

const pages = {
  LOGO: 0,
  MENU: 1,
  AUTH: 1,
  PROFILE: 2,
};

export const scrollTo = (page: "LOGO" | "MENU" | "AUTH" | "PROFILE") =>
  window.scrollTo({ top: toPX("100vh")! * pages[page], behavior: "smooth" });
