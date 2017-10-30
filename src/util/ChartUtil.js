class ChartUtil {
	static toPercentage(value, ofValue, maxValue)
	{
		return Math.min((value/(ofValue))*maxValue, maxValue);
	}

	static propsCount(analytics) {
		var result = 0;
		for (let analytic in analytics)
			if (analytics.hasOwnProperty(analytic))
				result++;
		return result;
	}

	static getMaxProp(analytics) {
		var result = 0;
		for (let analytic in analytics)
			if (analytics.hasOwnProperty(analytic) && result < analytics[analytic])
				result = analytics[analytic];
		return result;
	}

}
module.exports = ChartUtil;