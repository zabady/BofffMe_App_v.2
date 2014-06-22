function Controller() {
    function openClickedSettings(e) {
        var selectedSettingWin;
        if (-1 != e.source.window.search("http")) selectedSettingWin = Alloy.createController("webViewWin", {
            url: e.source.window
        }).getView(); else {
            var windowUrl = "Settings/" + e.source.window;
            selectedSettingWin = Alloy.createController(windowUrl).getView();
        }
        Alloy.Globals.openNavigationWindow(selectedSettingWin, true);
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
    $.__views.__alloyId19 = Ti.UI.createLabel({
        font: {
            fontSize: "30",
            fontWeight: "bold"
        },
        color: "#2279bc",
        height: "60",
        text: "Settings",
        top: "40",
        id: "__alloyId19"
    });
    $.__views.win.add($.__views.__alloyId19);
    var __alloyId21 = [];
    $.__views.__alloyId22 = Ti.UI.createTableViewRow({
        window: "EditProfile/contactInfoWin",
        id: "__alloyId22"
    });
    __alloyId21.push($.__views.__alloyId22);
    $.__views.__alloyId23 = Ti.UI.createLabel({
        font: {
            fontSize: "20"
        },
        color: "black",
        height: "60",
        text: "My Profile",
        window: "EditProfile/contactInfoWin",
        id: "__alloyId23"
    });
    $.__views.__alloyId22.add($.__views.__alloyId23);
    $.__views.__alloyId24 = Ti.UI.createTableViewRow({
        window: "http://www.bofffme.com",
        id: "__alloyId24"
    });
    __alloyId21.push($.__views.__alloyId24);
    $.__views.__alloyId25 = Ti.UI.createLabel({
        font: {
            fontSize: "20"
        },
        color: "black",
        height: "60",
        text: "About",
        window: "http://www.bofffme.com",
        id: "__alloyId25"
    });
    $.__views.__alloyId24.add($.__views.__alloyId25);
    $.__views.__alloyId26 = Ti.UI.createTableViewRow({
        window: "http://www.google.com",
        id: "__alloyId26"
    });
    __alloyId21.push($.__views.__alloyId26);
    $.__views.__alloyId27 = Ti.UI.createLabel({
        font: {
            fontSize: "20"
        },
        color: "black",
        height: "60",
        text: "FAQ",
        window: "http://www.google.com",
        id: "__alloyId27"
    });
    $.__views.__alloyId26.add($.__views.__alloyId27);
    $.__views.__alloyId28 = Ti.UI.createTableViewRow({
        window: "tutorialWin",
        id: "__alloyId28"
    });
    __alloyId21.push($.__views.__alloyId28);
    $.__views.__alloyId29 = Ti.UI.createLabel({
        font: {
            fontSize: "20"
        },
        color: "black",
        height: "60",
        text: "Video Tutorial",
        window: "tutorialWin",
        id: "__alloyId29"
    });
    $.__views.__alloyId28.add($.__views.__alloyId29);
    $.__views.__alloyId30 = Ti.UI.createTableViewRow({
        window: "insertBofffWin",
        id: "__alloyId30"
    });
    __alloyId21.push($.__views.__alloyId30);
    $.__views.__alloyId31 = Ti.UI.createLabel({
        font: {
            fontSize: "20"
        },
        color: "black",
        height: "60",
        text: "Add Bofff Contact",
        window: "insertBofffWin",
        id: "__alloyId31"
    });
    $.__views.__alloyId30.add($.__views.__alloyId31);
    $.__views.__alloyId20 = Ti.UI.createTableView({
        top: 20,
        rowHeight: 60,
        data: __alloyId21,
        id: "__alloyId20"
    });
    $.__views.win.add($.__views.__alloyId20);
    openClickedSettings ? $.__views.__alloyId20.addEventListener("click", openClickedSettings) : __defers["$.__views.__alloyId20!click!openClickedSettings"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.__alloyId20!click!openClickedSettings"] && $.__views.__alloyId20.addEventListener("click", openClickedSettings);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;