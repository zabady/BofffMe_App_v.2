function InitializeContact(id) {
    contact = Titanium.Contacts.getPersonByID(id);
}

function UpdateAddableField(fieldType, fieldKey, fieldValue) {
    Ti.API.info("UpdateAddableField: " + fieldType + ", " + fieldKey + ", " + fieldValue);
    null != contact[fieldType] ? contact[fieldType][fieldKey].push(fieldValue) : contact[fieldType][fieldKey] = [ fieldValue ];
    alert(contact[fieldType]);
    Ti.API.info(contact[fieldType]);
}

function UpdateNonAddableField(fieldName, fieldValue) {
    Ti.API.info("UpdateNonAddableField: " + fieldName + ", " + fieldValue);
    if ("jobTitle" == fieldName && true) return;
    "nickname" == fieldName && (fieldName = "Bofff Me: " + fieldName);
    contact[fieldName] = fieldValue;
}

function SaveUpdatedContactToPhonebook() {
    Ti.API.info("SaveUpdatedContactToPhonebook");
    alert(contact);
    alert("Contact will be null.");
    contact = null;
}

function determineAndApplyUpdate(fieldType, stringObjects) {
    Ti.API.info("determineUpdateType");
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
        UpdateAddableField(type, key, stringObjects[fieldType]);
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

var contact = new Object();