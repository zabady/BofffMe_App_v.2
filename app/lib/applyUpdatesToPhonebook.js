// Defining a new contact that will be used to insert a new contact for android
var contact = new Object();

/* 1. Determine each update
 * 2. Apply each update to the selected contact
 * 3. Save contacts for iOS
 * 3. Remove the old contact and add a new one for android
 */

function InitializeContact(id)
{
	contact = Titanium.Contacts.getPersonByID(id);
	// newContact = {
		// firstName : contact.firsName ? contact.firsName : "",
		// lastName : contact.lastName ? contact.lastName : "",
		// kind : Ti.Contacts.CONTACTS_KIND_PERSON,
		// URL : contact.URL,
		// phone : contact.phone,
		// email : contact.email,
		// address : contact.address,
		// image: contact.image,
		// // TODO: Copy all fields
	// };	
}

/* Defining a function that updates an Addable field in phonebook, use this function with:
 * 1. Phone Numbers	--> fieldType = phone
 * 2. Emails		--> fieldType = email
 * 3. Social Links	--> fieldType = url
 */
function UpdateAddableField(fieldType, fieldKey, fieldValue)
{
	// fildKey is the key required to save the fieldType, ex. mobile: 01009091995, mobile is the key
	Ti.API.info("UpdateAddableField: " + fieldType + ", " + fieldkey + ", " + fieldValue);
	
	// Add the new addable field to its array in contact
	// If contact[fieldType] is not empty, append to it, else create a new array
	if(contact[fieldType] != null)
	{
		contact[fieldType][fieldKey].push(fieldValue);
	}
	else
	{
		contact[fieldType][fieldKey] = [fieldValue];
	}
}


/* Defining a function that updates a NonAddable field in phonebook, use this function with:
 * 1. Nick Name --> fieldName = nickname
 * 2. Job Title	--> fieldName = jobTitle	--> iOS only
 * 3. Company	--> fieldName = organization
 * 4. Birthday	--> fieldName = birthday	--> Date format (fieldValue) is "yyyy-MM-ddTHH:mm:ss.SSS+0000"
 * 5. Note		--> fieldName = note
 */
function UpdateNonAddableField(fieldName, fieldValue) {
	
	Ti.API.info("UpdateNonAddableField: " + fieldName + ", " + fieldValue);
	
	// Job title is supported only by iOS
	if(fieldName == "jobTitle" && OS_ANDROID) return;
	
	// Add "Bofff Me:" to nickname
	if(fieldName == "nickname") fieldName = "Bofff Me: " + fieldName;
	
	contact[fieldName] = fieldValue;
}


// Defining a function that saves the updated contact to phonebook
function SaveUpdatedContactToPhonebook()
{
	Ti.API.info("SaveUpdatedContactToPhonebook");
	
	if(OS_IOS) {
		//Titanium.Contacts.save();
	} 
	else if(OS_ANDROID) {
		// TODO: DO THE SHIT
	}
	
	alert(contact);
	alert("Contact will be null.");
	
	contact = null;	// To avoid wrong use in future.
	//alert("Contact Updated in Phonebook !");
}

// This is where the contacts data are changed on the user's phonebook
function determineAndApplyUpdate(fieldType, stringObjects, addOrDelete, userFriendAppId, bofffsSpecificData, bofffsData)
{
	Ti.API.info("determineUpdateType");
	
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
			
			UpdateAddableField(bofffsData[userFriendAppId].contact_id, type, key, stringObjects[fieldType]);
			
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