const express = require("express");
const googlePlacesHandler = require('../controller/googleAPIController')
const router = express.Router();

router.post("/google-places", googlePlacesHandler);

module.exports = router;