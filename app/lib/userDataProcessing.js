/*
 * This lib file will contain functions that process the user's data and simplify using it during the app.
 * 
 * Note that any method called by an array takes the array as a reference, so, no need to save returning 
 * array as it's already processing the one called the function.
 * 
 * Validators should not be used outside this file, we only validate some fields before posting them to the server.
 * Only for better UX, these validators can be used in the UI layer.
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
		/* Splice deletes an element from the array then resets the indexes of 
		 * the array's to match the new elements minus the deleted one.
		 * Note that no need to save the returning array as we call the function by the reference of current array */
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

// A fucntion that post updates to the server
function postUserDataUpdatesOnServer(oldUserDataInStrings, newUserDataInArrays) {
	
	// TODO: Make sure that there is at least one change (Ask zeez first if he is handling such case)
	
	// If any field is not valid, return with the validation msg that will contain the error
	var validationMsg = validateAddableFields(newUserDataInArrays);
	if(validationMsg.search("Wrong") >= 0) return validationMsg;
	
	try {
		var bofffsSpecificData = Titanium.App.Properties.getObject("bofffsSpecificData");
		var userUpdatesInStrings = convertAddableFieldsToStrings(newUserDataInArrays);
		// TODO: comment or uncomment the next line to not send or send the data to the server
		//updateBofff(Alloy.Globals.userPin, oldUserDataInStrings, userUpdatesInStrings, bofffsSpecificData);
		//sendPushNotificationToFriends();
		Ti.include('/pushNotificationAPIs.js');
		NotifyAllUserFriendsWithMessage(newUserDataInArrays.fullName + ' has updated his profile, click here so these updates are applied to your phonebook.',
										'test');
	}
	catch(exp) { /*TODO: remove this line*/ alert(exp); }
	finally{ return ""; }
}


//////////////////////////////////////////////////////////////////////////////////////////////////// VALIDATORS
// A function that validates the addable fields, checks wether if they empty or unvalid
function validateAddableFields(userDataInArrays) {
	// Validate all phone numbers
	for(var i = 0; i < userDataInArrays.phone_numbers.length; i++) {
		// If empty, delete it and minus one from the counter as the array will lose one element
		if(userDataInArrays.phone_numbers[i] == null || userDataInArrays.phone_numbers[i] == "") {
			Ti.API.info("I will delete an empty phone");
			deleteAddableField(userDataInArrays, "phone_numbers", "");
			i--;
		}
			
		else if(!validatePhoneNumber(userDataInArrays.phone_numbers[i])) return "Wrong phone number.";
	}
	
	// Validate all emails	
	for(var i = 0; i < userDataInArrays.mails.length; i++) {
		// If empty, delete it and minus one from the counter as the array will lose one element
		if(userDataInArrays.mails[i] == null || userDataInArrays.mails[i] == "") {
			Ti.API.info("I will delete an empty email");
			deleteAddableField(userDataInArrays, "mails", "");
			i--;
		}
			
		else if(!validateEmail(userDataInArrays.mails[i])) return "Wrong email address.";
	}
	
	// Validate primary email
	if(!validateEmail(userDataInArrays.primary_email)) return "Wrong primary email address.";
	
	return "No problems.";
}

// A function that validates a phone number
function validatePhoneNumber(phoneNumber) {
	var phoneNumberRegex = /^[0-9]{9,15}$/;
	
	if (phoneNumber.match(phoneNumberRegex)) return true;
	else return false;
}

// A function that validates an email address
function validateEmail(email) {
	var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	
	if (email.match(emailRegex)) return true;
	else return false;
}


// A function that sends push notifications to user's friends notifying them that he has made some changes to his profile
function sendPushNotificationToFriends() {
	var xhr = Ti.Network.createHTTPClient(
	{
		onload: function(e) 
	    {
	    	var deviceTokens = JSON.parse(this.responseText); 
	    	alert(deviceTokens);
	    	notifyFriends(notifyFriends);
	    },
	    onerror: function(e)
	    {
	    	alert(this.responseText);
	    },
	});
	xhr.open("POST", Alloy.Globals.apiUrl + "return_device_tokens_of_friends_in_string/" + Alloy.Globals.userPin);
	xhr.send();
}

// A function that sends the push notification 
function notifyFriends(friendsDeviceTokens) {
	
	// Require in the Cloud module
	var Cloud = require("ti.cloud");
	
	Cloud.PushNotifications.notifyTokens({
        to_tokens: 'everyone',
        channel: 'test',
        payload: 'Test-test, ' + new Date()
    }, function (e) {
        if (e.success) {
            alert('Push notification sent');
        } else {
            alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
        }
    });
	
	// Sends an 'This is a test.' alert to specified device if its subscribed to the 'test' channel.
    // Cloud.PushNotifications.notifyTokens({
        // to_tokens: friendsDeviceTokens,
        // channel: 'test',
//         
        // payload: {
        	// "customField" : "Any Custom Data",
//         	
        	// "title" : "Friend Profile Updated !",	// Android only
        	// "icon" : "appicon",						// Android only
        	// "vibrate" : true,						// Android only
		    // "sound" : "default",
// 		    
		    // "alert" : "One of your friends has just updated his profile, click here so these updates are applied to your phonebook ;)",
		// }
//         
    // }, function (e) {
        // if (e.success) {
            // alert('Push notification sent');
        // } else {
            // alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
        // }
    // });
}
