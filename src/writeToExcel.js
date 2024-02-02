const ExcelJS = require("exceljs");

async function writeToExcel(products) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Products");

  const allCharacteristics = {};

  products.forEach((product) => {
    for (const [key, value] of Object.entries(product.characteristics)) {
      if (allCharacteristics[key]) {
        if (!allCharacteristics[key].includes(value)) {
          allCharacteristics[key].push(value);
        }
      } else {
        allCharacteristics[key] = [value];
      }
    }
  });

  const columnHeaders = [
    "Link",
    "Name",
    "In Stock",
    "Is Discounted",
    "Currency",
    "Current Price",
    "Old Price",
  ];

  for (const characteristic in allCharacteristics) {
    columnHeaders.push(characteristic);
  }

  worksheet.columns = columnHeaders.map((header) => ({
    header,
    key: header.toLowerCase().replace(/\s+/g, ""),
  }));

  products.forEach((product, index) => {
    const rowData = {
      link: product.link,
      name: product.name,
      instock: product.inStock ? "Так" : "Ні",
      isdiscounted: product.isDiscount ? "Так" : "Ні",
      currency: product.currency,
      currentprice: product.currentPrice,
      oldprice: product.oldPrice,
    };

    for (const characteristic in allCharacteristics) {
      const value = product.characteristics[characteristic] || "";
      rowData[characteristic.toLowerCase().replace(/\s+/g, "")] = value;
    }

    worksheet.addRow(rowData);
  });

  await workbook.xlsx.writeFile("products.xlsx");
}

module.exports = writeToExcel;
