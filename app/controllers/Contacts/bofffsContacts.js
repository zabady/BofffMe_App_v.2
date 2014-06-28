var args = arguments[0] || {};
var mainView = args.mainView;
// contains functions to update friends data on user contacts
Ti.include("/contactsUpdate.js");
try
{
	var bofffs = args.bofffFriends;
	var bofffsList = args.bofffsList;
	createBofffListView(bofffsList,"fullName");
}catch(error){}

var searchbarIsOnFocus= false;
var firstFocus=true;
//on searchbar focus
function initializeSearch(e)
{
	if(firstFocus && OS_ANDROID)
	{
		firstFocus=false;
		$.search.blur();
	}
	else
	{
		$.view_search.width=Ti.UI.SIZE;
		$.view_search.height=Ti.UI.SIZE;
		searchbarIsOnFocus=true;
		$.search.showCancel="true";
	}
}
//on searchbar cancel
function cancelSearch(e)
{
	$.search.blur();
	$.search.value="";
	$.list_bofffContacts.searchText="";
    searchbarIsOnFocus=false;
    $.search.showCancel="false";
}
//on searchbar change
function updateSearch(e)
{
	$.list_bofffContacts.searchText = e.value;
}


//when search button on keyboard is pressed
var searchButtonPressed=false;
function searchBofff(e)
{
	$.list_bofffContacts.searchText = e.value;
	searchButtonPressed=true;
	$.search.blur();
	
}
//on searchbar blur
function stopSearch(e)
{
	if(searchButtonPressed)
	{
		searchButtonPressed=false;
	}
	else
	{
		$.search.showCancel="false";
		if(!pickerVisible)
		{
			$.view_search.width=0;
			$.view_search.height=0;
		}
		if (OS_ANDROID)
		{
			$.search.value="";
			$.search.hide();
			$.search.show();
		}
	}
}
$.list_bofffContacts.caseInsensitiveSearch=true;
$.list_bofffContacts.keepSectionsInSearch=true;

var pickerVisible=false;
var animation = require('alloy/animation');
//OS_IOS ONLY function
//on click on the search field label to open picker or close picker
function openSearchPicker(e)
{
	if(pickerVisible)
	{
		animation.fadeOut($.picker_searchBy.view_picker, 500, function(){
			$.picker_searchBy.view_picker.width=0;
			$.picker_searchBy.view_picker.height=0;
			pickerVisible=false;
			$.search.focus();	
		});
		changeSearchableText(searchableText,searchableTextPrivacy);
	}
	else
	{
		$.picker_searchBy.view_picker.width=Ti.UI.SIZE;
		$.picker_searchBy.view_picker.height=Ti.UI.FILL;
		animation.popIn($.picker_searchBy.view_picker);
		pickerVisible=true;
		$.search.blur();
	}
}
var searchableText ="fullName";
var searchableTextPrivacy="public";
//on selection of picker change update the search process
$.picker_searchBy.picker.addEventListener("change", function(e)
{
	searchableText=e.row.dbName;
	searchableTextPrivacy=e.row.dbPrivacy;
	if(OS_IOS)
	{
		$.lbl_searchField.text= e.selectedValue[0];
	}
	else
	{
		changeSearchableText(searchableText,searchableTextPrivacy);
	}
	// if the user chooses custom, a view appears to type in the custom field he wants to search with
	if(e.selectedValue[0]=="Custom")
	{
		$.view_customField.view_customField.width='90%';
		$.view_customField.view_customField.height='40%';
		animation.popIn($.view_customField.view_customField);
		$.view_customField.txt_customField.focus();
	}
});
var privacyNumber = { public:0, "not favorite":1, friends:1, favorite:2, favorites:2, onlyMe:3 };

function changeSearchableText(searchableText,searchableTextPrivacy)
{
	for(var sectionCounter in $.list_bofffContacts.sections)
	{
		var section =$.list_bofffContacts.sections[sectionCounter];
		var items=[];
		for(var itemCounter in section.items )
		{
			var item = section.items[itemCounter];
			var itemId = item.properties.itemId;
			if(searchableText == "fullName")
			{
				item.properties.searchableText = bofffsList[itemId].contactName;
			}
			else
			{
				item.properties.searchableText='';
				var privacyOfBofff = bofffsList[itemId].friendPrivacy_towards_user;
				var searchableTextValues=bofffs[itemId].bofff[searchableText].split(",");
				var searchableTextPrivacyValues=bofffs[itemId].bofff[searchableTextPrivacy].split(",");
				for(var record in searchableTextValues)
				{
					var privacyOfField=searchableTextPrivacyValues[record];
					if(privacyNumber[privacyOfBofff]>=privacyNumber[privacyOfField])
					{
						item.properties.searchableText+=searchableTextValues[record];
					}
				}
			}
			items.push(item);
		}
		$.list_bofffContacts.sections[sectionCounter].replaceItemsAt(0,section.items.length,items);
	}
}


