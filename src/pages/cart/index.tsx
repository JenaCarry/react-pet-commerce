import { useContext, useState } from "react";
import { FaMinus, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { CartContext } from "../../contexts/CartContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export function Cart() {
    const {
        cart,
        cartAmount,
        total,
        addItemCart,
        removeItemCart,
        deleteItemCart,
        clearOrder,
    } = useContext(CartContext);

    const [loading, setLoading] = useState(false);

    function completeOrder() {
        setLoading(true);
        setTimeout(() => {
            toast.success("Pedido finalizado!", {
                style: { backgroundColor: "#121212", color: "#fff" },
            });

            setLoading(false);
            clearOrder();
        }, 2000);
    }

    return (
        <main className="w-full max-w-7xl px-3 pt-24 mb-8 mx-auto text-slate-900">
            <h1 className="font-medium text-2xl text-center mb-4">
                Carrinho de compras
            </h1>
            {cart.length === 0 && (
                <div className="text-center font-medium space-y-4">
                    <h1>Ops, seu carrinho está vazio...</h1>
                    <Link
                        to="/"
                        className="bg-sky-600 text-white px-4 py-2 rounded-md transition-colors hover:bg-sky-700"
                    >
                        Acessar produtos
                    </Link>
                </div>
            )}
            {cart.length > 0 && (
                <div className="flex flex-col justify-between gap-6 md:flex-row">
                    <section className="w-full pt-4">
                        <span className="hidden text-right text-gray-500 font-medium border-b border-gray-300 sm:block">
                            Preço
                        </span>
                        {cart.map((product) => {
                            const total = product.price * product.amount;
                            return (
                                <article
                                    key={product.id}
                                    className="border-b border-b-gray-300 py-2.5"
                                >
                                    <div className="flex items-center sm:items-start">
                                        <img
                                            src={product.cover}
                                            alt={product.title}
                                            className="max-h-32 object-contain"
                                        />
                                        <div className="w-full sm:flex justify-between sm:gap-4">
                                            <div>
                                                <h3 className="font-medium text-xl line-clamp-2 hover:line-clamp-none">
                                                    {product.title}
                                                </h3>
                                                <span className="text-green-600 text-xs">
                                                    Em estoque
                                                </span>
                                                <span className="block text-xs font-medium">
                                                    Preço unid.{" "}
                                                    {formatCurrency(
                                                        product.price
                                                    )}
                                                </span>
                                            </div>
                                            <div className="sm:text-right">
                                                <span className="font-bold text-2xl">
                                                    {formatCurrency(total)}
                                                </span>
                                                <p className="text-sm">
                                                    em até 2x de{" "}
                                                    {formatCurrency(
                                                        total / 2.0
                                                    )}
                                                    <span className="block">
                                                        sem juros
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2.5 mt-3">
                                        <div className="w-full max-w-32 h-8 flex items-center justify-between border-2 border-amber-300 px-2 rounded-2xl">
                                            <button
                                                onClick={() =>
                                                    removeItemCart(product)
                                                }
                                                className="cursor-pointer w-7 h-7 flex items-center justify-center"
                                                aria-label="Botão de diminuir"
                                            >
                                                {product.amount > 1 ? (
                                                    <FaMinus size={16} />
                                                ) : (
                                                    <FaRegTrashAlt size={16} />
                                                )}
                                            </button>
                                            <span className="font-medium">
                                                {product.amount}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    addItemCart(product)
                                                }
                                                className="cursor-pointer w-7 h-7 flex items-center justify-center"
                                                aria-label="Botão de Aumentar"
                                            >
                                                <FaPlus size={16} />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() =>
                                                deleteItemCart(product)
                                            }
                                            className="h-8 flex items-center justify-center font-medium border-2 border-gray-300 rounded-2xl px-2.5 cursor-pointer transition-colors hover:bg-gray-50"
                                            aria-label="Botão de Excluir"
                                        >
                                            Excluir
                                        </button>
                                    </div>
                                </article>
                            );
                        })}
                    </section>
                    <section className="flex flex-col w-full md:max-w-xs rounded-md border border-gray-200 shadow max-h-fit p-4">
                        <h2 className="font-medium mb-2.5 text-lg text-gray-500">
                            Resumo da compra
                        </h2>
                        <div className="text-sm flex justify-between mb-1">
                            <span>
                                {cartAmount > 1
                                    ? `Produtos (${cartAmount})`
                                    : "Produto"}
                            </span>
                            <span>{formatCurrency(total)}</span>
                        </div>
                        <div className="text-sm flex justify-between">
                            <span>Frete</span>
                            <span className="text-green-600">Grátis</span>
                        </div>
                        <div className="flex justify-between text-xl font-medium my-3">
                            <span>Total</span>
                            <span>{formatCurrency(total)}</span>
                        </div>
                        <button
                            onClick={completeOrder}
                            className="font-medium text-white bg-sky-600 px-3 py-1.5 rounded-md transition-colors hover:bg-sky-700 cursor-pointer"
                            aria-label="Finalizar compra"
                        >
                            {loading ? "Finalizando..." : "Fechar pedido"}
                        </button>
                    </section>
                </div>
            )}
        </main>
    );
}
