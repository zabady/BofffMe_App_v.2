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
    var __alloyId49 = [];
    $.__views.__alloyId50 = Ti.UI.createPickerRow({
        dbName: "fullName",
        dbPrivacy: "",
        title: "Name",
        id: "__alloyId50"
    });
    __alloyId49.push($.__views.__alloyId50);
    $.__views.__alloyId51 = Ti.UI.createPickerRow({
        dbName: "phone_numbers",
        dbPrivacy: "phone_numbers_privacy",
        title: "Phone Number",
        id: "__alloyId51"
    });
    __alloyId49.push($.__views.__alloyId51);
    $.__views.__alloyId52 = Ti.UI.createPickerRow({
        dbName: "mails",
        dbPrivacy: "mails_privacy",
        title: "E-mail",
        id: "__alloyId52"
    });
    __alloyId49.push($.__views.__alloyId52);
    $.__views.__alloyId53 = Ti.UI.createPickerRow({
        dbName: "social_links",
        dbPrivacy: "social_links_privacy",
        title: "Social Network",
        id: "__alloyId53"
    });
    __alloyId49.push($.__views.__alloyId53);
    $.__views.__alloyId54 = Ti.UI.createPickerRow({
        dbName: "job_title",
        dbPrivacy: "job_title_privacy",
        title: "Job Title",
        id: "__alloyId54"
    });
    __alloyId49.push($.__views.__alloyId54);
    $.__views.__alloyId55 = Ti.UI.createPickerRow({
        dbName: "company",
        dbPrivacy: "company_privacy",
        title: "Company",
        id: "__alloyId55"
    });
    __alloyId49.push($.__views.__alloyId55);
    $.__views.__alloyId56 = Ti.UI.createPickerRow({
        dbName: "interests",
        dbPrivacy: "interests_privacy",
        title: "Interests",
        id: "__alloyId56"
    });
    __alloyId49.push($.__views.__alloyId56);
    $.__views.__alloyId57 = Ti.UI.createPickerRow({
        dbName: "education",
        dbPrivacy: "education_privacy",
        title: "Education",
        id: "__alloyId57"
    });
    __alloyId49.push($.__views.__alloyId57);
    $.__views.__alloyId58 = Ti.UI.createPickerRow({
        dbName: "favorite_places",
        dbPrivacy: "favorite_places_privacy",
        title: "Favorite Places",
        id: "__alloyId58"
    });
    __alloyId49.push($.__views.__alloyId58);
    $.__views.__alloyId59 = Ti.UI.createPickerRow({
        dbName: "marital_status",
        dbPrivacy: "marital_status_privacy",
        title: "Marital Status",
        id: "__alloyId59"
    });
    __alloyId49.push($.__views.__alloyId59);
    $.__views.__alloyId60 = Ti.UI.createPickerRow({
        dbName: "residence",
        dbPrivacy: "residence_privacy",
        title: "Residence",
        id: "__alloyId60"
    });
    __alloyId49.push($.__views.__alloyId60);
    $.__views.__alloyId61 = Ti.UI.createPickerRow({
        dbName: "gender",
        dbPrivacy: "gender_privacy",
        title: "Gender",
        id: "__alloyId61"
    });
    __alloyId49.push($.__views.__alloyId61);
    $.__views.__alloyId62 = Ti.UI.createPickerRow({
        dbName: "fullName",
        dbPrivacy: "",
        title: "Custom",
        id: "__alloyId62"
    });
    __alloyId49.push($.__views.__alloyId62);
    $.__views.picker.add(__alloyId49);
    $.__views.picker = Ti.UI.createPicker({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "picker",
        selectionIndicator: "true"
    });
    var __alloyId63 = [];
    $.__views.__alloyId64 = Ti.UI.createPickerRow({
        dbName: "fullName",
        dbPrivacy: "",
        title: "Name",
        id: "__alloyId64"
    });
    __alloyId63.push($.__views.__alloyId64);
    $.__views.__alloyId65 = Ti.UI.createPickerRow({
        dbName: "phone_numbers",
        dbPrivacy: "primary_numbers_privacy",
        title: "Phone Number",
        id: "__alloyId65"
    });
    __alloyId63.push($.__views.__alloyId65);
    $.__views.__alloyId66 = Ti.UI.createPickerRow({
        dbName: "mails",
        dbPrivacy: "mails_privacy",
        title: "E-mail",
        id: "__alloyId66"
    });
    __alloyId63.push($.__views.__alloyId66);
    $.__views.__alloyId67 = Ti.UI.createPickerRow({
        dbName: "social_links",
        dbPrivacy: "social_links_privacy",
        title: "Social Network",
        id: "__alloyId67"
    });
    __alloyId63.push($.__views.__alloyId67);
    $.__views.__alloyId68 = Ti.UI.createPickerRow({
        dbName: "job_title",
        dbPrivacy: "job_title_privacy",
        title: "Job Title",
        id: "__alloyId68"
    });
    __alloyId63.push($.__views.__alloyId68);
    $.__views.__alloyId69 = Ti.UI.createPickerRow({
        dbName: "company",
        dbPrivacy: "company_privacy",
        title: "Company",
        id: "__alloyId69"
    });
    __alloyId63.push($.__views.__alloyId69);
    $.__views.__alloyId70 = Ti.UI.createPickerRow({
        dbName: "interests",
        dbPrivacy: "interests_privacy",
        title: "Interests",
        id: "__alloyId70"
    });
    __alloyId63.push($.__views.__alloyId70);
    $.__views.__alloyId71 = Ti.UI.createPickerRow({
        dbName: "education",
        dbPrivacy: "education_privacy",
        title: "Education",
        id: "__alloyId71"
    });
    __alloyId63.push($.__views.__alloyId71);
    $.__views.__alloyId72 = Ti.UI.createPickerRow({
        dbName: "favorite_places",
        dbPrivacy: "favorite_places_privacy",
        title: "Favorite Places",
        id: "__alloyId72"
    });
    __alloyId63.push($.__views.__alloyId72);
    $.__views.__alloyId73 = Ti.UI.createPickerRow({
        dbName: "marital_status",
        dbPrivacy: "marital_status_privacy",
        title: "Marital Status",
        id: "__alloyId73"
    });
    __alloyId63.push($.__views.__alloyId73);
    $.__views.__alloyId74 = Ti.UI.createPickerRow({
        dbName: "residence",
        dbPrivacy: "residence_privacy",
        title: "Residence",
        id: "__alloyId74"
    });
    __alloyId63.push($.__views.__alloyId74);
    $.__views.__alloyId75 = Ti.UI.createPickerRow({
        dbName: "gender",
        dbPrivacy: "gender_privacy",
        title: "Gender",
        id: "__alloyId75"
    });
    __alloyId63.push($.__views.__alloyId75);
    $.__views.__alloyId76 = Ti.UI.createPickerRow({
        dbName: "fullName",
        dbPrivacy: "",
        title: "Custom",
        id: "__alloyId76"
    });
    __alloyId63.push($.__views.__alloyId76);
    $.__views.picker.add(__alloyId63);
    $.__views.picker && $.addTopLevelView($.__views.picker);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;