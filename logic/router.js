const router = require("express").Router();
const config = require('../config.js');
const auth = require("./auth/router.js");
const repos = require("./repos/router.js");
const works = require('./works/router.js');

router.use("/auth", auth);
router.use("/repos" , repos);
router.use('/works' , works);
router.get("/termsofuse" , (req , res , next)=> res.sendFile(config.RES + '/pages/terms.html'));
router.get("/" , (req , res , next)=> res.sendFile(config.RES + '/pages/index.html'));


module.exports = router;
