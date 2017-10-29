var Products = require("../valueObject/Products");
var ProductParser = require("./ProductParser");

class ProductsParser {
	parse(data) {
		var result = new Products();
		if (data.hasOwnProperty(Products.FIELD_PRODUCTS))
			result.products = new ProductParser().parseList(data[Products.FIELD_PRODUCTS]);
		return result;
	}
};
module.exports = ProductsParser