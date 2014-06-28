<<<<<<< HEAD
=======
function saveUpdate(contact) {
    Titanium.Contacts.save([ contact ]);
    alert("contact updated");
}

function addNumber(id, key, value) {
    alert("ana android mesh hayemfa3");
}

>>>>>>> parent of dfc29e3... contacsUpdate: Overriding Zeezo's code
function deleteNumber(id, value) {
    var contact = Titanium.Contacts.getPersonByID(id);
    var phone = contact.phone;
    var phoneAfterDeletion = {};
    for (var key in phone) for (var number in phone[key]) {
        var phoneNumber = phone[key][number];
        var trimmedPhoneNumber = "";
        var expression = /^\d+$/;
        if (expression.test(phoneNumber)) trimmedPhoneNumber = phoneNumber; else for (var digit in phoneNumber) expression.test(phoneNumber[digit]) && (trimmedPhoneNumber += phoneNumber[digit]);
        if (trimmedPhoneNumber != value) try {
            phoneAfterDeletion[key].push(trimmedPhoneNumber);
        } catch (error) {
            phoneAfterDeletion[key] = [ trimmedPhoneNumber ];
        }
    }
    contact.phone = phoneAfterDeletion;
    saveUpdate(contact);
}

<<<<<<< HEAD
=======
function addNickname(id, bofffFullName) {
    var contact = Titanium.Contacts.getPersonByID(id);
    var nickname = contact.nickname;
    0 == nickname.length ? nickname = "Bofff Name: " + bofffFullName : nickname += "\nBofff Name: " + bofffFullName;
    contact.setNickname(nickname);
    saveUpdate(contact);
}

function addEmail(id, key, value) {
    var contact = Titanium.Contacts.getPersonByID(id);
    var email = contact.email;
    try {
        email[key].push(value);
    } catch (error) {
        email[key] = [ value ];
    }
    contact.email = email;
    saveUpdate(contact);
}

>>>>>>> parent of dfc29e3... contacsUpdate: Overriding Zeezo's code
function deleteEmail(id, value) {
    var contact = Titanium.Contacts.getPersonByID(id);
    var email = contact.email;
    var emailAfterDeletion = {};
    for (var key in email) for (var record in email[key]) if (email[key][record] != value) try {
        emailAfterDeletion[key].push(email[key][record]);
    } catch (error) {
        emailAfterDeletion[key] = [ email[key][record] ];
    }
    contact.email = emailAfterDeletion;
    saveUpdate(contact);
}

<<<<<<< HEAD
=======
function addSocialLink(id, key, value) {
    var contact = Titanium.Contacts.getPersonByID(id);
    var url = contact.url;
    try {
        url[key].push(value);
    } catch (error) {
        url[key] = [ value ];
    }
    contact.url = url;
    saveUpdate(contact);
}

>>>>>>> parent of dfc29e3... contacsUpdate: Overriding Zeezo's code
function deleteSocialLink(id, value) {
    value = value.replace("http://", "");
    var contact = Titanium.Contacts.getPersonByID(id);
    var url = contact.url;
    var urlAfterDeletion = {};
    for (var key in url) for (var record in url[key]) {
        url[key][record] = url[key][record].replace("http://", "");
        if (url[key][record] != value) try {
            urlAfterDeletion[key].push(url[key][record]);
        } catch (error) {
            urlAfterDeletion[key] = [ url[key][record] ];
        }
    }
    contact.url = urlAfterDeletion;
    saveUpdate(contact);
}

<<<<<<< HEAD
=======
function addJobTitle(id, jobTitle) {
    var contact = Titanium.Contacts.getPersonByID(id);
    contact.jobTitle = jobTitle;
    saveUpdate(contact);
}

function addCompany(id, company) {
    var contact = Titanium.Contacts.getPersonByID(id);
    contact.organization = company;
    saveUpdate(contact);
}

function addBirthday(id, birthday) {
    var contact = Titanium.Contacts.getPersonByID(id);
    contact.birthday = birthday;
    saveUpdate(contact);
}

function addNote(id, note) {
    var contact = Titanium.Contacts.getPersonByID(id);
    contact.note = note;
    saveUpdate(contact);
}

