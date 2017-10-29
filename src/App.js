import * as Root from "./view/Root";
import * as TableController from "./framework/TableController";
import * as TableModel from "./framework/TableModel";

class App {
	constructor() {
		this.init();
	}

	init() {
		this.view = new Root();
		this.model = new TableModel();
		this.controller = new TableController(this.model, this.view);
		this.controller.loadData();
	}
}
export function start () { new App(); }