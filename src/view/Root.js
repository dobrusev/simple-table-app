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

	renderChart() {
		new BarChart().render(this.element);
	}
	
	onTableRowClick(elementId) {
		this.element = this.data.products.find(object => object.id === elementId);
		this.renderChart();
	}

	onWindowResize() {
		if (this.element)
			this.renderChart();
	}
}
module.exports = Root;