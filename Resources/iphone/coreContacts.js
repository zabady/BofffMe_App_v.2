function processContactsForFirstTime() {
    if (!checkContactsAccess()) return "ContactsAccessDenied";
    readContacts();
}

function readContacts() {
    sortedContacts = Ti.Contacts.getAllPeople();
    sortedContacts.sort(sortContacts);
}

function checkContactsAccess() {
    if (Ti.Contacts.contactsAuthorization == Ti.Contacts.AUTHORIZATION_AUTHORIZED) return true;
    if (Ti.Contacts.contactsAuthorization != Ti.Contacts.AUTHORIZATION_UNKNOWN) return false;
    Ti.Contacts.requestAuthorization(function(e) {
        return e.success ? true : false;
    });
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

var contacts = [];

var repeatedNumberCheck = [];