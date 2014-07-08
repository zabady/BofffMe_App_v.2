/*
 * This file contained 900+ lines of code
 * After optimization it's --> (Without comments) 550 + 150 (applyUpdatesToPhonebook.js) = 700 
 */

/*This file contains functions to update the user friends' data in his contact list
 Functions include:
 - saveUpdate(contact)

 - UpdateNonAddableField(id, fieldName, fieldValue)
 1 updateNickname(id,bofffFullName)
 
 2 updateJobTitle(id,jobTitle)--> IOS_ONLY
 4 updateBirthday(id,birthday) Date format is "yyyy-MM-ddTHH:mm:ss.SSS+0000"
 5 updateNote(id,note)
 
 - UpdateAddableField(id, fieldType, fieldKey, fieldValue)
 1 updateNumber(id,key,value)
 2 updateEmail(id,key,value)
 3 updateSocialLink(id,key,value)
 
 - UpdateAddress(id, key, street, city, country)
 1 updateAddress(id, key, street, city, country)
 */

function addAddress(id,key,street,city,country)
{
	Ti.API.info("addAddress");
	var contact=Titanium.Contacts.getPersonByID(id);
	var address= contact.address;
	var value=new Array();
		value['street']=street;
		value['city']=city;
		value['country']=country;
	try
	{
		address[key].push(value);
	}
	catch(error)
	{
		address[key]=[value];
	}
	contact.address=address;
	saveUpdate(contact);
}

function checkFullNameUpdate(userData,newUserData, fullNameObject)
{
	Ti.API.info("checkFullNameUpdate");
	var fullName=newUserData.fullName;
	if(userData.fullName!=fullName)
	{
		fullNameObject.name=fullName;
		return fullName;
	}else return 0;
}

function checkGender(userData,newUserData,genderObject)
{
	Ti.API.info("checkGender");
	var gender=newUserData.gender;
	if(userData.gender!=gender)
	{
		genderObject.gender=gender;
		return gender;
	}else return 0;
}

function checkPhoneNumbersUpdate(userData,newUserData, phoneNumbersObject)
{
	Ti.API.info("checkPhoneNumbersUpdate");
	var phoneNumbers=newUserData.phone_numbers;
	if(userData.phone_numbers!=phoneNumbers)
	{
		var currentNumbers=userData.phone_numbers.split(Alloy.Globals.splitValue);
		var updatedNumbers=phoneNumbers.split(Alloy.Globals.splitValue);
		var hashCurrentNumbers=[];
		var newNumbers=[];
		for(var number in currentNumbers)
		{
			hashCurrentNumbers[currentNumbers[number]]=currentNumbers[number];
		}
		for(var number in updatedNumbers)
		{
			if(hashCurrentNumbers[updatedNumbers[number]]==null)
			{
				newNumbers.push(updatedNumbers[number]);
			}
		}
		var deletedNumbers=[];
		for(var number in hashCurrentNumbers)
		{
			deletedNumbers.push(hashCurrentNumbers[number]);
			for(var counter in updatedNumbers)
			{
				if(hashCurrentNumbers[number]==updatedNumbers[counter])
				{
					deletedNumbers.pop();
				}
			}
		}
		var numbers={newNumbers:newNumbers.toString(),deletedNumbers:deletedNumbers.toString()};
		phoneNumbersObject.numbers= numbers;
		return phoneNumbersObject.numbers;
	}else return 0;
}

function checkMailsUpdate(userData,newUserData, mailsObject)
{
	Ti.API.info("checkMailsUpdate");
	var mails=newUserData.mails;
	if(userData.mails!=mails)
	{
		var currentMails=userData.mails.split(Alloy.Globals.splitValue);
		var updatedMails=mails.split(Alloy.Globals.splitValue);
		var hashCurrentMails=[];
		var newMails=[];
		for(var mail in currentMails)
		{
			hashCurrentMails[currentMails[mail]]=currentMails[mail];
		}
		for(var mail in updatedMails)
		{
			if(hashCurrentMails[updatedMails[mail]]==null)
			{
				newMails.push(updatedMails[mail]);
			}
		}
		var deletedMails=[];
		for(var mail in hashCurrentMails)
		{
			deletedMails.push(hashCurrentMails[mail]);
			for(var counter in updatedMails)
			{
				if(hashCurrentMails[mail]==updatedMails[counter])
				{
					deletedMails.pop();
				}
			}
		}
		var mails={newMails:newMails.toString(),deletedMails:deletedMails.toString()};
		mailsObject.mails=mails;
		return mailsObject.mails;
	}else return 0;
}

