let Table = require("./Table");
let BarChart = require("./BarChart");

class Root {
	constructor() {
	}

	render(data) {
		this.data = data;
		let table = new Table("products", this.data, this.onTableRowClick.bind(this));
		table.render();
	}

	renderChart() {
		new BarChart().render("chart", this.element);
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