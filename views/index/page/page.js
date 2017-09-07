$(function(){
	var myDrop = new Dropzone('#j-upload', {
		url: '/upload',
		paramName: function(){
			return 'test';
		},
		uploadMultiple: true
	});
});
