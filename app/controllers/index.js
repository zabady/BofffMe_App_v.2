
var stillHere = true;

// If there's internet connection, run the app
if(Ti.Network.online) {
	runAppOrFTR();
}
// Else, display a msg and add run the app when the device get connected to the interned 
else {
	Ti.Network.addEventListener('change', function() {
		// If now the device is online and the app is not redirected yet, then redirect it
		if(Ti.Network.online && stillHere) {
			runAppOrFTR();
		}
		
		// Else display a msg to the user to connect to the internet 
		else {
		     var alertDialog = Titanium.UI.createAlertDialog({
				title: 'WARNING!',
				message: 'Your device is not online, please connect to the internet.',
				buttonNames: ['OK']
			});
			alertDialog.show();
		} 
	});
}

// A function that runs FTR if it's first time or main app's tab group if not
function runAppOrFTR() {
	var appOrFTRWin;
	var prefixWin = OS_IOS ? "" : "/";
	
	if(Alloy.Globals.firstTimeRun) appOrFTRWin = Alloy.createController(prefixWin + "FTR/index").getView();
	else appOrFTRWin = Alloy.createController(prefixWin + "appTabGroup").getView();
	
	stillHere = false;
}