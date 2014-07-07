// TODO: For testing you have to disable sending the SMS
// This window just say welcome to the user
// Defining a function for presseing on continue button
function openPhoneNumberWin(e) 
{
	var phoneNumberWin = Alloy.createController("FTR/phoneNumberWin").getView();
	//var phoneNumberWin = Alloy.createController("userMainDetailsWin").getView(); // TODO: For testing
 	if(OS_IOS) {
		Alloy.Globals.mainNav.openWindow(phoneNumberWin);
	} else {
		phoneNumberWin.open({ activityEnterAnimation: Ti.Android.R.anim.slide_in_left });
	}
}

$.win.navBarHidden = true;
$.win.open();