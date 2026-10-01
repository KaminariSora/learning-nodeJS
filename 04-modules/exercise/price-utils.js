function addVat(price) {
    const vatRate = 0.07;
    const priceWithVat = price * (1 + vatRate);
    return priceWithVat;
}

function applyDiscount(price, percent) {
    const discountAmount = price * (percent / 100);
    const discountedPrice = price - discountAmount;
    return discountedPrice;
}

function formatBath(price) {
    return price.toFixed(2) + "บาท";
}

module.exports = {
    addVat,
    applyDiscount,
    formatBath
}