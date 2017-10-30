let RenderUtil = require("../util/RenderUtil");
let TableTitle = require("../enum/TableTitle");
let TableCellFactory = require("../util/TableCellFactory");

class Table {
	static get Titles() {return [TableTitle.IMAGE, TableTitle.NAME, TableTitle.STOCK_COUNT,
		TableTitle.PRICE, TableTitle.LAST_UPDATED];}

	constructor(context, data, onRowClick) {
		this.context = context;
		this.data = data;
		this.onRowClick = onRowClick;
	}

	render() {
		document.getElementById(this.context).appendChild(this.renderTable());
	}
	
	renderTable() {
		return RenderUtil.create("table", null, [this.renderTableBody()]);
	}
	
	renderTableBody() {
		let rows = [this.renderHeader()];
		for (let product of this.data.products) 
			rows.push(this.renderProduct(product));
		return RenderUtil.create("tbody", null, rows);
	}
	
	renderHeader() {
		let cells = [];
		for (let title of Table.Titles) {
			let cell = new TableCellFactory().getCell("th", title);
			cells.push(cell);
		}
		return RenderUtil.create("tr", null, cells);
	}
	
	renderProduct(product) {
		new TableCellFactory()._instance;
		let cells = [];
		for (let title of Table.Titles) {
			let cell = new TableCellFactory().getCell("td", title, product);
			cells.push(cell);
		}
		return RenderUtil.create("tr", product.id, cells, this.onClick.bind(this));
	}

	onClick(event) {
		this.onRowClick(event.currentTarget.id);
	}
};
module.exports = Table;