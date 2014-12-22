/* This window just say welcome to the user
 * And get the county and country code using user's ip address communications with the server.
 * If the ip country code is not get yet, display loading.
 * It will not get here until there's internet connection.
 */

// DEBUGGING ONLY
function skipFTR(){
	var isFTR = Titanium.App.Properties.getObject('FTR'); 
	Titanium.App.Properties.setObject('FTR', !isFTR);
	alert("FTR will start after restarting the app.");
}

// Defining an event listener for hiding the action bar in android
function windowOpen(e)
{
    // Grab the window's action bar instance and call the hide method
	//e.source.activity.actionBar.hide();
	$.win.activity.actionBar.hide();
}


// Defining a boolean that is used if continue is clicked before receiving the country code
var continueBtnClicked = false;


// Getting the country code with the IP from the server APIs
var xhr = Ti.Network.createHTTPClient({
	onload: function(e) {
		var response = JSON.parse(this.responseText);
		// Adding it to globals to be used in phone number window
		Alloy.Globals.countryCode = response[0].cc.toLowerCase();
		
		// If continue is pressed before receiving ip address, hide loading and open phone number window
		if(continueBtnClicked) {
			Alloy.Globals.loading.hide();
			openPhoneNumberWin();
		}
	},
	onerror: function(e) {
		alert(JSON.stringify(e));
	},
});
xhr.open("POST", Alloy.Globals.apiUrl + "get_country_from_ip");
xhr.send();


// Hiding navigation bar and opening the the current window
$.win.navBarHidden = true;
$.win.open();


// Defining an event listener for clicking on conitue
function continueClicked() {
	if(Alloy.Globals.countryCode) openPhoneNumberWin();
	else {
		continueBtnClicked = true;
		Alloy.Globals.loading.show('Please Wait ..', false);
	}
}


// Defining a function for presseing on continue button
function openPhoneNumberWin() 
{
	var phoneNumberWin = Alloy.createController("FTR/phoneNumberWin").getView();
	// var phoneNumberWin = Alloy.createController("FTR/signUpWin").getView(); // TODO: For testing
 	if(OS_IOS) {
		Alloy.Globals.mainNav.openWindow(phoneNumberWin);
	} else {
		phoneNumberWin.open({ activityEnterAnimation: Ti.Android.R.anim.slide_in_left });
	}
}
