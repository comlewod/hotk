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
				hostName: location.origin,
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
					var _this = this;
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
							if( res.code == 0 ){
								Vue.set(_this, 'list', res.info);
								_this.title = '';
								_this.des = '';
								_this.previewSrc = '';
								_this.winShow = false;
							}
						}
					});
				},
				winHide: function(){
					this.winShow = false;
				},
				delItem: function(item){
					var _this = this;
					if( confirm('Confirm delete this item?') ){
						$.post('/back/banner/delete', {id: item.id}, function(res){
							if( res.code == 0 ){
								Vue.set(_this, 'list', res.info);
							}
						});
					}
				},
				imgSrc: function(src){
				},
			}
		});
	}
});
