const https = require('follow-redirects').https;
const request = require('request');
const awaitRequest = require('async-request');
const axios = require('axios');

//! Get ressponse with 'follow-requests'

const f01 = () => {
	const options = {
		method: 'GET',
		hostname: 'fakestoreapi.com',
		path: '/products/1',
		headers: {},
	};

	const req = https.request(options, (res) => {
		let chunks = [];

		res.on('data', (chunk) => chunks.push(chunk));
		res.on('error', (error) => console.log(error));
		res.on('end', () => {
			let body = Buffer.concat(chunks);

			console.log(JSON.parse(body.toString()));
		});
	});
	req.end();
};

f01();

//! Get response with 'request' (deprecated)

const f02 = () => {
	const options = {
		method: 'GET',
		url: 'https://fakestoreapi.com/products/1',
		headers: {},
	};

	request(options, (error, response) => {
		if (error) console.log(error);
		let data = JSON.parse(response.body);
		console.log(data);
	});
};

f02();

//! Get response with 'async-request'

const f03 = async () => {
	let url = 'https://fakestoreapi.com/products/1';
	const options = {
		method: 'GET',
		headers: {},
	};

	let data = await awaitRequest(url, options);

	data = JSON.parse(data.body);
	console.log(data);
};

f03();

//! Get response with 'fetch'

const f04 = async () => {
	let url = 'https://fakestoreapi.com/products/1';

	let options = {
		method: 'GET',
	};

	let res = await fetch(url, options);

	let data = await res.json();

	console.log(data);
};

f04();

const f05 = async () => {
	let url = 'https://fakestoreapi.com/products/1';

	let res = await axios.get(url);

	console.log(res.data);
};

f05();
