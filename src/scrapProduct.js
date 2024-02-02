const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const scrapCharacteristics = require("./scrapCharacteristics");
const getEachImage = require("./getEachImage");
puppeteer.use(StealthPlugin());

const scrapProduct = async (productLink) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(productLink);

  const productInStock = (await page.$(".status-label")) !== null;

  const nameElement = await page.$(".product__title-left");
  const productName = await page.evaluate(
    (e) => e.textContent.trim(),
    nameElement
  );

  const aboutElement = await page.$("div.product-about__left > div > p");
  const productAbout = await page.evaluate(
    (e) => e.textContent.trim(),
    aboutElement
  );

  const codeElement = await page.$("div.product__rating > p > span");
  const productCode = await page.evaluate(
    (e) => e.textContent.replace(/\D/g, ""),
    codeElement
  );

  const priceElement = await page.$(".product-price__big");
  const priceText = await page.evaluate(
    (element) => element.textContent.trim(),
    priceElement
  );
  const productCurrency = priceText.match(/([₴$€£])/i) || [""];
  const productPrice = parseFloat(priceText.replace(/\D+/g, ""));

  const oldPriceElement = (await page.$(".product-price__small")) || null;
  const hasDiscount = oldPriceElement !== null;

  let oldProductPrice;
  if (hasDiscount) {
    const oldPriceText = await page.evaluate(
      (e) => e.textContent,
      oldPriceElement
    );

    oldProductPrice = parseFloat(oldPriceText.replace(/\D/g, ""));
  } else {
    oldProductPrice = hasDiscount;
  }

  const productColors = await page.evaluate(() => {
    const selector = ".var-options__color-preview";
    const colorElements = document.querySelectorAll(selector);

    const colorArray = [];
    colorElements.forEach((element) => {
      const color = window
        .getComputedStyle(element)
        .getPropertyValue("background-color");
      colorArray.push(color);
    });

    return colorArray;
  });

  const productImageUrls = await getEachImage(productLink);
  const productCharacteristics = await scrapCharacteristics(productLink);

  const productData = {
    link: productLink,
    name: productName,
    inStock: productInStock,
    isDiscount: hasDiscount,
    currency: productCurrency[0],
    currentPrice: productPrice,
    oldPrice: oldProductPrice,
    about: productAbout,
    code: productCode,
    colors: productColors,
    iimages: productImageUrls,
    characteristics: productCharacteristics,
  };

  await browser.close();
  return productData;
  //
  //
};

module.exports = scrapProduct;