function checkSocialLinksUpdate(userData,newUserData, socialLinksObject)
{
	Ti.API.info("checkSocialLinksUpdate");
	var socialLinks=newUserData.social_links;
	if (userData.social_links!=socialLinks)
	{
		var currentSocialLinks=userData.social_links.split(Alloy.Globals.splitValue);
		var updatedSocialLinks=socialLinks.split(Alloy.Globals.splitValue);
		var hashCurrentSocialLinks=[];
		var newLinks=[];
		for(var socialLink in currentSocialLinks)
		{
			hashCurrentSocialLinks[currentSocialLinks[socialLink]]=currentSocialLinks[socialLink];
		}
		for(var socialLink in updatedSocialLinks)
		{
			if(hashCurrentSocialLinks[updatedSocialLinks[socialLink]]==null)
			{
				newLinks.push(updatedSocialLinks[socialLink]);
			}
		}
		var deletedLinks=[];
		for(var link in hashCurrentSocialLinks)
		{
			deletedLinks.push(hashCurrentSocialLinks[link]);
			for(var counter in updatedSocialLinks)
			{
				if(hashCurrentSocialLinks[link]==updatedSocialLinks[counter])
				{
					deletedLinks.pop();
				}
			}
		}
		var links={newLinks:newLinks.toString(),deletedLinks:deletedLinks.toString()};
		socialLinksObject.links=links;
		return socialLinksObject.links;
	}else return 0;
}

function checkResidenceUpdate(userData,newUserData, residenceObject)
{
	Ti.API.info("checkResidenceUpdate");
	var residences=newUserData.residence;
	if(userData.residence!=residences)
	{
		residenceObject.residences=residences;
		return residenceObject.residences;
	}else return 0;
}

function checkJobTitleUpdate(userData, newUserData, jobTitleObject)
{
	Ti.API.info("checkJobTitleUpdate");
	var jobTitle=newUserData.job_title;
	if(userData.job_title!=jobTitle)
	{
		jobTitleObject.title=jobTitle;
		return jobTitle;
	}else return 0;
}

function checkBirthdayUpdate(userData, newUserData, birthdayObject)
{
	Ti.API.info("checkBirthdayUpdate");
	var birthday= newUserData.birthday_date;
	if(userData.birthday_date!=birthday)
	{
		birthdayObject.date=birthday;
		return birthday;
	}else return 0;
}

function checkCompanyUpdate(userData, newUserData, companyObject)
{
	Ti.API.info("checkCompanyUpdate");
	var company=newUserData.company;
	if(userData.company!=company)
	{
		companyObject.company=company;
		return company;
	}else return 0;
}

function manageUserUpdates(oldUserData,pin,bofffsSpecificData)
{
	Ti.API.info("manageUserUpdates");
	var url =  'http://www.bofffme.com/api/index.php/home/';
	var xhr = Ti.Network.createHTTPClient(
	{
	    onload: function(e) 
	    {
	    	var newData = JSON.parse(this.responseText).rows[0];
	    	createUpdateString(oldUserData,newData,pin,bofffsSpecificData);
	    },
	    onerror: function(e) 
	    {
	    	alert(this.responseText);
	    },
	});
	
	xhr.open("POST", url+"search_user_by/bofff/user_accounts/pin/"+pin);
	xhr.send();  
}

