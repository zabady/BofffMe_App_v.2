
var passedBofffData = arguments[0] || {};

var bofffData = passedBofffData.data;
$.lbl_name.text = passedBofffData.Name;
$.img.image = passedBofffData.iconImage;


for(var bofffContact in bofffData) {
	var fieldLabel = Ti.UI.createLabel({ text: bofffData[bofffContact].FieldName });
	var valueLabel = Ti.UI.createLabel({ text: bofffData[bofffContact].FieldValue });
	
	var row = Ti.UI.createTableViewRow({ layout: "horizontal" });
	row.add(fieldLabel);
	row.add(valueLabel);
	
	$.tableView.appendRow(row);
	
	$.addClass(fieldLabel, "labelStyle fieldNameStyle");
	$.addClass(valueLabel, "labelStyle valueNameStyle");
	$.addClass(row, "dataTableViewRow");
}


// Open the profile picture in a new window
function enlargeImage()
{
	if(passedBofffData.profilePicture) {
		var params = {
			iconImage: passedBofffData.iconImage,
			profilePicture: passedBofffData.profilePicture,  
		};
		Alloy.Globals.openNavigationWindow(Alloy.createController('Contacts/bofffImageWin', params).getView(), false);
	}
}
