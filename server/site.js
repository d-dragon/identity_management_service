'use strict'

var login = require('connect-ensure-login')

exports.OAuth = function (req, res) {
  res.send('OAuth 2.0 Server')
}

exports.loginForm = function (req, res) {
	console.log("site.js loginForm");
  if (req.user) return res.redirect('/');
  res.render('login');
}

exports.account = [
  //login.ensureLoggedIn('/login'),
  login.ensureLoggedIn(),
  function (req, res) {
    res.render('account', {user: req.user})
  }
]

exports.signup = function (req, res) {
	res.render('signup')
}
exports.logout = function (req, res) {
  req.logout()
  res.redirect('/')
}

exports.callbackPage = function (req, res) {
  res.render('callback')
}
exports.verified = function (req, res) {
  res.render('verified')
}
