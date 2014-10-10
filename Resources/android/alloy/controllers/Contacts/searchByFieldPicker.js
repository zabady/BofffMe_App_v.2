function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Contacts/searchByFieldPicker";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    $.__views.picker = Ti.UI.createPicker({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "picker",
        selectionIndicator: "true"
    });
    var __alloyId68 = [];
    $.__views.__alloyId69 = Ti.UI.createPickerRow({
        dbName: "fullName",
        dbPrivacy: "",
        title: "Name",
        id: "__alloyId69"
    });
    __alloyId68.push($.__views.__alloyId69);
    $.__views.__alloyId70 = Ti.UI.createPickerRow({
        dbName: "phone_numbers",
        dbPrivacy: "primary_numbers_privacy",
        title: "Phone Number",
        id: "__alloyId70"
    });
    __alloyId68.push($.__views.__alloyId70);
    $.__views.__alloyId71 = Ti.UI.createPickerRow({
        dbName: "mails",
        dbPrivacy: "mails_privacy",
        title: "E-mail",
        id: "__alloyId71"
    });
    __alloyId68.push($.__views.__alloyId71);
    $.__views.__alloyId72 = Ti.UI.createPickerRow({
        dbName: "social_links",
        dbPrivacy: "social_links_privacy",
        title: "Social Network",
        id: "__alloyId72"
    });
    __alloyId68.push($.__views.__alloyId72);
    $.__views.__alloyId73 = Ti.UI.createPickerRow({
        dbName: "job_title",
        dbPrivacy: "job_title_privacy",
        title: "Job Title",
        id: "__alloyId73"
    });
    __alloyId68.push($.__views.__alloyId73);
    $.__views.__alloyId74 = Ti.UI.createPickerRow({
        dbName: "company",
        dbPrivacy: "company_privacy",
        title: "Company",
        id: "__alloyId74"
    });
    __alloyId68.push($.__views.__alloyId74);
    $.__views.__alloyId75 = Ti.UI.createPickerRow({
        dbName: "interests",
        dbPrivacy: "interests_privacy",
        title: "Interests",
        id: "__alloyId75"
    });
    __alloyId68.push($.__views.__alloyId75);
    $.__views.__alloyId76 = Ti.UI.createPickerRow({
        dbName: "education",
        dbPrivacy: "education_privacy",
        title: "Education",
        id: "__alloyId76"
    });
    __alloyId68.push($.__views.__alloyId76);
    $.__views.__alloyId77 = Ti.UI.createPickerRow({
        dbName: "favorite_places",
        dbPrivacy: "favorite_places_privacy",
        title: "Favorite Places",
        id: "__alloyId77"
    });
    __alloyId68.push($.__views.__alloyId77);
    $.__views.__alloyId78 = Ti.UI.createPickerRow({
        dbName: "marital_status",
        dbPrivacy: "marital_status_privacy",
        title: "Marital Status",
        id: "__alloyId78"
    });
    __alloyId68.push($.__views.__alloyId78);
    $.__views.__alloyId79 = Ti.UI.createPickerRow({
        dbName: "residence",
        dbPrivacy: "residence_privacy",
        title: "Residence",
        id: "__alloyId79"
    });
    __alloyId68.push($.__views.__alloyId79);
    $.__views.__alloyId80 = Ti.UI.createPickerRow({
        dbName: "gender",
        dbPrivacy: "gender_privacy",
        title: "Gender",
        id: "__alloyId80"
    });
    __alloyId68.push($.__views.__alloyId80);
    $.__views.__alloyId81 = Ti.UI.createPickerRow({
        dbName: "fullName",
        dbPrivacy: "",
        title: "Custom",
        id: "__alloyId81"
    });
    __alloyId68.push($.__views.__alloyId81);
    $.__views.picker.add(__alloyId68);
    $.__views.picker && $.addTopLevelView($.__views.picker);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;