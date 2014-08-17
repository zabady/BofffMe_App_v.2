Ti.include("/editProfileHelper.js");	// Including editProfileHelper APIs

//////////////////////////////////////////////////////////////////////////////////////// INITIALIZING VARIABLES
// Initialize userDataInArrays here as this is the first required view in the Edit Profile TabGroup
userDataInArrays = convertAddableFieldsToArrays(userData); // Convert the addable fields into arrays	// editProfileHelper.js

var addNewRowFlag = false;	// Used to flag that the add button was clicked
var addableTextOldValue = "";	// Used to know the old field's value when focused before editing, to get its index in array
var clickedPrivacyLabel;	// Used to save the label that was clicked to edit it when the picker's value changes
var privacyIndex = { public:0, friends:1, favorites:2, onlyMe:3 };	// Used to update the picker selected row with current privacy
var clickedTextField;	// Used to save the clicked text field, to be able to blur its keybaord
if(OS_ANDROID) var androidDeleteRowFlag = false;	// Used to flag that remove icon was pressed for android

// TODO: Handle changing the primary phone number
// TODO: Handle skype name and BBM pin number
// TODO: Add an alert dialog to confirm deleting
// TODO: Put Android Edit View in an xml alone and require it
// TODO: Replace non-native android picker with the native one

//////////////////////////////////////////////////////////////////////////////////////// END OF INITIALIZING VARIABLES

//////////////////////////////////////////////////////////////////////////////////////// DISPLAY USER DATA
// Loop over the table view children to bind data
var rows = $.tableView.sections[0].rows;
for(var i = 0; i < rows.length; i ++) { 	// Loop over the table view rows
	var children = rows[i].children;
	for(var j = 0; j < children.length; j++) {	// Loop over the current's row children
		switch(children[j].id) {
			case 'primary_mobile':
			case 'primary_email':
			case 'skype_name':
			case 'bbm_pin':
			case 'primary_mobile_privacy':
			case 'primary_email_privacy':
			case 'skype_name_privacy':
			case 'bbm_pin_privacy':
			
				if(userData[children[j].id] != "" && userData[children[j].id] != null) {
					children[j].text = userData[children[j].id];
					children[j].color = 'black';
				}
		}
	}
}


// Loop over the user emails
for(var i = userDataInArrays.mails.length - 1; i >= 0; i--) {
	// Create the data that will be displayed for each mail and send it to addNewRow function with the index of the row
	var data = createBindingRowData(userDataInArrays.mails[i], userDataInArrays.mails_privacy[i], false);
	AddNewRowAfter(data, 4);
}

// Loop over the user phone numbers
for(var i = userDataInArrays.phone_numbers.length - 1; i >= 0; i--) {
	// Create the data that will be displayed for each mail and send it to addNewRow function with the index of the row
	var data = createBindingRowData(userDataInArrays.phone_numbers[i], userDataInArrays.phone_numbers_privacy[i], true);
	AddNewRowAfter(data, 1);
}

// Defining a function that creates the data that will be binded with the table view row and its children
function createBindingRowData(fieldValue, privacy, isPhone) {
	var data = {
		TextOfFieldTitle: isPhone ? "Phone" : "Email",
		HintTextOfField: isPhone ? "Phone number" : "Email address",
		FieldType: isPhone ? "phone_numbers" : "mails",
		KeyboardType: isPhone ? Ti.UI.KEYBOARD_DECIMAL_PAD : Ti.UI.KEYBOARD_EMAIL,
		KeyboardToolbar: isPhone ? $.keyboardToolbar : null,
		
		TextOfField: fieldValue,
		TextOfPrivacy: privacy,
	};
	
	return data;
}
//////////////////////////////////////////////////////////////////////////////////////// END OF DISPLAY USER DATA


//////////////////////////////////////////////////////////////////////////////////////// EVENT LISTENRES
// Event listener for clicking the add row button that turns the flag to true
function AddRowButtonClicked() {
	addNewRowFlag = true;
}

// Event listener to table view clicks which adds a new row or delete an existing row depending on flags
function TableViewRowClicked(e) {
	if(addNewRowFlag) {
		// Add it to the user's data, the call is by reference, so no need to wait a returning value
		addNewFieldToUserData(userDataInArrays, e.row.isPhone > 0 ? "phone_numbers" : "mails");
		
		// Add it to the UI
		var data = createBindingRowData("", "public", e.row.isPhone > 0);
		AddNewRowAfter(data, e.index + 1);
		addNewRowFlag = false;
	}
	// If delete flag is true, delete the selected row for android
	else if(OS_ANDROID && androidDeleteRowFlag) {
		DeletePressed({ source: {
			fieldType: e.row.fieldType,
			fieldValue: e.row.fieldValue,
		}});	// Call DeletePressed event listener and send it the required arguments get from selected row
		$.tableView.deleteRow(e.index);	// Delete the row from the table view
		androidDeleteRowFlag = false;
	}
}

