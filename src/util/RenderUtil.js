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