////////////////////////////////////////////////////////////////////////////////////////// PICKER AND TEXTFIELDS
// To get the current country, for testing we will use Locale
var currentCountryCode = Alloy.Globals.countryCode ? Alloy.Globals.countryCode : Titanium.Locale.getCurrentCountry().toLowerCase();

// Inheriting all countries from from countries.js file in lib directory
var allCountries = require('countries');

// Initializing the picker data
var pickerRows = [], selectedRow, counter = 0;
for (var country in allCountries) {
	var row = Titanium.UI.createPickerRow({
		title: allCountries[country].name + " (+" + allCountries[country].phoneCode + ")",
		id: country.toUpperCase(),
	});
	
	if(allCountries[currentCountryCode] == allCountries[country]) {
		selectedRow = counter;
	}
	counter++;
	pickerRows.push(row);
}
$.picker.add(pickerRows);
$.picker.setSelectedRow(0, selectedRow, true);


// Handling picker events and text fields for both iOS and android
if(OS_IOS) {
	// Setting the text country's text fields for the first time
	$.txt_country_ios.value = allCountries[currentCountryCode].name + " (+" + allCountries[currentCountryCode].phoneCode + ")";

	// Requiring animation to animate the iOS picker view
	var animation = require('alloy/animation');
	animation.fadeOut($.picker, 0);
	
	// Defining a function to open or close iOS picker
	function openPicker(e) {
		$.txt_country_ios.blur();
		if($.picker.visible == false) $.picker.visible = true;
		animation.fadeIn($.picker, 500);
	}
}
////////////////////////////////////////////////////////////////////////////////////////// END OF PICKER AND TEXTFIELDS


////////////////////////////////////////////////////////////////////////////////////////// EVENT LISTENER FUNCTIONS
// Defining a function that changes the country and country code text fields for both platforms
function changeCountryAndCountryCode() {
	if(OS_IOS) $.txt_country_ios.value = $.picker.getSelectedRow(0).title;
	currentCountryCode = $.picker.getSelectedRow(0).id.toLowerCase();
}

// Defining a function for Continue button that shows an alert dialog to confirm the user's number
function continueBtnPressed(e) {
	var phoneNumberRegex = /^[0-9]{9,15}$/;
	if ($.txt_phoneNumber.value.match(phoneNumberRegex)) {
		$.txt_phoneNumber.blur();
		
		$.dialog_confirm.message = "Do do you confirm that this is your number: +" + allCountries[currentCountryCode].phoneCode 
			+ parseInt($.txt_phoneNumber.value, 10) + "\nAn SMS with your access code will be sent to this number.";
		$.dialog_confirm.show();	
	} else alert("The number you entered is not valid");
}



////////////////////////////////////////////////////////////////////////////////////////// Navigate to SMS controller function
// Defining a function for Dialog Confirm to let the user edit or confirm his number
function dialogConfirmPressed(e){
	// Index 0, for Edit button, index 1 for Confirm button
	if(e.index == 0) {
		$.txt_phoneNumber.focus();
	} else {
		
		// Save the user's phone number in the global data variable
		Alloy.Globals.userSignUpData.phone = allCountries[currentCountryCode].phoneCode 
			+ parseInt($.txt_phoneNumber.value, 10);
		
		// Navigate to SMS Code confirmation
		var smsWin = Alloy.createController('FTR/smsWin').getView();
		if(OS_IOS) {
			Alloy.Globals.mainNav.openWindow(smsWin);
		}
		else {
			smsWin.open({ activityEnterAnimation: Ti.Android.R.anim.slide_in_left });
		}
	}
}
////////////////////////////////////////////////////////////////////////////////////////// END OF PHONE NUMBER CONTROLLER



////////////////////////////////////////////////////////////////////////////////////////// Window Event Listeners
// Adding event listener on the window to blur the keyboard and close ios picker on click
$.win.addEventListener('click', function() {
	if(OS_IOS) animation.fadeOut($.picker, 500);
	$.txt_phoneNumber.blur();
});

// Removing back button on iOS
$.win.leftNavButton = Ti.UI.createButton();
