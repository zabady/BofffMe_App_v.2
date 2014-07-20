/* 1. Sign Up
 * 2. Subscribe for push notifications
 * 3. Generate QR Code
 * 4. Send a Notification to friends informing them that a friend has joined bofff me
 * TODO: --> It will be placed inside a timeout for 5 seconds to make sure that everything about contacts is set,
 * 			this is only for Graduation Project :D
 * 5. Set user data
 * 6. Set user pin
 * 7. Navigate to the app after finishing all of previous tasks
 */
// TODO: Replace getting user data by onload function of signup

// Show loading in postlayout event listener for the window, so it's displayed after UI cycle is finished 
function viewLoading() { Alloy.Globals.loading.show("Please Wait ..", false); }
// Calling signUp to begin the process
signUp();


/* Defining callback function after the sign up is done.
 * The insert server function returns the user's pin on success, so we save it and now we can:
 *  - Call generateQrCode after having the user's pin
 *  - Subscribe for push notifcations after making sure that the user has been registered
 */
function signUpSuccess(e) {
	// Get user data returned from the function
	var response = JSON.parse(this.responseText);
	
	// Converting the user's pin to md5 and saving it into userSignUpData
	Alloy.Globals.userPin = Titanium.Utils.md5HexDigest(response.rows);
	
	// Save user pin to properties
	Titanium.App.Properties.setObject('pin', Alloy.Globals.userPin);
	alert(response);
	
	// No need to include pushNotificationAPIs.js as it's included in alloy.js
	SubscribeToChannel('test');
	generateQrCode();
	getUserData();	// TODO: This function should be removed
	
	// Change loading message 
	Alloy.Globals.loading.show("Generating QR Code ..", false);
}


/* Defining callback function after getting generated qr code from google APIs.
 * After getting qr code:
 *  - Save qr code image to data directory with name 'qrcode.jpg', to be read in the qrCodeWin
 *  - Set firstTimeRun boolean to false
 *  - Run bofff me app after signing up (run appTabGroup.js)
 */
function generetaQrCodeSuccess(e) {
	// Save the qr code into the data directory
	var qrFile = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, "qrcode.jpg");
	qrFile.write(this.responseData);
	
	// Change firstTimeRun to false after all
	Titanium.App.Properties.setObject('FTR', false);
	
	alert("Got QR Code!"); // TODO: For testing
	
	// Hide loading
	Alloy.Globals.loading.hide();
	
	// Redirect to the main app
	Alloy.createController("appTabGroup").getView().open();
}



// Defining a function that sends the user's data to the server
function signUp()
{
	var xhr = Ti.Network.createHTTPClient({
		onload: signUpSuccess,
		onerror: function(e) {
			//Alloy.Globals.loading.hide();
			alert('Check your internet connection.');
		},
	});
	xhr.open("POST", Alloy.Globals.apiUrl + "insert/bofff/user_accounts");
	var params = {
		fullName: Alloy.Globals.userSignUpData.name,
		gender: Alloy.Globals.userSignUpData.gender,
		primary_mobile:	Alloy.Globals.userSignUpData.phone,
		primary_email: Alloy.Globals.userSignUpData.email,
		profile_picture: Alloy.Globals.userSignUpData.profilePicture.large ? 
							Alloy.Globals.userSignUpData.profilePicture.large.read() : null,
		device_token: GetDeviceToken(),
	};
	xhr.send(params); // request is actually sent with this statement
}


// Defining a function that generates the qr code
function generateQrCode()
{
	// The next code creates a MECARD, no need to it for simplicity
	// var url = "https://chart.googleapis.com/chart?cht=qr&chs=500x500&chl=MECARD:" +
					// "N:" + Alloy.Globals.userSignUpData.name + ";" +
					// "TEL:" + Alloy.Globals.userSignUpData.phone + ";" +
					// "EMAIL:" + Alloy.Globals.userSignUpData.email + ";" +
					// "NOTE:pin:" + Alloy.Globals.userPin + ";";
	
	var url = "https://chart.googleapis.com/chart?cht=qr&chs=500x500&chl=" +
				Alloy.Globals.userSignUpData.name + ";" +
				Alloy.Globals.userSignUpData.phone + ";" +
				Alloy.Globals.userSignUpData.email + ";";
	
	// Get the qr code from google APIs
	var client = Titanium.Network.createHTTPClient({
		onload : generetaQrCodeSuccess,
		onerror : function(e) {
			alert(e.error);
		},
	}); 
	client.open("GET", url);
	client.send();
}


// Defining a function that gets user data after sign up
// TODO: Remove this function and replace it with getting the user data from the onload function of sign up
function getUserData()
{
	// Getting user's data
	var xhr = Ti.Network.createHTTPClient(
	{
		onload: function(e) 
	    {
	    	userData = JSON.parse(this.responseText).rows[0];
	    	
	    	// Initiallize the user data addable fields with empty arrays
	    	userData.phone_numbers = [];
	    	userData.phone_numbers_privacy = [];
	    	userData.mails = [];
	    	userData.mails_privacy = [];
	    	userData.social_links = [];
	    	userData.social_links_privacy = [];
	    	userData.interests = [];
	    	userData.interests_privacy = [];
	    	userData.favorite_places = [];
	    	userData.favorite_places_privacy = [];
	    	
	    	Titanium.App.Properties.setObject("userData", userData);
	    	
	    	alert(userData.fullName);
    		// TODO: Handle informing friends with more innovative way !
			Alloy.Globals.notifyFriendsAboutJoining();
	    },
	    onerror: function(e)
	    {
	    	alert(this.responseText);
	    },
	});
	xhr.open("POST", Alloy.Globals.apiUrl + "search_user_by/bofff/user_accounts/pin/" + Alloy.Globals.userPin);
	xhr.send();
}
