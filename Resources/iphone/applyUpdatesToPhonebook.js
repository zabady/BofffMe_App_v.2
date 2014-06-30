function InitializeContact(id) {
    contact = Titanium.Contacts.getPersonByID(id);
    alert("Initialize Contact: " + contact.fullName);
}

function determineAndApplyUpdate(fieldType, stringObjects, addOrDelete) {
    Ti.API.info("determineUpdateType");
    null == contact && alert("Contact must be initialized ya beheema !");
    switch (fieldType) {
      case "phone_number":
      case "mails":
      case "social_links":
        var type, key;
        if ("phone_number" == fieldType) {
            type = "phone";
            key = "mobile";
        } else if ("mails" == fieldType) {
            type = "email";
            key = "work";
        } else {
            type = "url";
            key = "home";
        }
        "add" == addOrDelete ? UpdateAddableField(type, key, stringObjects[fieldType]) : DeleteAddableField(type, stringObjects[fieldType]);
        break;

      case "job_title":
      case "birthday_date":
      case "company":
        var type;
        type = "job_title" == fieldType ? "jobTitle" : "birthday_date" == fieldType ? "birthday" : "company";
        UpdateNonAddableField(type, stringObjects[fieldType]);
        break;

      case "residence":
        break;

      default:
        alert("ERROR: Field type is not recongnizable.");
    }
}

function UpdateAddableField(fieldType, fieldKey, fieldValue) {
    Ti.API.info("UpdateAddableField: " + fieldType + ", " + fieldKey + ", " + fieldValue);
    null == contact && alert("Contact must be initialized ya beheema !");
    var fieldDictionary = contact[fieldType];
    try {
        fieldDictionary[fieldKey].push(fieldValue);
    } catch (exp) {
        fieldDictionary[fieldKey] = [ fieldValue ];
    }
    contact[fieldType] = fieldDictionary;
    alert(contact[fieldType]);
}

function UpdateNonAddableField(fieldName, fieldValue) {
    Ti.API.info("UpdateNonAddableField: " + fieldName + ", " + fieldValue);
    null == contact && alert("Contact must be initialized ya beheema !");
    if ("jobTitle" == fieldName && false) return;
    "nickname" == fieldName && (fieldName = "Bofff Me: " + fieldName);
    contact[fieldName] = fieldValue;
}

function DeleteAddableField(fieldType, valueToBeDeleted) {
    Ti.API.info("DeleteAddableField: " + fieldType + ", " + valueToBeDeleted);
    alert("DeleteAddableField: " + fieldType + ", " + valueToBeDeleted);
    alert(contact[fieldType]);
    var fieldDictionary = contact[fieldType];
    var fieldDictionaryAfterDeletion = {};
    valueToBeDeleted = valueToBeDeleted.replace("http://", "");
    for (var key in fieldDictionary) for (var record in fieldDictionary[key]) {
        fieldDictionary[key][record] = fieldDictionary[key][record].replace("http://", "");
        "phone" == fieldType && fieldDictionary[key][record] == removeAnyCharButNumber(fieldDictionary[key][record]);
        if (fieldDictionary[key][record] != valueToBeDeleted) try {
            fieldDictionaryAfterDeletion[key].push(fieldDictionary[key][record]);
        } catch (error) {
            fieldDictionaryAfterDeletion[key] = [ fieldDictionary[key][record] ];
        }
    }
    contact[fieldType] = fieldDictionaryAfterDeletion;
    alert(contact[fieldType]);
}

function SaveUpdatedContactToPhonebook() {
    Ti.API.info("SaveUpdatedContactToPhonebook");
    null == contact && alert("Contact must be initialized ya beheema !");
    Titanium.Contacts.save();
    contact = null;
    alert("Contact Updated in Phonebook !");
}

function removeAnyCharButNumber(number) {
    var trimmedNumber = "";
    var expression = /^\d+$/;
    if (expression.test(number)) trimmedNumber = number; else for (var digit in number) expression.test(number[digit]) && (trimmedNumber += number[digit]);
    return trimmedNumber;
}

var contact = new Object();