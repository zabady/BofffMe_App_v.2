// TODO: Handling image rotation for camera
// TODO: Handling image rotation for photoGallery

/////////////////////////////////////////////////////////////////////////// LOGIC FUNCTIONS
// Name valicator funtcion ---- > text only 
function validate_name()
{
	var regexp =/^[a-zA-Z]+(\s{1}[a-zA-Z]+)*$/;
    if($.txt_name.value.match(regexp) && $.txt_name.value.length > 2) {
    	// If it's correct, save it
    	Alloy.Globals.userSignUpData.name = $.txt_name.value;
    	return true;
    } else {
    	alert("Invalid name, it should be greater than 2 charachters and text only !");
		$.txt_name.focus();
		return false;
    }
}

//  Email validation ------ > email format
function validate_email()
{
	var emailvalid = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if ($.txt_email.value.match(emailvalid)) {
		// If it's correct, save it
    	Alloy.Globals.userSignUpData.email = $.txt_email.value;
		return true;
	} else {
		alert("Invalid email !");
		$.txt_email.focus();
		return false;
	}
}

// Check if a gender is selected or not
function checkGender()
{
	if(Alloy.Globals.userSignUpData.gender == "temp") {
		alert("Please Select Gender");
		return false;
	} else return true;
}

// Defining a function to be executed when facebook finish
function facebookFinished() {
	// Set user name, email, gender and photo
	$.txt_name.value = Alloy.Globals.userSignUpData.name;
	$.txt_email.value = Alloy.Globals.userSignUpData.email;
	Alloy.Globals.userSignUpData.gender ? $.img_gender_male.fireEvent('click') : $.img_gender_female.fireEvent('click');
	$.img_user.image = Alloy.Globals.userSignUpData.profilePicture.large.read();
	$.img_user.height = 100;
	$.img_user.width = Ti.UI.SIZE;
}

// Defining a function that resize the profile pic to icon and large then saves them on appDataDirectory
function resizeAndSaveProfilePictures(image)
{
	var resizedImage = image.imageAsResized(500, image.height * 500 / image.width);
	Alloy.Globals.userSignUpData.profilePicture.large = 
		Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'img_profile_pic_large.jpg');
	Alloy.Globals.userSignUpData.profilePicture.large.write(resizedImage);
	
	resizedImage = image.imageAsResized(50, 50);
	Alloy.Globals.userSignUpData.profilePicture.icon = 
		Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'img_profile_pic_icon.jpg');
	Alloy.Globals.userSignUpData.profilePicture.icon.write(resizedImage);
	
	// Read and load the largeImage to the imageView
	$.img_user.image = Alloy.Globals.userSignUpData.profilePicture.large.read();
	$.img_user.height = 100;
	$.img_user.width = Ti.UI.SIZE;
}

// Adding facebookFinished function to be global function to get fired by facebook.js
Ti.App.addEventListener('facebookFinished', facebookFinished);

// Removing facebookFinished event listener when the window is closed to save memory
$.win.addEventListener('close', function(){
	Ti.App.removeEventListener('facebookFinished', facebookFinished);
});
/////////////////////////////////////////////////////////////////////////// END OF LOGIC FUNCTIONS


/////////////////////////////////////////////////////////////////////////// HANDLING UI AND EVENT LISTENERS
// Defining an event listener that allows scrolling on text fields' focus
function allowScroll() { $.scrollView.scrollingEnabled = true; }

// Defining an event listener that disable scrolling on text fields' blur
function disableScroll() { $.scrollView.scrollingEnabled = false; }

// A workaround to remove autofocus keyboard on android
if(OS_ANDROID) {
	var firstTime = true;
	$.txt_name.addEventListener('focus', function(e) {
		if(firstTime) {
			e.source.blur();
			firstTime = false;
		}
	});
}

// Adding a click event listener for the window to blur the keyboard
$.win.addEventListener('click', function(){
	$.txt_name.blur();
	$.txt_email.blur();
});

// Removing back button on iOS
$.win.leftNavButton = Ti.UI.createButton();

// Defining a function for pressing on Import from facebook
function facebookImgPressed() {
	
	// Including FacebookFunctions.js to call loginWithFacebook
	Ti.include("/facebookFunctions.js");
	// Send login with facebook the two functions that will be executed after login
	loginWithFacebook(requestWithGraphPath, getNameEmailPicture);
}

// Defining a function for pressing on the image
function imgPressed(e) {
	$.optionDialog.show();
}

// Defining a function for the option dialog to open the camera or choose a photo from library 
function optionDialogClick(e)
{
	// index "0" equals camera selection as a source
	if (e.index == 0) 
	{
		Ti.Media.showCamera({
			success : function(event) {
				resizeAndSaveProfilePictures(event.media);
			},
			cancel : function() {
				alert("You have cancelled !");
			},
			error : function(error) {
				alert('Unexpected error: ' + error.code);
			},
			saveToPhotoGallery : false, // TODO: Change it in real app
			allowEditing : true,
			mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
		});
	}
	
	// Index "1" equals gallery images as a source
	else if (e.index == 1)
	{
		Ti.Media.openPhotoGallery({
			success : function(event) {
				resizeAndSaveProfilePictures(event.media);
			},
			cancel : function() {
				alert("You've Cancelled !");
			},
			error : function(error) {
				alert('Unexpected error: ' + error.code);
			},
			allowEditing : true,
			mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
		});
	}
}

// Defining a function to give focus to email text field when return is pressed
function txtNameReturnKeyPressed() {
	$.txt_email.focus();
}

// Defining a function for gender selection
function genderSelected(e) {
	if(e.source.id == "img_gender_male") {
		$.lbl_gender_male.font = { fontSize: "20" };
		$.lbl_gender_female.font = { fontSize: "17" };;
		$.lbl_gender_male.color = "#2279bc";
		$.lbl_gender_female.color = "gray";
		$.img_gender_male.image = "/images/gender_male.png";
		$.img_gender_female.image = "/images/gender_female[shaded].png";
		Alloy.Globals.userSignUpData.gender = "male";
	} else {
		$.lbl_gender_male.font = { fontSize: "17" };
		$.lbl_gender_female.font = { fontSize: "20" };;
		$.img_gender_male.image = "/images/gender_male[shaded].png";
		$.img_gender_female.image = "/images/gender_female.png";
		$.lbl_gender_male.color = "gray";
		$.lbl_gender_female.color = "#2279bc";
		Alloy.Globals.userSignUpData.gender = "female";
	}
}

// Defining a function for pressing on Continue button
function continueBtnPressed() {
	if(validate_name() && validate_email() && checkGender()) {
		$.win.fireEvent('click');	// To blur keyboard
		
		//Alloy.Globals.loading.show("Please Wait ..", false);
		//signUp(); // TODO: For testing
		var singUpWin = Alloy.createController('FTR/signUpWin').getView();
		if(OS_IOS) {
			Alloy.Globals.mainNav.openWindow(singUpWin);
		} else {
			singUpWin.open({ activityEnterAnimation: Ti.Android.R.anim.slide_in_left });
		}
	}
}