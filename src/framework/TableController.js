let ProductLoader = require("../loader/ProductLoader");

class TableController {
	static get DATA_URL() { return "https://api.myjson.com/bins/129xoh"; }

	constructor(model, view) {
		this.model = model;
		this.view = view;
		this.attachWindowResizeListener();
	}

	attachWindowResizeListener() {
		window.addEventListener('resize', this.onWindowResize.bind(this));
	}

	loadData() {
		this.productLoader = new ProductLoader(TableController.DATA_URL, this.onSuccess.bind(this), 
			this.onFail.bind(this));
		this.productLoader.load();
	}

	onSuccess(result) {
		this.model.products = result.products;
		this.view.render(this.model);	
	}
	
	onFail(error) {
		throw error;
	}

	onWindowResize() {
		console.log();
		this.view.onWindowResize();
	}
};
module.exports = TableController;