function createUpdateString(userData,newData,userPin,bofffsSpecificData)
{
	Ti.API.info("createUpdateString");
	var added=[];
	var deleted=[];
	var friendsToSendAdded=[];
	var friendsToSendDeleted=[];
	var newFullName= {name:""};
	var upadteHappened=false;
	if(checkFullNameUpdate(userData,newData,newFullName)!=0)
	{
		upadteHappened=true;
		added[0]=[];
		added[0].push("fullName$"+newFullName.name+"\n");
		friendsToSendAdded[0]=[];
		friendsToSendAdded[0][0]=[];
		for(var friend in bofffsSpecificData)
		{
			friendsToSendAdded[0][0].push(bofffsSpecificData[friend].friend_pin_code);
		}
	}
	var newGender={gender:""};
	if(checkGender(userData,newData,newGender)!=0)
	{
		upadteHappened=true;
		added[1]=[];
		added[1].push("gender$"+newGender.gender+"\n");
		friendsToSendAdded[1]=[];
		friendsToSendAdded[1][0]=[];
		for(var friend in bofffsSpecificData)
		{
			friendsToSendAdded[1][0].push(bofffsSpecificData[friend].friend_pin_code);
		}
	}
	var newPhoneNumbers={numbers:""};
	if(checkPhoneNumbersUpdate(userData,newData,newPhoneNumbers)!=0)
	{
		upadteHappened=true;
		if(newPhoneNumbers.numbers.newNumbers!="")
		{
			var newNumbers=newPhoneNumbers.numbers.newNumbers.split(",");
			added[2]=[];
			friendsToSendAdded[2]=[];
			for (var number in newNumbers)
			{
				friendsToSendAdded[2][number]=[];
				if(checkPrivacySettings("phone_numbers","phone_numbers_privacy",newNumbers[number],
				newData,bofffsSpecificData,friendsToSendAdded[2][number]))
				{
					added[2].push("phone_number$"+newNumbers[number]+"\n");
				}
			}
		}
		if(newPhoneNumbers.numbers.deletedNumbers!="")
		{
			var deletedNumbers=newPhoneNumbers.numbers.deletedNumbers.split(",");
			deleted[2]=[];
			friendsToSendDeleted[2]=[];
			for(var number in deletedNumbers)
			{
				friendsToSendDeleted[2][number]=[];
				if(checkPrivacySettings("phone_numbers","phone_numbers_privacy",deletedNumbers[number],
				userData,bofffsSpecificData,friendsToSendDeleted[2][number]))
				{
					deleted[2].push("phone_number$"+deletedNumbers[number]+"\n");
				}
			}
		}
	}
	var newMails={mails:""};
	if(checkMailsUpdate(userData,newData,newMails)!=0)
	{
		upadteHappened=true;
		if(newMails.mails.newMails!="")
		{
			var addedMails=newMails.mails.newMails.split(",");
			added[3]=[];
			friendsToSendAdded[3]=[];
			for(var mail in addedMails)
			{
				friendsToSendAdded[3][mail]=[];
				alert(addedMails[mail]);
				if(checkPrivacySettings("mails","mails_privacy",addedMails[mail],
				newData,bofffsSpecificData,friendsToSendAdded[3][mail]))
				{
					added[3].push("mails$"+addedMails[mail]+"\n");
				}
			}
		}
		if(newMails.mails.deletedMails!="")
		{
			var deletedMails=newMails.mails.deletedMails.split(",");
			deleted[3]=[];
			friendsToSendDeleted[3]=[];
			for(var mail in deletedMails)
			{
				friendsToSendDeleted[3][mail]=[];
				alert(deletedMails[mail]);
				if(checkPrivacySettings("mails","mails_privacy",deletedMails[mail],
				userData,bofffsSpecificData,friendsToSendDeleted[3][mail]))
				{
					deleted[3].push("mails$"+deletedMails[mail]+"\n");
				}
			}
		}
	}
	var newSocialLinks={links:""};
	if(checkSocialLinksUpdate(userData,newData,newSocialLinks)!=0)
	{
		upadteHappened=true;
		if(newSocialLinks.links.newLinks!="")
		{
			var addedLinks=newSocialLinks.links.newLinks.split(",");
			added[4]=[];
			friendsToSendAdded[4]=[];
			for(var link in addedLinks)
			{
				friendsToSendAdded[4][link]=[];
				if(checkPrivacySettings("social_links","social_links_privacy",addedLinks[link],
				newData,bofffsSpecificData,friendsToSendAdded[4][link]))
				{
					added[4].push("social_links$"+addedLinks[link]+"\n");
				}
			}
		}
		if(newSocialLinks.links.deletedLinks!="")
		{
			var deletedLinks= newSocialLinks.links.deletedLinks.split(",");
			deleted[4]=[];
			friendsToSendDeleted[4]=[];
			for(var link in deletedLinks)
			{
				friendsToSendDeleted[4][link]=[];
				if(checkPrivacySettings("social_links","social_links_privacy",deletedLinks[link],
				userData,bofffsSpecificData,friendsToSendDeleted[4][link]))
				{
					deleted[4].push("social_links$"+deletedLinks[link]+"\n");
				}
			}
		}
	}
	var newResidences={residences:""};
	if(checkResidenceUpdate(userData,newData,newResidences)!=0)
	{
		upadteHappened=true;
		added[5]=[];
		added[5].push("residence$"+newResidences.residences+"\n");
		friendsToSendAdded[5]=[];
		friendsToSendAdded[5][0]=[];
		checkPrivacySettings("residence","residence_privacy",newResidences.residences,
				newData,bofffsSpecificData,friendsToSendAdded[5][0]);
	}
	var newJobTitle={title:""};
	if(checkJobTitleUpdate(userData,newData,newJobTitle)!=0)
	{
		upadteHappened=true;
		added[6]=[];
		added[6].push("job_title$"+newJobTitle.title+"\n");
		friendsToSendAdded[6]=[];
		friendsToSendAdded[6][0]=[];
		checkPrivacySettings("job_title","job_title_privacy",newJobTitle.title,
				newData,bofffsSpecificData,friendsToSendAdded[6][0]);
	}
	var newBirthday={date:""};
	if(checkBirthdayUpdate(userData,newData,newBirthday)!=0)
	{
		upadteHappened=true;
		added[7]=[];
		added[7].push("birthday_date$"+newBirthday.date+"\n");
		friendsToSendAdded[7]=[];
		friendsToSendAdded[7][0]=[];
		checkPrivacySettings("birthday_date","birthday_date_privacy",newBirthday.date,
				newData,bofffsSpecificData,friendsToSendAdded[7][0]);
	}
	var newCompany={company:""};
	if(checkCompanyUpdate(userData,newData,newCompany)!=0)
	{
		upadteHappened=true;
		added[8]=[];
		added[8].push("company$"+newCompany.company+"\n");
		friendsToSendAdded[8]=[];
		friendsToSendAdded[8][0]=[];
		checkPrivacySettings("company","company_privacy",newCompany.company,
				newData,bofffsSpecificData,friendsToSendAdded[8][0]);
	}
	if(upadteHappened)
	{
		upadteHappened=false;
		//alert("updating");
		//alert(added);
		//alert(deleted);
		//alert(friendsToSendAdded);
		//alert(friendsToSendDeleted);
		addUpdatesToFriends(added,deleted,friendsToSendAdded
		,friendsToSendDeleted, userPin);
	}
	else
		alert("no changes");

}

