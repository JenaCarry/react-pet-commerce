export function formatCurrency(value: number | string) {
    const formattedCurrency = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
    return formattedCurrency;
}
