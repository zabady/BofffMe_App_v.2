function Controller() {
    function __alloyId88() {
        $.__views.win.removeEventListener("open", __alloyId88);
        if ($.__views.win.activity) $.__views.win.activity.onCreateOptionsMenu = function(e) {
            var __alloyId87 = {
                title: "Done",
                showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM,
                id: "__alloyId86"
            };
            $.__views.__alloyId86 = e.menu.add(_.pick(__alloyId87, Alloy.Android.menuItemCreateArgs));
            $.__views.__alloyId86.applyProperties(_.omit(__alloyId87, Alloy.Android.menuItemCreateArgs));
            doneEditing ? $.__views.__alloyId86.addEventListener("click", doneEditing) : __defers["$.__views.__alloyId86!click!doneEditing"] = true;
        }; else {
            Ti.API.warn("You attempted to attach an Android Menu to a lightweight Window");
            Ti.API.warn("or other UI component which does not have an Android activity.");
            Ti.API.warn("Android Menus can only be opened on TabGroups and heavyweight Windows.");
        }
    }
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
    $.__views.win.addEventListener("open", __alloyId88);
    $.__views.__alloyId89 = Ti.UI.createScrollView({
        layout: "vertical",
        height: "100%",
        id: "__alloyId89"
    });
    $.__views.win.add($.__views.__alloyId89);
    $.__views.__alloyId90 = Ti.UI.createView({
        layout: "horizontal",
        backgroundColor: "blue",
        top: "50",
        height: "100",
        width: "100%",
        id: "__alloyId90"
    });
    $.__views.__alloyId89.add($.__views.__alloyId90);
    $.__views.fullName = Ti.UI.createTextField({
        id: "fullName"
    });
    $.__views.__alloyId90.add($.__views.fullName);
    textFieldsEditing ? $.__views.fullName.addEventListener("change", textFieldsEditing) : __defers["$.__views.fullName!change!textFieldsEditing"] = true;
    $.__views.__alloyId91 = Ti.UI.createView({
        layout: "horizontal",
        backgroundColor: "blue",
        top: "50",
        height: "100",
        width: "100%",
        id: "__alloyId91"
    });
    $.__views.__alloyId89.add($.__views.__alloyId91);
    $.__views.phone_numbers = Ti.UI.createTextArea({
        id: "phone_numbers"
    });
    $.__views.__alloyId91.add($.__views.phone_numbers);
    textFieldsEditing ? $.__views.phone_numbers.addEventListener("change", textFieldsEditing) : __defers["$.__views.phone_numbers!change!textFieldsEditing"] = true;
    $.__views.__alloyId92 = Ti.UI.createView({
        layout: "horizontal",
        backgroundColor: "blue",
        top: "50",
        height: "100",
        width: "100%",
        id: "__alloyId92"
    });
    $.__views.__alloyId89.add($.__views.__alloyId92);
    $.__views.phone_numbers_privacy = Ti.UI.createTextArea({
        id: "phone_numbers_privacy"
    });
    $.__views.__alloyId92.add($.__views.phone_numbers_privacy);
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
    __defers["$.__views.__alloyId84!click!doneEditing"] && $.__views.__alloyId84.addEventListener("click", doneEditing);
    __defers["$.__views.__alloyId86!click!doneEditing"] && $.__views.__alloyId86.addEventListener("click", doneEditing);
    __defers["$.__views.fullName!change!textFieldsEditing"] && $.__views.fullName.addEventListener("change", textFieldsEditing);
    __defers["$.__views.phone_numbers!change!textFieldsEditing"] && $.__views.phone_numbers.addEventListener("change", textFieldsEditing);
    __defers["$.__views.phone_numbers_privacy!change!textFieldsEditing"] && $.__views.phone_numbers_privacy.addEventListener("change", textFieldsEditing);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;