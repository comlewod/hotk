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
				error: false
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
					var _this = this;
					this.error = false;
					var data = {
						name: this.name,
						password: this.password
					};
					$.post('/back/login/login', data, function(res){
						if( res.code == 0 ){
							window.location.href = '/back';
						} else {
							_this.error = true;
						}
					});
				}
			}
		});
	}
});
