G_Module.define('login', {
	initialize: function(opts){
		this.initVue(opts);
	},
	initVue: function(opts){
		new Vue({
			el: '.j-login-content',
			data: {
				name: '',
				password: '',
			},
			methods: {
				register: function(){
					var data = {
						name: this.name,
						password: this.password
					};
					$.post('/back/login/register', data, function(){
					});
				},
				login: function(){
					var data = {
						name: this.name,
						password: this.password
					};
					$.post('/back/login/login', data, function(){
					});
				}
			}
		});
	}
});
