// Da formato a los montos de dinero en colones costarricenses.
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-CR", {
      style: "currency",
      currency: "CRC",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };