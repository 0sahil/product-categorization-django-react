const express = require('express');
const fetch = (...args) =>
	import('node-fetch').then(({ default: fetch }) => fetch(...args));

const router = express.Router();

router.post('/api/users/register', async (req, res) => {
	const { first_name, last_name, email, password } = req.body;

	const body = JSON.stringify({
		first_name,
		last_name,
		email,
		password,
	});

	try {
		const apiRes = await fetch('http://127.0.0.1:8000/api/users/register/', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body,
		});

		const data = await apiRes.json();

		return res.status(apiRes.status).json(data);
	} catch (err) {
		console.log('error');
		return res.status(500).json({
			error: `${err}`,
		});
	}
});

module.exports = router;