>>>>>>> parent of dfc29e3... contacsUpdate: Overriding Zeezo's code
function addAddress(id, key, street, city, country) {
    var contact = Titanium.Contacts.getPersonByID(id);
    var address = contact.address;
    var value = new Array();
    value["street"] = street;
    value["city"] = city;
    value["country"] = country;
    try {
        address[key].push(value);
    } catch (error) {
        address[key] = [ value ];
    }
    contact.address = address;
    saveUpdate(contact);
}

function checkFullNameUpdate(userData, newUserData, fullNameObject) {
    var fullName = newUserData.fullName;
    if (userData.fullName != fullName) {
        fullNameObject.name = fullName;
        return fullName;
    }
    return 0;
}

function checkGender(userData, newUserData, genderObject) {
    var gender = newUserData.gender;
    if (userData.gender != gender) {
        genderObject.gender = gender;
        return gender;
    }
    return 0;
}

function checkPhoneNumbersUpdate(userData, newUserData, phoneNumbersObject) {
    var phoneNumbers = newUserData.phone_numbers;
    if (userData.phone_numbers != phoneNumbers) {
        var currentNumbers = userData.phone_numbers.split(Alloy.Globals.splitValue);
        var updatedNumbers = phoneNumbers.split(Alloy.Globals.splitValue);
        var hashCurrentNumbers = [];
        var newNumbers = [];
        for (var number in currentNumbers) hashCurrentNumbers[currentNumbers[number]] = currentNumbers[number];
        for (var number in updatedNumbers) null == hashCurrentNumbers[updatedNumbers[number]] && newNumbers.push(updatedNumbers[number]);
        var deletedNumbers = [];
        for (var number in hashCurrentNumbers) {
            deletedNumbers.push(hashCurrentNumbers[number]);
            for (var counter in updatedNumbers) hashCurrentNumbers[number] == updatedNumbers[counter] && deletedNumbers.pop();
        }
        var numbers = {
            newNumbers: newNumbers.toString(),
            deletedNumbers: deletedNumbers.toString()
        };
        phoneNumbersObject.numbers = numbers;
        return phoneNumbersObject.numbers;
    }
    return 0;
}

function checkMailsUpdate(userData, newUserData, mailsObject) {
    var mails = newUserData.mails;
    if (userData.mails != mails) {
        var currentMails = userData.mails.split(Alloy.Globals.splitValue);
        var updatedMails = mails.split(Alloy.Globals.splitValue);
        var hashCurrentMails = [];
        var newMails = [];
        for (var mail in currentMails) hashCurrentMails[currentMails[mail]] = currentMails[mail];
        for (var mail in updatedMails) null == hashCurrentMails[updatedMails[mail]] && newMails.push(updatedMails[mail]);
        var deletedMails = [];
        for (var mail in hashCurrentMails) {
            deletedMails.push(hashCurrentMails[mail]);
            for (var counter in updatedMails) hashCurrentMails[mail] == updatedMails[counter] && deletedMails.pop();
        }
        var mails = {
            newMails: newMails.toString(),
            deletedMails: deletedMails.toString()
        };
        mailsObject.mails = mails;
        return mailsObject.mails;
    }
    return 0;
}

function checkSocialLinksUpdate(userData, newUserData, socialLinksObject) {
    var socialLinks = newUserData.social_links;
    if (userData.social_links != socialLinks) {
        var currentSocialLinks = userData.social_links.split(Alloy.Globals.splitValue);
        var updatedSocialLinks = socialLinks.split(Alloy.Globals.splitValue);
        var hashCurrentSocialLinks = [];
        var newLinks = [];
        for (var socialLink in currentSocialLinks) hashCurrentSocialLinks[currentSocialLinks[socialLink]] = currentSocialLinks[socialLink];
        for (var socialLink in updatedSocialLinks) null == hashCurrentSocialLinks[updatedSocialLinks[socialLink]] && newLinks.push(updatedSocialLinks[socialLink]);
        var deletedLinks = [];
        for (var link in hashCurrentSocialLinks) {
            deletedLinks.push(hashCurrentSocialLinks[link]);
            for (var counter in updatedSocialLinks) hashCurrentSocialLinks[link] == updatedSocialLinks[counter] && deletedLinks.pop();
        }
        var links = {
            newLinks: newLinks.toString(),
            deletedLinks: deletedLinks.toString()
        };
        socialLinksObject.links = links;
        return socialLinksObject.links;
    }
    return 0;
}

