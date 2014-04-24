// Getting user's data from App.Properties
var userData = Titanium.App.Properties.getObject("userData");
var newUserData = userData;

$.fullName.value = userData.fullName;
$.phone_numbers.value = userData.phone_numbers;

function textFieldsEditing(e) {
	newUserData[e.id] = e.value;
}

function doneEditing() {
	alert("Go Call ZeeZo's Function w eb3atlo zeby w 5leeha 3la allah :)");
	// TODO: Fire zeezo's function w shokran
}
