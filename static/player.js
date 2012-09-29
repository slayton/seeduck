//
// TODO : determine if the video is playing, if it is I need to kill it before launching a new video request
// TODO : setup transcoding pane, determine the destinate location, keep original file or replace with new file?
// TODO : replace colbert GIF with real indicator that will say when the video is loaded
// 


var initialRun = true;
var shiftVideoPlayer = true;
var videoPlaying = false;

function toggleDrawer(){

	var duration = 350;
	
	$drawer = $('#drawer');

	var w = $drawer.width();
	var drawerOpen = w > 50;
	var newDrawerWidth = drawerOpen ? '0px':'320px';
	
	var tmpToggleFcn = function(){
		// setDrawerButtonStyle( drawerOpen );
		$('.file-list').toggle( !drawerOpen );
		$('.file-info').toggle( !drawerOpen );
	}
	
	if ( !drawerOpen) {
		tmpToggleFcn();
		$drawer.animate( {width: newDrawerWidth}, duration);
	}

	else{
		$drawer.animate( {width: newDrawerWidth}, duration, 'swing', tmpToggleFcn);
	}
	if (shiftVideoPlayer){
		var newVideoLeft  = drawerOpen ? '80px':'290px';
		var newVideoRight = drawerOpen ? '80px':'-130px';
		$('#video-container').animate( {left: newVideoLeft, right:newVideoRight}, duration)
	}

};

// function setDrawerButtonStyle(drawerOpen){
// 	var ss = '<br><br><br><br><br><br>'; // spacer string
// 	if ( drawerOpen ){
		
// 		$('#drawer-button').html("<span>" + "▶" +ss +  "▶" +ss + "▶" +ss + "▶"+ss + "▶" + "</span>");
// 		// $('#drawer-button').css('box-shadow', '-2px 2px 4px #222');
// 		// $('#drawer-button').css('-webkit-border-top-right-radius', '10px');	
// 		// $('#drawer-button').css('-webkit-border-bottom-right-radius', '10px');
		
// 	}
//     else{
//     	//$('#drawer-button').html("<span>" + "◀" +ss +   "◀" +ss + "◀" +ss + "◀"+ss + "◀" + "</span>");
// 		$('#drawer-button').html("<span>" + "▶" +ss +  "▶" +ss + "▶" +ss + "▶"+ss + "▶" + "</span>");

// ///    	$('#drawer-button').html("◀" + spacerString + "H<br>I<br>D<br>E" + spacerString + "◀");
//     	// $('#drawer-button').css('box-shadow', '0px 0px 0px #222');
// 		// $('#drawer-button').css('-webkit-border-top-right-radius', '0px');	
//   //   	$('#drawer-button').css('-webkit-border-bottom-right-radius', '0px');
//     }
// }

function listingSelected(){
	if( $('#chk_play_video').attr('checked') )
//		loadVideo()

	$('.listing').removeClass('selected');
	$(this).addClass('selected');
}
function loadVideo(){

		toggleDrawer();
		$name = $(this).html();
		$path = "./" + $(this).data('path');

		$player = $('#player');
		$player.attr('src', $path);
		$player.attr('poster', 'static/pre-loading.gif');
		$player.attr("controls","controls");
	
		//$player.get(0).load();
		//$player.get(0).play();
	
		$('.splash-holder').hide();

		$('#video-title').html("Now Showing: " + $path);
}

function initializeTheDrawer(){
// Hide the file-list
	$('.file-list').toggle( false );
	$('.file-info').toggle( false );

	// toggle the button to true
	//setDrawerButtonStyle(true); 
	var ss = '<br><br><br><br><br><br>'; // spacer string
	$('#drawer-button').html("<span>" + "▶" +ss +  "▶" +ss + "▶" +ss + "▶"+ss + "▶" + "</span>");
	
	// Assign the callbacks
	$('#drawer-button').click(toggleDrawer);
	$('.listing').click(listingSelected);

}


$(document).ready(function() {
	//toggleDrawer();
	initializeTheDrawer();
	
	// Misc hacks, set the body of the document to the same size as the window
	$('body').height($(window).height()); 
	$(window).resize(function(){
		$('body').height($(window).height()); 
	})
	
	// Disable scrolling up and down
	document.body.style.overflow = 'hidden';

	// set the background color on the odd listings 

});	

