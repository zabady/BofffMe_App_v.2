function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Contacts/searchByFieldPicker";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.view_picker = Ti.UI.createView({
        id: "view_picker",
        width: "0",
        height: "0",
        backgroundColor: "white"
    });
    $.__views.view_picker && $.addTopLevelView($.__views.view_picker);
    $.__views.picker = Ti.UI.createPicker({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "picker",
        selectionIndicator: "true"
    });
    $.__views.view_picker.add($.__views.picker);
    var __alloyId43 = [];
    $.__views.__alloyId44 = Ti.UI.createPickerRow({
        dbName: "fullName",
        dbPrivacy: "",
        title: "Name",
        id: "__alloyId44"
    });
    __alloyId43.push($.__views.__alloyId44);
    $.__views.__alloyId45 = Ti.UI.createPickerRow({
        dbName: "phone_numbers",
        dbPrivacy: "phone_numbers_privacy",
        title: "Phone Number",
        id: "__alloyId45"
    });
    __alloyId43.push($.__views.__alloyId45);
    $.__views.__alloyId46 = Ti.UI.createPickerRow({
        dbName: "mails",
        dbPrivacy: "mails_privacy",
        title: "E-mail",
        id: "__alloyId46"
    });
    __alloyId43.push($.__views.__alloyId46);
    $.__views.__alloyId47 = Ti.UI.createPickerRow({
        dbName: "social_links",
        dbPrivacy: "social_links_privacy",
        title: "Social Network",
        id: "__alloyId47"
    });
    __alloyId43.push($.__views.__alloyId47);
    $.__views.__alloyId48 = Ti.UI.createPickerRow({
        dbName: "job_title",
        dbPrivacy: "job_title_privacy",
        title: "Job Title",
        id: "__alloyId48"
    });
    __alloyId43.push($.__views.__alloyId48);
    $.__views.__alloyId49 = Ti.UI.createPickerRow({
        dbName: "company",
        dbPrivacy: "company_privacy",
        title: "Company",
        id: "__alloyId49"
    });
    __alloyId43.push($.__views.__alloyId49);
    $.__views.__alloyId50 = Ti.UI.createPickerRow({
        dbName: "interests",
        dbPrivacy: "interests_privacy",
        title: "Interests",
        id: "__alloyId50"
    });
    __alloyId43.push($.__views.__alloyId50);
    $.__views.__alloyId51 = Ti.UI.createPickerRow({
        dbName: "education",
        dbPrivacy: "education_privacy",
        title: "Education",
        id: "__alloyId51"
    });
    __alloyId43.push($.__views.__alloyId51);
    $.__views.__alloyId52 = Ti.UI.createPickerRow({
        dbName: "favorite_places",
        dbPrivacy: "favorite_places_privacy",
        title: "Favorite Places",
        id: "__alloyId52"
    });
    __alloyId43.push($.__views.__alloyId52);
    $.__views.__alloyId53 = Ti.UI.createPickerRow({
        dbName: "marital_status",
        dbPrivacy: "marital_status_privacy",
        title: "Marital Status",
        id: "__alloyId53"
    });
    __alloyId43.push($.__views.__alloyId53);
    $.__views.__alloyId54 = Ti.UI.createPickerRow({
        dbName: "residence",
        dbPrivacy: "residence_privacy",
        title: "Residence",
        id: "__alloyId54"
    });
    __alloyId43.push($.__views.__alloyId54);
    $.__views.__alloyId55 = Ti.UI.createPickerRow({
        dbName: "gender",
        dbPrivacy: "gender_privacy",
        title: "Gender",
        id: "__alloyId55"
    });
    __alloyId43.push($.__views.__alloyId55);
    $.__views.__alloyId56 = Ti.UI.createPickerRow({
        dbName: "fullName",
        dbPrivacy: "",
        title: "Custom",
        id: "__alloyId56"
    });
    __alloyId43.push($.__views.__alloyId56);
    $.__views.picker.add(__alloyId43);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;