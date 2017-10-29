var RenderUtil = require("../util/RenderUtil");
var TableTitle = require("../enum/TableTitle");
var TableCellFactory = require("../util/TableCellFactory");

class Table {
	static get Titles() {return [TableTitle.IMAGE, TableTitle.NAME, TableTitle.STOCK_COUNT,
		TableTitle.PRICE, TableTitle.LAST_UPDATED];}

	constructor(data, onRowClick) {
		this.data = data;
		this.onRowClick = onRowClick;
	}

	render() {
		document.getElementById("products").appendChild(this.renderTable());
	}
	
	renderTable() {
		return RenderUtil.create("table", null, [this.renderTableBody()]);
	}
	
	renderTableBody() {
  		var rows = [this.renderHeader()];
		for (let product of this.data.products) 
			rows.push(this.renderProduct(product));
		return RenderUtil.create("tbody", null, rows);
	}
	
	renderHeader() {
		var cells = [];
		for (let title of Table.Titles) {
			var cell = new TableCellFactory().getCell("th", title);
			cells.push(cell);
		}
		return RenderUtil.create("tr", null, cells);
	}
	
	renderProduct(product) {
		new TableCellFactory()._instance;
		var cells = [];
		for (let title of Table.Titles) {
			var cell = new TableCellFactory().getCell("td", title, product);
			cells.push(cell);
		}
		return RenderUtil.create("tr", product.id, cells, this.onClick.bind(this));
	}

	onClick(event) {
		this.onRowClick(event.currentTarget.id);
	}
};
module.exports = Table;