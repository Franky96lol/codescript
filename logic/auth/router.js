const config = require('../../config.js');
const router = require('express').Router();
const login = require('./login.js');
const register = require('./register.js');
const verifyMail = require('./verifyMail.js');

router.post("/login" , (req , res) => res.json(login(req , res)));
router.post("/register" ,(req , res) => res.json(register(req , res)));
router.get("/verifyMail/:user/:id" , (req , res) => res.json(verifyMail(req ,res)));
router.get("/login" , (req , res) => res.sendFile(config.RES + "/pages/login.html"));
router.get("/register" , (req , res) => res.sendFile(config.RES + "/pages/register.html"));

module.exports = router;


