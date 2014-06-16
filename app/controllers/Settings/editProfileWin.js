// Including a 1000 lines of code file :D
Ti.include("/contactsUpdate.js");

// Getting user's data from App.Properties
var userData = Titanium.App.Properties.getObject("userData");
var newUserData = Titanium.App.Properties.getObject("userData");
var bofffsSpecificData = Titanium.App.Properties.getObject("bofffsSpecificData");

$.fullName.value = userData.fullName;
$.phone_numbers.value = userData.phone_numbers;
$.phone_numbers_privacy.value = userData.phone_numbers_privacy;

function textFieldsEditing(e) {
	newUserData[e.source.id] = e.value;
}

function doneEditing() {
	//alert(userData);
	//alert(newUserData);
	// TODO: Fire zeezo's function w shokran
	updateBofff(Alloy.Globals.userPin, userData, newUserData, bofffsSpecificData);
}