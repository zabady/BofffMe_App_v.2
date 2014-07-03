function copyObjectAndReturnRefrence(obj) {
    var newObj = {};
    for (var key in obj) newObj[key] = obj[key];
    return newObj;
}

function convertAddableFieldsToArrays(dataInStrings) {
    var dataInArrays = copyObjectAndReturnRefrence(dataInStrings);
    for (var field in dataInStrings) switch (field) {
      case "phone_numbers":
      case "phone_numbers_privacy":
      case "mails":
      case "mails_privacy":
      case "social_links":
      case "social_links_privacy":
      case "interests":
      case "interests_privacy":
      case "favorite_places":
      case "favorite_places_privacy":
        try {
            dataInArrays[field] = dataInArrays[field].split("$");
        } catch (exp) {
            alert(exp);
        }
    }
    return dataInArrays;
}

function convertAddableFieldsToStrings(dataInArrays) {
    var dataInStrings = copyObjectAndReturnRefrence(dataInArrays);
    for (var field in dataInArrays) switch (field) {
      case "phone_numbers":
      case "phone_numbers_privacy":
      case "mails":
      case "mails_privacy":
      case "social_links":
      case "social_links_privacy":
      case "interests":
      case "interests_privacy":
      case "favorite_places":
      case "favorite_places_privacy":
        try {
            dataInStrings[field] = dataInStrings[field].join("$");
        } catch (exp) {
            alert(exp);
        }
    }
    return dataInStrings;
}

function changeValueOfNonAddableField(userDataInArrays, fieldName, newValue) {
    try {
        userDataInArrays[fieldName] = newValue;
    } catch (exp) {
        alert(exp);
    }
}

function changePrivacyOfNonAddableField(userDataInArrays, fieldPrivacyName, newValue) {
    try {
        userDataInArrays[fieldPrivacyName] = newValue;
    } catch (exp) {
        alert(exp);
    }
}

function deleteAddableField(userDataInArrays, fieldType, value) {
    try {
        var index = userDataInArrays[fieldType].indexOf(value);
        userDataInArrays[fieldType].splice(index, 1);
        userDataInArrays[fieldType + "_privacy"].splice(index, 1);
    } catch (exp) {
        alert(exp);
    }
}

function addNewFieldToUserData(userDataInArrays, fieldType) {
    try {
        userDataInArrays[fieldType].push("");
        userDataInArrays[fieldType + "_privacy"].push("public");
    } catch (exp) {
        alert(exp);
    }
}

function changeValueOfAddableField(userDataInArrays, fieldType, oldValue, newValue) {
    try {
        var index = userDataInArrays[fieldType].indexOf(oldValue);
        userDataInArrays[fieldType][index] = newValue;
    } catch (exp) {
        alert(exp);
    }
}

function changePrivacyOfAddableField(userDataInArrays, fieldType, oldPrivacy, newPrivacy) {
    try {
        var index = userDataInArrays[fieldType + "_privacy"].indexOf(oldPrivacy);
        userDataInArrays[fieldType + "_privacy"][index] = newPrivacy;
    } catch (exp) {
        alert(exp);
    }
}

function postUserDataUpdatesOnServer(oldUserDataInStrings, newUserDataInArrays) {
    var validationMsg = validateAddableFields(newUserDataInArrays);
    if (validationMsg.search("Wrong") >= 0) return validationMsg;
    try {
        Titanium.App.Properties.getObject("bofffsSpecificData");
        convertAddableFieldsToStrings(newUserDataInArrays);
        Ti.include("/pushNotificationAPIs.js");
        NotifyAllUserFriendsWithMessage(newUserDataInArrays.fullName + " has updated his profile, click here so these updates are applied to your phonebook.", "test", newUserDataInArrays.icon_image);
    } catch (exp) {
        alert(exp);
    } finally {
        return "";
    }
}

function validateAddableFields(userDataInArrays) {
    for (var i = 0; userDataInArrays.phone_numbers.length > i; i++) if (null == userDataInArrays.phone_numbers[i] || "" == userDataInArrays.phone_numbers[i]) {
        Ti.API.info("I will delete an empty phone");
        deleteAddableField(userDataInArrays, "phone_numbers", "");
        i--;
    } else if (!validatePhoneNumber(userDataInArrays.phone_numbers[i])) return "Wrong phone number.";
    for (var i = 0; userDataInArrays.mails.length > i; i++) if (null == userDataInArrays.mails[i] || "" == userDataInArrays.mails[i]) {
        Ti.API.info("I will delete an empty email");
        deleteAddableField(userDataInArrays, "mails", "");
        i--;
    } else if (!validateEmail(userDataInArrays.mails[i])) return "Wrong email address.";
    if (!validateEmail(userDataInArrays.primary_email)) return "Wrong primary email address.";
    return "No problems.";
}

function validatePhoneNumber(phoneNumber) {
    var phoneNumberRegex = /^[0-9]{9,15}$/;
    return phoneNumber.match(phoneNumberRegex) ? true : false;
}

function validateEmail(email) {
    var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email.match(emailRegex) ? true : false;
}