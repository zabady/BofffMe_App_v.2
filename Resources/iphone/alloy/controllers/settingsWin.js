function Controller() {
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
    $.__views.__alloyId25 = Ti.UI.createLabel({
        font: {
            fontSize: "20dp"
        },
        color: "#2279bc",
        text: "Settings",
        top: "20",
        id: "__alloyId25"
    });
    $.__views.win.add($.__views.__alloyId25);
    var __alloyId27 = [];
    $.__views.__alloyId28 = Ti.UI.createTableViewRow({
        title: "My Profile",
        id: "__alloyId28"
    });
    __alloyId27.push($.__views.__alloyId28);
    $.__views.__alloyId29 = Ti.UI.createTableViewRow({
        title: "About",
        id: "__alloyId29"
    });
    __alloyId27.push($.__views.__alloyId29);
    $.__views.__alloyId30 = Ti.UI.createTableViewRow({
        title: "FAQ",
        id: "__alloyId30"
    });
    __alloyId27.push($.__views.__alloyId30);
    $.__views.__alloyId31 = Ti.UI.createTableViewRow({
        title: "Video Tutorial",
        id: "__alloyId31"
    });
    __alloyId27.push($.__views.__alloyId31);
    $.__views.__alloyId26 = Ti.UI.createTableView({
        data: __alloyId27,
        id: "__alloyId26"
    });
    $.__views.win.add($.__views.__alloyId26);
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.win!android:back!closeWindow"] && $.__views.win.addEventListener("android:back", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;