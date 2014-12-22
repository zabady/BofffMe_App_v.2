// TODO: Think about reload event listener for contacts
// TODO: The new contacts' algorithm should replace findBofffs function
// TODO: Icon and Profile Picture are not working
// TODO: If no profile picture, display bofffContact icon from images folder


// This variable will contain all contacts read from the device
var sortedContacts = [];

var repeatedNumberCheck = [];

// This is to check if the user allows the access to his phonebook or not
if (Ti.Contacts.contactsAuthorization == Ti.Contacts.AUTHORIZATION_AUTHORIZED)
{
    performAddressBookFunction();
}
else if (Ti.Contacts.contactsAuthorization == Ti.Contacts.AUTHORIZATION_UNKNOWN)
{
    Ti.Contacts.requestAuthorization(function(e){
        if (e.success) {
            performAddressBookFunction();
        } else {
            contactsAccessDenied();
        }
    });
}
else
{
    contactsAccessDenied();
}


// This is in case the user didn't allow to access his phonebook
function contactsAccessDenied() {
	var noContactAccessView = Alloy.createController("Contacts/noContactAccessWin");
	$.win_boffsList.add(noContactAccessView.getView());
};


// This is to read the contacts from the user's phonebook
function performAddressBookFunction()
{  
	var contacts = Ti.Contacts.getAllPeople();
 	
	for (var x in contacts)
	{
		sortedContacts.push(contacts[x]);
	}
    
 	// TODO: BUG FOUND --> sortedContacts.sort(sortContacts);
 	
 	//sortedContacts = Ti.Contacts.getAllPeople();
 	//sortedContacts.sort(sortContacts);
 	
 	sortedContacts.sort();
 	editContactsToCorrectForm();
}


// Defining a function to sort contacts using it, it's an optional paramter sent to the function sort of arrays
// This is to sort the contacts alphabetically
function sortContacts(a, b) {
    if (a.fullName.toUpperCase() > b.fullName.toUpperCase())
    {
        return 1;
    } 
    else if (a.fullName.toUpperCase() < b.fullName.toUpperCase()) 
    {
        return -1;
    }
    return 0;
}


// The same idea of the previous function, but it's for bofff friends but with their names' on the user's device, not on the server
// This is to sort the bofffs alphabetically
function sortBofffs(a, b) {
    if (a.contactName.toUpperCase() > b.contactName.toUpperCase())
    {
        return 1;
    } 
    else if (a.contactName.toUpperCase() < b.contactName.toUpperCase()) 
    {
        return -1;
    }
    return 0;
}


// TODO: Bug found, when country code exists without the begining of neither '+' nor '00'
// TODO: Try to found a better way to put country code, check this library "https://code.google.com/p/libphonenumber/"
// Defifing a function that process the number and removes any character
// function removeCharactersFromPhoneNumber(phoneNumber) {
// 	
	// // The expression used to make sure that the phone number is in the correct form
	// var phoneNumberExpression = /^\d+$/;
// 	
	// var correctPhoneNumber = "";
// 	
	// // Defining a flag for noCountryCode and turn it on if the phone number doesn't contain one
	// var noCountryCodeFlag = false; 
	// if(phoneNumber[0] != '+' && !(phoneNumber[0] == '0' && phoneNumber[1] == '0')) noCountryCodeFlag = true;
// 	
	// if(!phoneNumberExpression.test(phoneNumber)) {
		// for(var character in phoneNumber) {
			// if(phoneNumberExpression.test(phoneNumber[character])) {
				// correctPhoneNumber += phoneNumber[character];
			// }
		// }
	// } else correctPhoneNumber = phoneNumber;
// 	
	// correctPhoneNumber = parseInt(correctPhoneNumber, 10);	// Turn it to number to remove '00..' if it contains them
	// if(noCountryCodeFlag) {
		// correctPhoneNumber = '20' + correctPhoneNumber;	// TODO: Add the true country code
	// }
// 	
	// return correctPhoneNumber;
// }


// Defifing a function that process the number and removes any character
function removeCharactersFromPhoneNumber(phoneNumber) {
	
	// The expression used to make sure that the phone number is in the correct form
	var phoneNumberExpression = /^\d+$/;
	
	var correctPhoneNumber = "";

	if(!phoneNumberExpression.test(phoneNumber)) {
		for(var character in phoneNumber) {
			if(phoneNumberExpression.test(phoneNumber[character])) {
				correctPhoneNumber += phoneNumber[character];
			}
		}
	} else correctPhoneNumber = phoneNumber;
	
	return correctPhoneNumber;
}

// Defining a function that is used to eliminate processing saved-more-than-once phone numbers in device's contacts
function isRepeatedPhoneNumber(phoneNumber) {
	if(repeatedNumberCheck[phoneNumber] == null) {
		repeatedNumberCheck[phoneNumber] = 0;
		return false;
	} else {
		alert("Repeated number: " + phoneNumber);
		return true;
	}
}


