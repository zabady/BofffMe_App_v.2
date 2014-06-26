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
}
