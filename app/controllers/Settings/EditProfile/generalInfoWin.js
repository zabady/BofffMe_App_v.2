
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
			case 'fullName':
			case 'marital_status':
			case 'marital_status_privacy':
			case 'residence':
			case 'residence_privacy':
			case 'birthday_date_privacy':
			case 'gender_privacy':
			
				if(userData[children[j].id] != "" && userData[children[j].id] != null) {
					children[j].text = userData[children[j].id];
					children[j].color = 'black';
				}
				break;
			
			
			case 'birthday_date':
				if(userData[children[j].id] != "" && userData[children[j].id] != null) {
					var date = userData[children[j].id];
					date.split("/");
					var dateArray = date.split("/");
					$.birthday_date.value = new Date(dateArray[2], dateArray[1], dateArray[0]);
				}
				break;
				
			
			case 'gender':
				if(userData[children[j].id] != "" && userData[children[j].id] != null) {
					GenderSelected({
						source: {
							id: ("img_gender_" + userData[children[j].id]).toLowerCase(),
						}
					});
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

// An event listener that handles the user's birthday date
function BirthDay(e) {
	// TODO: Hanlde Android Key-fuckin-board
	// Process the date
	var dateArray = [];
	dateArray[0] = e.source.value.getDate();
	dateArray[1] = e.source.value.getMonth() + 1;
	dateArray[2] = e.source.value.getFullYear();
	var date = dateArray.join('/');
	
	// Then save the new date to userDataInArrays here not in editProfileHelper because it's one of a kind way of editing
	if(date != userDataInArrays.birthday_date) {
		userDataInArrays.birthday_date = date;
	}
}

// An event listener that handles gender
function GenderSelected(e) {
	if(e.source.id == "img_gender_male") {
		$.lbl_gender_male.font = { fontSize: "20" };
		$.lbl_gender_female.font = { fontSize: "17" };;
		$.lbl_gender_male.color = "#2279bc";
		$.lbl_gender_female.color = "gray";
		$.img_gender_male.image = "/images/gender_male.png";
		$.img_gender_female.image = "/images/gender_female[shaded].png";
		userDataInArrays.gender = "Male";
	} else {
		$.lbl_gender_male.font = { fontSize: "17" };
		$.lbl_gender_female.font = { fontSize: "20" };;
		$.img_gender_male.image = "/images/gender_male[shaded].png";
		$.img_gender_female.image = "/images/gender_female.png";
		$.lbl_gender_male.color = "gray";
		$.lbl_gender_female.color = "#2279bc";
		userDataInArrays.gender = "Female";
	}
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
function NonAddableFieldTextChanged() {
	changeValueOfNonAddableField(userDataInArrays, clickedTextField.id, clickedTextField.text);	// editProfileHelper.js
}

// A function for text change in addable fields
function AddableFieldTextChanged() {
	// Next function --> editProfileHelper.js
	changeValueOfAddableField(userDataInArrays, clickedTextField.fieldType, addableTextOldValue, clickedTextField.text);
	if(clickedTextField.text != clickedTextField.hintText) addableTextOldValue = clickedTextField.text;
	else addableTextOldValue = "";
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
