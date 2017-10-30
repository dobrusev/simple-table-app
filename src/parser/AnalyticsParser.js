let Analytics = require("../valueObject/Analytics");

class AnalyticsParser {
	parse(data) {
		let result = new Analytics();
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