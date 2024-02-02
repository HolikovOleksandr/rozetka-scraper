const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

async function scrapCharacteristics(url) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url + "/characteristics");

  const charItem = ".characteristics-full__item";
  const characteristics = {};

  const items = await page.$$eval(charItem, (items) => {
    const charValue = ".characteristics-full__value";
    const charLabel = ".characteristics-full__label";

    return items.map((item) => {
      const label = item.querySelector(charLabel).textContent.trim();
      const value = item.querySelector(charValue).textContent.trim();

      return { label, value };
    });
  });

  items.forEach((item) => {
    characteristics[item.label] = item.value;
  });

  await browser.close();
  return characteristics;
}

module.exports = scrapCharacteristics;
