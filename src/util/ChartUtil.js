class ChartUtil {
	static toPercentage(value, ofValue, maxValue)
	{
		return Math.min((value/(ofValue))*maxValue, maxValue);
	}

	static propsCount(analytics) {
		let result = 0;
		for (let analytic in analytics)
			if (analytics.hasOwnProperty(analytic))
				result++;
		return result;
	}

	static getMaxProp(analytics) {
		let result = 0;
		for (let analytic in analytics)
			if (analytics.hasOwnProperty(analytic) && result < analytics[analytic])
				result = analytics[analytic];
		return result;
	}

}
module.exports = ChartUtil;