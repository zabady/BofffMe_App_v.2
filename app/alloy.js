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

Alloy.Globals.apiUrl = 'http://www.bofffme.com/api/index.php/home/';

var firstTime = true;
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