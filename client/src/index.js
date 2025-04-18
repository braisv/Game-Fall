import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import App from "./app";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

serviceWorker.unregister();
