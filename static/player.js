//
// TODO : determine if the video is playing, if it is I need to kill it before launching a new video request
// TODO : setup transcoding pane, determine the destinate location, keep original file or replace with new file?
// TODO : replace colbert GIF with real indicator that will say when the video is loaded
// 


var initialRun = true;
//var shiftVideoPlayer = true;
var videoPlaying = false;
var duration = 350;
var openDrawerWidth = '320px';
var closedDrawerWidth = '0px';

function toggleFileDrawer(){

	$targetDrawer = $('#file-drawer');
	$otherDrawers = $('.drawer:not(#file-drawer)')
	executeDrawerToggle($targetDrawer, $otherDrawers);

}

function toggleUploadDrawer(){
	$targetDrawer = $('#upload-drawer');
	$otherDrawers = $('.drawer:not(#upload-drawer)')
	executeDrawerToggle($targetDrawer, $otherDrawers);
}
function toggleSettingsDrawer(){
	$targetDrawer = $('#settings-drawer');
	$otherDrawers = $('.drawer:not(#settings-drawer)')
	executeDrawerToggle($targetDrawer, $otherDrawers);
}

function executeDrawerToggle($target, $others){

	var w = $targetDrawer.width();
	var isDrawerOpen = w > 50;
	var newDrawerWidth = isDrawerOpen ? closedDrawerWidth:openDrawerWidth;
	
	$target.animate( {width: newDrawerWidth}, duration);
	//$others.animate( {width: 0}, duration);

}

// function setDrawerButtonStyle(drawerOpen){
// 	var ss = '<br><br><br><br><br><br>'; // spacer string
// 	if ( drawerOpen ){
		
// 		$('.drawer-button').html("<span>" + "▶" +ss +  "▶" +ss + "▶" +ss + "▶"+ss + "▶" + "</span>");
// 		// $('.drawer-button').css('box-shadow', '-2px 2px 4px #222');
// 		// $('.drawer-button').css('-webkit-border-top-right-radius', '10px');	
// 		// $('.drawer-button').css('-webkit-border-bottom-right-radius', '10px');
		
// 	}
//     else{
//     	//$('.drawer-button').html("<span>" + "◀" +ss +   "◀" +ss + "◀" +ss + "◀"+ss + "◀" + "</span>");
// 		$('.drawer-button').html("<span>" + "▶" +ss +  "▶" +ss + "▶" +ss + "▶"+ss + "▶" + "</span>");

// ///    	$('.drawer-button').html("◀" + spacerString + "H<br>I<br>D<br>E" + spacerString + "◀");
//     	// $('.drawer-button').css('box-shadow', '0px 0px 0px #222');
// 		// $('.drawer-button').css('-webkit-border-top-right-radius', '0px');	
//   //   	$('.drawer-button').css('-webkit-border-bottom-right-radius', '0px');
//     }
// }

function toggleAC3(){
	if ( $('#chk_show_ac3').attr('checked') )
		$('.listing.AC3').show();
	else
		$('.listing.AC3').hide();

	console.log($('#chk_show_ac3').attr('checked'))
}

function listingSelected(){
	if( $('#chk_play_video').attr('checked') )
		loadVideo();

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
	
		$player.get(0).load();
		$player.get(0).play();
	
		$('.splash-holder').hide();

		$('#video-title').html("Now Showing: " + $path);
}


function initializeTheDrawer(){
// Hide the file-list
	//$('.file-list').toggle( false );

	// toggle the button to true
	//setDrawerButtonStyle(true); 
	//var ss = '<br><br><br><br><br><br>'; // spacer string
	//$('.drawer-button').html("<span>" + "▶" +ss +  "▶" +ss + "▶" +ss + "▶"+ss + "▶" + "</span>");
	

	// Assign the callbacks
	$('#file-drawer-button').click(toggleFileDrawer);
	$('#upload-drawer-button').click(toggleUploadDrawer);
	$('#settings-drawer-button').click(toggleSettingsDrawer);

	$('.listing').click(listingSelected);

	$('.chk_show_ac3').click(toggleAC3);
	$('.chk_show_ac3').click();  // execute method once
}


$(document).ready(function() {
	// HACK to set the background of the body to fill the window
	$('body').height($(window).height()); 
	$(window).resize(function(){
		$('body').height($(window).height()); 
	})


	//toggleDrawer();
	initializeTheDrawer();
	
	
	
	// Disable scrolling up and down
	document.body.style.overflow = 'hidden';

	// set the background color on the odd listings 

});	

