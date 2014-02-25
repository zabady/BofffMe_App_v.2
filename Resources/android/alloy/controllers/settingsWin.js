function Controller() {
    function __alloyId28() {
        $.__views.win.removeEventListener("open", __alloyId28);
        if ($.__views.win.activity) $.__views.win.activity.onCreateOptionsMenu = function() {}; else {
            Ti.API.warn("You attempted to attach an Android Menu to a lightweight Window");
            Ti.API.warn("or other UI component which does not have an Android activity.");
            Ti.API.warn("Android Menus can only be opened on TabGroups and heavyweight Windows.");
        }
    }
    function closeWindow() {
        $.win.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "settingsWin";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "win",
        title: "Settings",
        layout: "vertical"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    closeWindow ? $.__views.win.addEventListener("android:back", closeWindow) : __defers["$.__views.win!android:back!closeWindow"] = true;
    $.__views.win.addEventListener("open", __alloyId28);
    $.__views.__alloyId29 = Ti.UI.createLabel({
        font: {
            fontSize: "20dp"
        },
        color: "#2279bc",
        text: "Settings",
        top: "20",
        id: "__alloyId29"
    });
    $.__views.win.add($.__views.__alloyId29);
    var __alloyId31 = [];
    $.__views.__alloyId32 = Ti.UI.createTableViewRow({
        title: "My Profile",
        id: "__alloyId32"
    });
    __alloyId31.push($.__views.__alloyId32);
    $.__views.__alloyId33 = Ti.UI.createTableViewRow({
        title: "About",
        id: "__alloyId33"
    });
    __alloyId31.push($.__views.__alloyId33);
    $.__views.__alloyId34 = Ti.UI.createTableViewRow({
        title: "FAQ",
        id: "__alloyId34"
    });
    __alloyId31.push($.__views.__alloyId34);
    $.__views.__alloyId35 = Ti.UI.createTableViewRow({
        title: "Video Tutorial",
        id: "__alloyId35"
    });
    __alloyId31.push($.__views.__alloyId35);
    $.__views.__alloyId30 = Ti.UI.createTableView({
        data: __alloyId31,
        id: "__alloyId30"
    });
    $.__views.win.add($.__views.__alloyId30);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.win.addEventListener("open", function() {
        $.win.activity.actionBar.onHomeIconItemSelected = closeWindow;
        $.win.activity.actionBar.displayHomeAsUp = true;
    });
    __defers["$.__views.win!android:back!closeWindow"] && $.__views.win.addEventListener("android:back", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;