/* 
 * Initialize userDataInArrays in contactInfoWin.js as this is the first required view
 */

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
	//alert(userDataInArrays.mails);
	alert(userDataInArrays);
	//var validReturnString = postUserDataUpdatesOnServer(userData, userDataInArrays);	// editProfileHelper.js 
	//if(validReturnString.search("Wrong") >= 0) alert(validReturnString);
	// TODO: Close the window when done
	// $.win.close();
	//CancelClicked();
}