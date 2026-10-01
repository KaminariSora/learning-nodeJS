const { addVat, applyDiscount, formatBath } = require("./price-utils.js");
const products = require("./products.js");

const notebookPrice = 25000;
const discountPercent = 10;

const priceWithVat = addVat(notebookPrice);
const discountedPrice = applyDiscount(priceWithVat, discountPercent);
console.log(`ราคาสินค้าหลังบวก VAT และลด ${discountPercent}%: ${formatBath(discountedPrice)}`);

const allProductWithVat = products.map(product => `${product.name}: ${formatBath(addVat(product.price))}`);
console.log(allProductWithVat);

const currentPath = require("path");
console.log(currentPath.join(currentPath.dirname(__filename), "products.json"));

