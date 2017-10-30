let ProductsParser = require("../parser/ProductsParser");

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
				let data = JSON.parse(this.xhttp.responseText);
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