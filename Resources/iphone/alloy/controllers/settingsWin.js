function Controller() {
    function closeWindow() {
        $.win.close();
    }
    function openClickedSettings(e) {
        var selectedSettingWin;
        selectedSettingWin = -1 != e.source.window.search("http") ? Alloy.createController("webViewWin", {
            url: e.source.window
        }) : Alloy.createController("/Settings/" + e.source.window);
        selectedSettingWin = selectedSettingWin.getView();
        var tempRootWin = Ti.UI.createWindow({});
        var tempNavWin = Ti.UI.iOS.createNavigationWindow({
            window: tempRootWin
        });
        tempNavWin.open();
        tempNavWin.openWindow(selectedSettingWin);
        selectedSettingWin.addEventListener("close", function() {
            tempNavWin.close();
        });
        $.win.fireEvent("close");
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
        height: "60",
        text: "Settings",
        top: "40",
        id: "__alloyId25"
    });
    $.__views.win.add($.__views.__alloyId25);
    var __alloyId27 = [];
    $.__views.__alloyId28 = Ti.UI.createTableViewRow({
        window: "editProfileWin",
        id: "__alloyId28"
    });
    __alloyId27.push($.__views.__alloyId28);
    $.__views.__alloyId29 = Ti.UI.createLabel({
        font: {
            fontSize: "20"
        },
        color: "black",
        height: "60",
        text: "My Profile",
        id: "__alloyId29"
    });
    $.__views.__alloyId28.add($.__views.__alloyId29);
    $.__views.__alloyId30 = Ti.UI.createTableViewRow({
        window: "http://www.bofffme.com",
        id: "__alloyId30"
    });
    __alloyId27.push($.__views.__alloyId30);
    $.__views.__alloyId31 = Ti.UI.createLabel({
        font: {
            fontSize: "20"
        },
        color: "black",
        height: "60",
        text: "About",
        id: "__alloyId31"
    });
    $.__views.__alloyId30.add($.__views.__alloyId31);
    $.__views.__alloyId32 = Ti.UI.createTableViewRow({
        window: "http://www.google.com",
        id: "__alloyId32"
    });
    __alloyId27.push($.__views.__alloyId32);
    $.__views.__alloyId33 = Ti.UI.createLabel({
        font: {
            fontSize: "20"
        },
        color: "black",
        height: "60",
        text: "FAQ",
        id: "__alloyId33"
    });
    $.__views.__alloyId32.add($.__views.__alloyId33);
    $.__views.__alloyId34 = Ti.UI.createTableViewRow({
        window: "tutorialWin",
        id: "__alloyId34"
    });
    __alloyId27.push($.__views.__alloyId34);
    $.__views.__alloyId35 = Ti.UI.createLabel({
        font: {
            fontSize: "20"
        },
        color: "black",
        height: "60",
        text: "Video Tutorial",
        id: "__alloyId35"
    });
    $.__views.__alloyId34.add($.__views.__alloyId35);
    $.__views.__alloyId26 = Ti.UI.createTableView({
        top: 20,
        rowHeight: 60,
        data: __alloyId27,
        id: "__alloyId26"
    });
    $.__views.win.add($.__views.__alloyId26);
    openClickedSettings ? $.__views.__alloyId26.addEventListener("click", openClickedSettings) : __defers["$.__views.__alloyId26!click!openClickedSettings"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.win!android:back!closeWindow"] && $.__views.win.addEventListener("android:back", closeWindow);
    __defers["$.__views.__alloyId26!click!openClickedSettings"] && $.__views.__alloyId26.addEventListener("click", openClickedSettings);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;