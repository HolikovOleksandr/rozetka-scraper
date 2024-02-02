const puppeteer = require('puppeteer')

async function parseCharacteristics(link) {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.goto(link + '/characteristics/')

  const simCharacteristics = await page.evaluate(() => {
    const section = document.querySelector('.characteristics-full__group')
    if (!section) return null // перевіряємо, чи знайдена секція

    const characteristicTypeElement = section.querySelector(
      '.characteristics-full__sub-heading'
    )
    const characteristicType = characteristicTypeElement
      ? characteristicTypeElement.textContent.trim()
      : null // перевіряємо, чи знайдений елемент

    const characteristicsList = {}
    const characteristicItems = section.querySelectorAll(
      '.characteristics-full__item'
    )

    characteristicItems.forEach((item) => {
      const labelElement = item.querySelector(
        '.characteristics-full__label span'
      )
      const label = labelElement ? labelElement.textContent.trim() : null // перевіряємо, чи знайдений елемент

      const valueElement = item.querySelector(
        '.characteristics-full__value a, .characteristics-full__value span'
      )
      const value = valueElement ? valueElement.textContent.trim() : null

      if (label && value) {
        characteristicsList[label] = value
      }
    })

    return {
      Characteristic_type: characteristicType,
      characteristics: characteristicsList,
    }
  })

  await browser.close()

  return simCharacteristics
}

module.exports = parseCharacteristics
