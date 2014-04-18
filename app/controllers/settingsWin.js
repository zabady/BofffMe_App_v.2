
// Setting a function that gets and opens the clicked settings item in a new window
function openClickedSettings(e) {
	var selectedSettingWin;
	
	// Checking weather the window need a webview or it has its own window
	if(e.source.window.search("http") != -1) {
		selectedSettingWin = Alloy.createController("webViewWin", { url: e.source.window }).getView();
	} else {
		var windowUrl = OS_IOS ? "Settings/" + e.source.window : "/Settings/" + e.source.window; 
		selectedSettingWin = Alloy.createController(windowUrl).getView();
	}
	
	// Opening the selected setting window
	if(OS_ANDROID) {
		// Adding a back button to android's action bar
		selectedSettingWin.addEventListener('open', function() {
			selectedSettingWin.activity.actionBar.onHomeIconItemSelected = function() { selectedSettingWin.close(); };
			selectedSettingWin.activity.actionBar.displayHomeAsUp = true;
		});
		selectedSettingWin.open();
	} else {
		// Creating a work around to open the settings window in navigation window that is compatible with nappDrawer module
		var tempRootWin = Ti.UI.createWindow({
			// navBarHidden: true,	// TODO: Must be tested for user experience
		});
		var tempNavWin = Ti.UI.iOS.createNavigationWindow({
			window: tempRootWin,
		});
		tempNavWin.open();
		tempNavWin.openWindow(selectedSettingWin);
		selectedSettingWin.addEventListener('close', function(){ tempNavWin.close(); });
		$.win.fireEvent('close');
	}
}
