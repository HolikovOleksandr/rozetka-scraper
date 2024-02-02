const scrapProduct = require("./src/scrapProduct");
const scrapProductsLinks = require("./src/scrapProductsLinks");
const writeToExcel = require("./src/writeToExcel");

const app = async () => {
  const text = "мобільний телефон";

  const links = await scrapProductsLinks(text);
  console.log(links);

  const productsData = [];

  for (var link of links) {
    const productData = scrapProduct(link);
    productsData.push((await productData).name);
  }

  // const productData = await scrapProduct(link);

  // writeToExcel(productData)
  //   .then(() => console.log("Дані успішно записано у файл Excel"))
  //   .catch((error) =>
  //     console.error("Помилка при записі даних у файл Excel:", error)
  //   );

  console.log(productsData);
};

app();
