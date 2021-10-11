const express = require("express");
const axios = require("axios");

const Todos = async (req, res) => {
	await axios
		.get("https://jsonplaceholder.typicode.com/todos")

		.then((response) => {
			if (response) {
				let received_data = response.data;
				let result = received_data.map((value) => ({
					id: value.id,
					title: value.title,
					completed: value.completed,
				}));
				res.send(result);
			} else {
				res.status(500).json("No data to display");
			}
		})
		.catch((error) => {
			console.log(error);
			res.send({ error });
		});
};

module.exports = Todos;