// Event listener for deleting any row of the table view
function DeletePressed(e) {
	deleteAddableField(userDataInArrays, e.source.fieldType, e.source.fieldValue);	// editProfileHelper.js
}

// Event listener for clicking the primary phone number
function PrimaryPhoneTextLongclick(e) {
	alert("How will we allow the user to change primary phone ?\nMaybe with FTR.");
}

// Event listener for value labels' to save their current text before edidting and displaying edit view
function ValueLabelClicked(e) {
	DisplayEditView(e.source);	// Display the editing view and passing the required info to it
	
	clickedTextField = e.source;	// Copy current text
	if(e.source.fieldType && clickedTextField.text != clickedTextField.hintText)
		addableTextOldValue = e.source.text;	// Copy current text if exists in a temp var as old text to use with changes
	else addableTextOldValue = "";	// If empty, compare new text with empty text
}

// Event listener for android work around that 
function EditViewTextChanged(e) {
	if($.editViewContainer.editView.visible == false) return;	// Do nothing if the view is not visible
	
	clickedTextField.text = $.editViewContainer.fieldValue.value;	// Copy the new text to the label on change 
	
	// Workaround for hint text to give UX of text fields 
	if($.editViewContainer.fieldValue.value == "") {
		clickedTextField.text = clickedTextField.hintText;
		clickedTextField.color = "#C8C8C8";
	} else clickedTextField.color = "black";
	
	// Workaround for change events of text fields
	// First case is an addable field
	if(clickedTextField.fieldType) AddableFieldTextChanged();
	// Else, non addable field
	else NonAddableFieldTextChanged();
}

// Event listener that hide the edit view, fired when the low opacity views are clicked
function EditViewBlur() {
	$.editViewContainer.editView.visible = false;
	$.editViewContainer.fieldValue.blur();
	$.editViewContainer.fieldValue.value = "";
	
	// Android work around for shit !!!!!	Android is full of shit
	if(OS_ANDROID) {
		$.tableView.appendRow(Ti.UI.createTableViewRow());
		//alert($.tableView.sections[0].rows.length - 1);
		$.tableView.deleteRow($.tableView.sections[0].rows.length - 1);
	}
}

// Event listener for clicking on the privacy label, it shows the privacy picker
function PrivacyLabelClicked(e) {
	$.pickerContainer.pickerView.visible = true;
	$.pickerContainer.picker.setSelectedRow(0, privacyIndex[e.source.text], { animated: true });
	clickedPrivacyLabel = e.source;
}

// Event listener that handles changing the selected privacy from the picker
function SelectedPrivacyChanged(e) {
	// Change the user's data privacy on change of the picker's rows
	var newPrivacy = $.pickerContainer.picker.getSelectedRow(0).title;
	if(OS_ANDROID && newPrivacy == "                                             ") {
		$.pickerContainer.picker.setSelectedRow(0, 3);
		var newPrivacy = $.pickerContainer.picker.getSelectedRow(0).title;
	}
	
	if(clickedPrivacyLabel.id) // Non addable field
		changePrivacyOfNonAddableField(userDataInArrays, clickedPrivacyLabel.id, newPrivacy);	// editProfileHelper.js
	// Next function --> editProfileHelper.js
	else changePrivacyOfAddableField(userDataInArrays, clickedPrivacyLabel.fieldType, clickedPrivacyLabel.text, newPrivacy);
		
	clickedPrivacyLabel.text = newPrivacy; 	// Apply this change to the privacy label's text
}

// An event listener that dismisses the picker wether on iOS or android
function DismissPicker() {
	// Just dismiss the picker
	$.pickerContainer.pickerView.visible = false;
}
//////////////////////////////////////////////////////////////////////////////////////// END OF EVENT LISTENRES


