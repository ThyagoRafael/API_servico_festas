const PartyModel = require("../models/Party");

const checkPartyBudget = (budget, services) => {
	const priceSum = services.reduce((sum, service) => sum + service.price, 0);

	if (priceSum > budget) {
		return false;
	}

	return true;
};

const partyController = {
	create: async (req, res) => {
		try {
			const party = {
				title: req.body.title,
				author: req.body.author,
				description: req.body.description,
				budget: req.body.budget,
				image: req.body.image,
				services: req.body.services,
			};

			if (party.services && !checkPartyBudget(party.budget, party.services)) {
				return res.status(406).json({ message: "O orçamento é insuficiente" });
			}

			const response = await PartyModel.create(party);

			return res
				.status(201)
				.json({ response, message: "Festa criada com sucesso" });
		} catch (error) {
			console.log(`Erro ao criar festa: ${error}`);
		}
	},
	getAll: async (req, res) => {
		try {
			const parties = await PartyModel.find();

			return res.status(200).json(parties);
		} catch (error) {
			console.log(`Erro ao listar todas as festas: ${error}`);
		}
	},
	get: async (req, res) => {
		try {
			const { id } = req.params;
			const party = await PartyModel.findById(id);

			if (!party) {
				return res.status(404).json({ message: "Festa não encontrada" });
			}

			return res.status(200).json(party);
		} catch (error) {
			console.log(`Erro ao exibir a festa: ${error}`);
		}
	},
	delete: async (req, res) => {
		const { id } = req.params;
		const party = await PartyModel.findById(id);

		if (!party) {
			return res.status(404).json({ message: "Festa não encontrada" });
		}

		const deletedParty = await PartyModel.findByIdAndDelete(id);

		return res
			.status(200)
			.json({ deletedParty, message: "Festa excluída com sucesso" });
	},
	update: async (req, res) => {
		try {
			const { id } = req.params;

			const party = {
				title: req.body.title,
				author: req.body.author,
				description: req.body.description,
				budget: req.body.budget,
				image: req.body.image,
				services: req.body.services,
			};

			if (party.services && !checkPartyBudget(party.budget, party.services)) {
				return res.status(406).json({ message: "O orçamento é insuficiente" });
			}

			const updatedParty = await PartyModel.findByIdAndUpdate(id, party);

			if (!updatedParty) {
				return res.status(404).json({ message: "Festa não encontrada" });
			}

			return res
				.status(200)
				.json({ party, message: "Festa atualizada com sucesso" });
		} catch (error) {
			console.log(`Erro ao atualizar festa: ${error}`);
		}
	},
};

module.exports = partyController;
