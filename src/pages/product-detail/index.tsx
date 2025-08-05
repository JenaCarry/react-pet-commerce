import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../../services/api";
import type { ProductProps } from "../home";
import { formatCurrency } from "../../utils/formatCurrency";
import { CartContext } from "../../contexts/CartContext";
import toast from "react-hot-toast";

export function ProductDetail() {
    const [productDetail, setProductDetail] = useState<ProductProps>();
    const [hasProduct, setHasProduct] = useState<boolean>(true);
    const { id } = useParams();
    const { addItemCart } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        async function getProductDetail() {
            try {
                const response = await api.get(`/products/${id}`);
                setProductDetail(response.data);
            } catch (error) {
                console.log("Erro ao carregar detalhes do produto.", error);
                setHasProduct(false);
            }
        }

        getProductDetail();
    }, [id]);

    function handleAddItemCart(product: ProductProps) {
        toast.success("Produto adicionado ao carrinho!", {
            style: { backgroundColor: "#121212", color: "#fff" },
        });
        addItemCart(product);
        navigate("/cart");
    }

    return (
        <main className="w-full max-w-7xl mx-auto mb-8 pt-24 px-3">
            {!productDetail && hasProduct && (
                <h1 className="text-2xl font-medium text-center">
                    Carregando detalhes do produto...
                </h1>
            )}

            {!hasProduct && (
                <div className="text-center font-medium space-y-4">
                    <h1 className="text-2xl">Produto não encontrado!</h1>
                    <Link
                        to="/"
                        className="bg-sky-600 text-white px-4 py-2 rounded-md transition-colors hover:bg-sky-700"
                    >
                        Voltar a Home
                    </Link>
                </div>
            )}

            {productDetail && (
                <section
                    key={productDetail.id}
                    className="flex flex-col md:flex-row md:items-center"
                >
                    <img
                        src={productDetail.cover}
                        alt={productDetail.title}
                        className="w-full max-h-72 object-contain mb-3 md:mb-0"
                    />
                    <div className="space-y-3">
                        <h1 className="font-medium text-2xl">
                            {productDetail.title}
                        </h1>
                        <p>{productDetail.description}</p>
                        <div>
                            <span className="font-bold text-3xl">
                                {formatCurrency(productDetail.price)}
                            </span>
                            <p className="text-zinc-600">
                                em até 2x de{" "}
                                {formatCurrency(productDetail.price / 2.0)} sem
                                juros
                            </p>
                        </div>
                        <button
                            onClick={() => handleAddItemCart(productDetail)}
                            className="mt-auto font-medium text-white bg-sky-600 px-3 py-1.5 rounded-md transition-colors hover:bg-sky-700 cursor-pointer"
                            aria-label="Adicionar ao carrinho"
                        >
                            Adicionar ao carrinho
                        </button>
                    </div>
                </section>
            )}
        </main>
    );
}