$.view_customField.img_closeCustomView.addEventListener("click", function(e)
{
	animation.fadeOut($.view_customField.view_customField,200, function(){
		$.view_customField.view_customField.width=0;
		$.view_customField.view_customField.height=0;
		$.lbl_searchField.text=$.view_customField.txt_customField.value;
		if($.lbl_searchField.text=="")
		{
			$.lbl_searchField.text="Custom";
		}
		$.view_customField.txt_customField.blur();
	});
});

var imageFavorite;
//Here is to put the contacts in a list
function createBofffListView(_data, textToSearchFor)
{
	var listSections=[];
	var lastCharacter=_data[0].contactName.substring(0,1).toUpperCase();
	var newCharacter;
	var section=Ti.UI.createListSection({ headerTitle: lastCharacter});
 	var items = [];
    for (var i in _data)
     {
     	nextCharacter= _data[i].contactName.substring(0,1).toUpperCase();
        if(lastCharacter != nextCharacter)
        {
        	section.setItems(items);
        	listSections.push(section);
        	lastCharacter= nextCharacter;
        	section = Ti.UI.createListSection({ headerTitle: lastCharacter});
        	items=[];
        }
   		//add items to an array
   		if(_data[i].userPrivacy_towards_friend=="favorite")
   		{
   			imageFavorite="/images/favoritecontact.png";
   		}
   		else
   		{
   			imageFavorite="/images/notfavoritecontact.png";
   		}
   		//var fullName=Titanium.Contacts.getPersonByID(bofffs[i].contact_id).fullName;
   		items.push({
            template : "template1",            // set the template
            textLabel : {
                text : _data[i].contactName           // assign the values from the data
            },
            pic : {
                image : _data[i].icon_image   // assign the values from the data
            },
            bofff_pic:{
            	image:imageFavorite,
            	},
            userPrivacy_towards_friend:_data[i].userPrivacy_towards_friend,
            properties : {
            itemId:i ,			//assign the unique contact id to the listItem's itemId for retrieving
            searchableText: _data[i].contactName ,
            backgroundColor:"transparent",
            }
	            
        });
     }
     section.setItems(items);
     listSections.push(section);
     $.list_bofffContacts.sections=listSections;

     
	//TODO: Save this list to open in offline mode
	// This is to save the list to be views offline when needed
	/*var json_text = JSON.stringify(items,null,2);
	Titanium.App.Properties.setString('propertyList', json_text);

	var test =Titanium.App.Properties.getString('propertyList');
	var your_object = JSON.parse(test);*/ 
}

var privacyClicked=false;
// if a star is clicked by the user
function starClicked(e)
{
	privacyClicked = true;
}

function changeStar(listItem)
{
	privacyClicked=false;
	var item = listItem.section.getItemAt(listItem.itemIndex);
	// it means that the user clicked an empty star so we have to change it to a full star
	if (item.userPrivacy_towards_friend=="not favorite")
	{
		item.userPrivacy_towards_friend="favorite";
		item.bofff_pic.image = "/images/favoritecontact.png";
		listItem.section.updateItemAt(listItem.itemIndex, item); 
		bofffsList[listItem.itemId].userPrivacy_towards_friend="favorite"; 
	}
	// it means that the user clicked a full star so we have to change it to an empty star
	else
	{
		item.userPrivacy_towards_friend="not favorite";
		item.bofff_pic.image = "/images/notfavoritecontact.png";
		listItem.section.updateItemAt(listItem.itemIndex, item);
		bofffsList[listItem.itemId].userPrivacy_towards_friend="not favorite";
	}
}

