var RenderUtil = require("../util/RenderUtil");
var ChartUtil = require("../util/ChartUtil");

let _singleton = null;
let _data = null;
let _chartRect = null
let _barWidth = null;
let _maxPropValue = null;

class BarChart {
	get barMargin() { return 30;}

	get rect() {
		if (!_chartRect)
			_chartRect = document.getElementById("chart").getClientRects()[0]; 
		return _chartRect;
	}

	get barWidth() {
		var props =  ChartUtil.propsCount(_data.analytics);
		if (!_barWidth)
			_barWidth = (this.rect.width - props*this.barMargin)/props;
		return _barWidth;
	}

	get maxPropValue() {
		if (!_maxPropValue)
			_maxPropValue = Math.min(this.rect.height, ChartUtil.getMaxProp(_data.analytics));
		return _maxPropValue;
	}

	get maxMaxDataHeight() {
		return this.rect.height - 100;
	}

	getElementPosition(index) {
		var position = this.barMargin;
		if (index != 0)
			position += index*(this.barWidth + this.barMargin);
		return position;
	}

	constructor() {
		if (!_singleton)
			_singleton = this;
		return _singleton;
	}

	despose() {
		this.disposeElements();
		this.disposeData();
	}

	disposeElements() {
		RenderUtil.destroyChildren("chart");
	}

	disposeData() {
		_data = null;
		_chartRect = null
		_barWidth = null;
		_maxPropValue = null;
	}

	render(data) {
		if (_data)
			this.despose();
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
		for (let analytic in _data.analytics) 
			if (_data.analytics.hasOwnProperty(analytic))
				bars.push(this.renderBar(analytic, barIndex++));
		return  RenderUtil.create("div", "data", bars);
	}

	renderBar(analytic, index) {
		var value = _data.analytics[analytic];
		var percentageValue = ChartUtil.toPercentage(value, this.maxPropValue, this.maxMaxDataHeight);
		
		var position = this.getElementPosition(index);
		console.log(this.maxMaxDataHeight, value, percentageValue);
		return RenderUtil.createRectangle(position, this.barWidth, percentageValue, value);
	}

	renderXAxis() {
		var titles = [];
		var titleIndex = 0;
		for (let analytic in _data.analytics) 
			if (_data.analytics.hasOwnProperty(analytic))
				titles.push(this.renderAxisTitle(analytic, titleIndex++));
		return  RenderUtil.create("div", "XAxis", titles);
	}

	renderAxisTitle(analytic, index) {
		var el = RenderUtil.create("div");
		var positon = this.getElementPosition(index);
		RenderUtil.setElementStyle(el, [{"style":"width: " + this.barWidth + "px; left:" 
			+ positon +"px;"}]);
		el.innerHTML = analytic;
		return el;
	}
}
module.exports = BarChart;