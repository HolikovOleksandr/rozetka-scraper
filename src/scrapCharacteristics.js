const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

const scrapCharacteristics = async (url) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setContent(url + 'characteristics/')

  const characteristics = await page.evaluate(() => {
    const section = document.querySelector('.characteristics-full__group') // знаходимо секцію з характеристиками
    const characteristicType = section
      .querySelector('.characteristics-full__sub-heading')
      .textContent.trim() // отримуємо тип характеристик

    const characteristicsList = {}

    const characteristicItems = section.querySelectorAll(
      '.characteristics-full__item'
    )
    // отримуємо всі елементи характеристик

    characteristicItems.forEach((item) => {
      const label = item
        .querySelector('.characteristics-full__label span')
        .textContent.trim() // отримуємо назву характеристики
      const valueElement = item.querySelector(
        '.characteristics-full__value a, .characteristics-full__value span'
      ) // знаходимо елемент значення характеристики
      const value = valueElement ? valueElement.textContent.trim() : null // отримуємо значення характеристики

      if (label && value) {
        characteristicsList[label] = value // додаємо характеристику до списку характеристик
      }
    })

    return {
      Characteristic_type: characteristicType,
      characteristics: characteristicsList,
    }
  })

  console.log(characteristics) // виводимо характеристики у консоль

  await browser.close()
}

module.exports = scrapCharacteristics
