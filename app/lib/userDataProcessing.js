/*
 * This lib file will contain functions that process the user's data and simplify using it during the app
 */

// A function that copies an object creating a new copy for refrences inside 
function copyObjectAndReturnRefrence(obj) {
	var newObj = {};
	
	for( var key in obj )
	     newObj[ key ] = obj[ key ];
	     
     return newObj;
}

// A function that converts the addable fields splitted by $ to an array
function convertAddableFieldsToArrays(dataInStrings) {
	var dataInArrays = copyObjectAndReturnRefrence(dataInStrings);

	for(var field in dataInStrings) 
	{
		switch(field)
		{
			case 'phone_numbers':
			case 'phone_numbers_privacy':
			case 'mails':
			case 'mails_privacy':
			case 'social_links':
			case 'social_links_privacy':
			case 'interests':
			case 'interests_privacy':
			case 'favorite_places':
			case 'favorite_places_privacy':
			{
				try {
					// Convert those fields' strings into arrays
					dataInArrays[field] = dataInArrays[field].split('$');
				}
				catch(exp) { /*TODO: remove this line*/ alert(exp); }
			}
		}
	}
	
	return dataInArrays;
}


// A function that converts the addable fields from an array to a string splitted by $
function convertAddableFieldsToStrings(dataInArrays) {
	var dataInStrings = copyObjectAndReturnRefrence(dataInArrays);
	
	for(var field in dataInArrays) 
	{
		switch(field)
		{
			case 'phone_numbers':
			case 'phone_numbers_privacy':
			case 'mails':
			case 'mails_privacy':
			case 'social_links':
			case 'social_links_privacy':
			case 'interests':
			case 'interests_privacy':
			case 'favorite_places':
			case 'favorite_places_privacy':
			{
				try {
					// Convert those fields' arrays into strings
					dataInStrings[field] = dataInStrings[field].join('$');
				}
				catch(exp) { /*TODO: remove this line*/ alert(exp); }
			}
		}
	}
	
	return dataInStrings;
}

// Defining a function that changes the value of nonaddable field
function changeValueOfNonAddableField(userDataInArrays, fieldName, newValue) {
	try {
		userDataInArrays[fieldName] = newValue;
	}
	catch(exp) { /*TODO: remove this line*/ alert(exp); }
}

// Defining a function that changes the value of unaddable field's privacy
// Same function as above but used for future work
function changePrivacyOfNonAddableField(userDataInArrays, fieldPrivacyName, newValue) {
	try {
		userDataInArrays[fieldPrivacyName] = newValue;
	}
	catch(exp) { /*TODO: remove this line*/ alert(exp); }
}

// Defining a function that deletes a field
function deleteAddableField(userDataInArrays, fieldType, value) {
	try {
		var index = userDataInArrays[fieldType].indexOf(value);
		userDataInArrays[fieldType].splice(index, 1);
		userDataInArrays[fieldType + "_privacy"].splice(index, 1);
	}
	catch(exp) { /*TODO: remove this line*/ alert(exp); }
}

// A function that adds a new field to the user's data
function addNewFieldToUserData(userDataInArrays, fieldType) {
	try {
		userDataInArrays[fieldType].push("");
		// TODO: Handle Privacy
		userDataInArrays[fieldType + "_privacy"].push("public");
	}
	catch(exp) { /*TODO: remove this line*/ alert(exp); }
}

// A function that changes the addable fields' value
function changeValueOfAddableField(userDataInArrays, fieldType, oldValue, newValue) {
	try {
		var index = userDataInArrays[fieldType].indexOf(oldValue);
		userDataInArrays[fieldType][index] = newValue;
	}
	catch(exp) { /*TODO: remove this line*/ alert(exp); }
}

// A function that changes the addable field's privacy
function changePrivacyOfAddableField(userDataInArrays, fieldType, oldPrivacy, newPrivacy) {
	try {
		var index = userDataInArrays[fieldType + "_privacy"].indexOf(oldPrivacy);
		userDataInArrays[fieldType + "_privacy"][index] = newPrivacy;
	}
	catch(exp) { /*TODO: remove this line*/ alert(exp); }
}
