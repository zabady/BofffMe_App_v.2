function Controller() {
    function initializeSearch() {
        if (firstFocus && false) {
            firstFocus = false;
            $.search.blur();
        } else {
            $.view_search.width = Ti.UI.SIZE;
            $.view_search.height = Ti.UI.SIZE;
            searchbarIsOnFocus = true;
            $.search.showCancel = "true";
        }
    }
    function cancelSearch() {
        $.search.blur();
        $.search.value = "";
        $.list_bofffContacts.searchText = "";
        searchbarIsOnFocus = false;
        $.search.showCancel = "false";
    }
    function updateSearch(e) {
        $.list_bofffContacts.searchText = e.value;
    }
    function searchBofff(e) {
        $.list_bofffContacts.searchText = e.value;
        searchButtonPressed = true;
        $.search.blur();
    }
    function stopSearch() {
        if (searchButtonPressed) searchButtonPressed = false; else {
            $.search.showCancel = "false";
            if (!pickerVisible) {
                $.view_search.width = 0;
                $.view_search.height = 0;
            }
        }
    }
    function openSearchPicker() {
        if (pickerVisible) {
            animation.fadeOut($.picker_searchBy.view_picker, 500, function() {
                $.picker_searchBy.view_picker.width = 0;
                $.picker_searchBy.view_picker.height = 0;
                pickerVisible = false;
                $.search.focus();
            });
            changeSearchableText(searchableText, searchableTextPrivacy);
        } else {
            $.picker_searchBy.view_picker.width = Ti.UI.SIZE;
            $.picker_searchBy.view_picker.height = Ti.UI.FILL;
            animation.popIn($.picker_searchBy.view_picker);
            pickerVisible = true;
            $.search.blur();
        }
    }
    function changeSearchableText(searchableText, searchableTextPrivacy) {
        for (var sectionCounter in $.list_bofffContacts.sections) {
            var section = $.list_bofffContacts.sections[sectionCounter];
            var items = [];
            for (var itemCounter in section.items) {
                var item = section.items[itemCounter];
                var itemId = item.properties.itemId;
                if ("fullName" == searchableText) item.properties.searchableText = bofffsList[itemId].contactName; else {
                    item.properties.searchableText = "";
                    var privacyOfBofff = bofffsList[itemId].friendPrivacy_towards_user;
                    var searchableTextValues = bofffs[itemId].bofff[searchableText].split(",");
                    var searchableTextPrivacyValues = bofffs[itemId].bofff[searchableTextPrivacy].split(",");
                    for (var record in searchableTextValues) {
                        var privacyOfField = searchableTextPrivacyValues[record];
                        privacyNumber[privacyOfBofff] >= privacyNumber[privacyOfField] && (item.properties.searchableText += searchableTextValues[record]);
                    }
                }
                items.push(item);
            }
            $.list_bofffContacts.sections[sectionCounter].replaceItemsAt(0, section.items.length, items);
        }
    }
    function createBofffListView(_data) {
        var listSections = [];
        var lastCharacter = _data[0].contactName.substring(0, 1).toUpperCase();
        var section = Ti.UI.createListSection({
            headerTitle: lastCharacter
        });
        var items = [];
        for (var i in _data) {
            nextCharacter = _data[i].contactName.substring(0, 1).toUpperCase();
            if (lastCharacter != nextCharacter) {
                section.setItems(items);
                listSections.push(section);
                lastCharacter = nextCharacter;
                section = Ti.UI.createListSection({
                    headerTitle: lastCharacter
                });
                items = [];
            }
            imageFavorite = "favorite" == _data[i].userPrivacy_towards_friend ? "/images/favoritecontact.png" : "/images/notfavoritecontact.png";
            items.push({
                template: "template1",
                textLabel: {
                    text: _data[i].contactName
                },
                pic: {
                    image: _data[i].icon_image
                },
                bofff_pic: {
                    image: imageFavorite
                },
                userPrivacy_towards_friend: _data[i].userPrivacy_towards_friend,
                properties: {
                    itemId: i,
                    searchableText: _data[i].contactName,
                    backgroundColor: "transparent"
                }
            });
        }
        section.setItems(items);
        listSections.push(section);
        $.list_bofffContacts.sections = listSections;
    }
    function starClicked() {
        privacyClicked = true;
    }
    function changeStar(listItem) {
        privacyClicked = false;
        var item = listItem.section.getItemAt(listItem.itemIndex);
        if ("not favorite" == item.userPrivacy_towards_friend) {
            item.userPrivacy_towards_friend = "favorite";
            item.bofff_pic.image = "/images/favoritecontact.png";
            listItem.section.updateItemAt(listItem.itemIndex, item);
            bofffsList[listItem.itemId].userPrivacy_towards_friend = "favorite";
        } else {
            item.userPrivacy_towards_friend = "not favorite";
            item.bofff_pic.image = "/images/notfavoritecontact.png";
            listItem.section.updateItemAt(listItem.itemIndex, item);
            bofffsList[listItem.itemId].userPrivacy_towards_friend = "not favorite";
        }
    }
    function updatePrivacy(listItem) {
        var item = listItem.section.getItemAt(listItem.itemIndex);
        var newStatus = "not favorite";
        "not favorite" == item.userPrivacy_towards_friend && (newStatus = "favorite");
        var url = "http://www.bofffme.com/api/index.php/home/";
        var xhr = Ti.Network.createHTTPClient({
            onload: function() {
                JSON.parse(this.responseText);
                changeStar(listItem);
            },
            onerror: function() {
                alert("error");
            }
        });
        xhr.open("POST", url + "update_friend_status/bofff/user_friends/" + bofffsList[listItem.itemId].id);
        var params = {
            userPrivacy_towards_friend: newStatus
        };
        xhr.send(params);
    }
    function showContact(e) {
        if (privacyClicked) updatePrivacy(e); else if (ifImageClicked) {
            ifImageClicked = false;
            bofffs[e.itemId].contact_id;
        } else {
            $.search.blur();
            var bofff = bofffs[e.itemId]["bofff"];
            var privacyOfBofff = bofffsList[e.itemId].friendPrivacy_towards_user;
            e.section.getItemAt(e.itemIndex).pic.image;
            createVisibleData(privacyOfBofff, bofff);
        }
    }
    function imageClicked() {
        ifImageClicked = true;
    }
    function createVisibleData(privacyOfBofff, friendData) {
        var visibleData = new Object();
        visibleData.iconImage = null;
        visibleData.profilePicture = null;
        visibleData.data = [];
        var counter = 1;
        for (var field in friendData) switch (field) {
          case "fullName":
            visibleData.Name = friendData[field];
            break;

          case "gender":
            var dataObject = new Object();
            dataObject.FieldName = "Gender";
            dataObject.FieldValue = friendData[field];
            visibleData.data.push(dataObject);
            break;

          case "primary_mobile":
            var dataObject = new Object();
            dataObject.FieldName = "Phone";
            dataObject.FieldValue = friendData[field];
            visibleData.data.push(dataObject);
            break;

          case "phone_numbers":
            try {
                counter = 1;
                var values = friendData[field].split(Alloy.Globals.splitValue);
                var privacies = friendData.phone_numbers_privacy.split(Alloy.Globals.splitValue);
                for (var record in values) {
                    var privacyOfField = privacies[record];
                    if (privacyNumber[privacyOfBofff] >= privacyNumber[privacyOfField]) {
                        var dataObject = new Object();
                        dataObject.FieldName = "Phone Number " + counter++;
                        dataObject.FieldValue = values[record];
                        visibleData.data.push(dataObject);
                    }
                }
            } catch (e) {}
            break;

          case "primary_email":
            var dataObject = new Object();
            dataObject.FieldName = "Email";
            dataObject.FieldValue = friendData[field];
            visibleData.data.push(dataObject);
            break;

          case "mails":
            try {
                counter = 1;
                var values = friendData[field].split(Alloy.Globals.splitValue);
                var privacies = friendData.mails_privacy.split(Alloy.Globals.splitValue);
                for (var record in values) {
                    var privacyOfField = privacies[record];
                    if (privacyNumber[privacyOfBofff] >= privacyNumber[privacyOfField]) {
                        var dataObject = new Object();
                        dataObject.FieldName = "Email " + counter++;
                        dataObject.FieldValue = values[record];
                        visibleData.data.push(dataObject);
                    }
                }
            } catch (e) {}
            break;

          case "social_links":
            try {
                counter = 1;
                var values = friendData[field].split(",");
                var privacies = friendData.social_links_privacy.split(",");
                for (var record in values) {
                    var privacyOfField = privacies[record];
                    if (privacyNumber[privacyOfBofff] >= privacyNumber[privacyOfField]) {
                        var dataObject = new Object();
                        dataObject.FieldName = "Social Link " + counter++;
                        dataObject.FieldValue = values[record];
                        visibleData.data.push(dataObject);
                    }
                }
            } catch (e) {}
            break;

          case "residence":
            if (null != friendData[field]) {
                var privacyOfField = friendData.residence_privacy;
                if (privacyNumber[privacyOfBofff] >= privacyNumber[privacyOfField]) {
                    var dataObject = new Object();
                    dataObject.FieldName = "Residence";
                    dataObject.FieldValue = friendData[field];
                    visibleData.data.push(dataObject);
                }
            }
            break;

          case "job_title":
            if (null != friendData[field]) {
                var privacyOfField = friendData.job_title_privacy;
                if (privacyNumber[privacyOfBofff] >= privacyNumber[privacyOfField]) {
                    var dataObject = new Object();
                    dataObject.FieldName = "Job Title";
                    dataObject.FieldValue = friendData[field];
                    visibleData.data.push(dataObject);
                }
            }
            break;

          case "education":
            if (null != friendData[field]) {
                var privacyOfField = friendData.education_privacy;
                if (privacyNumber[privacyOfBofff] >= privacyNumber[privacyOfField]) {
                    var dataObject = new Object();
                    dataObject.FieldName = "Education";
                    dataObject.FieldValue = friendData[field];
                    visibleData.data.push(dataObject);
                }
            }
            break;

          case "marital_status":
            if (null != friendData[field]) {
                var privacyOfField = friendData.marital_status_privacy;
                if (privacyNumber[privacyOfBofff] >= privacyNumber[privacyOfField]) {
                    var dataObject = new Object();
                    dataObject.FieldName = "Marital Status";
                    dataObject.FieldValue = friendData[field];
                    visibleData.data.push(dataObject);
                }
            }
            break;

          case "birthday_date":
            if (null != friendData[field]) {
                var privacyOfField = friendData.birthday_date_privacy;
                if (privacyNumber[privacyOfBofff] >= privacyNumber[privacyOfField]) {
                    var dataObject = new Object();
                    dataObject.FieldName = "Birthday";
                    dataObject.FieldValue = friendData[field];
                    visibleData.data.push(dataObject);
                }
            }
            break;

          case "interests":
            if (null != friendData[field]) {
                var privacyOfField = friendData.interests_privacy;
                if (privacyNumber[privacyOfBofff] >= privacyNumber[privacyOfField]) {
                    var dataObject = new Object();
                    dataObject.FieldName = "Interests";
                    dataObject.FieldValue = friendData[field];
                    visibleData.data.push(dataObject);
                }
            }
            break;

          case "company":
            if (null != friendData[field]) {
                var privacyOfField = friendData.company_privacy;
                if (privacyNumber[privacyOfBofff] >= privacyNumber[privacyOfField]) {
                    var dataObject = new Object();
                    dataObject.FieldName = "Company";
                    dataObject.FieldValue = friendData[field];
                    visibleData.data.push(dataObject);
                }
            }
            break;

          case "favorite_places":
            if (null != friendData[field]) {
                var privacyOfField = friendData.favorite_places_privacy;
                if (privacyNumber[privacyOfBofff] >= privacyNumber[privacyOfField]) {
                    var dataObject = new Object();
                    dataObject.FieldName = "Favorite Places";
                    dataObject.FieldValue = friendData[field];
                    visibleData.data.push(dataObject);
                }
            }
            break;

          case "icon_image":
            visibleData.iconImage = friendData[field];
            break;

          case "profile_picture":
            var privacyOfField = friendData.profile_picture_privacy;
            privacyNumber[privacyOfBofff] >= privacyNumber[privacyOfField] && (visibleData.profilePicture = friendData[field]);
        }
        Alloy.Globals.openNavigationWindow(Alloy.createController("Contacts/bofffProfileWin", visibleData).getView(), true);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Contacts/bofffsContacts";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.view_container = Ti.UI.createView({
        backgroundColor: "white",
        id: "view_container"
    });
    $.__views.view_container && $.addTopLevelView($.__views.view_container);
    $.__views.view_bofffsContacts = Ti.UI.createView({
        backgroundColor: "transparent",
        layout: "vertical",
        id: "view_bofffsContacts"
    });
    $.__views.view_container.add($.__views.view_bofffsContacts);
    $.__views.view_search = Ti.UI.createView({
        id: "view_search",
        layout: "horizontal",
        width: "0",
        height: "0"
    });
    $.__views.view_bofffsContacts.add($.__views.view_search);
    $.__views.lbl_findBy = Ti.UI.createLabel({
        color: "black",
        font: {
            fontSize: "20dp",
            fontFamily: "Helvetica Neue"
        },
        left: "10",
        text: "Find By",
        id: "lbl_findBy",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE
    });
    $.__views.view_search.add($.__views.lbl_findBy);
    $.__views.lbl_searchField = Ti.UI.createLabel({
        color: "black",
        font: {
            fontSize: "20dp",
            fontFamily: "Helvetica Neue"
        },
        left: "10",
        text: "Name",
        id: "lbl_searchField",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE
    });
    $.__views.view_search.add($.__views.lbl_searchField);
    openSearchPicker ? $.__views.lbl_searchField.addEventListener("click", openSearchPicker) : __defers["$.__views.lbl_searchField!click!openSearchPicker"] = true;
    $.__views.picker_searchBy = Alloy.createController("Contacts/searchByFieldPicker", {
        id: "picker_searchBy",
        __parentSymbol: $.__views.view_bofffsContacts
    });
    $.__views.picker_searchBy.setParent($.__views.view_bofffsContacts);
    $.__views.search = Ti.UI.createSearchBar({
        backgroundColor: "transparent",
        id: "search",
        left: "0",
        height: "43",
        width: Ti.UI.FILL,
        hintText: "find a bofff"
    });
    $.__views.view_bofffsContacts.add($.__views.search);
    initializeSearch ? $.__views.search.addEventListener("focus", initializeSearch) : __defers["$.__views.search!focus!initializeSearch"] = true;
    cancelSearch ? $.__views.search.addEventListener("cancel", cancelSearch) : __defers["$.__views.search!cancel!cancelSearch"] = true;
    updateSearch ? $.__views.search.addEventListener("change", updateSearch) : __defers["$.__views.search!change!updateSearch"] = true;
    stopSearch ? $.__views.search.addEventListener("blur", stopSearch) : __defers["$.__views.search!blur!stopSearch"] = true;
    searchBofff ? $.__views.search.addEventListener("return", searchBofff) : __defers["$.__views.search!return!searchBofff"] = true;
    var __alloyId42 = {};
    var __alloyId44 = [];
    var __alloyId45 = {
        type: "Ti.UI.ImageView",
        bindId: "pic",
        properties: {
            width: "50dp",
            height: "50dp",
            left: 0,
            bindId: "pic"
        },
        events: {
            click: imageClicked
        }
    };
    __alloyId44.push(__alloyId45);
    var __alloyId46 = {
        type: "Ti.UI.ImageView",
        bindId: "bofff_pic",
        properties: {
            width: "37dp",
            height: "34dp",
            right: 0,
            bindId: "bofff_pic"
        },
        events: {
            click: starClicked
        }
    };
    __alloyId44.push(__alloyId46);
    var __alloyId47 = {
        type: "Ti.UI.Label",
        bindId: "textLabel",
        properties: {
            color: "#000",
            font: {
                fontSize: "20dp"
            },
            left: "60dp",
            top: 0,
            textAlign: "left",
            bindId: "textLabel"
        }
    };
    __alloyId44.push(__alloyId47);
    var __alloyId43 = {
        properties: {
            height: "56dp",
            name: "template1"
        },
        childTemplates: __alloyId44
    };
    __alloyId42["template1"] = __alloyId43;
    $.__views.list_bofffContacts = Ti.UI.createListView({
        width: "100%",
        templates: __alloyId42,
        id: "list_bofffContacts",
        left: "0",
        defaultItemTemplate: "template1"
    });
    $.__views.view_bofffsContacts.add($.__views.list_bofffContacts);
    showContact ? $.__views.list_bofffContacts.addEventListener("itemclick", showContact) : __defers["$.__views.list_bofffContacts!itemclick!showContact"] = true;
    $.__views.view_customField = Alloy.createController("Contacts/view_customField", {
        id: "view_customField",
        __parentSymbol: $.__views.view_container
    });
    $.__views.view_customField.setParent($.__views.view_container);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    args.mainView;
    Ti.include("/contactsUpdate.js");
    try {
        var bofffs = args.bofffFriends;
        var bofffsList = args.bofffsList;
        createBofffListView(bofffsList, "fullName");
    } catch (error) {}
    var friendPin;
    var alertDialog = Ti.UI.createAlertDialog({
        title: "Update Phonebook",
        buttonNames: [ "Not Now", "Apply" ]
    });
    alertDialog.addEventListener("click", function(e) {
        1 == e.index && applyUpdatesOfFriend(friendPin, bofffsList, bofffs);
    });
    for (var i in bofffsList) if ("" != bofffsList[i].friend_added_data && null != bofffsList[i].friend_added_data || "" != bofffsList[i].friend_deleted_data && null != bofffsList[i].friend_deleted_data) {
        friendPin = bofffsList[i].friend_pin_code;
        alertDialog.message = bofffsList[i].contactName + " has updated his profile, click Apply to be applied to your phonebook.";
        alertDialog.show();
    }
    var searchbarIsOnFocus = false;
    var firstFocus = true;
    var searchButtonPressed = false;
    $.list_bofffContacts.caseInsensitiveSearch = true;
    $.list_bofffContacts.keepSectionsInSearch = true;
    var pickerVisible = false;
    var animation = require("alloy/animation");
    var searchableText = "fullName";
    var searchableTextPrivacy = "public";
    $.picker_searchBy.picker.addEventListener("change", function(e) {
        searchableText = e.row.dbName;
        searchableTextPrivacy = e.row.dbPrivacy;
        $.lbl_searchField.text = e.selectedValue[0];
        if ("Custom" == e.selectedValue[0]) {
            $.view_customField.view_customField.width = "90%";
            $.view_customField.view_customField.height = "40%";
            animation.popIn($.view_customField.view_customField);
            $.view_customField.txt_customField.focus();
        }
    });
    var privacyNumber = {
        "public": 0,
        "not favorite": 1,
        friends: 1,
        favorite: 2,
        favorites: 2,
        onlyMe: 3
    };
    $.view_customField.img_closeCustomView.addEventListener("click", function() {
        animation.fadeOut($.view_customField.view_customField, 200, function() {
            $.view_customField.view_customField.width = 0;
            $.view_customField.view_customField.height = 0;
            $.lbl_searchField.text = $.view_customField.txt_customField.value;
            "" == $.lbl_searchField.text && ($.lbl_searchField.text = "Custom");
            $.view_customField.txt_customField.blur();
        });
    });
    var imageFavorite;
    var privacyClicked = false;
    var ifImageClicked = false;
    __defers["$.__views.lbl_searchField!click!openSearchPicker"] && $.__views.lbl_searchField.addEventListener("click", openSearchPicker);
    __defers["$.__views.search!focus!initializeSearch"] && $.__views.search.addEventListener("focus", initializeSearch);
    __defers["$.__views.search!cancel!cancelSearch"] && $.__views.search.addEventListener("cancel", cancelSearch);
    __defers["$.__views.search!change!updateSearch"] && $.__views.search.addEventListener("change", updateSearch);
    __defers["$.__views.search!blur!stopSearch"] && $.__views.search.addEventListener("blur", stopSearch);
    __defers["$.__views.search!return!searchBofff"] && $.__views.search.addEventListener("return", searchBofff);
    __defers["$.__views.list_bofffContacts!itemclick!showContact"] && $.__views.list_bofffContacts.addEventListener("itemclick", showContact);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;