const reqPromise = require('request-promise');
const moment = require('moment');
const Promise = require('bluebird');
const jsonfile = require('jsonfile');

const constants = require('../constants');
const utils = require('./index');

const authDetails = jsonfile.readFileSync(constants.AUTH_FILE);

let credentials = {};

const init = (region = 'in') => {
	const regionDetails = authDetails.credentials[region];
	const options = {
		url: `https://${regionDetails.domain}${authDetails.url}`,
		method: 'POST',
		json: true,
		body: {
			username: regionDetails.user,
			password: regionDetails.password
		}
	};
	options.url = utils.parseString(options.url, moment().valueOf());
	return reqPromise(options).then(resp => {
		if (resp.success) {
			credentials = {
				authToken: resp.token,
				userId: resp.user.refID
			};
			return Promise.resolve(credentials);
		} else {
			return Promise.reject('Invalid credentials');
		}
	}).catch(err => {
		return Promise.reject('Invalid Username or Password');
	});
};

const prepareOptions = (uri, orgId, method, body) => {
	const options = {
		uri,
		method,
		json: true,
		headers: {
			"content-type":  "application/json",
			"x-cap-api-data-context-org-id": Number(orgId),
			"x-cap-api-auth-org-id": Number(orgId),
			"x-cap-remote-user": Number(credentials.userId),
			"Authorization": `Bearer ${credentials.authToken}`,
		}
	};
	if (['PUT', 'POST'].indexOf(method) > -1) {
		options.body = body || {};
	}
	return options;
};

const request = ({ url, orgId, method, body, getResponse = false }) => {
	return reqPromise(prepareOptions(url, orgId, method, body)).then(resp => {
		return Promise.resolve(getResponse ? resp : true);
	}).catch(err => {
		console.error(err.message);
		return Promise.resolve(getResponse ? err : false);
	});
};

module.exports = {
	init,
	request
};