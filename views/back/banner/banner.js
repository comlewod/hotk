G_Module.define('banner', {
	initialize: function(opts){
		this.initVue(opts);
	},
	initVue: function(opts){
		vueObj(opts);
		new Vue({
			el: '.j-banner-page',
			data: {
				name: 'Add Banner',
				list: opts.result,
				winShow: false,
				previewSrc: '',
				title: '',
				des: '',
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
						alert('Please select one piece of image.');
						return;
					}
					this.previewSrc = window.URL.createObjectURL(file);
				},
				uploadImg: function(){
					var file = this.$refs.file_input.files[0];
					var formData = new FormData();
					formData.append('banner', file);
					formData.append('title', this.title);
					formData.append('description', this.des);
					
					$.ajax({
						url: '/back/banner/upload', 
						type: 'POST',
						data: formData,
						cache: false,
						contentType: false,
						processData: false,
						success: function(res){
						}
					});
				},
				winHide: function(){
					this.winShow = false;
				},
				delItem: function(item){
				},
				imgSrc: function(src){
				},
			}
		});
	}
});
