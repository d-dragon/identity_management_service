'use strict';
var oauth2 = require('loopback-component-oauth2');

module.exports = function(server) {
	var options = {

		// Authorization Server properties
		authorizationServer: true,
		resourceServer: false,

		//Data source for oAuth2 metadata persistence
		dataSource: server.dataSources.db,

		//path to mount the authorization and the token endpoint
		authorizePath: '/oauth/authorize',
		tokenPath: '/oauth/token',
		
		//path to login endpoint
		//loginPage: '/oauth/login',
		loginPath: '/oauth/login',
		
		decisionPath:'/oauth/authorize/decision',

		//supported grant types
		supportedGrantTypes: [
			'implicit',
			'jwt',
			'clientCredentials',
			'authorizationCode',
			'refreshToken',
			'resourceOwnerPasswordCredentials'
		]
	};

	oauth2.oAuth2Provider(
			server,
			options
			);
	
	var auth = oauth2.authenticate(['/api', '/protected', '/me', '/_internal'], { session: false, scope: 'email' });
	server.middleware('auth:before', [
			'/api/users/',
	//		'/api/users/oauth/resources',
	//		'/api/devices/*/oauth/resources/',
	//		'/api/devices/*/oauth/groups/'
				], auth);	
};
