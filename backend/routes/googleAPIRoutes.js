const express = require("express");
const { googlePlacesHandler, autocompleteHandler } = require('../controller/googleAPIController');
const router = express.Router();

router.get("/google-places", googlePlacesHandler);
router.get('/autocomplete', autocompleteHandler);

module.exports = router;
