var bofffContactData = new Object();

function textFieldChanges(e) {
	switch(parseInt(e.source.switchValue)) {
		case 1:
			bofffContactData.fullName = e.source.value;
			break;
		case 2:
			bofffContactData.primary_mobile = e.source.value;
			break;
		case 3:
			bofffContactData.primary_email = e.source.value;
			break;
			
		case 4:
			bofffContactData.gender = e.source.value;
			break;
			
		default:
			alert("Error");
	}
}

function openLibrary() {
	Ti.Media.openPhotoGallery({
		success : function(event) {
			bofffContactData.profile_picture = event.media;
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

function continuePressed() {
	//alert(bofffContactData.profile_picture);
	$.dialog_confirm.message = bofffContactData;
	$.dialog_confirm.show();
}

function dialogConfirmPressed(e){
	if(e.index == 1) {
		signUp();
	}
}

function signUp()
{
	var xhr = Ti.Network.createHTTPClient({
		onload: function(e) {
			alert(this.responseText);
			//var response = JSON.parse(this.responseText); // TODO: Just for testing
			// Converting the user's pin to md5 and saving it into userSignUpData
			//Alloy.Globals.userSignUpData.pin = Titanium.Utils.md5HexDigest(response.rows[0]);
			//alert(response + "\n" + response.rows[0]);
			// TODO: save the user's pin anywhere
		},
		onerror: function(e) {
			alert('Check your internet connection.');
		},
	});
	xhr.open("POST", Alloy.Globals.apiUrl + "insert/bofff/user_accounts");
	xhr.send(bofffContactData); // request is actually sent with this statement
}