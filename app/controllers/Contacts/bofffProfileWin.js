
var passedData = arguments[0] || {};
var bofffData = passedData.data;
$.lbl_name.text = passedData.name;
$.img.image = passedData.iconImage;

for(var bofffContact in bofffData) {
	var fieldLabel = Ti.UI.createLabel({ text: bofffData[bofffContact].FieldName });
	var valueLabel = Ti.UI.createLabel({ text: bofffData[bofffContact].FieldValue });
	
	var row = Ti.UI.createTableViewRow({ layout: "horizontal" });
	row.add(fieldLabel);
	row.add(valueLabel);
	
	$.tableView.appendRow(row);
}


// Open the profile picture in a new window
function enlargeImage()
{
	if(passedData.profilePicture) {
		var params = {
			iconImage: passedData.iconImage,
			profilePicture: passedData.profilePicture,  
		};
		Alloy.Globals.openNavigationWindow(Alloy.createController('Contacts/bofffImageWin', params).getView(), false);
	}
}
