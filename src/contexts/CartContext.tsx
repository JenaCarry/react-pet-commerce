import { createContext } from "react";
import type { ProductProps } from "../pages/home";

interface CartContextData {
    cart: CartProps[];
    cartAmount: number;
    total: number;
    addItemCart: (newItem: ProductProps) => void;
    removeItemCart: (newItem: CartProps) => void;
    deleteItemCart: (newItem: CartProps) => void;
    clearOrder: () => void;
}

export interface CartProps {
    id: number;
    title: string;
    description: string;
    price: number;
    cover: string;
    amount: number;
}

export const CartContext = createContext({} as CartContextData);