function checkResidenceUpdate(userData, newUserData, residenceObject) {
    var residences = newUserData.residence;
    if (userData.residence != residences) {
        residenceObject.residences = residences;
        return residenceObject.residences;
    }
    return 0;
}

function checkJobTitleUpdate(userData, newUserData, jobTitleObject) {
    var jobTitle = newUserData.job_title;
    if (userData.job_title != jobTitle) {
        jobTitleObject.title = jobTitle;
        return jobTitle;
    }
    return 0;
}

function checkBirthdayUpdate(userData, newUserData, birthdayObject) {
    var birthday = newUserData.birthday_date;
    if (userData.birthday_date != birthday) {
        birthdayObject.date = birthday;
        return birthday;
    }
    return 0;
}

function checkCompanyUpdate(userData, newUserData, companyObject) {
    var company = newUserData.company;
    if (userData.company != company) {
        companyObject.company = company;
        return company;
    }
    return 0;
}

function manageUserUpdates(oldUserData, pin, bofffsSpecificData) {
    var url = "http://www.bofffme.com/api/index.php/home/";
    var xhr = Ti.Network.createHTTPClient({
        onload: function() {
            var newData = JSON.parse(this.responseText).rows[0];
            createUpdateString(oldUserData, newData, pin, bofffsSpecificData);
        },
        onerror: function() {
            alert(this.responseText);
        }
    });
    xhr.open("POST", url + "search_user_by/bofff/user_accounts/pin/" + pin);
    xhr.send();
}

