function itemClicked(){

	
	name = $(this).children('.grid-item-title').html();
	path = $(this).data('path');

	alert(name + " " + path);

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
	$('.grid-item-icon.AC3').html("<img src='./static/images/warning.png'>");
	$('.grid-item').click(itemClicked);
});	