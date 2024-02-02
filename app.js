// const scrapProduct = require('./src/scrapProduct')
const parseCharacteristics = require('./src/test')
// const scrapProductsLinks = require('./scrapProductsLinks')

const app = async () => {
  // const text = 'мобільний телефон'
  // const productLinks = await scrapProductsLinks(text)

  //   for (var productLink in productLinks) {
  //     scrapProduct(productLink)
  //   }

  const exampleLink =
    'https://rozetka.com.ua/ua/apple-iphone-15-pro-max-256gb-blue-titanium/p395461101/'
  // 'https://rozetka.com.ua/ua/samsung-sm-s928bztgeuc/p412955775/'

  // const productData = await scrapProduct(exampleLink)

  const characteristics = await parseCharacteristics(exampleLink)
  console.log(characteristics)

  // const characteristics = await console.log(productData)
}

app()
