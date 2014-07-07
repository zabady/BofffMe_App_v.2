var welcomeWin = Alloy.createController("FTR/welcomeWin").getView();

if(OS_IOS) {
	Alloy.Globals.mainNav = Titanium.UI.iOS.createNavigationWindow({
	   window: welcomeWin,
	   backgroundColor: "#2279bc",
	});
	
	Alloy.Globals.mainNav.open();
} else {
	welcomeWin.open();
}