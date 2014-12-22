function processContactsForFirstTime() {
    if (!checkContactsAccess()) return "ContactsAccessDenied";
    readContacts();
    editContactsToCorrectForm();
}

function checkContactsAccess() {
    if (Ti.Contacts.contactsAuthorization == Ti.Contacts.AUTHORIZATION_AUTHORIZED) return true;
    if (Ti.Contacts.contactsAuthorization != Ti.Contacts.AUTHORIZATION_UNKNOWN) return false;
    Ti.Contacts.requestAuthorization(function(e) {
        return e.success ? true : false;
    });
}

function readContacts() {
    sortedContacts = Ti.Contacts.getAllPeople();
    sortedContacts.sort(sortContacts);
}

function editContactsToCorrectForm() {
    var allContactsPhoneNumbersAndIds = [];
    var contactPhoneNumbers;
    for (var contact in sortedContacts) {
        contactPhoneNumbers = sortedContacts[contact].getPhone();
        if (!isEmpty(contactPhoneNumbers)) for (var i in contactPhoneNumbers) for (var num in contactPhoneNumbers[i]) {
            if (isRepeatedPhoneNumber(contactPhoneNumbers[i][num])) continue;
            var correctPhoneNumber = removeCharactersFromPhoneNumber(contactPhoneNumbers[i][num]);
            var numberAndId = {
                number: correctPhoneNumber,
                id: sortedContacts[contact].id
            };
            allContactsPhoneNumbersAndIds.push(numberAndId);
        }
    }
    return allContactsPhoneNumbersAndIds;
}

function sortContacts(a, b) {
    if (a.fullName.toUpperCase() > b.fullName.toUpperCase()) return 1;
    if (a.fullName.toUpperCase() < b.fullName.toUpperCase()) return -1;
    return 0;
}

function sortBofffs(a, b) {
    if (a.contactName.toUpperCase() > b.contactName.toUpperCase()) return 1;
    if (a.contactName.toUpperCase() < b.contactName.toUpperCase()) return -1;
    return 0;
}

function removeCharactersFromPhoneNumber(phoneNumber) {
    var phoneNumberExpression = /^\d+$/;
    var correctPhoneNumber = "";
    if (phoneNumberExpression.test(phoneNumber)) correctPhoneNumber = phoneNumber; else for (var character in phoneNumber) phoneNumberExpression.test(phoneNumber[character]) && (correctPhoneNumber += phoneNumber[character]);
    return correctPhoneNumber;
}

function isRepeatedPhoneNumber(phoneNumber) {
    if (null == repeatedNumberCheck[phoneNumber]) {
        repeatedNumberCheck[phoneNumber] = 0;
        return false;
    }
    alert("Repeated number: " + phoneNumber);
    return true;
}

var contacts = [];

var repeatedNumberCheck = [];