const router = require("express").Router();
const config = require('../config.js');
const auth = require("./auth/router.js");

router.use("/auth", auth);
router.get("/termsofuse" , (req , res , next)=> res.sendFile(config.RES + '/pages/terms.html'));
router.get("/" , (req , res , next)=> res.sendFile(config.RES + '/pages/index.html'));

module.exports = router;