function createUpdateString(userData, newData, userPin, bofffsSpecificData) {
    var added = [];
    var deleted = [];
    var friendsToSendAdded = [];
    var friendsToSendDeleted = [];
    var newFullName = {
        name: ""
    };
    var upadteHappened = false;
    if (0 != checkFullNameUpdate(userData, newData, newFullName)) {
        upadteHappened = true;
        added[0] = [];
        added[0].push("fullName$" + newFullName.name + "\n");
        friendsToSendAdded[0] = [];
        friendsToSendAdded[0][0] = [];
        for (var friend in bofffsSpecificData) friendsToSendAdded[0][0].push(bofffsSpecificData[friend].friend_pin_code);
    }
    var newGender = {
        gender: ""
    };
    if (0 != checkGender(userData, newData, newGender)) {
        upadteHappened = true;
        added[1] = [];
        added[1].push("gender$" + newGender.gender + "\n");
        friendsToSendAdded[1] = [];
        friendsToSendAdded[1][0] = [];
        for (var friend in bofffsSpecificData) friendsToSendAdded[1][0].push(bofffsSpecificData[friend].friend_pin_code);
    }
    var newPhoneNumbers = {
        numbers: ""
    };
    if (0 != checkPhoneNumbersUpdate(userData, newData, newPhoneNumbers)) {
        upadteHappened = true;
        if ("" != newPhoneNumbers.numbers.newNumbers) {
            var newNumbers = newPhoneNumbers.numbers.newNumbers.split(",");
            added[2] = [];
            friendsToSendAdded[2] = [];
            for (var number in newNumbers) {
                friendsToSendAdded[2][number] = [];
                checkPrivacySettings("phone_numbers", "phone_numbers_privacy", newNumbers[number], newData, bofffsSpecificData, friendsToSendAdded[2][number]) && added[2].push("phone_number$" + newNumbers[number] + "\n");
            }
        }
        if ("" != newPhoneNumbers.numbers.deletedNumbers) {
            var deletedNumbers = newPhoneNumbers.numbers.deletedNumbers.split(",");
            deleted[2] = [];
            friendsToSendDeleted[2] = [];
            for (var number in deletedNumbers) {
                friendsToSendDeleted[2][number] = [];
                checkPrivacySettings("phone_numbers", "phone_numbers_privacy", deletedNumbers[number], userData, bofffsSpecificData, friendsToSendDeleted[2][number]) && deleted[2].push("phone_number$" + deletedNumbers[number] + "\n");
            }
        }
    }
    var newMails = {
        mails: ""
    };
    if (0 != checkMailsUpdate(userData, newData, newMails)) {
        upadteHappened = true;
        if ("" != newMails.mails.newMails) {
            var addedMails = newMails.mails.newMails.split(",");
            added[3] = [];
            friendsToSendAdded[3] = [];
            for (var mail in addedMails) {
                friendsToSendAdded[3][mail] = [];
                alert(addedMails[mail]);
                checkPrivacySettings("mails", "mails_privacy", addedMails[mail], newData, bofffsSpecificData, friendsToSendAdded[3][mail]) && added[3].push("mails$" + addedMails[mail] + "\n");
            }
        }
        if ("" != newMails.mails.deletedMails) {
            var deletedMails = newMails.mails.deletedMails.split(",");
            deleted[3] = [];
            friendsToSendDeleted[3] = [];
            for (var mail in deletedMails) {
                friendsToSendDeleted[3][mail] = [];
                alert(deletedMails[mail]);
                checkPrivacySettings("mails", "mails_privacy", deletedMails[mail], userData, bofffsSpecificData, friendsToSendDeleted[3][mail]) && deleted[3].push("mails$" + deletedMails[mail] + "\n");
            }
        }
    }
    var newSocialLinks = {
        links: ""
    };
    if (0 != checkSocialLinksUpdate(userData, newData, newSocialLinks)) {
        upadteHappened = true;
        if ("" != newSocialLinks.links.newLinks) {
            var addedLinks = newSocialLinks.links.newLinks.split(",");
            added[4] = [];
            friendsToSendAdded[4] = [];
            for (var link in addedLinks) {
                friendsToSendAdded[4][link] = [];
                checkPrivacySettings("social_links", "social_links_privacy", addedLinks[link], newData, bofffsSpecificData, friendsToSendAdded[4][link]) && added[4].push("social_links$" + addedLinks[link] + "\n");
            }
        }
        if ("" != newSocialLinks.links.deletedLinks) {
            var deletedLinks = newSocialLinks.links.deletedLinks.split(",");
            deleted[4] = [];
            friendsToSendDeleted[4] = [];
            for (var link in deletedLinks) {
                friendsToSendDeleted[4][link] = [];
                checkPrivacySettings("social_links", "social_links_privacy", deletedLinks[link], userData, bofffsSpecificData, friendsToSendDeleted[4][link]) && deleted[4].push("social_links$" + deletedLinks[link] + "\n");
            }
        }
    }
    var newResidences = {
        residences: ""
    };
    if (0 != checkResidenceUpdate(userData, newData, newResidences)) {
        upadteHappened = true;
        added[5] = [];
        added[5].push("residence$" + newResidences.residences + "\n");
        friendsToSendAdded[5] = [];
        friendsToSendAdded[5][0] = [];
        checkPrivacySettings("residence", "residence_privacy", newResidences.residences, newData, bofffsSpecificData, friendsToSendAdded[5][0]);
    }
    var newJobTitle = {
        title: ""
    };
    if (0 != checkJobTitleUpdate(userData, newData, newJobTitle)) {
        upadteHappened = true;
        added[6] = [];
        added[6].push("job_title$" + newJobTitle.title + "\n");
        friendsToSendAdded[6] = [];
        friendsToSendAdded[6][0] = [];
        checkPrivacySettings("job_title", "job_title_privacy", newJobTitle.title, newData, bofffsSpecificData, friendsToSendAdded[6][0]);
    }
    var newBirthday = {
        date: ""
    };
    if (0 != checkBirthdayUpdate(userData, newData, newBirthday)) {
        upadteHappened = true;
        added[7] = [];
        added[7].push("birthday_date$" + newBirthday.date + "\n");
        friendsToSendAdded[7] = [];
        friendsToSendAdded[7][0] = [];
        checkPrivacySettings("birthday_date", "birthday_date_privacy", newBirthday.date, newData, bofffsSpecificData, friendsToSendAdded[7][0]);
    }
    var newCompany = {
        company: ""
    };
    if (0 != checkCompanyUpdate(userData, newData, newCompany)) {
        upadteHappened = true;
        added[8] = [];
        added[8].push("company$" + newCompany.company + "\n");
        friendsToSendAdded[8] = [];
        friendsToSendAdded[8][0] = [];
        checkPrivacySettings("company", "company_privacy", newCompany.company, newData, bofffsSpecificData, friendsToSendAdded[8][0]);
    }
    if (upadteHappened) {
        upadteHappened = false;
        addUpdatesToFriends(added, deleted, friendsToSendAdded, friendsToSendDeleted, userPin);
    } else alert("no changes");
}

