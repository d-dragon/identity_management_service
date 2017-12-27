// Copyright IBM Corp. 2014,2015. All Rights Reserved.
// Node module: loopback-example-user-management
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

var loopback = require('loopback');
var boot = require('loopback-boot');
var path = require('path');
var bodyParser = require('body-parser');
var oauth2 = require('loopback-component-oauth2');
var session = require('express-session');
var site = require('./site');

var app = module.exports = loopback();

//Add session support
app.middleware('session', session({
	secret: 'secret',
	resave: true,
	saveUninitialzied: true
}));

// configure view handler
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client/views'));

// configure body parser
app.use(bodyParser.urlencoded({extended: true}));

app.use(loopback.token());

app.get('/oauth', site.OAuth);
app.get('/login', site.loginForm);
app.get('/signup', site.signup);
app.get('/account', site.account);
app.get('/logout', site.logout);
app.get('/callbackPage', site.callbackPage);
app.get('/verified', site.verified);

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    };
	if (app.get('loopback-component-oauth2')) {
		var oauth2Path = app.get('loopback-component-oauth2').mountPath;
		console.log('OAuth2 at %s%s', baseUrl, oauth2Path);
	}

  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});