//////////////////////////////////////////////////////////////////////////////////////// UI
// A function that displays the edit view and passes the required information to it
function DisplayEditView(clickedLabel) {
	$.editViewContainer.editView.visible = true;
	$.editViewContainer.fieldTitle.text = "Type " + clickedLabel.hintText;	// Use hint text as description title
	$.editViewContainer.fieldValue.hintText = clickedLabel.hintText;
	
	// Copy label's text if exist to text field
	if(clickedLabel.text != clickedLabel.hintText) $.editViewContainer.fieldValue.value = clickedLabel.text;
	$.editViewContainer.fieldValue.keyboardType = clickedLabel.keyboardType;
	$.editViewContainer.fieldValue.focus();
}

// A function for text change in non addable fields
function NonAddableFieldTextChanged(e) {
	changeValueOfNonAddableField(userDataInArrays, clickedTextField.id, clickedTextField.text);	// editProfileHelper.js
}

// A function for text change in addable fields
function AddableFieldTextChanged(e) {
	// Next function --> editProfileHelper.js
	changeValueOfAddableField(userDataInArrays, clickedTextField.fieldType, addableTextOldValue, clickedTextField.text);
	if(clickedTextField.text != clickedTextField.hintText) addableTextOldValue = clickedTextField.text;
	else addableTextOldValue = "";
}

// A function that adds a new row after the incoming row number
function AddNewRowAfter(data, rowNum) {
	// Create the field's title label
	var fieldTitleLabel = Ti.UI.createLabel({
		text: data.TextOfFieldTitle
	});
	$.addClass(fieldTitleLabel, "fieldTitleLabel");

	// Create the field's value text field
	var fieldTextField = Ti.UI.createLabel({
		text: data.TextOfField != "" ? data.TextOfField : data.HintTextOfField,
		hintText: data.HintTextOfField,
		fieldType: data.FieldType,	// Used in editing the addable fields, to know the array that should be processed
		keyboardType: data.KeyboardType,
		keyboardToolbar: data.KeyboardToolbar,
	});
	// After applying the class with gray color, must check if it's hint text or value text
	$.addClass(fieldTextField, "fieldText");
	if(data.TextOfField != "") fieldTextField.color = 'black';
	fieldTextField.addEventListener("click", ValueLabelClicked);
	
	// Create the field's privacy label
	var privacyLabel = Ti.UI.createLabel({
		text: data.TextOfPrivacy,
		fieldType: data.FieldType,	// Used in editing the addable fields' privacy, to know the array that should be processed
	});
	privacyLabel.addEventListener("click", PrivacyLabelClicked);
	$.addClass(privacyLabel, "privacyLabel");
	
	// Create the field's row
	var newRow = Ti.UI.createTableViewRow({
		fieldType: data.FieldType,
		fieldValue: data.TextOfField	// Used in deleting the row, to get the value's index in the array
	});
	$.addClass(newRow, "fieldRow");
	
	newRow.add(fieldTitleLabel);
	newRow.add(fieldTextField);
	newRow.add(privacyLabel);
	
	// Add a remove row image view for android
	if(OS_ANDROID) {
		var removeIcon = Ti.UI.createImageView();
		removeIcon.addEventListener("click", function() { androidDeleteRowFlag = true; });
		$.addClass(removeIcon, "removeRowImage");
		newRow.add(removeIcon);
	}
	
	$.tableView.insertRowAfter(rowNum, newRow, { animated: true });
}

//////////////////////////////////////////////////////////////////////////////////////// END OF UI


//////////////////////////////////////////////////////////////////////////////////////// PICKER EVENT LISTENERS
// Adding chnage event listener to picker which handles the change of the selected privacy for both platforms
$.pickerContainer.picker.addEventListener("change", SelectedPrivacyChanged);

// Adding event listeners to dismiss the picker; on toolbar's done button for iOS, and of the transparent views for android
$.pickerContainer.transparentView1.addEventListener("click", DismissPicker);

if(OS_IOS) $.pickerContainer.btn_toolBarDone.addEventListener("click", DismissPicker);
else if(OS_ANDROID) $.pickerContainer.transparentView2.addEventListener("click", DismissPicker);
//////////////////////////////////////////////////////////////////////////////////////// END OF PICKER EVENT LISTENERS

//////////////////////////////////////////////////////////////////////////////////////// EDIT VIEW EVENT LISTENERS
$.editViewContainer.cancelView1.addEventListener('click', EditViewBlur);
$.editViewContainer.cancelView2.addEventListener('click', EditViewBlur);
$.editViewContainer.fieldValue.addEventListener('return', EditViewBlur);
$.editViewContainer.fieldValue.addEventListener('change', EditViewTextChanged);
//////////////////////////////////////////////////////////////////////////////////////// END OF EDIT VIEW EVENT LISTENERS
