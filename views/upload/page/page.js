$(function(){
	//var myDrop = new Dropzone('#j-upload', {
	var mydrop = new Dropzone('#j-upload', {
		url: '/upload/upload',
		paramName: function(){
			return 'test';
		},
		uploadMultiple: true,		//是否支持多图上传
		autoProcessQueue: false,	//设置为false的话就需要手动上传图片，通过mydrop.processQueue()
		uploadprogress: function(a, b, c){
			console.log(a, b, c);
		},
		queuecomplete: function(){	//上传完成后 
			console.log(123);
		},
		previewTemplate: '\
		<div class="dz-preview">\
			<img data-dz-thumbnail />\
			<div class="dz-process">\
				<span class="process" data-dz-uploadprogress></span>\
			</div>\
		</div>\
		',
	});
	$('#upload').on('click', function(){
		mydrop.processQueue();
	});
});
