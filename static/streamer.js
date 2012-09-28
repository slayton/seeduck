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
		$('.file-list').toggle( !listShowing );
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
		
		$('#list-button').html("<span>" + "▶" +ss +  "▶" +ss + "▶" +ss + "▶"+ss + "▶" + "</span>");
		// $('#list-button').css('box-shadow', '-2px 2px 4px #222');
		$('#list-button').css('-webkit-border-top-right-radius', '10px');	
		$('#list-button').css('-webkit-border-bottom-right-radius', '10px');
		
	}
    else{
    	//$('#list-button').html("<span>" + "◀" +ss +   "◀" +ss + "◀" +ss + "◀"+ss + "◀" + "</span>");
		$('#list-button').html("<span>" + "▶" +ss +  "▶" +ss + "▶" +ss + "▶"+ss + "▶" + "</span>");

///    	$('#list-button').html("◀" + spacerString + "H<br>I<br>D<br>E" + spacerString + "◀");
    	// $('#list-button').css('box-shadow', '0px 0px 0px #222');
		$('#list-button').css('-webkit-border-top-right-radius', '0px');	
    	$('#list-button').css('-webkit-border-bottom-right-radius', '0px');
    }
}

function playVideo(){

	toggleList();
	$name = $(this).html();
	$path = "./" + $(this).data('path');

	$player = $('#player');
	$player.attr('src', $path);
	$player.attr('poster', 'static/pre-loading.gif');
	$player.attr("controls","controls");
	$player.get(0).load();
	$player.get(0).play();

	$('.splash').hide();

	$('#video-title').html("Now Showing: " + $path);
}

// $select.change(function() {
// 		//alert($sel.val());
// 			toggleList();
		
// });

$(document).ready(function() {
	//toggleList();
	initialRun = false;

	// Hide the file-list
	$('.file-list').toggle( false );
	// toggle the button to true
	toggleButton(true);
	
	// Assign the callbacks
	$('#list-button').click(toggleList);
	$('.listing').click(playVideo);

	// Misc hacks, set the body of the document to the same size as the window
	$('body').height($(window).height()); 
	$(window).resize(function(){
		$('body').height($(window).height()); 
	})
	
	// Disable scrolling up and down
	document.body.style.overflow = 'hidden';



});	

