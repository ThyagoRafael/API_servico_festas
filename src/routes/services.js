const router = require("express").Router();

const serviceController = require("../controllers/serviceController");

// funções

router.post("/services", serviceController.create);

router.get("/services", serviceController.getAll);

router.get("/services/:id", serviceController.get);

router.delete("/services/:id", serviceController.delete);

router.put("/services/:id", serviceController.update);

module.exports = router;
