import express from "express";
import { join } from "path";
import { readFileSync } from "fs";

const app = express();

const readDatabase = () => {
    const dbPath = join(process.cwd(), "db.json");
    const fileData = readFileSync(dbPath, "utf-8");
    return JSON.parse(fileData);
};

app.get("/api/products", (req, res) => {
    try {
        const db = readDatabase();
        res.status(200).json(db.products);
    } catch (error) {
        console.error("Erro ao ler o banco de dados:", error);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
});

app.get("/api/products/:id", (req, res) => {
    try {
        const db = readDatabase();
        const id = parseInt(req.params.id, 10);

        const product = db.products.find((p) => p.id === id);

        if (product) {
            res.status(200).json(product);
        } else {
            res.status(400).json({ error: "Produto não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao processar a requisição:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});

export default app;
