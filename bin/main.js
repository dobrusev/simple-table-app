/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class RenderUtil {
	static create(element, id, children, onClick) {
		var el = document.createElement(element);
		if (id)
			el.setAttribute("id", id);
		if (onClick)
			el.onclick = onClick;
		if (!children)
			return el;
		for (var i = 0; i < children.length; i++)
			el.appendChild(children[i]);
		return el;
	}

	static createImage(src, height, width) {
		var img = document.createElement("img");
		img.setAttribute("src", src);
		img.setAttribute("height", height);
		img.setAttribute("width", width);
		return img;
	}

	static createRectangle(x, y, width, height, value) {
		var el = RenderUtil.create("canvas");
		el.setAttribute("width", width);
		el.setAttribute("height", height+21);
		el.setAttribute("x", x);
		el.setAttribute("y", y);
		var ctx = el.getContext('2d');
		ctx.font = "8pt Calibri";
		ctx.fillText(value, 30, 10);
		ctx.fillStyle="#38eaf7";
		ctx.fillRect(0, 20, width, height+21);
		return el
	}

	static destroyChildren(elementId)
	{
		var el = document.getElementById(elementId);
		while (el.hasChildNodes()){
			el.removeChild(el.lastChild);
		}
	}
};
module.exports = RenderUtil;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

const TableTitle = Object.freeze({
	IMAGE: "Image",
	NAME: "Name",
	STOCK_COUNT: "Stock count",
	PRICE: "Price",
	LAST_UPDATED: "Last Updated"
});
module.exports = TableTitle;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__App_js__ = __webpack_require__(3);


document.onreadystatechange = function () {
    if (document.readyState != 'complete') 
        return;
    __WEBPACK_IMPORTED_MODULE_0__App_js__["a" /* start */]();
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = start;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__loader_ProductLoader__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__loader_ProductLoader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__loader_ProductLoader__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__view_Root__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__view_Root___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__view_Root__);



class App {
	static get DATA_URL() { return "https://api.myjson.com/bins/129xoh"; }

	constructor() {
		this.loadData();
	}
	
	loadData() {
		this.productLoader = new __WEBPACK_IMPORTED_MODULE_0__loader_ProductLoader__(App.DATA_URL, this.onSuccess.bind(this), 
			this.onFail.bind(this));
		this.productLoader.load();
	}

	renderView(data) {
		var root = new __WEBPACK_IMPORTED_MODULE_1__view_Root__(data);
		root.render();
	}

	onSuccess(result) {
		this.products = result;
		this.renderView(this.products);	
	}
	
	onFail(error) {
		throw error;
	}
}
function start () { new App(); }

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var ProductsParser = __webpack_require__(5);

class ProductLoader {
	constructor(url, onSuccess, onFail) {
		this.url = url;
		this.onSuccess = onSuccess;
		this.onFail = onFail;
	}

	load() {
		this.xhttp = new XMLHttpRequest();
		this.xhttp.onreadystatechange = this.onReady.bind(this);
		this.xhttp.open("GET", this.url, true);
		this.xhttp.send();
	}

	onReady() {
		if (this.xhttp.readyState != 4)
			return;
		
		if (this.xhttp.status >= 200 && this.xhttp.status < 400) {
			try {
				var data = JSON.parse(this.xhttp.responseText);
				this.onSuccess(new ProductsParser().parse(data));
			} catch (e) { 
				throw e;
			}
		}
		else {
			this.onFail(this.xhttp.status);
		}
	}
};
module.exports = ProductLoader;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var Products = __webpack_require__(6);
var ProductParser = __webpack_require__(7);

class ProductsParser {
	parse(data) {
		var result = new Products();
		if (data.hasOwnProperty(Products.FIELD_PRODUCTS))
			result.products = new ProductParser().parseList(data[Products.FIELD_PRODUCTS]);
		return result;
	}
};
module.exports = ProductsParser

/***/ }),
/* 6 */
/***/ (function(module, exports) {

class Products {
	static get FIELD_PRODUCTS() { return "products"; }
}
module.exports = Products;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var AnalyticsParser = __webpack_require__(8);
var Product = __webpack_require__(10);

class ProductParser {
	parseList(data) {
		var result = [];
		for (let product of data)
			result.push(this.parse(product));
		return result;
	}
	
	parse(data) {
		var result = new Product();
		if (data.hasOwnProperty(Product.FIELD_ID))
			result.id = data[Product.FIELD_ID];
		if (data.hasOwnProperty(Product.FIELD_NAME))
			result.name = data[Product.FIELD_NAME];
		if (data.hasOwnProperty(Product.FIELD_IMAGE_URL))
			result.imageUrl = data[Product.FIELD_IMAGE_URL];
		if (data.hasOwnProperty(Product.FIELD_PRICE))
			result.price = data[Product.FIELD_PRICE];
		if (data.hasOwnProperty(Product.FIELD_STOCK_COUNT))
			result.stockCount = data[Product.FIELD_STOCK_COUNT];
		if (data.hasOwnProperty(Product.FIELD_UPDATED)) {
			try {
				result.updated = new Date(data[Product.FIELD_UPDATED]);
			} catch (e) {throw e}
		}	
		if (data.hasOwnProperty(Product.FIELD_ANALYTICS))
			result.analytics = new AnalyticsParser().parse(data[Product.FIELD_ANALYTICS]);
		return result;
	}
};
module.exports = ProductParser;



/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var Analytics = __webpack_require__(9);

class AnalyticsParser {
	parse(data) {
		var result = new Analytics();
		if (data.hasOwnProperty(Analytics.FIELD_CARTED))
			result.carted = data[Analytics.FIELD_CARTED];
		if (data.hasOwnProperty(Analytics.FIELD_PURCHASED))
			result.purchased = data[Analytics.FIELD_PURCHASED];
		if (data.hasOwnProperty(Analytics.FIELD_SUGGESTED))
			result.suggested = data[Analytics.FIELD_SUGGESTED];
		if (data.hasOwnProperty(Analytics.FIELD_VIEWED))
			result.viewed = data[Analytics.FIELD_VIEWED];
		return result;
	}
}
module.exports = AnalyticsParser;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

class Analytics {
	static get FIELD_CARTED() { return "carted"; }
	static get FIELD_PURCHASED() { return "purchased"; }
	static get FIELD_SUGGESTED() { return "suggested"; }
	static get FIELD_VIEWED() { return "viewed"; }
};
module.exports = Analytics;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

class Product {
	static get FIELD_ID() { return "id"; }
	static get FIELD_NAME() { return "name"; }
	static get FIELD_IMAGE_URL() { return "imageURL"; }
	static get FIELD_PRICE() { return "price"; }
	static get FIELD_STOCK_COUNT() { return "stockCount"; }
	static get FIELD_UPDATED() { return "updated"; }
	static get FIELD_ANALYTICS() { return "analytics"; }
}
module.exports = Product;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var Table = __webpack_require__(12);
var BarChart = __webpack_require__(14);

class Root {
	constructor(data) {
		this.data = data;
	}

	render() {
		var table = new Table(this.data, this.onTableRowClick.bind(this));
		table.render();
	}
	
	onTableRowClick(elementId) {
		var element = this.data.products.find(object => object.id === elementId);
		new BarChart().render(element);
	}
}
module.exports = Root;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var RenderUtil = __webpack_require__(0);
var TableTitle = __webpack_require__(1);
var TableCellFactory = __webpack_require__(13);

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

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var TableTitle = __webpack_require__(1);
var RenderUtil = __webpack_require__(0);

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

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var RenderUtil = __webpack_require__(0);

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

/***/ })
/******/ ]);