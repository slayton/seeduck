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

var isDrawerOpen = false;
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
	var isDrawerCurrentlyOpen = w > 50;
	var newDrawerWidth = isDrawerCurrentlyOpen ? closedDrawerWidth:openDrawerWidth;
	
	$target.animate( {width: newDrawerWidth}, duration);
	//$others.animate( {width: 0}, duration);
	isDrawerOpen = !isDrawerCurrentlyOpen;

}

function toggleAC3(){
	if ( $('#chk_show_ac3').attr('checked') )
		$('.listing.AC3').show();
	else
		$('.listing.AC3').hide();

	console.log($('#chk_show_ac3').attr('checked'))
}

function listingSelected(){

	// $('.listing').removeClass('selected');
	// $(this).addClass('selected');

	loadVideo();
	
}
function loadVideo(){

		$name = $(this).html();
		$path = "../" + $(this).data('path');

		$player = $('#player');
		$player.attr('src', $path);
		$player.attr('poster', '../static/images/loading2.gif');
		$player.attr("controls","controls");
	
		//$player.get(0).pause();
		$player.get(0).load();
		$player.get(0).play();
	
		$('.splash-holder').hide();

		$('#video-title').html("Now Showing: " + $path);

		if (isDrawerOpen)
			toggleFileDrawer();
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

	$('.listing').click(loadVideo);

	$('.listing.AC3').hide();

	$('.chk_show_ac3').click(toggleAC3);
	$('.chk_show_ac3').click();  // execute method once
}

function checkForInputFile(){
	inputName = $('#selected_video').data('selected_video');
	
	if ($(this).data('path') === $('#selected_video').data('name')){
		$(this).click()
		return;
	}
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

	$('.listing').each(checkForInputFile)

});	

