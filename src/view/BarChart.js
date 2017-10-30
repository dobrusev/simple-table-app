var RenderUtil = require("../util/RenderUtil");

let _singleton = null;
let _data = null;

class BarChart {
	get rect() {return document.getElementById("chart").getClientRects()[0]; }

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
		var barIndex = 0;
		var barWidth = (this.rect.width - 4*30)/4;
		for (let analytic in _data.analytics) 
			bars.push(this.renderBar(analytic, barWidth, barIndex++));

		return  RenderUtil.create("div", "data", bars);
	}

	renderBar(analytic, barWidth, index) {
		if (!_data.analytics.hasOwnProperty(analytic))
			return;
		var value = _data.analytics[analytic];
		var percentageValue = this.toPercentage(value, this.rect.height);
	
		var left = 30;
		if (index != 0)
			left += index*(barWidth + 30);;
		console.log(value, percentageValue);
		return RenderUtil.createRectangle(left, barWidth, value, value);
	}

	toPercentage(value, ofValue)
	{
		return (value/(ofValue))*100;
	}

	renderXAxis() {
		var titles = [];
		var titleIndex = 0;
		for (let analytic in _data.analytics) {
			titles.push(this.renderAxisTitle(analytic, titleIndex++));
		}
		return  RenderUtil.create("div", "XAxis", titles);
	}

	renderAxisTitle(analytic, index) {
		if (!_data.analytics.hasOwnProperty(analytic))
			return;
		var el = RenderUtil.create("div");

		var barWidth = (this.rect.width - 4*30)/4;
		var left = 30;
		if (index != 0)
			left += index*(barWidth + 30);

		el.setAttribute("style","width: " + barWidth + "px; left:" + left +"px;");
		el.innerHTML = analytic;
		return el;
	}
}
module.exports = BarChart;