function checkPrivacySettings(fieldToUpdate,fieldPrivacy,valueOfField,newUserData,bofffsSpecificData,friendsToSendTo)
{
	Ti.API.info("checkPrivacySettings");
	var privacyNumber={public:0,"not favorite":1,friends:1,favorite:2, favorites:2,onlyMe:3};
	var indexOfTheUpdateValue=newUserData[fieldToUpdate].split(Alloy.Globals.splitValue).indexOf(valueOfField);
	var valuePrivacy=newUserData[fieldPrivacy].split(Alloy.Globals.splitValue)[indexOfTheUpdateValue];
	for(var friend in bofffsSpecificData)
	{
		var isFriendFavorite=bofffsSpecificData[friend].userPrivacy_towards_friend;
		if(privacyNumber[isFriendFavorite]>=privacyNumber[valuePrivacy])
		{
			friendsToSendTo.push(bofffsSpecificData[friend].friend_pin_code);
		}
	}
	return true;
}

function addUpdatesToFriends(dataAdded,dataDeleted,friendsToSendAdded,friendsToSendDeleted, userPin)
{
	Ti.API.info("addUpdatesToFriends");
	var url =  'http://www.bofffme.com/api/index.php/home/';
	var xhr = Ti.Network.createHTTPClient(
	{
	    onload: function(e) 
	    {
	    	alert(this.responseText);
	    	//var response = JSON.parse(this.responseText);
	    },
	    onerror: function(e) 
	    {
	    	alert(this.responseText);
	    },
	});
	
	xhr.open("POST", url+"update_friend_updates/bofff/user_friends/"+userPin);
	var params=
	{
		// TODO: Send array to server via json.stringify
		// TODO: Send params to the server without using the url
		friend_added_data: JSON.stringify(dataAdded),
		friend_deleted_data	: JSON.stringify(dataDeleted),
		friendsToSendAdded:JSON.stringify(friendsToSendAdded),
		friendsToSendDeleted:JSON.stringify(friendsToSendDeleted),
	};
	xhr.send(params);  
}

