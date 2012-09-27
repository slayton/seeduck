var initialRun = true;
var spacerString = '&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp';

function toggleList(){

	var duration = initialRun ? 650 : 350;
	$list = $('#list-container');
	$video = $('#video-container');

	var h = $list.height();

	var listShowing = (h > 15)
	var listHeight = listShowing ? '15px':'90%';

	var doToggle = function(){
		toggleButton(listShowing);
		$('#video-list').toggle(!listShowing);
	}
	// if this list isn't showing yet we want to remove the the round corners, it make the animation look better
	if (!listShowing) {
		doToggle();
		$list.animate( {height: listHeight}, duration);
	}
	else
		$list.animate( {height: listHeight}, duration, 'swing', doToggle);

};

function toggleButton(listShowing){
	if ( listShowing ){
		
		$('#list-button').html("▼" + spacerString + "Show" + spacerString + "▼");
		// $('#list-button').css('box-shadow', '-2px 2px 4px #222');
		$('#list-button').css('-webkit-border-bottom-right-radius', '10px');
		$('#list-button').css('-webkit-border-bottom-left-radius', '10px');	
	}
    else{
    	$('#list-button').html("▲" + spacerString + "Hide" + spacerString + "▲");
    	// $('#list-button').css('box-shadow', '0px 0px 0px #222');
    	$('#list-button').css('-webkit-border-bottom-right-radius', '0px');
		$('#list-button').css('-webkit-border-bottom-left-radius', '0px');	
    }
}

function playVideo(){

	$name = $(this).html();
	$path = $(this).data('path');

	$player = $('#player');
	$player.attr('src', $path);
	$player.attr('poster', 'static/pre-loading.gif');
	$player.attr("controls","controls");
	$player.get(0).load();
	$player.get(0).play();

	$('#video-title').html("Now Showing: " + $name);
}

// $select.change(function() {
// 		//alert($sel.val());
// 			toggleList();
		
// });

$(document).ready(function() {
	toggleList();
	initialRun = false;
		
	var $listButton = $('#list-button');
	$listButton.click(toggleList);

	$('.listing').click(playVideo);


});	

