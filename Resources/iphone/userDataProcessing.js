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