function updatePrivacy(listItem)
{
	var item = listItem.section.getItemAt(listItem.itemIndex);
	var newStatus="not favorite";
	if(item.userPrivacy_towards_friend=="not favorite")
	{
		newStatus="favorite";
	}
	var url =  'http://www.bofffme.com/api/index.php/home/';
	
	var xhr = Ti.Network.createHTTPClient(
	{
	    onload: function(e) 
	    {
	    	var response = JSON.parse(this.responseText);
	    	changeStar(listItem);
	    },
	    onerror: function(e) 
	    {
	    	alert("error");
	    },
	});
	xhr.open("POST", url+"update_friend_status/bofff/user_friends/" + bofffsList[listItem.itemId].id);
	var params=
	{
		userPrivacy_towards_friend: newStatus,
	};
	xhr.send(params);  // request is actually sent with this statement
}


// when any click is fired from the list or within the list
function showContact(e)
{
	// to check if the click is fired because of the list item or because of the star in the list item
	if(privacyClicked)
	{
		updatePrivacy(e);
	}
	// TODO: Remove If image click, it's used for testing
	else
	if (ifImageClicked)
	{
		ifImageClicked=false;
		var bofffId = bofffs[e.itemId].contact_id;
		applyUpdatesOfFriend('95190228ae42e7652b098b5bce990aa8',bofffsList,bofffs);
		
		// TODO: --> The next
		//if(getUserData(Alloy.Globals.userPin,bofffsList)) {
			// TODO: Call next function in if statement
			// TODO: Each function must return true so the next one is fired after the current function completes
			// execution, this is a workaround for async execution
		//}
	}
	else
	{
		$.search.blur();
		//Here is to know what contact the user want by searching for this contact with the itemId I saved in the listItem in which
		//is saved the actual contact id of this user
		var bofff=bofffs[e.itemId]['bofff'];
		var privacyOfBofff= bofffsList[e.itemId].friendPrivacy_towards_user;
		var image = e.section.getItemAt(e.itemIndex).pic.image;
		//Here is to initialize a view that will contain the data of the user
		var params=
		{
			bofff: bofff,
			image: image,
		};
		createVisibleData(privacyOfBofff,bofff);
	}
}
var ifImageClicked=false;
function imageClicked(e)
{
	ifImageClicked=true;
}


