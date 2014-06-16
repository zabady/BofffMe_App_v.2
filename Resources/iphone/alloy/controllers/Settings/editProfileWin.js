function Controller() {
    function textFieldsEditing(e) {
        newUserData[e.source.id] = e.value;
    }
    function doneEditing() {
        updateBofff(Alloy.Globals.userPin, userData, newUserData, bofffsSpecificData);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Settings/editProfileWin";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "win",
        title: "Edit My Profile"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.__alloyId77 = Ti.UI.createButton({
        title: "Done",
        id: "__alloyId77"
    });
    doneEditing ? $.__views.__alloyId77.addEventListener("click", doneEditing) : __defers["$.__views.__alloyId77!click!doneEditing"] = true;
    $.__views.win.rightNavButton = $.__views.__alloyId77;
    $.__views.__alloyId79 = Ti.UI.createScrollView({
        layout: "vertical",
        height: "100%",
        id: "__alloyId79"
    });
    $.__views.win.add($.__views.__alloyId79);
    $.__views.__alloyId80 = Ti.UI.createView({
        layout: "horizontal",
        backgroundColor: "blue",
        top: "50",
        height: "100",
        width: "100%",
        id: "__alloyId80"
    });
    $.__views.__alloyId79.add($.__views.__alloyId80);
    $.__views.fullName = Ti.UI.createTextField({
        id: "fullName"
    });
    $.__views.__alloyId80.add($.__views.fullName);
    textFieldsEditing ? $.__views.fullName.addEventListener("change", textFieldsEditing) : __defers["$.__views.fullName!change!textFieldsEditing"] = true;
    $.__views.__alloyId81 = Ti.UI.createView({
        layout: "horizontal",
        backgroundColor: "blue",
        top: "50",
        height: "100",
        width: "100%",
        id: "__alloyId81"
    });
    $.__views.__alloyId79.add($.__views.__alloyId81);
    $.__views.phone_numbers = Ti.UI.createTextArea({
        id: "phone_numbers"
    });
    $.__views.__alloyId81.add($.__views.phone_numbers);
    textFieldsEditing ? $.__views.phone_numbers.addEventListener("change", textFieldsEditing) : __defers["$.__views.phone_numbers!change!textFieldsEditing"] = true;
    $.__views.__alloyId82 = Ti.UI.createView({
        layout: "horizontal",
        backgroundColor: "blue",
        top: "50",
        height: "100",
        width: "100%",
        id: "__alloyId82"
    });
    $.__views.__alloyId79.add($.__views.__alloyId82);
    $.__views.phone_numbers_privacy = Ti.UI.createTextArea({
        id: "phone_numbers_privacy"
    });
    $.__views.__alloyId82.add($.__views.phone_numbers_privacy);
    textFieldsEditing ? $.__views.phone_numbers_privacy.addEventListener("change", textFieldsEditing) : __defers["$.__views.phone_numbers_privacy!change!textFieldsEditing"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("/contactsUpdate.js");
    var userData = Titanium.App.Properties.getObject("userData");
    var newUserData = Titanium.App.Properties.getObject("userData");
    var bofffsSpecificData = Titanium.App.Properties.getObject("bofffsSpecificData");
    $.fullName.value = userData.fullName;
    $.phone_numbers.value = userData.phone_numbers;
    $.phone_numbers_privacy.value = userData.phone_numbers_privacy;
    __defers["$.__views.__alloyId77!click!doneEditing"] && $.__views.__alloyId77.addEventListener("click", doneEditing);
    __defers["$.__views.fullName!change!textFieldsEditing"] && $.__views.fullName.addEventListener("change", textFieldsEditing);
    __defers["$.__views.phone_numbers!change!textFieldsEditing"] && $.__views.phone_numbers.addEventListener("change", textFieldsEditing);
    __defers["$.__views.phone_numbers_privacy!change!textFieldsEditing"] && $.__views.phone_numbers_privacy.addEventListener("change", textFieldsEditing);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;