//////////////////////////////////////////////////////////////////////////////////////////// START OF APPLYING UPDATES TO PHONEBOOK
function applyUpdatesOfFriend(friend_pin, bofffsList, bofffsData)
{
	alert("applyUpdatesOfFriend: " + friend_pin);
	
	Ti.include("/applyUpdatesToPhonebook.js");
	
	// Get the required friend
	// Get the Added Updates string
	// Parse added update string
	// Get Deleted Updates string
	// Parse deleted updates string
	// Delete both added and deleted updates from server
	
	// Loop over all bofffs List (friends) untill the required pin is found
	for(var record in bofffsList)
	{
		if(bofffsList[record].friend_pin_code == friend_pin)
		{
			// Process Added Data
			var stringToUpdate = bofffsList[record].friend_added_data;
			if(stringToUpdate != "")
			{
				parsingUpdateString(stringToUpdate, "add", record, bofffsList, bofffsData);
				bofffsList[record].friend_added_data = "";
			}
			
			// Process Deleted Data
			stringToUpdate = bofffsList[record].friend_deleted_data;
			if(stringToUpdate != "")
			{
				parsingUpdateString(stringToUpdate, "delete", record, bofffsList, bofffsData);
				bofffsList[record].friend_deleted_data = "";
			}
			
			// Delete updates columns on server, both of added and deleted updates after applying them
			deleteUpdatesOffriend(bofffsList[record].id);
		}
	}
}

function deleteUpdatesOffriend(friendId)
{
	Ti.API.info("deleteUpdatesOffriend");
	var url =  'http://www.bofffme.com/api/index.php/home/';
	var xhr = Ti.Network.createHTTPClient(
	{
	    onload: function(e) 
	    {
	    	alert(this.responseText);
	    },
	    onerror: function(e) 
	    {
	    	alert(this.responseText);
	    },
	});
	
	xhr.open("POST", url + "update_with_id/bofff/user_friends/" + friendId);
	var params = {
		friend_added_data: "",
		friend_deleted_data	: "",
	};
	// TODO: Uncomment the next line
	//xhr.send(params);  
}

function parsingUpdateString(updateString, addOrDelete, userFriendAppId, bofffsSpecificData, bofffsData)
{
	alert("parsingUpdateString: " + addOrDelete);
	
	// Initialize Contact
	// Get the updates
	// Determine each update's type and apply it
	// Save contact to phonebook
	
	InitializeContact(bofffsData[userFriendAppId].contact_id);
	
	// Get the updates
	var stringLines = updateString.split("\n");
	var stringObjects = {};
	for(var line in stringLines)
	{
		if(stringLines[line] != "" && stringLines[line] != null)
		{
			var stringColon = stringLines[line].split(Alloy.Globals.splitValue);
			stringObjects[stringColon[0]] = stringColon[1];
			
			// Determine each update's type and apply it
			determineAndApplyUpdate(stringColon[0], stringObjects, addOrDelete, userFriendAppId, bofffsSpecificData, bofffsData);
		}
	}
	
	//alert("After all, save contact ! :D");
	SaveUpdatedContactToPhonebook();
}

 // TODO: De msh bel tarteeb 3shan zeez myz3alsh
function updateUserDataOnServerAndProperties(pin, oldData, newData, bofffsSpecificData)
{
	Ti.API.info("updateUserDataOnServerAndProperties");
	var url =  'http://www.bofffme.com/api/index.php/home/';
	var xhr = Ti.Network.createHTTPClient(
	{
	    onload: function(e) 
	    {
	    	alert(this.responseText);
	    	//manageUserUpdates(userData,pin,bofffsSpecificData);
	    	createUpdateString(oldData, newData, pin, bofffsSpecificData);
	    	
	    	// Save the new user data to properties and to golbal variable userData
	    	userData = newData;
	    	Titanium.App.Properties.setObject("userData", newData);
	    },
	    onerror: function(e) 
	    {
	    	alert("error");
	    },
	});
	xhr.open("POST", url+"update_with_pin/bofff/user_accounts/"+pin);
	
	xhr.send(newData);  // request is actually sent with this statement
}
