Ti.include("/userDataProcessing.js");

var args = arguments[0] || {};	// TODO: Not used

//////////////////////////////////////////////////////////////////////////////////////// LOGIC
// Initialize userDataInArrays here as this is the first required view
userDataInArrays = convertAddableFieldsToArrays(userData); // Convert the addable fields into arrays	// userDataProcessing.js

// TODO: Remaining Shit
// TODO: Add new row to the end of the fields' rows
// TODO: Handle changing the primary phone number
// TODO: Handle skype name and BBM pin number
// TODO: Replace TextFields with Labels for Android

//////////////////////////////////////////////////////////////////////////////////////// END OF LOGIC


//////////////////////////////////////////////////////////////////////////////////////// DISPLAY USER DATA
// Loop over the table view children to bind data
var rows = $.tableView.sections[0].rows;
for(var i = 0; i < rows.length; i ++) { 	// Loop over the table view rows
	var children = rows[i].children;
	for(var j = 0; j < children.length; j++) {	// Loop over the current's row children
		switch(children[j].id) {
			case 'primary_mobile':
			case 'primary_email':
				children[j].value = userData[children[j].id];
				break;
			
			case 'primary_mobile_privacy':
			case 'primary_email_privacy':
				children[j].text = userData[children[j].id];
		}
	}
}

// Loop over the user emails
for(var i = userDataInArrays.mails.length - 1; i >= 0; i--) {
	// Create the data that will be displayed for each mail and send it to addNewRow with the index of the row
	var data = createBindingRowData(userDataInArrays.mails[i], userDataInArrays.mails_privacy[i], false);
	addNewRowAfter(data, 4);
}

