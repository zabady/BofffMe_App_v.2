/* 1. Determine each update
 * 2. Apply each update (add or delete) to the selected contact
 * 3. Save contacts for iOS
 * 3. Remove the old contact and add a new one for android
 */

// TODO: Fix bug, cannot read property of null, contact.fullName

// Defining a new contact that will be used to insert a new contact for android
var contact = new Object();


// Initialize contact, note that the contact must be initialized before any processing 
function InitializeContact(id)
{
	contact = Titanium.Contacts.getPersonByID(id);
	alert("Initialize Contact: " + contact.fullName);
}


// This is where the contacts data are changed on the user's phonebook
function determineAndApplyUpdate(fieldType, stringObjects, addOrDelete, userFriendAppId, bofffsSpecificData, bofffsData)
{
	Ti.API.info("determineUpdateType");
	
	// TODO: Replace this with return statement
	if(contact == null) alert("Contact must be initialized ya beheema !");
	
	// TODO: Handle if addOrDelete
	switch(fieldType) {
		
		case "phone_number":
		case "mails":
		case "social_links":
		{
			// Create the type and key strings
			// TODO: Should be replaced on the server with the approperiate key
			var type, key;
			if(fieldType == "phone_number") {
				type = "phone";
				key = "mobile";
			}
			else if(fieldType == "mails") {
				type = "email";
				key = "work";
			}
			else {
				type = "url";
				key = "home";
			}
			
			if(addOrDelete == 'add') UpdateAddableField(type, key, stringObjects[fieldType]);
			else DeleteAddableField(type, stringObjects[fieldType]);
			
			break;
		}
		
		case "job_title":
		case "birthday_date":
		case "company":
		// TODO: Adding nickname if needed
		// TODO: Note if needed
		{
			var type;
			if(fieldType == "job_title") type = "jobTitle";
			else if(fieldType == "birthday_date") type = "birthday";
			else type = "company";
			
			UpdateNonAddableField(type, stringObjects[fieldType]);
			
			break;
		}
		
		case "residence":
			// TODO: Unimplemented
			break;
		
		default:
		{
			alert("ERROR: Field type is not recongnizable.");
			break;
		}
		
		
		/* TODO: It could be done like the first code to remove these if and else statements
		 * but it's better that these names are used to put the updates on the server and when that happens,
		 * there will be no need for these if and else statements
		 */
	}
}


/* Defining a function that updates an Addable field in phonebook, use this function with:
 * 1. Phone Numbers	--> fieldType = phone
 * 2. Emails		--> fieldType = email
 * 3. Social Links	--> fieldType = url
 */
function UpdateAddableField(fieldType, fieldKey, fieldValue)
{
	// fildKey is the key required to save the fieldType, ex. mobile: 01009091995, mobile is the key
	Ti.API.info("UpdateAddableField: " + fieldType + ", " + fieldKey + ", " + fieldValue);
	
	// TODO: Replace this with return statement
	if(contact == null) alert("Contact must be initialized ya beheema !");
	
	// Add the new addable field to its array in contact
	// If contact[fieldType] is not empty, append to it, else create a new array
	var fieldDictionary = contact[fieldType];	// A workaround for iOS
	try
	{
		fieldDictionary[fieldKey].push(fieldValue);
	}
	catch(exp)
	{
		fieldDictionary[fieldKey] = [fieldValue];
	}
	contact[fieldType] = fieldDictionary;
	alert(contact[fieldType]);
}


/* Defining a function that updates a NonAddable field in phonebook, use this function with:
 * 1. Nick Name --> fieldName = nickname
 * 2. Job Title	--> fieldName = jobTitle	--> iOS only
 * 3. Company	--> fieldName = organization
 * 4. Birthday	--> fieldName = birthday	--> Date format (fieldValue) is "yyyy-MM-ddTHH:mm:ss.SSS+0000"
 * 5. Note		--> fieldName = note
 */
function UpdateNonAddableField(fieldName, fieldValue)
{
	Ti.API.info("UpdateNonAddableField: " + fieldName + ", " + fieldValue);
	
	// TODO: Replace this with return statement
	if(contact == null) alert("Contact must be initialized ya beheema !");
	
	// Job title is supported only by iOS
	if(fieldName == "jobTitle" && OS_ANDROID) return;
	
	// Add "Bofff Me:" to nickname
	if(fieldName == "nickname") fieldName = "Bofff Me: " + fieldName;
	
	contact[fieldName] = fieldValue;
}


