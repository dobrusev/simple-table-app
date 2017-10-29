import * as ProductLoader from "./loader/ProductLoader";
import * as Root from "./view/Root";

class App {
	static get DATA_URL() { return "https://api.myjson.com/bins/129xoh"; }

	constructor() {
		this.loadData();
	}
	
	loadData() {
		this.productLoader = new ProductLoader(App.DATA_URL, this.onSuccess.bind(this), 
			this.onFail.bind(this));
		this.productLoader.load();
	}

	renderView(data) {
		var root = new Root(data);
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
export function start () { new App(); }