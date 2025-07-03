const { Service: ServiceModel } = require("../models/Service");

const serviceController = {
	create: async (req, res) => {
		try {
			const service = {
				name: req.body.name,
				description: req.body.description,
				price: req.body.price,
				image: req.body.image,
			};

			const response = await ServiceModel.create(service);

			return res
				.status(201)
				.json({ response, message: "Serviço criado com sucesso" });
		} catch (error) {
			console.log(`Erro ao criar serviço: ${error}`);
		}
	},
	getAll: async (req, res) => {
		try {
			const services = await ServiceModel.find();

			return res.status(201).json(services);
		} catch (error) {
			console.log(`Erro ao recuperar todos os serviços: ${error}`);
		}
	},
	get: async (req, res) => {
		try {
			const { id } = req.params;
			const service = await ServiceModel.findById(id);

			if (!service) {
				return res.status(404).json({ message: "Serviço não encontrado" });
			}

			return res.status(200).json(service);
		} catch (error) {
			console.log(`Erro ao recuperar o serviço`);
		}
	},
	delete: async (req, res) => {
		try {
			const { id } = req.params;
			const service = await ServiceModel.findById(id);

			if (!service) {
				return res.status(404).json({ message: "Serviço não encontrado" });
			}

			const deletedService = await ServiceModel.findByIdAndDelete(id);

			return res
				.status(200)
				.json({ deletedService, message: "Serviço excluído com sucesso" });
		} catch (error) {
			console.log(`Erro ao deletar o serviço: ${error}`);
		}
	},
	update: async (req, res) => {
		try {
			const { id } = req.params;

			const service = {
				name: req.body.name,
				description: req.body.description,
				price: req.body.price,
				image: req.body.image,
			};

			const updatedService = await ServiceModel.findByIdAndUpdate(id, service);

			if (!updatedService) {
				return res.status(404).json({ message: "Serviço não encontrado" });
			}

			return res
				.status(200)
				.json({ service, message: "Serviço atualizado com sucesso" });
		} catch (error) {
			console.log(`Erro ao atualizar o serviço: ${error}`);
		}
	},
};

module.exports = serviceController;
