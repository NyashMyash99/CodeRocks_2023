import "../assets/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "moment/locale/ru";
import "../utils/extensions/string.extensions";
import React from "react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { store } from "../store/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <ToastContainer />
    </Provider>
  );
}
