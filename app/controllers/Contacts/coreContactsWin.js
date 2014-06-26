var args = arguments[0] || {};

//rightNavButton for the win_bofffsList in case the current viewed list is my bofffs
var allContactsButton = Titanium.UI.createButton({
    title:'all contacts' 
});
//rightNavButton for the win_bofffsList in case the current viewed list is all contacts
var myBofffsButton = Titanium.UI.createButton({
    title:'my bofffs' 
});

// //assigning the allContactsButton to the current window because the app always starts on my bofffs view as default
// $.win_boffsList.rightNavButton= allContactsButton;

//this is to go to scroll to all contacts list
allContactsButton.addEventListener('click',function(e)
{
  $.scrollableview_mainContactsView.scrollToView(1);
 });

//this is to go to scroll to my bofffs list
myBofffsButton.addEventListener('click', function(e)
{
	$.scrollableview_mainContactsView.scrollToView(0);
});

//this is to check the current viewed List to decide which rightNavButton to show whether it is all contacts or my bofffs
function changeRightNavButton(e)
{
	var currentView=$.scrollableview_mainContactsView.getCurrentPage();
	if(currentView==1)
	{
		$.win_boffsList.rightNavButton= myBofffsButton;
	}
	else
	{
		$.win_boffsList.rightNavButton= allContactsButton;
	}
}

//This is to check if the user allows the access to his phonebook or not
if (Ti.Contacts.contactsAuthorization == Ti.Contacts.AUTHORIZATION_AUTHORIZED){
    performAddressBookFunction();
} else if (Ti.Contacts.contactsAuthorization == Ti.Contacts.AUTHORIZATION_UNKNOWN){
    Ti.Contacts.requestAuthorization(function(e){
        if (e.success) {
            performAddressBookFunction();
        } else {
            addressBookDisallowed();
        }
    });
} else {
    addressBookDisallowed();
}
//This is in case the user didn't allow to access his phonebook
function addressBookDisallowed(){alert("Failed");};

var sortedContacts ;
//This is to collect the contacts from the user's phonebook
function performAddressBookFunction()
{  
	var contacts = Ti.Contacts.getAllPeople();
 	sortedContacts = [];
    for (var x in contacts)
    {
        sortedContacts.push(contacts[x]);
    }
    
 	// TODO: BUG FOUND --> sortedContacts.sort(sortContacts);
 	sortedContacts.sort();
 	getContactsReady();
 	
};
var refreshAssurance=true;
//This listens for any change in the user's phonebook if that happens it reloads the whole contact list
Ti.Contacts.addEventListener('reload', function(e)
{
	// if(refreshAssurance==true)
	// {
		// refreshAssurance=false;
		// setTimeout(function(){ alert('refreshAssurance: '+refreshAssurance);
		// refreshAssurance = true; alert('refreshAssurance: '+refreshAssurance); }, 30000);
	    // alert('Reloading contacts. Your contacts were changed externally!');
	    // var contacts = Ti.Contacts.getAllPeople();
	    // sortedContacts = [];
	    // for (var x = 0; x < contacts.length; x++) 
	    // {
	        // sortedContacts.push(contacts[x]);
	    // }
	 	// sortedContacts.sort(sortContacts);
	 	// getContactsReady();
 	// }
});

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

