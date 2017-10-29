var Table = require("./Table");
var BarChart = require("./BarChart");

class Root {
	constructor() {
	}

	render(data) {
		this.data = data;
		var table = new Table(this.data, this.onTableRowClick.bind(this));
		table.render();
	}
	
	onTableRowClick(elementId) {
		var element = this.data.products.find(object => object.id === elementId);
		new BarChart().render(element);
	}
}
module.exports = Root;