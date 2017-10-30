let AnalyticsParser = require("./AnalyticsParser");
let Product = require("../valueObject/Product");

class ProductParser {
	parseList(data) {
		let result = [];
		for (let product of data)
			result.push(this.parse(product));
		return result;
	}
	
	parse(data) {
		let result = new Product();
		if (data.hasOwnProperty(Product.FIELD_ID))
			result.id = data[Product.FIELD_ID];
		if (data.hasOwnProperty(Product.FIELD_NAME))
			result.name = data[Product.FIELD_NAME];
		if (data.hasOwnProperty(Product.FIELD_IMAGE_URL))
			result.imageUrl = data[Product.FIELD_IMAGE_URL];
		if (data.hasOwnProperty(Product.FIELD_PRICE))
			result.price = data[Product.FIELD_PRICE];
		if (data.hasOwnProperty(Product.FIELD_STOCK_COUNT))
			result.stockCount = data[Product.FIELD_STOCK_COUNT];
		if (data.hasOwnProperty(Product.FIELD_UPDATED)) {
			try {
				result.updated = new Date(data[Product.FIELD_UPDATED]);
			} catch (e) {throw e}
		}	
		if (data.hasOwnProperty(Product.FIELD_ANALYTICS))
			result.analytics = new AnalyticsParser().parse(data[Product.FIELD_ANALYTICS]);
		return result;
	}
};
module.exports = ProductParser;

