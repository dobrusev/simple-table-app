let Products = require("../valueObject/Products");
let ProductParser = require("./ProductParser");

class ProductsParser {
	parse(data) {
		let result = new Products();
		if (data.hasOwnProperty(Products.FIELD_PRODUCTS))
			result.products = new ProductParser().parseList(data[Products.FIELD_PRODUCTS]);
		return result;
	}
};
module.exports = ProductsParser