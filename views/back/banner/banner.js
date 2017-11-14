G_Module.define('banner', {
	initialize: function(opts){
		this.initVue(opts);
	},
	initVue: function(opts){
		new Vue({
			el: '.j-banner-page',
			data: {
				title: 'Add Banner',
				winShow: false,
				previewSrc: ''
			},
			methods: {
				chooseImg: function(){
					this.$refs.file_input.click();
				},
				selectImg: function(){
					var file = this.$refs.file_input.files[0];
					console.log(file);
					var acceptOnly = /^image\/(gif|png|jpe?g)$/i;
					if( !acceptOnly.test(file.type) ){
						alert('Please choose one piece of image.');
						return;
					}
					this.previewSrc = window.URL.createObjectURL(file);
				},
				uploadImg: function(){
					var file = this.$refs.file_input.files[0];
					var formData = {
						img: file,
					};
					$.post('/back/banner/upload', formData, function(res){
					});
				},
				winHide: function(){
					this.winShow = false;
				},
			}
		});
	}
});
