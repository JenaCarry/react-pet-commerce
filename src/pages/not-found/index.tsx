import { Link } from "react-router-dom";

export function NotFound() {
    return (
        <div className="text-center font-medium space-y-4 pt-24">
            <h1 className="text-4xl">404</h1>
            <h2 className="text-2xl">Página não encontrada!</h2>
            <Link
                to="/"
                className="bg-sky-600 text-white px-4 py-2 rounded-md transition-colors hover:bg-sky-700"
            >
                Voltar a Home
            </Link>
        </div>
    );
}
