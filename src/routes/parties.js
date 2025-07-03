const router = require("express").Router();

const partyController = require("../controllers/partyController");

router.post("/parties", partyController.create);

router.get("/parties", partyController.getAll);

router.get("/parties/:id", partyController.get);

router.delete("/parties/:id", partyController.delete);

router.put("/parties/:id", partyController.update);

module.exports = router;
