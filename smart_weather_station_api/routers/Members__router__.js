const express = require('express');
const { checkMemberCredentials } = require('../controllers/MemberCredentials__controller__')
const { memberSignup } = require('../controllers/MemberSignup__controller__')
const { socialLogin } = require('../controllers/SocialLogin__controller__')
const { forgetPassword } = require('../controllers/ForgetPassword__controller__')
const {resetPassword } = require('../controllers/ResetPassword__controller__')
const { setProfileImage } = require('../controllers/SetProfileImage__controller__')

const router = express.Router()
router.post('/signin', checkMemberCredentials);
router.post('/signup', memberSignup);
router.post('/social', socialLogin);
router.post('/forgetpassword', forgetPassword);
router.post('/resetpassword', resetPassword);
router.post('/profileimage', setProfileImage);

module.exports = {
    routes: router
}