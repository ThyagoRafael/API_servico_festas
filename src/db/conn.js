const mongoose = require("mongoose");

async function main() {
	try {
		await mongoose.connect("mongodb://localhost:27017/api_mongo");

		console.log("Conectado ao banco");
	} catch (error) {
		console.log("Deu erro na conexão: " + error);
	}
}

module.exports = main;
