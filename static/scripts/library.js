function itemClicked(){

	
	name = $(this).children('.grid-item-title').html();
	path = $(this).data('path');

	console.log('./player/' + name);
	window.location = ('./player/' + name);
}

function loadPosters(){

	$('.grid-item').each(function(index, value){
		var $div = $(value);

		var title = $div.children('.grid-item-title').html()
		var pURL = './poster/' + title;
		console.log('requesting image for:' + pURL);

		$.ajax({
  			url: pURL,
  			dataType: 'json',
  			success:function(result){
  				$div.children('.grid-item-image').html("<img src='./" + result['url'] + "'>");
  				console.log(pURL + " " + result['url'] + " " + $div.html())
			}	
		});

	});
}


$(document).ready(function() {

	// HACK to set the background of the body to fill the window
	//$('body').height($(window).height()); 
	$(window).resize(function(){
		$('body').height($(window).height()); 
		$('.grid-item').css('height', ($('.grid-item:first').width() * 1.3) + 'px');
	});
	$(window).trigger('resize');
	document.body.style.overflow = 'hidden';

	// Set the HxW ratio of the grid items
	//$('.grid-item').css('height', ($('.grid-item:first').width() * 1.3) + 'px');
	$('.grid-item.AC3 > .grid-item-icon').html("<img src='./static/images/no_audio.2.png'>");
	//$('.grid-item.AC3').hide();
	$('.grid-item').click(itemClicked);

	posterDir = $('#poster-dir').data('url');
	$('.grid-item-image').html("<img src='./static/.posters/_noposter.png'>");

	loadPosters();

});	