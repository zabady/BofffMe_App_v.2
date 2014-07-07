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

Ti.include('/pushNotificationAPIs.js');
SetPushNotificationAndGetDeviceToken();

// Adding APIs url to Alloy.Globals
Alloy.Globals.apiUrl = 'http://www.bofffme.com/api/index.php/home/';

// Debugging
Alloy.Globals.userPin = Titanium.App.Properties.getObject('pin');
if(Alloy.Globals.userPin == null) {
	Alloy.Globals.userPin = "95190228ae42e7652b098b5bce990aa8";	// Ahmed Atif's Pin
	Titanium.App.Properties.setObject('pin', Alloy.Globals.userPin);
}

//Split value to split update strings
Alloy.Globals.splitValue = "$";

// Getting user's data
var xhr = Ti.Network.createHTTPClient(
{
	onload: function(e) 
    {
    	var userData = JSON.parse(this.responseText).rows[0];
    	Titanium.App.Properties.setObject("userData", userData);
    	alert(userData.fullName);
    },
    onerror: function(e)
    {
    	alert(this.responseText);
    },
});
xhr.open("POST", Alloy.Globals.apiUrl + "search_user_by/bofff/user_accounts/pin/" + Alloy.Globals.userPin);
xhr.send();


// Creating the open function that creates a navigation window works with the tabgroup,
// and add a back button to android's action bar
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


// Generating the QR Code for the first time the app runs
var firstTime = false;
if(firstTime) {
	var userProfile = new Object({
		pin: '5000',
		name: 'Ahmed Atif',
		phone: '201009091995',
		email: 'ahmed.atif15@gmail.com',
		gender: "male",
	});
	Titanium.App.Properties.setObject('userProfile', userProfile);
	
	var url = "https://chart.googleapis.com/chart?cht=qr&chs=500x500&chl=MECARD:" +
																"N:" + userProfile.name + ";" +
																"TEL:" + userProfile.phone + ";" +
																"EMAIL:" + userProfile.email + ";" +
																"NOTE:pin:" + userProfile.pin + ";";
	
	// Get the qr code from google APIs
	var client = Titanium.Network.createHTTPClient({
		onload : function(e) {
			// Save the qr code into the data directory
			var qrFile = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, "qrcode.jpg");
			qrFile.write(this.responseData);
			Ti.API.info("Got QR Code!");
		},
		onerror : function(e) {
			alert(e.error);
		},
	}); 
	client.open("GET", url);
	client.send();
} else var userProfile = Titanium.App.Properties.getObject('userProfile');


//////////////////////////////////////////////////////////////////////////////////////// SERVING CONTACTS
// Getting the user's data to be used in editing the user's profile
var userData = Titanium.App.Properties.getObject("userData");
var userDataInArrays;



//////////////////////////////////////////////////////////////////////////////////////// FTR ALLOY.JS
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

// Defining a global loading variable to access loading widget
Alloy.Globals.loading = Alloy.createWidget("nl.fokkezb.loading");

// Defining the navigation bar for iOS
if(OS_IOS) {
	Alloy.Globals.mainNav = new Object();
}

// Defining the server's api url
Alloy.Globals.apiUrl = 'http://www.bofffme.com/api/index.php/home/';

// Defining a variable for detecting if it's FTR or not
Alloy.Globals.firstTimeRun = false;

// Defining an associative array to save users data
Alloy.Globals.userSignUpData = new Object({
	pin: 'temp',
	name: 'temp',
	phone: 'temp',
	email: 'temp',
	gender: "temp",
	profilePicture: new Object(),
});


// Getting the country code with the IP from the server side
var xhr = Ti.Network.createHTTPClient({
	onload: function(e) {
		var response = JSON.parse(this.responseText);
		Alloy.Globals.countryCode = response[0].cc.toLowerCase();
	},
	onerror: function(e) {
		Ti.UI.createAlertDialog({
			title : 'No Internet Connection',
			message : 'Please connect to the internet and restart the app.',
			cancel : 0,
			buttonNames : ['Ok']
		}).show();
	},
});
xhr.open("POST", Alloy.Globals.apiUrl + "get_country_from_ip");
xhr.send();  // request is actually sent with this statement