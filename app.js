const scrapProduct = require("./src/scrapProduct");
// const scrapProductsLinks = require('./scrapProductsLinks')

const app = async () => {
  // const text = 'мобільний телефон'
  // const productLinks = await scrapProductsLinks(text)

  //   for (var productLink in productLinks) {
  //     scrapProduct(productLink)
  //   }

  const link =
    "https://rozetka.com.ua/ua/apple-iphone-15-pro-max-256gb-blue-titanium/p395461101/";

  const productData = await scrapProduct(link);

  console.log(productData);
};

app();