// Gather contacts' numbers and change them to readable number string without special characters
function editContactsToCorrectForm()
{
	/* Defining an array that will contain all contacts phone numbers with the contact's id on the device
	 * Each item in the array will contain: {
	 *		number : "The phone number in the correct form with the country code",
	 * 		id : "The id of the contact's phone number on the device so we can retrieve its fullName after returning from server"
	 * }
	 */
	var allContactsPhoneNumbersAndIds = [];
	
	/* A variable used in getting and processing all phone numbers of each contact
	 * Phone numbers object returned from device's contacts is associative array of arrays, ex.:
	 * contactPhoneNumbers = {
	 * 		mobile: {
	 * 			(+2)555-666-777,
	 * 			(+995)111-222-333
	 * 		},
	 * 		work : {
	 * 			(+1)123-123-123,
	 * 			(+44)456-456-456
	 * 		},
	 * 		...
	 * }
	 */
	var contactPhoneNumbers;
	
	// Loop over each contact
	for(var contact in sortedContacts) {
		
		contactPhoneNumbers = sortedContacts[contact].getPhone();
		
		if (!isEmpty(contactPhoneNumbers)) {
			// Loop over each array inside phoneNumers, ex. mobile, work, home, etc.
			for (var i in contactPhoneNumbers) {
				// Loop over each phone number inside this array
				for (var num in contactPhoneNumbers[i]) {
					
					// First, check if the number is repeated, happens when the user is saving the same phone number more than once
					if(isRepeatedPhoneNumber(contactPhoneNumbers[i][num])) {continue; alert("continue");}
					
					// A variable that will contain the correct number after processing the one read from device's contacts
					var correctPhoneNumber = removeCharactersFromPhoneNumber(contactPhoneNumbers[i][num]);
					
					// Push the correct phone numbers with the id of the contact to "allContactsPhoneNumbersAndIds" array
					var numberAndId = {
						number: correctPhoneNumber,
						id: OS_IOS ? sortedContacts[contact].recordId : sortedContacts[contact].id
					};
					allContactsPhoneNumbersAndIds.push(numberAndId);
				}
			}
		}
	}
	
	// Then send these numbers to the bofffme DB to check whether this user has bofffs in his contacts or not
	findBofffs(allContactsPhoneNumbersAndIds);
}

// TODO: A lot of work should be done here, the new algorithm should replace this function
// This is to check whether or not these numbers are in our DB if yes
// Then this user is added as a friend and mapped to the contacts of the user
// After all friends are found a list of friends are sent to initialize bofffs list to create the bofffs list
function findBofffs(contactNumbers)
{
	// bofffFriends will capture the user's friends found on the DB
	var bofffFriends = [];
	
	//var contactNames = [];
	
	var xhr = Ti.Network.createHTTPClient(
	{
	    onload: function(e) 
	    {
	    	var bofffsData = [];
	    	
	    	// The next line should be receiving the user's friends on the DB
	    	bofffFriends = JSON.parse(this.responseText);
	    	
	    	// Display no friends window if non were found on the server, and then break
	    	if(isEmpty(bofffFriends)) {
	    		var noFriendsView = Alloy.createController("Contacts/noFriendsWin");
				$.win_boffsList.add(noFriendsView.getView());
				return;
	    	}
	    	
	    	// A loop over the user's friends to do some unkown stuff :D
	    	for(var record in bofffFriends)
	    	{
	    		// TODO: fullName should be replaced with other code because we had already imported all contacts
	    		var fullName = Titanium.Contacts.getPersonByID(bofffFriends[record].contact_id).fullName;
	    		
	    		bofffFriends[record].contactName = fullName;
	    		
	    		//contactNames.push(fullName);
	    		
	    		var data =
	    		{
	    			fullName : bofffFriends[record]['bofff'].fullName,
	    			icon_image : bofffFriends[record]['bofff'].icon_image,
	    			friend_pin_code : bofffFriends[record]['bofff'].pin,	
	    			user_pin_code : Alloy.Globals.userPin,
	    			contactName : fullName,
	    		};
	    		
	    		bofffsData.push(data);
	    	} // End of proccessing user's friends
	    	
	    	// Add friends to the user
	    	addFriend(bofffsData, bofffFriends);
	    	bofffFriends.sort(sortBofffs);
	    },
	    
	    onerror: function(e) {
	    	alert(this.responseText);
	    	alert("Error in findBofffs function in coreContactsWin.js");
	    },
	});
	
	var params = {
		numbers: JSON.stringify(contactNumbers),
		pin: Alloy.Globals.userPin,
	};
	
	xhr.open("POST", Alloy.Globals.apiUrl + "detect_user_friends_by_mobile/bofff");
	xhr.send(params);  // request is actually sent with this statement
}



// When the pin is sent back it saves it as a friend to this user
function addFriend(data, bofffFriends)
{
	var bofffsList = [];
	var xhr = Ti.Network.createHTTPClient(
	{
	    onload: function(e) 
	    {
	    	var response = JSON.parse(this.responseText);
	    	bofffsList=response.rows;
	    	
	    	//alert(bofffsList);
	    	
	    	if(bofffsList.length>0)
	    	{
		    	//This is to sort the bofffs alphabetically
		    	bofffsList.sort(sortBofffs);
		    	// TODO: Adding the bofffLists (friends from my prespective)
		    	
		    	// TODO: Study bofffsSpecificData well :D
		    	Titanium.App.Properties.setObject("bofffsSpecificData", bofffsList);
		    	initializeBofffsList(bofffFriends,bofffsList);
	    	}
	    	
		},
	    onerror: function(e) 
	    {
	    	alert(this.responseText);
	    },
	});
	
	xhr.open("POST", Alloy.Globals.apiUrl + "insert_friend/bofff/user_friends");
	var params =
	{
		friends: JSON.stringify(data),
	};
	xhr.send(params);  // request is actually sent with this statement
}


// This is to check if an object is empty or not
function isEmpty(obj)
{
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

// Send the pins of the bofffs friend to create a list with it
function initializeBofffsList(bofffFriends, bofffsList)
{
	var bofffContactsPayload =
	{
		// TODO: bofffList are my friends with their data from the server
		bofffFriends : bofffFriends,
		
		// TODO: bofffFiends are my friends from my prespective, it need's to be global
		bofffsList : bofffsList,
		
		//sortedContacts:sortedContacts,
	};
	
	bofffsContacts = Alloy.createController("Contacts/bofffsContacts", bofffContactsPayload);
	$.win_boffsList.add(bofffsContacts.getView());
}