$(function(){
	/*
	$('.j-upload').on('change', function(){
		console.log(this.files);
		$('.img_name').html(this.files[0].name);
		$('.img_preview').attr('src', window.URL.createObjectURL(this.files[0]));
	});
	*/
	$('#j-upload').fileupload({
		url: '/upload',
		dataType: 'multipart/form-data',
		done: function(e, data){
			console.log(data.result);
			$.each(data.result.files, function(index, file){
				$('<p/>').text(file.name).appendTo(document.body);
			});
		}
	});
});
