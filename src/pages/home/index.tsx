import { useContext, useEffect, useState } from "react";
import { api } from "../../services/api";
import { formatCurrency } from "../../utils/formatCurrency";
import { CartContext } from "../../contexts/CartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export interface ProductProps {
    id: number;
    title: string;
    description: string;
    price: number;
    cover: string;
}

export function Home() {
    const { addItemCart } = useContext(CartContext);
    const [products, setProducts] = useState<ProductProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function getProducts() {
            try {
                const response = await api.get("/products");
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.log("Erro ao buscar produtos.", error);
            }
        }

        getProducts();
    }, []);

    function handleAddItemCart(product: ProductProps) {
        toast.success("Produto adicionado ao carrinho!", {
            style: { backgroundColor: "#121212", color: "#fff" },
        });
        addItemCart(product);
    }

    return (
        <main className="w-full max-w-7xl mx-auto text-slate-900 px-3 pt-24 mb-8">
            {loading && (
                <h1 className="text-2xl font-medium text-center">
                    Carregando produtos...
                </h1>
            )}
            {products.length > 0 && !loading && (
                <>
                    <h1 className="text-2xl font-medium text-center">
                        Todos os produtos{" "}
                        <span className="text-sm">
                            ({products.length} produtos)
                        </span>
                    </h1>
                    <section className="grid grid-cols-[minmax(0px,_22rem))] sm:grid-cols-[repeat(2,minmax(0px,_22rem))] md:grid-cols-[repeat(3,minmax(0px,_22rem))] lg:grid-cols-[repeat(4,minmax(0px,_22rem))] justify-center gap-4 my-8">
                        {products.map((product) => (
                            <article
                                key={product.id}
                                className="flex flex-col rounded-md border border-gray-200 shadow"
                            >
                                <Link
                                    to={`/product/${product.id}`}
                                    className="overflow-hidden"
                                >
                                    <img
                                        src={product.cover}
                                        alt={product.title}
                                        className="w-full max-h-72 object-contain transition-transform hover:scale-105"
                                    />
                                </Link>
                                <div className="flex flex-col justify-between flex-1 space-y-2 px-2.5 mb-4">
                                    <Link to={`/product/${product.id}`}>
                                        <h3 className="font-medium text-xl line-clamp-2 hover:line-clamp-none">
                                            {product.title}
                                        </h3>
                                    </Link>
                                    <div>
                                        <span className="font-bold text-3xl">
                                            {formatCurrency(product.price)}
                                        </span>
                                        <p className="text-zinc-600">
                                            em até 2x de{" "}
                                            {formatCurrency(product.price / 2)}{" "}
                                            sem juros
                                        </p>
                                    </div>
                                    <p>
                                        Entrega GRÁTIS:{" "}
                                        <span className="font-medium">
                                            ter., 5 de ago.
                                        </span>
                                    </p>
                                    <button
                                        onClick={() =>
                                            handleAddItemCart(product)
                                        }
                                        className="mt-auto font-medium text-white bg-sky-600 px-3 py-1.5 rounded-md transition-colors hover:bg-sky-700 cursor-pointer"
                                    >
                                        Adicionar ao carrinho
                                    </button>
                                </div>
                            </article>
                        ))}
                    </section>
                </>
            )}
        </main>
    );
}
