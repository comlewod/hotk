G_Module.define('banner', {
	initialize: function(opts){
		this.initVue(opts);
	},
	initVue: function(opts){
		new Vue({
			el: '.j-main-page',
			data: {
				title: 'Add Banner',
				winShow: false,
			},
			methods: {
				chooseImg: function(){
					console.log(123);
				},
				uploadImg: function(){
				},
				winHide: function(){
					this.winShow = false;
				},
			}
		});
	}
});
