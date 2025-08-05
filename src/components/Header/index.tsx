import { Link } from "react-router-dom";
import logo from "../../assets/logos/logo.png";
import { FiShoppingCart } from "react-icons/fi";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";

export function Header() {
    const { cartAmount } = useContext(CartContext);

    return (
        <header className="bg-primary fixed w-full backdrop-blur-lg z-10">
            <nav className="w-full max-w-7xl h-18 flex items-center justify-between mx-auto px-4">
                <Link to="/">
                    <img
                        src={logo}
                        alt="Logo do site Pet Commerce"
                        className="w-16 h-16 rounded-full shadow"
                    />
                </Link>
                <Link to="/cart" className="relative p-4">
                    <FiShoppingCart size={24} color="#121212" />
                    {cartAmount > 0 && (
                        <span className="absolute top-0 right-0 flex items-center justify-center bg-sky-500 text-white text-xs rounded-full px-2.5 w-6 h-6">
                            {cartAmount}
                        </span>
                    )}
                </Link>
            </nav>
        </header>
    );
}
