function Controller() {
    function __alloyId84() {
        $.__views.win.removeEventListener("open", __alloyId84);
        if ($.__views.win.activity) $.__views.win.activity.onCreateOptionsMenu = function(e) {
            var __alloyId83 = {
                title: "Done",
                showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM,
                id: "__alloyId82"
            };
            $.__views.__alloyId82 = e.menu.add(_.pick(__alloyId83, Alloy.Android.menuItemCreateArgs));
            $.__views.__alloyId82.applyProperties(_.omit(__alloyId83, Alloy.Android.menuItemCreateArgs));
            doneEditing ? $.__views.__alloyId82.addEventListener("click", doneEditing) : __defers["$.__views.__alloyId82!click!doneEditing"] = true;
        }; else {
            Ti.API.warn("You attempted to attach an Android Menu to a lightweight Window");
            Ti.API.warn("or other UI component which does not have an Android activity.");
            Ti.API.warn("Android Menus can only be opened on TabGroups and heavyweight Windows.");
        }
    }
    function textFieldEdited() {
        alert("Blurred");
    }
    function doneEditing() {
        alert("Go Call ZeeZo's Function w eb3atlo zeby w 5leeha 3la allah :)");
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
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.win.addEventListener("open", __alloyId84);
    $.__views.__alloyId85 = Ti.UI.createScrollView({
        layout: "vertical",
        height: "100%",
        id: "__alloyId85"
    });
    $.__views.win.add($.__views.__alloyId85);
    $.__views.__alloyId86 = Ti.UI.createView({
        layout: "horizontal",
        backgroundColor: "blue",
        top: "50",
        height: "100",
        width: "100%",
        id: "__alloyId86"
    });
    $.__views.__alloyId85.add($.__views.__alloyId86);
    $.__views.fullName = Ti.UI.createTextField({
        id: "fullName"
    });
    $.__views.__alloyId86.add($.__views.fullName);
    textFieldEdited ? $.__views.fullName.addEventListener("blur", textFieldEdited) : __defers["$.__views.fullName!blur!textFieldEdited"] = true;
    $.__views.__alloyId87 = Ti.UI.createView({
        layout: "horizontal",
        backgroundColor: "blue",
        top: "50",
        height: "100",
        width: "100%",
        id: "__alloyId87"
    });
    $.__views.__alloyId85.add($.__views.__alloyId87);
    $.__views.primary_mobile = Ti.UI.createTextField({
        id: "primary_mobile"
    });
    $.__views.__alloyId87.add($.__views.primary_mobile);
    textFieldEdited ? $.__views.primary_mobile.addEventListener("blur", textFieldEdited) : __defers["$.__views.primary_mobile!blur!textFieldEdited"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var userData = Titanium.App.Properties.getObject("userData");
    $.fullName.value = userData.fullName;
    $.primary_mobile.value = userData.primary_mobile;
    __defers["$.__views.__alloyId80!click!doneEditing"] && $.__views.__alloyId80.addEventListener("click", doneEditing);
    __defers["$.__views.__alloyId82!click!doneEditing"] && $.__views.__alloyId82.addEventListener("click", doneEditing);
    __defers["$.__views.fullName!blur!textFieldEdited"] && $.__views.fullName.addEventListener("blur", textFieldEdited);
    __defers["$.__views.primary_mobile!blur!textFieldEdited"] && $.__views.primary_mobile.addEventListener("blur", textFieldEdited);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;