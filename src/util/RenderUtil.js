class RenderUtil {
	static get barTitleHeight() { return 21;}

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
		this.setElementStyle(img, [{"src":src},{"height":height}, {"width":width}]);
		return img;
	}

	static createRectangle(left, width, height, value) {
		var el = RenderUtil.create("canvas");
		var heightWithText = height + this.barTitleHeight;
		this.setElementStyle(el, [{"width":width, "height":heightWithText,
			"style":"left:" + left +"px;"}]);
		var context = el.getContext('2d');
		this.createRectangleText(context, value);
		context.beginPath();
		context.fillRect(0, this.barTitleHeight, width, heightWithText);
		return el;
	}

	static createRectangleText(context, value) {
		context.font = "8pt Calibri";
		context.fillText(value, 0, 10);
		context.fillStyle="#38eaf7";
	}

	static setElementStyle(el, styles)
	{
		for (let style in styles)
			for (let key in styles[style])
				el.setAttribute(key, styles[style][key]);
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