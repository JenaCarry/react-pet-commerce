import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./App";
import { CartProvider } from "./contexts/CartProvider";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <CartProvider>
            <Toaster position="bottom-center" reverseOrder={false} />
            <RouterProvider router={router} />
        </CartProvider>
    </StrictMode>
);
