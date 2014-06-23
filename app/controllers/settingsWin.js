
// Setting a function that gets and opens the clicked settings item in a new window
function openClickedSettings(e) {
	var selectedSettingWin;
	
	// Checking weather the window need a webview or it has its own window
	if(e.source.window.search("http") != -1) {
		selectedSettingWin = Alloy.createController("webViewWin", { url: e.source.window }).getView();
	} else {
		// TODO: Remove the backslash from the next line of code
		var windowUrl = OS_IOS ? "Settings/" + e.source.window : "/Settings/" + e.source.window; 
		selectedSettingWin = Alloy.createController(windowUrl).getView();
	}
	
	// Hide the navigation bar to replace it with required buttons in Editing the user profile
	if(e.source.window.search("EditProfile") != -1 && OS_IOS) {
		tempNavWin.navBarHidden = true;
		tempRootWin.navBarHidden = true;
	}
	
	// Finally, open the selected setting window
	Alloy.Globals.openNavigationWindow(selectedSettingWin, true);
	if(OS_IOS) $.win.fireEvent('close'); // for better user experience, toggle the settings back to the right
}
