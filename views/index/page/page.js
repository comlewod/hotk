$(function(){
	//var myDrop = new Dropzone('#j-upload', {
	$('#j-upload').dropzone({
		url: '/upload',
		paramName: function(){
			return 'test';
		},
		uploadMultiple: true
	});
});