/* Take a copy of the addable dictionary NOTE: workaround for iOS, cannot process for example contact.phone
 * Create a new dictionary that will not contain the valueToBeDeleted.
 * Then replace replace the original dictionary with the new one.	Works on:
 * 1. Phone Numbers	--> fieldType = phone
 * 2. Emails		--> fieldType = email
 * 3. Social Links	--> fieldType = url
 */
function DeleteAddableField(fieldType, valueToBeDeleted)
{
	Ti.API.info("DeleteAddableField: " + fieldType + ", " + valueToBeDeleted);
	alert("DeleteAddableField: " + fieldType + ", " + valueToBeDeleted);
	alert(contact[fieldType]);
	
	var fieldDictionary = contact[fieldType];
	var fieldDictionaryAfterDeletion = {};
	
	valueToBeDeleted = valueToBeDeleted.replace("http://","");	// If it's a social link, remove the http://
	
	// Loop over the addable fields dictionary that contains arrays of data
	for(var key in fieldDictionary)
	{
		// Loop over the arrays inside the original dictionary
		for(var record in fieldDictionary[key])
		{
			fieldDictionary[key][record] = fieldDictionary[key][record].replace("http://",""); // If it's a social link, remove http://
			
			// If field is phone, make sure that the number contains no chatacters, only numbers 
			if(fieldType == "phone") fieldDictionary[key][record] == removeAnyCharButNumber(fieldDictionary[key][record]);
			
			// If not equal to the valueToBeDeleted, then add it to the dictionary that will replace original one
			if(fieldDictionary[key][record] != valueToBeDeleted)
			{
				try
				{
					fieldDictionaryAfterDeletion[key].push(fieldDictionary[key][record]);
				}
				catch(error)
				{
					fieldDictionaryAfterDeletion[key] = [fieldDictionary[key][record]];
				}
			}
		}
	}
	contact[fieldType] = fieldDictionaryAfterDeletion;
	alert(contact[fieldType]);
}


// Defining a function that saves the updated contact to phonebook
function SaveUpdatedContactToPhonebook()
{
	Ti.API.info("SaveUpdatedContactToPhonebook");
	
	// TODO: Replace this with return statement
	if(contact == null) alert("Contact must be initialized ya beheema !");
	
	if(OS_IOS) {
		Titanium.Contacts.save();
	} 
	else if(OS_ANDROID) {
		/* Titanium APIs or Android OS has a bug, which is saving a contact after editing it causes another contact got edited.
		 * A workaround is to delete the exisiting contact with id and then add a new contact having each and every detail the
		 * deleted contact had.
		 */
		
		Titanium.Contacts.removePerson(contact);
		
		Ti.Contacts.createPerson({
			address : contact.address ? contact.address : null,	// Dictionary
			birthday : contact.birthday ? contact.birthday : "",	// String
			date : contact.date ? contact.date : null,	// Dictionary
			email : contact.email ? contact.email : null,	// Dictionary
			firstName : contact.firstName ? contact.firstName : contact.fullName ? contact.fullName : "",	// String
			// TODO: The image is not copied
			image : contact.image ? contact.image : null,	// Image blob
			
			instantMessage : contact.instantMessage ? contact.instantMessage : null,	// Dictionary
			kind : Ti.Contacts.CONTACTS_KIND_PERSON,
			lastName : contact.lastName ? contact.lastName : "",	// String
			middleName : contact.middleName ? contact.middleName : "",	// String
			nickname : contact.nickname ? contact.nickname : "",	// String
			note : contact.note ? contact.note : "",	// String
			organization : contact.organization ? contact.organization : "",	// String
			phone : contact.phone ? contact.phone : null,	// Dictionary
			relatedNames : contact.relatedNames ? contact.relatedNames : null,	// Dictionary
			url : contact.url ? contact.url : null,	// Dictionary
		});
	}
	
	contact = null;	// To avoid wrong use in future.
	alert("Contact Updated in Phonebook !");
}


// A helper function that removes any characters from a string and returns only numbers of the string, ex. +1*2#3 --> 123
function removeAnyCharButNumber(number)
{
	var trimmedNumber = "";
	var expression = /^\d+$/;
	if(!expression.test(number))
	{
		for(var digit in number)
		{
			if(expression.test(number[digit]))
			{
				trimmedNumber += number[digit];
			}
		}
	}
	else
	{
		trimmedNumber = number;
	}
	
	return trimmedNumber;
}