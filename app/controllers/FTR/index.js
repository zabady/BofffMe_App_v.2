/* This is the index file of FTR project, it starts creating a navigation window for iOS and
 * 	opening welcome window.
 * For iOS, mainNav is added to globals to be used through opening FTR windows.
 */

// This global variable is used through FTR to save all the inputs
Alloy.Globals.userSignUpData = new Object({
	pin: 'temp',
	name: 'temp',
	phone: 'temp',
	email: 'email@temp.com',
	gender: "male",
	deviceToken: 'temp',
	profilePicture: new Object(),
});

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