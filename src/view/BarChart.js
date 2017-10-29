var RenderUtil = require("../util/RenderUtil");

let _singleton = null;
let _data = null;

class BarChart {
	constructor() {
		if (!_singleton)
			_singleton = this;
		return _singleton;
	}

	render(data) {
		if (_data)
			RenderUtil.destroyChildren("chart");
		_data = data;
		document.getElementById("chart").appendChild(this.renderChart());
	}

	renderChart() {
		return RenderUtil.create("div", null, [this.renderTitle(), this.renderData(),
			this.renderXAxis()]);
	}

	renderTitle() {
		var result = RenderUtil.create("div", "title");
		result.innerHTML = _data.name;
		return result;
	}

	renderData() {
		var bars = [];
		for (let analytic in _data.analytics) {
			if (!_data.analytics.hasOwnProperty(analytic))
				return;
			var bar = this.renderBar(_data.analytics[analytic]);
			bars.push(bar);
		}
		return  RenderUtil.create("div", "data", bars);
	}

	/** context.fillRect(x,y,width,height); **/
	renderBar(value) {
		return RenderUtil.createRectangle(130, 130, 75, value, value);
	}

	renderXAxis() {
		var titles = [];
		for (let analytic in _data.analytics) {
			if (!_data.analytics.hasOwnProperty(analytic))
				return;
			var title = RenderUtil.create("div");
			title.innerHTML = analytic;
			titles.push(title);
		}
		return  RenderUtil.create("div", "XAxis", titles);
	}
}
module.exports = BarChart;