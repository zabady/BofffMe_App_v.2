// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};


/* Getting the user's data to be used in editing the user's profile.
 * Initialized in FTR for the first time.
 * userDataInArrays is initialized in edit profile and used by it.
 */
var userData = Titanium.App.Properties.getObject("userData");
var userDataInArrays;


/* Including push notification APIs and setting push notifications here if we are online
 * This way callback function is set when the app runs and these APIs can be used through the app
 */
Ti.include('/pushNotificationAPIs.js');
SetPushNotificationAndGetDeviceToken();


// Defining a global loading variable to access loading widget
Alloy.Globals.loading = Alloy.createWidget("nl.fokkezb.loading");


// Defining the server's api url and adding it to globals
Alloy.Globals.apiUrl = 'http://www.bofffme.com/api/index.php/home/';


// Split value to split updated ana deleted strings strings (used in contacts)
Alloy.Globals.splitValue = "$";


// Defining global user pin, it's first initialized in FTR
Alloy.Globals.userPin = Titanium.App.Properties.getObject('pin');


// Defining a boolean for detecting if it's FTR or not
Alloy.Globals.firstTimeRun = Titanium.App.Properties.getObject('FTR', false);
//Alloy.Globals.firstTimeRun = false; // TODO: For testing FTR


/* Creating the open function that creates a navigation window that works with the tabgroup,
 * and add a back button to android's action bar.
 * This is a workaround for iOS to be able to display a native back button while navitgating from the tabGroup.
 */
if(OS_IOS) {
	var tempRootWin = Ti.UI.createWindow({
		// navBarHidden: true,	// TODO: Must be tested for user experience
	});
	var tempNavWin = Ti.UI.iOS.createNavigationWindow({
		window: tempRootWin,
	});
}
Alloy.Globals.openNavigationWindow = function(window, isWindowAfterRoot) {
	if(OS_IOS) {
		tempNavWin.open();
		tempNavWin.openWindow(window);
		if(isWindowAfterRoot) window.addEventListener('close', function(){ tempNavWin.close(); });
	}
	else if(OS_ANDROID) {
		// Adding a back button to android's action bar
		window.addEventListener('open', function() {
			window.activity.actionBar.onHomeIconItemSelected = function() { window.close(); };
			window.activity.actionBar.displayHomeAsUp = true;
		});
		window.open();
	}
};

// TODO: Handle last task in integration ;)
// TODO: Works only for graduation project and must be optimized in real app
Alloy.Globals.notifyFriendsAboutJoining = function() {
	setTimeout(function() {
		// Notify user friends that he has just joined bofff me
		NotifyAllUserFriendsWithMessage(userData.fullName + ' has joined Bofff Me, click here and explore his profile.',
										'test', userData.icon_image, "New Friend !");
		alert("The app will send a notification informing your friends that you has just joined Bofff Me.");
	}, 8000);
};

// TODO: Remove the next line after the first run :D
//Titanium.App.Properties.setObject('notifications', []);
