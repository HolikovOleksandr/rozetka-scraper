const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

puppeteer.use(StealthPlugin())

const scrapProductsLinks = async (searchTerm) => {
  try {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await page.goto('https://rozetka.com.ua/ua/')

    // Set text to input field
    await page.waitForSelector('input[name="search"]')
    await page.type('input[name="search"]', searchTerm)

    // Use search button
    await page.click('.search-form__submit')

    // Wait for product links to load
    await page.waitForSelector('a.goods-tile__heading')

    // Get the product links
    const linkElements = await page.$$('a.goods-tile__heading')

    // Mapped each url from all elements to array
    const productsLinks = await Promise.all(
      linkElements.map(async (element) => {
        return await element.evaluate((e) => e.href)
      })
    )

    await browser.close()
    return productsLinks
    //
    //
  } catch (error) {
    console.error('An error occurred:', error)
    return ['-1']
  }
}

module.exports = scrapProductsLinks