function checkPrivacySettings(fieldToUpdate, fieldPrivacy, valueOfField, newUserData, bofffsSpecificData, friendsToSendTo) {
    var privacyNumber = {
        "public": 0,
        "not favorite": 1,
        friends: 1,
        favorite: 2,
        favorites: 2,
        onlyMe: 3
    };
    var indexOfTheUpdateValue = newUserData[fieldToUpdate].split(Alloy.Globals.splitValue).indexOf(valueOfField);
    var valuePrivacy = newUserData[fieldPrivacy].split(Alloy.Globals.splitValue)[indexOfTheUpdateValue];
    for (var friend in bofffsSpecificData) {
        var isFriendFavorite = bofffsSpecificData[friend].userPrivacy_towards_friend;
        privacyNumber[isFriendFavorite] >= privacyNumber[valuePrivacy] && friendsToSendTo.push(bofffsSpecificData[friend].friend_pin_code);
    }
    return true;
}

function addUpdatesToFriends(dataAdded, dataDeleted, friendsToSendAdded, friendsToSendDeleted, userPin) {
    var url = "http://www.bofffme.com/api/index.php/home/";
    var xhr = Ti.Network.createHTTPClient({
        onload: function() {
            alert(this.responseText);
        },
        onerror: function() {
            alert(this.responseText);
        }
    });
    xhr.open("POST", url + "update_friend_updates/bofff/user_friends/" + userPin);
    var params = {
        friend_added_data: JSON.stringify(dataAdded),
        friend_deleted_data: JSON.stringify(dataDeleted),
        friendsToSendAdded: JSON.stringify(friendsToSendAdded),
        friendsToSendDeleted: JSON.stringify(friendsToSendDeleted)
    };
    xhr.send(params);
}

function applyUpdatesOfFriend(friend_pin, bofffsList, bofffsData) {
<<<<<<< HEAD
<<<<<<< HEAD
    Ti.API.info("applyUpdatesOfFriend: " + friend_pin);
    Ti.include("/applyUpdatesToPhonebook.js");
=======
>>>>>>> parent of dfc29e3... contacsUpdate: Overriding Zeezo's code
=======
>>>>>>> parent of dfc29e3... contacsUpdate: Overriding Zeezo's code
    for (var record in bofffsList) if (bofffsList[record].friend_pin_code == friend_pin) {
        var stringToUpdate = bofffsList[record].friend_added_data;
        if ("" != stringToUpdate) {
            parsingUpdateString(stringToUpdate, "add", record, bofffsList, bofffsData);
            bofffsList[record].friend_added_data = "";
        }
        stringToUpdate = bofffsList[record].friend_deleted_data;
        if ("" != stringToUpdate) {
            parsingUpdateString(stringToUpdate, "delete", record, bofffsList, bofffsData);
            bofffsList[record].friend_deleted_data = "";
        }
        deleteUpdatesOffriend(bofffsList[record].id);
    }
}

function deleteUpdatesOffriend(friendId) {
    var url = "http://www.bofffme.com/api/index.php/home/";
    var xhr = Ti.Network.createHTTPClient({
        onload: function() {
            alert(this.responseText);
        },
        onerror: function() {
            alert(this.responseText);
        }
    });
    xhr.open("POST", url + "update_with_id/bofff/user_friends/" + friendId);
    var params = {
        friend_added_data: "",
        friend_deleted_data: ""
    };
    xhr.send(params);
}

