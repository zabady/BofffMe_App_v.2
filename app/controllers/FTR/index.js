
var welcomeWin = Alloy.createController("FTR/welcomeWin").getView();

if(OS_IOS) {
	// Create a navigation window and adding it to FTR so it's used till the end of it
	Alloy.Globals.mainNav = Titanium.UI.iOS.createNavigationWindow({
	   window: welcomeWin,
	   backgroundColor: "#2279bc",
	});
	
	Alloy.Globals.mainNav.open();
} else {
	welcomeWin.open();
}