//gather contacts' numbers and change them to readable number string without special characters
function getContactsReady()
{
	var repeatedNumberCheck=[];
	var contactNumbersAndIds=[];
	var mobileNumbers;
	var expression = /^\d+$/;
	for(var contact in sortedContacts)
	{
		mobileNumbers= sortedContacts[contact].getPhone();
		if (!isEmpty(mobileNumbers))
		{
			for (var i in mobileNumbers)
			{
				for (var x in mobileNumbers[i])
				{
					var trimmedNumber="";
					if(!expression.test(mobileNumbers[i][x]))
					{
						for(var character in mobileNumbers[i][x])
						{
							if(expression.test(mobileNumbers[i][x][character]))
							{
								trimmedNumber+=mobileNumbers[i][x][character];
							}
						}
					}
					else
					{
						trimmedNumber=mobileNumbers[i][x];
					}
					if(repeatedNumberCheck[trimmedNumber]==null)
					{
						repeatedNumberCheck[trimmedNumber]=0;
					}
					else
					{
						continue;
					}
					if(OS_IOS)
					{
						var numberAndId={number:trimmedNumber, id:sortedContacts[contact].recordId };
						contactNumbersAndIds.push(numberAndId);
					}
					else
					if(OS_ANDROID)
					{
						var numberAndId={number:trimmedNumber, id:sortedContacts[contact].id };
						contactNumbersAndIds.push(numberAndId);
					}
				}
			}
		}
	}
	//then send these numbers to the bofffme DB to check whether this user has bofffs in his contacts or not
	findBofffs(contactNumbersAndIds);
}
//this is to check whether or not these numbers are in our DB if yes
//then this user is added as a friend and mapped to the contacts of the user
//after all friends are found a list of friends are sent to initialize bofffs list to create the bofffs list
function findBofffs(contactNumbers)
{
	var bofffFriends=[];
	var contactNames=[];
	var url =  'http://www.bofffme.com/api/index.php/home/';
	var xhr = Ti.Network.createHTTPClient(
	{
	    onload: function(e) 
	    {
	    	var bofffsData=[];
	    	bofffFriends = JSON.parse(this.responseText);
	    	for(var record in bofffFriends )
	    	{
	    		var fullName=Titanium.Contacts.getPersonByID(bofffFriends[record].contact_id).fullName;
	    		bofffFriends[record].contactName=fullName;
	    		contactNames.push(fullName);
	    		var data=
	    		{
	    			fullName:bofffFriends[record]['bofff'].fullName,
	    			icon_image:bofffFriends[record]['bofff'].icon_image,
	    			friend_pin_code:bofffFriends[record]['bofff'].pin,	
	    			user_pin_code:Alloy.Globals.userPin,
	    			contactName:fullName,
	    		};
	    		bofffsData.push(data);
	    	}
	    	addFriend(bofffsData,bofffFriends);
	    	bofffFriends.sort(sortBofffs);
	    	
	    	
	    		
	    },
	    onerror: function(e) 
	    {
	    	alert(this.responseText);
	    },
	});
	var params=
	{
		numbers:JSON.stringify(contactNumbers),
		pin:Alloy.Globals.userPin,
	};
	
	xhr.open("POST", url + "detect_user_friends_by_mobile/bofff");
	xhr.send(params);  // request is actually sent with this statement
}



//when the pin is sent back it saves it as a friend to this user
function addFriend(data, bofffFriends)
{
	var bofffsList=[];
	var url =  'http://www.bofffme.com/api/index.php/home/';
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
		    	Titanium.App.Properties.setObject("bofffsSpecificData", bofffsList);
		    	initializeBofffsList(bofffFriends,bofffsList);
	    	}
	    	
		},
	    onerror: function(e) 
	    {
	    	alert(this.responseText);
	    },
	});
	
	xhr.open("POST", url+"insert_friend/bofff/user_friends");
	var params =
		{
			friends: JSON.stringify(data),
    	};
	xhr.send(params);  // request is actually sent with this statement

}

//This is to check if an object is empty or not
function isEmpty(obj)
{
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

//Send the pins of the bofffs friend to create a list with it
function initializeBofffsList(bofffFriends,bofffsList)
{
	var bofffContactsPayload=
	{
		mainView:$.scrollableview_mainContactsView,
		// TODO: bofffList are my friends with their data from the server
		bofffFriends:bofffFriends,
		// TODO: bofffFiends are my friends from my prespective, it need's to be global
		bofffsList:bofffsList,
	};
	bofffsContacts=Alloy.createController("Contacts/bofffsContacts",bofffContactsPayload);
	// var views=[bofffsContacts.getView(),allContacts.getView()];
	var views=[bofffsContacts.getView()];
 	$.scrollableview_mainContactsView.setViews(views);
}

var allContactsPayload=
{
	mainView:$.scrollableview_mainContactsView,
	sortedContacts:sortedContacts,
};
var bofffContactsPayload=
{
	mainView:$.scrollableview_mainContactsView,
	sortedContacts:sortedContacts,
};
var bofffsContacts=Alloy.createController("Contacts/bofffsContacts",bofffContactsPayload);
$.scrollableview_mainContactsView.addView(bofffsContacts.getView());

// var allContacts=Alloy.createController("allContacts",allContactsPayload);
// $.scrollableview_mainContactsView.addView(allContacts.getView());
