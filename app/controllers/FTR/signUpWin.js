/* 1. Sign Up
 * 2. Subscribe for push notifications
 * 3. Generate QR Code
 * 4. Set user data
 * 5. Set user pin
 */

// Show loading
Alloy.Globals.loading.show("Please Wait ..", false);
if(signUp());	// Force sign up to be done synchronously so we have the user's pin
if(generateQrCode());	// Force qr code generation to be done synchronously so we have it before opening the app
Alloy.Globals.loading.hide();
// TODO: Ti.include('/pushNotificationAPIs.js');
// TODO: SubscribeToChannel('test');


function generateQrCode()
{
	var url = "https://chart.googleapis.com/chart?cht=qr&chs=500x500&chl=MECARD:" +
					"N:" + Alloy.Globals.userSignUpData.name + ";" +
					"TEL:" + Alloy.Globals.userSignUpData.phone + ";" +
					"EMAIL:" + Alloy.Globals.userSignUpData.email + ";" +
					"NOTE:pin:" + Alloy.Globals.userPin + ";";
	
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
}

// Defining a function that sends the user's data to the server
function signUp()
{
	var xhr = Ti.Network.createHTTPClient({
		onload: function(e) {
			Alloy.Globals.loading.hide();
			var response = JSON.parse(this.responseText); // TODO: Just for testing
			// Converting the user's pin to md5 and saving it into userSignUpData
			Alloy.Globals.userPin = Titanium.Utils.md5HexDigest(response.rows);
			alert(response + "\n" + response.rows);
		},
		onerror: function(e) {
			Alloy.Globals.loading.hide();
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
	};
	xhr.send(params); // request is actually sent with this statement
}