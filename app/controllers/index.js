//////////////////////////////////////////////////////////////////////////////// HANDLING UI
// Defining a function that handle clicking on settings
function settingsClicked() {
	if(OS_IOS) {
		nappDrawerWin.toggleRightWindow();
	} else if(OS_ANDROID) {
		var settingsWin = Alloy.createController("settingsWin").getView();
		settingsWin.open();
	}
}

// Handle iOS settings slide menu and adding event listeners to the settings navButton in all windows
if(OS_IOS){
	var NappDrawerModule = require('dk.napp.drawer');

	var nappDrawerWin = NappDrawerModule.createDrawer({
		fullscreen:false,
		centerWindow: $.tabGroup,
		rightWindow: $.settingsWin.win,
		fading: 0.2, // 0-1
		parallaxAmount: 0.2, //0-1
		shadowWidth:"40dp",
		rightDrawerWidth: "150",
		animationMode: NappDrawerModule.ANIMATION_NONE,
		closeDrawerGestureMode: NappDrawerModule.CLOSE_MODE_ALL,
		openDrawerGestureMode: NappDrawerModule.OPEN_MODE_ALL,
		orientationModes: [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT]
	});
	nappDrawerWin.open();
	
	$.qrCodeWin.btn_settings.addEventListener('click', settingsClicked);
} 
else if(OS_ANDROID) { 
	$.tabGroup.open();
}