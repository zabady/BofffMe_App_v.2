// Test get all users
var xhrrrr = Ti.Network.createHTTPClient(
{
	onload: function(e) 
    {
    	var allUsers = JSON.parse(this.responseText);
    	for(var user in allUsers) createTableViewRow(allUsers[user]);
    },
    onerror: function(e)
    {
    	alert(this.responseText);
    },
});
xhrrrr.open("POST", Alloy.Globals.apiUrl + "get_all_users_fullName_and_pin/bofff");
xhrrrr.send();


function createTableViewRow(user) {
	// Create the field's title label
	var name = Ti.UI.createLabel({
		text: user.fullName,
	});
	
	// Create the field's privacy label
	var pin = Ti.UI.createLabel({
		text: user.pin,
	});
	
	// Create the field's row
	var newRow = Ti.UI.createTableViewRow({
		layout: "vertical",
		pin: user.pin,
	});
	newRow.add(name);
	newRow.add(pin);
	
	$.tableView.appendRow(newRow, { animated: true });
}

function RowClicked(e) {
	// TODO: save the new pin to properties
	alert(e.row.pin + "\nPlease Restart the App.");
	Titanium.App.Properties.setObject('pin', e.row.pin);
	getUserData();
}


function getUserData()
{
	// Getting user's data
	var xhr = Ti.Network.createHTTPClient(
	{
		onload: function(e) 
	    {
	    	userData = JSON.parse(this.responseText).rows[0];
	    	
	    	// Initiallize the user data addable fields with empty arrays
	    	if(!userData.phone_numbers) userData.phone_numbers = [];
	    	if(!userData.phone_numbers_privacy) userData.phone_numbers_privacy = [];
	    	if(!userData.mails) userData.mails = [];
	    	if(!userData.mails_privacy) userData.mails_privacy = [];
	    	if(!userData.social_links) userData.social_links = [];
	    	if(!userData.social_links_privacy) userData.social_links_privacy = [];
	    	if(!userData.interests) userData.interests = [];
	    	if(!userData.interests_privacy) userData.interests_privacy = [];
	    	if(!userData.favorite_places) userData.favorite_places = [];
	    	if(!userData.favorite_places_privacy) userData.favorite_places_privacy = [];
	    	
	    	Titanium.App.Properties.setObject("userData", userData);
	    	alert(userData.fullName);
	    },
	    onerror: function(e)
	    {
	    	alert(this.responseText);
	    },
	});
	xhr.open("POST", Alloy.Globals.apiUrl + "search_user_by/bofff/user_accounts/pin/" + Alloy.Globals.userPin);
	xhr.send();
}

