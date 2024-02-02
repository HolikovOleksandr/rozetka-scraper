const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

async function getEachImage(url) {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.setViewport({ width: 1920, height: 1080 })
  await page.goto(url)
  await page.waitForTimeout(200)

  const imageLinks = []
  const buttons = await page.$$('.thumbnail-button')
  const buttonsWithoutFirst = buttons.slice(1)

  for (const btn of buttonsWithoutFirst) {
    const imageSrc = await page.evaluate(() => {
      const imgElement = document.querySelector('.picture-container__picture')
      return imgElement ? imgElement.src : null
    })

    imageLinks.push(imageSrc)
    await btn.click()
  }

  await browser.close()

  return imageLinks
}

module.exports = getEachImage