function createVisibleData(privacyOfBofff,friendData)
{
	var visibleData = new Object;
	visibleData.iconImage = null;
	visibleData.profilePicture = null;
	visibleData.data = [];
	var counter = 1;
	
	for(var field in friendData)
	{
		switch(field)
		{
			case 'fullName':
			{
				visibleData.Name = friendData[field];
				break;
			}
			case 'gender':
			{
				var dataObject = new Object();
				dataObject.FieldName = "Gender";
				dataObject.FieldValue = friendData[field];
				visibleData.data.push(dataObject);
				break;
			}
			case 'primary_mobile':
			{
				var dataObject = new Object();
				dataObject.FieldName = "Phone";
				dataObject.FieldValue = friendData[field];
				visibleData.data.push(dataObject);
				break;
			}
			case 'phone_numbers':
			{
				try
				{
					counter = 1;
					var values = friendData[field].split(Alloy.Globals.splitValue);
					var privacies = friendData.phone_numbers_privacy.split(Alloy.Globals.splitValue);
					for(var record in values)
					{
						var privacyOfField = privacies[record];
						if(privacyNumber[privacyOfBofff] >= privacyNumber[privacyOfField])
						{
							var dataObject= new Object();
							dataObject.FieldName="Phone Number " + counter++;
							dataObject.FieldValue=values[record];
							visibleData.data.push(dataObject);
						}
					}
				}catch(e){}
				break;
			}
			case 'primary_email':
			{
				var dataObject= new Object();
				dataObject.FieldName="Email";
				dataObject.FieldValue=friendData[field];
				visibleData.data.push(dataObject);
				break;
			}
			case 'mails':
			{
				try
				{
					counter=1;
					var values= friendData[field].split(Alloy.Globals.splitValue);
					var privacies= friendData.mails_privacy.split(Alloy.Globals.splitValue);
					for(var record in values)
					{
						var privacyOfField= privacies[record];
						if(privacyNumber[privacyOfBofff]>=privacyNumber[privacyOfField])
						{
							var dataObject= new Object();
							dataObject.FieldName="Email " + counter++;
							dataObject.FieldValue=values[record];
							visibleData.data.push(dataObject);
						}
					}
				}catch(e){}
				break;
			}
			case 'social_links':
			{
				
				try
				{
					counter=1;
					var values= friendData[field].split(",");
					var privacies= friendData.social_links_privacy.split(",");
					for(var record in values)
					{
						var privacyOfField= privacies[record];
						if(privacyNumber[privacyOfBofff]>=privacyNumber[privacyOfField])
						{
							var dataObject= new Object();
							dataObject.FieldName="Social Link "+counter++;
							dataObject.FieldValue=values[record];
							visibleData.data.push(dataObject);
						}
					}
				}catch(e){}
				break;
			}
			case 'residence':
			{
				if(friendData[field]!=null)
				{
					var privacyOfField= friendData.residence_privacy;
					if(privacyNumber[privacyOfBofff]>=privacyNumber[privacyOfField])
					{
						var dataObject= new Object();
						dataObject.FieldName="Residence";
						dataObject.FieldValue=friendData[field];
						visibleData.data.push(dataObject);
					}
				}
				break;
			}
			case 'job_title':
			{
				if(friendData[field]!=null)
				{
					var privacyOfField= friendData.job_title_privacy;
					if(privacyNumber[privacyOfBofff]>=privacyNumber[privacyOfField])
					{
						var dataObject= new Object();
						dataObject.FieldName="Job Title";
						dataObject.FieldValue=friendData[field];
						visibleData.data.push(dataObject);
					}
				}
				break;
			}
			case 'education':
			{
				if(friendData[field]!=null)
				{
					var privacyOfField= friendData.education_privacy;
					if(privacyNumber[privacyOfBofff]>=privacyNumber[privacyOfField])
					{
						var dataObject= new Object();
						dataObject.FieldName="Education";
						dataObject.FieldValue=friendData[field];
						visibleData.data.push(dataObject);
					}
				}
				break;
			}
			case 'marital_status':
			{
				if(friendData[field]!=null)
				{
					var privacyOfField= friendData.marital_status_privacy;
					if(privacyNumber[privacyOfBofff]>=privacyNumber[privacyOfField])
					{
						var dataObject= new Object();
						dataObject.FieldName="Marital Status";
						dataObject.FieldValue=friendData[field];
						visibleData.data.push(dataObject);
					}
				}
				break;
			}
			case 'birthday_date':
			{
				if(friendData[field]!=null)
				{
					var privacyOfField= friendData.birthday_date_privacy;
					if(privacyNumber[privacyOfBofff]>=privacyNumber[privacyOfField])
					{
						var dataObject= new Object();
						dataObject.FieldName="Birthday";
						dataObject.FieldValue=friendData[field];
						visibleData.data.push(dataObject);
					}
				}
				break;
			}
			case 'interests':
			{
				if(friendData[field]!=null)
				{
					var privacyOfField= friendData.interests_privacy;
					if(privacyNumber[privacyOfBofff]>=privacyNumber[privacyOfField])
					{
						var dataObject= new Object();
						dataObject.FieldName="Interests";
						dataObject.FieldValue=friendData[field];
						visibleData.data.push(dataObject);
					}
				}
				break;
			}
			case 'company':
			{
				if(friendData[field]!=null)
				{
					var privacyOfField= friendData.company_privacy;
					if(privacyNumber[privacyOfBofff]>=privacyNumber[privacyOfField])
					{
						var dataObject= new Object();
						dataObject.FieldName="Company";
						dataObject.FieldValue=friendData[field];
						visibleData.data.push(dataObject);
					}
				}
				break;
			}
			case 'favorite_places':
			{
				if(friendData[field]!=null)
				{
					var privacyOfField= friendData.favorite_places_privacy;
					if(privacyNumber[privacyOfBofff]>=privacyNumber[privacyOfField])
					{
						var dataObject= new Object();
						dataObject.FieldName="Favorite Places";
						dataObject.FieldValue=friendData[field];
						visibleData.data.push(dataObject);
					}
				}
				break;
			}
			case 'icon_image':
			{
				visibleData.iconImage = friendData[field];
				break;
			}
			case 'profile_picture':
			{
				var privacyOfField = friendData.profile_picture_privacy;
				if(privacyNumber[privacyOfBofff] >= privacyNumber[privacyOfField])
				{
					visibleData.profilePicture = friendData[field];
				}
			}
		}
	}
	//alert(visibleData);
	Alloy.Globals.openNavigationWindow(Alloy.createController('Contacts/bofffProfileWin', visibleData).getView(), true);
}



