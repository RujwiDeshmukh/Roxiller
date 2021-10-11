const express = require("express");
const axios = require("axios");

const getInfo = async (req, res) => {
	const user_id = req.params.id;
	let result;
	let answer = {};
	await axios
		.get(`https://jsonplaceholder.typicode.com/users/${user_id}`)
		.then(async (api_response) => {
			if (api_response) {
				await axios
					.get("https://jsonplaceholder.typicode.com/todos")
					.then((response) => {
						if (response) {
							let received_data = response.data;
							result = received_data.filter((v) => {
								if (v.userId == user_id) {
								    return v;
								}
							});
							let output = api_response.data;
							answer = (({ id, name, email, phone }) => ({
								id,
								name,
								email,
								phone,
							}))(output);
							answer.todos = [];
							result.forEach((res) => {
								answer.todos.push(res);
							});
							res.send(answer);
						}
					})
					.catch((error) => {
						console.log(error);
						res.send({ error });
					});
			} else {
				res.status(500).json("No data to display");
			}
		})
		.catch( (error) => {
			console.log(error);
			res.send({ error });
		});
};

module.exports = getInfo;
