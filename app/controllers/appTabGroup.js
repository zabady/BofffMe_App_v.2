//////////////////////////////////////////////////////////////////////////////// HANDLING UI
// Defining a function that handle clicking on settings
function settingsClicked() {
	if(OS_IOS) {
		nappDrawerWin.toggleRightWindow();
	} else if(OS_ANDROID) {
		// Getting the settings window and Adding a back button to android's action bar
		var settingsWin = Alloy.createController("settingsWin").getView();
		settingsWin.addEventListener('open', function() {
			settingsWin.activity.actionBar.onHomeIconItemSelected = function() { settingsWin.close(); };;
			settingsWin.activity.actionBar.displayHomeAsUp = true;
		});
		settingsWin.open();
	}
}


// Handle iOS settings slide menu and adding event listeners to the settings navButton in all windows
if(OS_IOS){
	// Requiring the NappDrawerModule to create a nappDrawerWindow and set its parameters
	var NappDrawerModule = require('dk.napp.drawer');
	
	var nappDrawerWin = NappDrawerModule.createDrawer({
		centerWindow: $.tabGroup,
		rightWindow: $.settingsWin.win,
		fading: 0.2, // 0-1
		parallaxAmount: 0.2, //0-1
		shadowWidth:"40dp",
		rightDrawerWidth: "230",
		animationMode: NappDrawerModule.ANIMATION_NONE,
		closeDrawerGestureMode: NappDrawerModule.CLOSE_MODE_ALL,
		openDrawerGestureMode: NappDrawerModule.OPEN_MODE_ALL,
		orientationModes: [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT]
	});
	nappDrawerWin.open();
	
	// Adding the settingsClicked function for settings button in the three tabs' windows
	$.qrCodeWin.btn_settings.addEventListener('click', settingsClicked);
	$.contactsWin.btn_settings.addEventListener('click', settingsClicked);
	$.notificationCenterWin.btn_settings.addEventListener('click', settingsClicked);
	
	// Overriding closing the settings window with toggling it to the right
	$.settingsWin.win.addEventListener('close', function() {
		nappDrawerWin.toggleRightWindow();
	});
} 
else if(OS_ANDROID) { 
	$.tabGroup.open();
}

// Defining and adding a function to globals that sets the active tab to notification center.
// Used in push notification callback function defined in (pushNotificationAPIs.js)
Alloy.Globals.OpenNotificationCenter = function SetActiveTabToNotifications() {
	// TODO: Test it on android and iOS while receiving notifications
	//if($.tabGroup.activeTab.window.title == "Notifications") Alloy.Globals.LoadNotifications();
	//else $.tabGroup.setActiveTab(2);
	Alloy.Globals.LoadNotifications();
	$.tabGroup.setActiveTab(1);
};