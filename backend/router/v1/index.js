const express = require("express");
const router = express.Router();
const Banking = require('./bankingRoute')

router.use("/banking",Banking)

module.exports = router;
