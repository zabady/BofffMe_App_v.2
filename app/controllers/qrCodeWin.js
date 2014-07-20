// TODO: Add scanned bofff to contacts and to friends on the server
// TODO: Discussion point: userFrontCamera ?
// TODO: Test scanning in iphone to decide wether to use an overlay to add cancel button or not
// TODO: Discussion point: Should we put the qr scope image to the left of the button ?
// TODO: Add the user's info to the scanned bofff contact list and to his friends
// TODO: Add the icon image url to the qr code
// TODO: BUGS FOUND WHILE TESTING ON IPHONE, LAYOUT-ROTATION-CANCEL
//////////////////////////////////////////////////////////////////////////////// HANDLING UI
// Reading the qr code image from the file stored in application data directory
$.img.image = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory + "qrcode.jpg").read();

// If iphone not tall, decrease qr code image sizes
if(Ti.Platform.displayCaps.platformHeight < 500) {
	$.img.width = "90%";
	$.img.height = Ti.UI.SIZE;
}

var Barcode = require("ti.barcode");

// Adding event listeners for scanning
Barcode.addEventListener('success', function(e){
	// TODO: Add the scanned bofff to contacts and to friends
	alert(e.result);
});

Barcode.addEventListener('error', function(e){
	alert(JSON.parse(e.message));
});

//////////////////////////////////////////////////////////////////////////////// UI FUNCTIONS
// Defining a function to open the qr code scanner
function scanBtnClicked() {
	Barcode.allowRotation = false; // TODO: Test it on iphone
	Barcode.allowInstructions = false;
	Barcode.allowMenu = false;
	if(OS_ANDROID) Barcode.displayedMessage = "You may need to rotate the device.";
	
	Barcode.capture({
		overlay: $.view_overlay,
		showCancel: true,
		animate: true, 		// Default value but good for clarity
		showRectangle: true,// Default value
		keepOpen: false,	// Default value
		acceptedFormats: [Barcode.FORMAT_QR_CODE],
	});
}

// Defining a function for overlay cancel button to close tha barcode camera
function cancelBarcode() {
	Barcode.cancel();
}

// Defining a function for overlay flash button to open or close the device led or flash
function openCloseLedBarcode() {
	Barcode.useLED = !Barcode.useLED;
}
