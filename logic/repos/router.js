const config = require("../../config.js");
const router = require("express").Router();

router.get("/" , (req , res , next)=> res.sendFile(config.RES + "/pages/repos.html"));

module.exports = router;