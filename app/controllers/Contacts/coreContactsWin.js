// TODO: Think about reload event listener for contacts
// TODO: The new contacts' algorithm should replace findBofffs function
// TODO: Icon and Profile Picture are not working
// TODO: If no profile picture, display bofffContact icon from images folder


// This variable will contain all contacts read from the device
var sortedContacts = [];


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
            addressBookDisallowed();
        }
    });
}
else
{
    addressBookDisallowed();
}


// This is in case the user didn't allow to access his phonebook
function addressBookDisallowed() {
	alert("No access for phonebook granted :(");
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
 	
 	sortedContacts.sort();
 	getContactsReady();
 	
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


// Gather contacts' numbers and change them to readable number string without special characters
function getContactsReady()
{
	var repeatedNumberCheck = [];
	var contactNumbersAndIds = [];
	var mobileNumbers;
	var expression = /^\d+$/;
	for(var contact in sortedContacts)
	{
		mobileNumbers = sortedContacts[contact].getPhone();
		if (!isEmpty(mobileNumbers))
		{
			for (var i in mobileNumbers)
			{
				// Loop over each mobile number
				for (var x in mobileNumbers[i])
				{
					var trimmedNumber="";
					if(!expression.test(mobileNumbers[i][x]))
					{
						for(var character in mobileNumbers[i][x])
						{
							if(expression.test(mobileNumbers[i][x][character]))
							{
								trimmedNumber += mobileNumbers[i][x][character];
							}
						}
					}
					else
					{
						trimmedNumber = mobileNumbers[i][x];
					}
					
					if(repeatedNumberCheck[trimmedNumber] == null)
					{
						repeatedNumberCheck[trimmedNumber] = 0;
					}
					else
					{
						continue;
					}
					
					if(OS_IOS)
					{
						var numberAndId = { number:trimmedNumber, id:sortedContacts[contact].recordId };
						contactNumbersAndIds.push(numberAndId);
					}
					else
					if(OS_ANDROID)
					{
						var numberAndId = { number:trimmedNumber, id:sortedContacts[contact].id };
						contactNumbersAndIds.push(numberAndId);
					}
				}
			}
		}
	}
	
	// Then send these numbers to the bofffme DB to check whether this user has bofffs in his contacts or not
	findBofffs(contactNumbersAndIds);
}

// TODO: A lot of work should be done here, the new algorithm should replace this function
// This is to check whether or not these numbers are in our DB if yes
// Then this user is added as a friend and mapped to the contacts of the user
// After all friends are found a list of friends are sent to initialize bofffs list to create the bofffs list
function findBofffs(contactNumbers)
{
	// bofffFriends will capture the user's friends found on the DB
	var bofffFriends = [];
	
	var contactNames = [];
	
	var xhr = Ti.Network.createHTTPClient(
	{
	    onload: function(e) 
	    {
	    	var bofffsData = [];
	    	
	    	// The next line should be receiving the user's friends on the DB
	    	bofffFriends = JSON.parse(this.responseText);
	    	
	    	// A loop over the user's friends to do some unkown stuff :D
	    	for(var record in bofffFriends)
	    	{
	    		// TODO: fullName should be replaced with other code because we had already imported all contacts
	    		var fullName = Titanium.Contacts.getPersonByID(bofffFriends[record].contact_id).fullName;
	    		
	    		bofffFriends[record].contactName = fullName;
	    		
	    		contactNames.push(fullName);
	    		
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
	var params =
	{
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
		
		sortedContacts:sortedContacts,
	};
	
	bofffsContacts = Alloy.createController("Contacts/bofffsContacts", bofffContactsPayload);
	$.win_boffsList.add(bofffsContacts.getView());
	
	//var views = [bofffsContacts.getView()];
 	//$.scrollableview_mainContactsView.setViews(views);
}

// var allContactsPayload=
// {
	// mainView:$.scrollableview_mainContactsView,
	// sortedContacts:sortedContacts,
// };
// var bofffContactsPayload=
// {
	// mainView:$.scrollableview_mainContactsView,
	// sortedContacts:sortedContacts,
// };
// var bofffsContacts=Alloy.createController("Contacts/bofffsContacts",bofffContactsPayload);
// $.scrollableview_mainContactsView.addView(bofffsContacts.getView());

// TODO: Icon and Profile Picture are not working
