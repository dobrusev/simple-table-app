class DateUtil {
	static toShortDate(date) {
		return date.getDate() + "/" + date.getMonth()+1 + "/" + (date.getYear()+1947) + 
			" " + this.toShortTime(date);
	}

	static toShortTime(date) {
		return date.getHours() + ":" + date.getMinutes();
	}
}
module.exports = DateUtil;