// Loop over the user phone numbers
for(var i = userDataInArrays.phone_numbers.length - 1; i >= 0; i--) {
	// Create the data that will be displayed for each mail and send it to addNewRow with the index of the row
	var data = createBindingRowData(userDataInArrays.phone_numbers[i], userDataInArrays.phone_numbers_privacy[i], true);
	addNewRowAfter(data, 1);
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

var addNewRow = false;	// Used to flag that the add button was clicked
var addableTextOldValue = "";	// Used to know the old field's value when focused before editing, to get its index in array
var clickedPrivacyLabel;	// Used to save the label that was clicked to edit it when the picker's value changes
var privacyIndex = { public:0, friends:1, favorites:2, onlyMe:3 };	// Used to update the picker selected row with current privacy
var clickedTextField;	// Used to save the clicked text field, to be able to blur its keybaord
if(OS_ANDROID) var androidDeleteRowFlag = false;	// Used to flag that remove icon was pressed for android

// Event listener for clicking the add row button that turns the flag to true
function AddRowButtonClicked() {
	addNewRow = true;
}

// Event listener to table view clicks which adds a new row if the flag is on
function TableViewRowClicked(e) {
	if(addNewRow) {
		// Add it to the user's data, the call is by reference, so no need to wait a returning value
		addNewFieldToUserData(userDataInArrays, e.row.isPhone > 0 ? "phone_numbers" : "mails");
		
		// Add it to the UI
		var data = createBindingRowData("", "public", e.row.isPhone > 0);
		addNewRowAfter(data, e.index + 1);
		addNewRow = false;
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
	// TODO: Add an alert dialog to confirm deleting
	deleteAddableField(userDataInArrays, e.source.fieldType, e.source.fieldValue);	// userDataProcessing.js
}

// Event listener for clicking the primary phone number
function PrimaryPhoneTextLongclick(e) {
	alert("How will we allow the user to change primary phone ?\nMaybe with FTR.");
}

// Event listener for addable fields' text fields to get their current value before edidting
function TextFieldFocused(e) {
//////////////////////////////////////////////////////////////////////////////// ANDROID WORK AROUND
	if(OS_ANDROID) {
		e.source.blur();
		$.androidEditView.visible = true;
		$.fieldTitle.text = "Type " + e.source.hintText;
		$.fieldValue.hintText = e.source.hintText;
		$.fieldValue.value = e.source.value;
		$.fieldValue.keyboardType = e.source.keyboardType;
	}
	else if(OS_IOS && clickedPrivacyLabel) $.pickerContainer.btn_toolBarDone.fireEvent("click");
	
	if(e.source.fieldType) addableTextOldValue = e.source.value;
	clickedTextField = e.source;
}

//////////////////////////////////////////////////////////////////////////////// ANDROID WORK AROUND
// Event listener for android work around that 
function AndroidEditViewTextChanged(e) {
	clickedTextField.value = $.fieldValue.value;
}

// Event listener that hide android edit view, fired when the low opacity views are clicked
function AndroidEditViewBlur() {
	$.androidEditView.visible = false;
}

// Event listener for text change in non addable fields
function NonAddableTextChanged(e) {
	changeValueOfNonAddableField(userDataInArrays, e.source.id, e.source.value);	// userDataProcessing.js
}

// Event listener for text change in non addable fields
function AddableTextChanged(e) {
	changeValueOfAddableField(userDataInArrays, e.source.fieldType, addableTextOldValue, e.source.value);	// userDataProcessing.js
	addableTextOldValue = e.source.value;
}

// Event listener for clicking on the privacy label, it shows the privacy picker
function PrivacyLabelClicked(e) {
	DismissKeyboardClicked();
	// TODO: Handle ios picker and undo commenting next 2 lines
	//$.pickerContainer.pickerView.visible = true;
	//$.pickerContainer.picker.setSelectedRow(0, privacyIndex[e.source.text], { animated: true });
	clickedPrivacyLabel = e.source;
}

// An event listener that listens to Done button in decimal pad toolbar to dismiss it on ios
function DismissKeyboardClicked() {
	if(clickedTextField) clickedTextField.blur();
}
//////////////////////////////////////////////////////////////////////////////////////// END OF EVENT LISTENRES


//////////////////////////////////////////////////////////////////////////////////////// UI
// A function that adds a new row after the incoming row number
function addNewRowAfter(data, rowNum) {
	// Create the field's title label
	var fieldTitleLabel = Ti.UI.createLabel({
		text: data.TextOfFieldTitle
	});
	$.addClass(fieldTitleLabel, "fieldTitleLabel");

	// Create the field's value text field
	var fieldTextField = Ti.UI.createTextField({
		value: data.TextOfField,
		hintText: data.HintTextOfField,
		fieldType: data.FieldType,	// Used in editing the addable fields, to know the array that should be processed
		keyboardType: data.KeyboardType,
		keyboardToolbar: data.KeyboardToolbar,
	});
	fieldTextField.addEventListener("change", AddableTextChanged);
	fieldTextField.addEventListener("focus", TextFieldFocused);
	$.addClass(fieldTextField, "fieldText");
	
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
if(OS_IOS) {
	$.pickerContainer.picker.addEventListener("change", function(e) {
		// Change the user's data privacy on change of the picker's rows
		var newPrivacy = $.pickerContainer.picker.getSelectedRow(0).title;
		
		if(clickedPrivacyLabel.id) // Non addable field
			changePrivacyOfNonAddableField(userDataInArrays, clickedPrivacyLabel.id, newPrivacy);	// userDataProcessing.js
		else changePrivacyOfAddableField(userDataInArrays, clickedPrivacyLabel.fieldType, clickedPrivacyLabel.text, newPrivacy);	// userDataProcessing.js
			
		clickedPrivacyLabel.text = newPrivacy;
	});
	$.pickerContainer.btn_toolBarDone.addEventListener("click", function() {
		// Just dismiss the picker
		$.pickerContainer.pickerView.visible = false;
	});
}
//////////////////////////////////////////////////////////////////////////////////////// END OF PICKER EVENT LISTENERS