function parsingUpdateString(updateString, addOrDelete, userFriendAppId, bofffsSpecificData, bofffsData) {
<<<<<<< HEAD
<<<<<<< HEAD
    Ti.API.info("parsingUpdateString");
    InitializeContact(bofffsData[userFriendAppId].contact_id);
=======
>>>>>>> parent of dfc29e3... contacsUpdate: Overriding Zeezo's code
=======
>>>>>>> parent of dfc29e3... contacsUpdate: Overriding Zeezo's code
    var stringLines = updateString.split("\n");
    var stringObjects = {};
    for (var line in stringLines) if ("" != stringLines[line]) {
        var stringColon = stringLines[line].split(Alloy.Globals.splitValue);
        stringObjects[stringColon[0]] = stringColon[1];
<<<<<<< HEAD
        "add" == addOrDelete ? determineAndApplyUpdate(stringColon[0], stringObjects, addOrDelete, userFriendAppId, bofffsSpecificData, bofffsData) : alert("It's a delete !");
=======
        determineUpdateType(stringColon[0], stringObjects, addOrDelete, userFriendAppId, bofffsSpecificData, bofffsData);
    }
}

function determineUpdateType_alerts(fieldType, stringObjects, addOrDelete, userFriendAppId, bofffsSpecificData, bofffsData) {
    alert("fieldType: " + fieldType + "\n+addOrDelete: " + addOrDelete + "\n+userFriendAppId: " + userFriendAppId + "\n+bofffsSpecificData: " + bofffsSpecificData + "\n+bofffsData: " + bofffsData);
    switch (fieldType) {
      case "phone_number":
        alert("phone: " + stringObjects[fieldType]);
        break;

      case "mails":
        alert("mails: " + stringObjects[fieldType]);
        break;

      case "social_links":
        alert("sociallinks: " + stringObjects[fieldType]);
        break;

      case "residence":
        alert("residence: " + stringObjects[fieldType]);
        break;

      case "job_title":
        alert("jobtitle: " + stringObjects[fieldType]);
        break;

      case "birthday_date":
        alert("birthdate: " + stringObjects[fieldType]);
        break;

      case "company":
        alert("company: " + stringObjects[fieldType]);
        break;

      default:
        alert("no known");
    }
}

function determineUpdateType(fieldType, stringObjects, addOrDelete, userFriendAppId, bofffsSpecificData, bofffsData) {
    switch (fieldType) {
      case "phone_number":
        "add" == addOrDelete ? addNumber(bofffsData[userFriendAppId].contact_id, "mobile", stringObjects[fieldType]) : deleteNumber(bofffsData[userFriendAppId].contact_id, stringObjects[fieldType]);
        break;

      case "mails":
        "add" == addOrDelete ? addEmail(bofffsData[userFriendAppId].contact_id, "work", stringObjects[fieldType]) : deleteEmail(bofffsData[userFriendAppId].contact_id, stringObjects[fieldType]);
        break;

      case "social_links":
        "add" == addOrDelete ? addSocialLink(bofffsData[userFriendAppId].contact_id, "home", stringObjects[fieldType]) : deleteSocialLink(bofffsData[userFriendAppId].contact_id, stringObjects[fieldType]);
        break;

      case "residence":
        "add" == addOrDelete && alert("residence is incomplete");
        alert("residence: " + stringObjects[fieldType]);
        break;

      case "job_title":
        "add" == addOrDelete && addJobTitle(bofffsData[userFriendAppId].contact_id, stringObjects[fieldType]);
        break;

      case "birthday_date":
        "add" == addOrDelete && addBirthday(bofffsData[userFriendAppId].contact_id, stringObjects[fieldType]);
        break;

      case "company":
        "add" == addOrDelete && addCompany(bofffsData[userFriendAppId].contact_id, stringObjects[fieldType]);
        break;

      default:
        alert("no known");
>>>>>>> parent of dfc29e3... contacsUpdate: Overriding Zeezo's code
    }
    SaveUpdatedContactToPhonebook();
}

function updateBofff(pin, userData, newData, bofffsSpecificData) {
    var url = "http://www.bofffme.com/api/index.php/home/";
    var xhr = Ti.Network.createHTTPClient({
        onload: function() {
            alert(this.responseText);
            createUpdateString(userData, newData, pin, bofffsSpecificData);
        },
        onerror: function() {
            alert("error");
        }
    });
    xhr.open("POST", url + "update_with_pin/bofff/user_accounts/" + pin);
    xhr.send(newData);
}