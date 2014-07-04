/* 
 * Initialize userDataInArrays in contactInfoWin.js as this is the first required view
 */

var args = arguments[0] || {};
Ti.include("/editProfileHelper.js");	// TODO: Try to remove it


//////////////////////////////////////////////////////////////////////////////////////// EVENT LISTENRES
// An event listner that closes the tab group window
function CancelClicked() {
	$.tabGroup.close();
}

// An event listener that edits the table view insiede the window required
function EditClicked(e) {
	$[e.source.requiredViewId].tableView.editing = !$.contactInfoWin.tableView.editing;
}

// An event listener to done button that sends the new data to the server after validating it
function SubmitDataToServer() {
	// Could be useful
	// var thisPageData = {
		// primary_mobile: userDataInArrays.primary_mobile,
		// primary_mobile_privacy: userDataInArrays.primary_mobile_privacy,
		// phone_numbers: userDataInArrays.phone_numbers,
		// phone_numbers_privacy: userDataInArrays.phone_numbers_privacy,
		// primary_email: userDataInArrays.primary_email,
		// primary_email_privacy: userDataInArrays.primary_email_privacy,
		// mails: userDataInArrays.mails,
		// mails_privacy: userDataInArrays.mails_privacy
	// };
	
	var validReturnString = postUserDataUpdatesOnServer(userData, userDataInArrays);	// editProfileHelper.js 
	if(validReturnString.search("Wrong") >= 0) alert(validReturnString);
	// TODO: Close the window when done
	// $.win.close();
	//CancelClicked();
}