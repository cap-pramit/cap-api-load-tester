const moment  = require('moment');
const jsonfile = require('jsonfile');
const Promise = require('bluebird');

const apiCaller = require('./utils/apiCaller');
const utils = require('./utils');
const constants = require('./constants');

const regionFileMap = {
	'in': constants.RUNNER_FILE_INDIA_BI_API,
	'sg': constants.RUNNER_FILE_APAC_BI_API,
	'eu': constants.RUNNER_FILE_EU_BI_API,
	'cn': constants.RUNNER_FILE_CHINA_BI_API
}

const init = (region = 'in') => {
	return jsonfile.readFile(regionFileMap[region]).then(config => {
		return Promise.resolve(config);
	}).catch(err => {
		console.error('Error in reading config file: ', err);
		return Promise.reject(err);
	});
}

const prepareAndMakeRequest = (domain, config) => {
	if (config.addTimestamp) {
		config.url = utils.parseString(config.url, domain, moment().valueOf());
	} else {
		config.url = utils.parseString(config.url, domain);
	}
	return apiCaller.request(config);
};

const prepareResultLine = (domain, config, result) => {
	let url = config.url.replace(`https://${domain}`, '');
	url = url.split('?')[0];
	return Promise.resolve({
		orgId: config.orgId,
		url,
		result
	});
};

const executeSingleCall = (domain, config) => {
	return prepareAndMakeRequest(domain, config).then(result => {
		return prepareResultLine(domain, config, result);
	}).catch(err => {
		return prepareResultLine(domain, config, false);
	});
};

const overrideDateRangeForCall = (body, tRange) => {
	if (body) {
		if (body.date) {
			body.date.start = tRange.start;
			body.date.end = tRange.end;
			body.date.type = 'custom';
		} else if (body.dateRange) {
			body.dateRange.baseDateRange = { start: tRange.start, end: tRange.end };
			body.dateRange.type = 'custom';
		}
	}
	return body;
}

const generateExecutionListForSegment = (segment, tRange) => {
	let configList = [], temp = {};
	if (segment.type === 'MULTIPLE-ORG-SAME-REQUEST') {
		if (segment.orgIdList && segment.orgIdList.length) {
			segment.orgIdList.forEach(orgId => {
				configList.push(...segment.calls.map(call => {
					temp = { orgId, ...call };
					temp.body = overrideDateRangeForCall(temp.body, tRange);
					return temp;
				}));
			});
		}
	} else if (segment.type === 'ONE-ORG-ONE-REQUEST') {
		configList = segment.calls.map(call => {
			temp = { ...call };
			if (!temp.orgId) {
				temp.orgId = config.defaultOrg;
			}
			temp.body = overrideDateRangeForCall(temp.body, tRange);
			return temp;
		});
	} else if (segment.type === 'ONE-ORG-MULTIPLE-REQUEST') {
		segment.calls.forEach(call => {
			configList.push(...(call.urls || []).map(url => {
				temp = { ...call };
				temp.urls = undefined;
				temp.url = url;
				temp.body = overrideDateRangeForCall(temp.body, tRange);
				return temp;
			}));
		})
	}
	console.log(`Total calls in current segment: ${configList.length}`);
	return configList;
};

const runLoadTest = (config, region = 'in') => {
	const defaultTimeRange = [{
		"start": moment().subtract(30, 'days').format(constants.DATEFORMAT),
		"end": moment().format(constants.DATEFORMAT)
	}];
	const reportFileName = utils.createReportFile(region);
	(config.timeRanges || defaultTimeRange).forEach((tRange, rangeIndex) => {
		const phaseGap = config.phaseGap || constants.DEFAULT_PHASE_GAP;
		setTimeout(() => {
			if (config.phases && config.phases.length) {
				config.phases.every((phase, phaseIndex) => {
					if (phase.segments && phase.segments.length) {
						const segmentGap = phase.segmentGap || constants.DEFAULT_SEGMENT_GAP;
						phase.segments.every((segment, segmentIndex) => {
							if (segment.skip) {
								console.log(`---------- Skipping Range ${rangeIndex + 1} Phase ${phaseIndex + 1} Segment ${segmentIndex + 1} Start ----------`);
							} else {
								setTimeout(() => {
									if (segment.calls && segment.calls.length) {
										console.log(`---------- Range ${rangeIndex + 1} Phase ${phaseIndex + 1} Segment ${segmentIndex + 1} Start ----------`);
										Promise.map(generateExecutionListForSegment(segment, tRange), execution => executeSingleCall(config.domain, execution)).then(resp => {
											utils.addMessagesToReport(reportFileName, resp);
											console.log(`---------- Range ${rangeIndex + 1} Phase ${phaseIndex + 1} Segment ${segmentIndex + 1} End ----------`);
										});
									} else {
										console.error('No calls found inside segment to execute');
									}
								}, (segmentIndex * segmentGap * 1000));
							}
							return true;			
						});
					} else {
						console.error('Phase does not have any segments to execute');
					}
					return true;
				});
			} else {
				console.error('No phases found to execute');
				utils.deleteReportFile(reportFileName);
			}
		}, (rangeIndex * phaseGap * 1000));
	});
};

module.exports = {
	init,
	runLoadTest,
};