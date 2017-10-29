var TableTitle = require("../enum/TableTitle");
var RenderUtil = require("./RenderUtil");

let _singleton = null;

class TableCellFactory {
	
	constructor() {
		if(!_singleton)
			_singleton = this;
		return _singleton;
	}
	
	getCell(elType, title, data) {
		if (elType === "th")
			return this.renderCell(elType, title);
		if (title === TableTitle.NAME)
			return this.renderCell(elType, data.name);
		if (title === TableTitle.IMAGE)
			return this.renderImageCell(data.imageUrl, '80px', 'auto');
		if (title === TableTitle.PRICE)
			return this.renderCell(elType, data.price);
		if (title === TableTitle.STOCK_COUNT)
			return this.renderCell(elType, data.stockCount);
		if (title === TableTitle.LAST_UPDATED)
			return this.renderCell(elType, data.updated);
	}

	renderCell(type, text) {
		return RenderUtil.create(type, null, [document.createTextNode(text)]);
	}
	
	renderImageCell(src, height, width) {
		return RenderUtil.createImage(src, height, width);
	}
}
module.exports = TableCellFactory;