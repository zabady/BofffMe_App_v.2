
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
	
	// Opening the selected setting window
	Alloy.Globals.openNavigationWindow(selectedSettingWin, true);
	if(OS_IOS) $.win.fireEvent('close'); // for better user experience, toggle the settings back to the right
}
