import { useEffect, useState, type ReactNode } from "react";
import { CartContext, type CartProps } from "./CartContext";
import type { ProductProps } from "../pages/home";

type CartProviderProps = { children: ReactNode };

export function CartProvider({ children }: CartProviderProps) {
    const [cart, setCart] = useState<CartProps[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [cartAmount, setCartAmount] = useState<number>(0);

    useEffect(() => {
        const updateTotal = cart.reduce(
            (acc, item) => acc + item.price * item.amount,
            0
        );
        setTotal(updateTotal);

        const totalAmount = cart.reduce((acc, item) => acc + item.amount, 0);
        setCartAmount(totalAmount);
    }, [cart]);

    function addItemCart(newItem: ProductProps) {
        setCart((prevCart) => {
            const indexItem = prevCart.findIndex(
                (item) => item.id === newItem.id
            );

            if (indexItem === -1) {
                const newProduct: CartProps = {
                    ...newItem,
                    amount: 1,
                };
                return [...prevCart, newProduct];
            }

            return prevCart.map((item, index) => {
                if (index === indexItem) {
                    return {
                        ...item,
                        amount: item.amount + 1,
                    };
                }
                return item;
            });
        });
    }

    function removeItemCart(newItem: CartProps) {
        setCart((prevCart) => {
            const indexItem = prevCart.findIndex(
                (item) => item.id === newItem.id
            );
            if (indexItem === -1) return prevCart;

            const currentItem = prevCart[indexItem];
            if (currentItem.amount > 1) {
                return prevCart.map((item, index) => {
                    if (index === indexItem) {
                        return {
                            ...item,
                            amount: item.amount - 1,
                        };
                    }
                    return item;
                });
            }
            return prevCart.filter((item) => item.id !== newItem.id);
        });
    }

    function deleteItemCart(newItem: CartProps) {
        setCart((prevCart) =>
            prevCart.filter((item) => item.id !== newItem.id)
        );
    }

    function clearOrder() {
        setCart([]);
    }

    return (
        <CartContext.Provider
            value={{
                cart,
                cartAmount,
                total,
                addItemCart,
                removeItemCart,
                deleteItemCart,
                clearOrder,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
