
//////////////////////////////////////////////////////////////////////////////////////// INITIALIZING VARIABLES
// userDataInArrays is initialized in contactInfoWin as it is the first required view in the Edit Profile TabGroup
// So, it's used here with no need to initialize it again

var addNewRowFlag = false;	// Used to flag that the add button was clicked
var addableTextOldValue = "";	// Used to know the old field's value when focused before editing, to get its index in array
var clickedPrivacyLabel;	// Used to save the label that was clicked to edit it when the picker's value changes
var privacyIndex = { public:0, friends:1, favorites:2, onlyMe:3 };	// Used to update the picker selected row with current privacy
var clickedTextField;	// Used to save the clicked text field, to be able to blur its keybaord
if(OS_ANDROID) var androidDeleteRowFlag = false;	// Used to flag that remove icon was pressed for android
//////////////////////////////////////////////////////////////////////////////////////// END OF INITIALIZING VARIABLES


//////////////////////////////////////////////////////////////////////////////////////// DISPLAY USER DATA
// Loop over the table view children to bind data
var rows = $.tableView.sections[0].rows;
for(var i = 0; i < rows.length; i ++) { 	// Loop over the table view rows
	var children = rows[i].children;
	for(var j = 0; j < children.length; j++) {	// Loop over the current's row children
		switch(children[j].id) {
			case 'job_title':
			case 'company':
			case 'education':
			case 'job_title_privacy':
			case 'company_privacy':
			case 'education_privacy':
			
				if(userData[children[j].id] != "" && userData[children[j].id] != null) {
					children[j].text = userData[children[j].id];
					children[j].color = 'black';
				}
		}
	}
}
//////////////////////////////////////////////////////////////////////////////////////// END OF DISPLAY USER DATA


//////////////////////////////////////////////////////////////////////////////////////// EVENT LISTENRES
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
	NonAddableFieldTextChanged();
	
	// NOTE: Uncomment the next lines when this tab contains AddableFields
	// // First case is an addable field
	// if(clickedTextField.fieldType) AddableFieldTextChanged();
	// // Else, non addable field
	// else NonAddableFieldTextChanged();
}

// Event listener that hide the edit view, fired when the low opacity views are clicked
function EditViewBlur() {
	$.editViewContainer.editView.visible = false;
	$.editViewContainer.fieldValue.blur();
	$.editViewContainer.fieldValue.value = "";
	
	// Android work around for shit !!!!!	Android is full of shit
	if(OS_ANDROID) {
		$.tableView.appendRow(Ti.UI.createTableViewRow());
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

// NOTE: Uncomment the next lines when this tab contains AddableFields
// // A function for text change in addable fields
// function AddableFieldTextChanged(e) {
	// // Next function --> editProfileHelper.js
	// changeValueOfAddableField(userDataInArrays, clickedTextField.fieldType, addableTextOldValue, clickedTextField.text);
	// if(clickedTextField.text != clickedTextField.hintText) addableTextOldValue = clickedTextField.text;
	// else addableTextOldValue = "";
// }
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
