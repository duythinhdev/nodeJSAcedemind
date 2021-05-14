const express = require('express');
const router = express.Router();
const User = require("../../controllers/user");
const CheckAuth = require('../../middleware/check-auth');

router.post('/signups',User.signup_user)
router.post("/login", User.login_user)
router.delete('/:userId',CheckAuth, User.delete_user)
module.exports = router;
