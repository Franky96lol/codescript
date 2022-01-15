const config = require("../../config.js");
const router = require("express").Router();

router.get("/" , (req , res , next)=> res.sendFile(config.RES + "/pages/works.html"));

module.exports = router;