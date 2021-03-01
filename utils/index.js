const moment = require('moment');
const fs = require('fs');
const csvWriter = require('csv-write-stream');

function parseString(str) {
    let args = [].slice.call(arguments, 1), i = 0;
	return str.replace(/%s/g, () => args[i++]);
};

function createReportFile(region) {
	const fileName = `./reports/Loadtest_report_${region.toUpperCase()}_${moment().format('YYYY_MM_DD_HH_mm_ss')}.csv`;
	if (!fs.existsSync(fileName)) {
		const writer = csvWriter({ sendHeaders: false });
		writer.pipe(fs.createWriteStream(fileName));
		writer.write({
			header1: 'Org ID',
			header2: 'Request URL',
			header3: 'Status'
		});
		writer.end();
	}
	return fileName;
};

function deleteReportFile(fileName) {
	if (fs.existsSync(fileName)) {
		fs.unlink(fileName);
	}
};

function addMessagesToReport(fileName, lines) {
	if (fs.existsSync(fileName)) {
		const writer = csvWriter({ sendHeaders: false });
		writer.pipe(fs.createWriteStream(fileName, { flags: 'a' }));
		lines.forEach(data => {
			writer.write({
				header1: data.orgId,
				header2: data.url,
				header3: data.result
			});
		});
		writer.end();
	}
	return;
};

module.exports = {
	parseString,
	createReportFile,
	addMessagesToReport,
	deleteReportFile,
};