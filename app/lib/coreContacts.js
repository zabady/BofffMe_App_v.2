////////////////////////////////////////////////////////////////////////////////////////// DEFINING VARIABLES
// This variable will contain all contacts read from the device
var contacts = [];

// This array will be used to check for repeated numbers retreived from the device's contacts
var repeatedNumberCheck = [];


////////////////////////////////////////////////////////////////////////////////////////// DEFINING PUBLIC FUNCTIONS
/*
 * Defining a function that:
 * - Checks for contacts access authorization
 * - Reads the user's contact list and process them
 * - Send them to the server to check for whom is a bofff me user and receive their info 
 * - Add friendship between the user and each bofff me contact received from the server
 * - Create a database for those bofff me user's
 * 
 * --> This function returns three different objects according to the case of the app
 * 1. Returns the string "ContactsAccessDenied" if the app is not authorized to access the device's contacts
 * 2. Returns the string "NoFriendsFoundOnServer" if none of the user's contacts is a bofff me user
 * 3. Returns the object "userFriends" if the user has at least one friend (bofff me user found in his contacts)
 */
function processContactsForFirstTime() {
	
	// Checks for contacts access authorization
	if(!checkContactsAccess()) return "ContactsAccessDenied";
	
	// Read contats from device and sort them
	readContacts();
	
	// Process each contact and receive the array containg each in-form phone number associated with contact's id on device
	var allContactsPhoneNumbersAndIdsInCorrectForm = editContactsToCorrectForm();
}


////////////////////////////////////////////////////////////////////////////////////////// DEFINING PRIVATE FUNCTIONS

// Defining a function that checks if contacts access were authorized or unknown
function checkContactsAccess() {
	if (Ti.Contacts.contactsAuthorization == Ti.Contacts.AUTHORIZATION_AUTHORIZED) {
	    return true;
	}
	else if (Ti.Contacts.contactsAuthorization == Ti.Contacts.AUTHORIZATION_UNKNOWN) {
	    Ti.Contacts.requestAuthorization(function(e) {
	        if (e.success) return true;
			else return false;
			// TODO: Should be replaced by return e.success
	    });
	} else return false;
}


// Defining a function that reads contacts from device and then sort them with the help of sortContacts function
function readContacts() {
	sortedContacts = Ti.Contacts.getAllPeople();
 	sortedContacts.sort(sortContacts);
}


// Defining a function that process each phone number for each read contact and put it in the right form
// TODO: Checking country code should be here
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
	
	return allContactsPhoneNumbersAndIds;
}


////////////////////////////////////////////////////////////////////////////////////////// DEFINING PRIVATE FUNCTIONS HELPERS
// TODO: I don't know are sorting methods important or not, must check for that
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

// TODO: I don't know are sorting methods important or not, must check for that
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

// Defifing a function that process the number and removes any character
// TODO: Checking country code should be here
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
