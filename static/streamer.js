var initialRun = true;



function toggleList(){

	var duration = initialRun ? 650 : 350;
	
	$list = $('#list-container');
	$video = $('#video-container');

	var w = $list.width();
	var listShowing = w > 50;
	var newWidth = listShowing ? '1px':'420px';

	
	var doToggle = function(){
		toggleButton( listShowing );
		$('#video-list').toggle( !listShowing );
	}
	
	if ( !listShowing) {
		doToggle();
		$list.animate( {width: newWidth}, duration);
	}
	else
		$list.animate( {width: newWidth}, duration, 'swing', doToggle);

};

function toggleButton(listShowing){
	var ss = '<br><br><br><br><br><br>'; // spacer string
	if ( listShowing ){
		
		$('#list-button').html("⇒" +ss + "⇒" +ss + "⇒" +ss + "⇒" +ss + "⇒" +ss + "⇒"+ss + "⇒");
		// $('#list-button').css('box-shadow', '-2px 2px 4px #222');
		$('#list-button').css('-webkit-border-top-right-radius', '10px');	
		$('#list-button').css('-webkit-border-bottom-right-radius', '10px');
		
	}
    else{
    	$('#list-button').html("⇐" +ss + "⇐" +ss + "⇐" +ss + "⇐" +ss + "⇐" +ss + "⇐"+ss + "⇐");

///    	$('#list-button').html("⇐" + spacerString + "H<br>I<br>D<br>E" + spacerString + "⇐");
    	// $('#list-button').css('box-shadow', '0px 0px 0px #222');
		$('#list-button').css('-webkit-border-top-right-radius', '0px');	
    	$('#list-button').css('-webkit-border-bottom-right-radius', '0px');
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
	$('#list-container').height($('#list-button').height()+60);
		
	$('#list-button').click(toggleList);
	
	$('.listing').click(playVideo);


});	

