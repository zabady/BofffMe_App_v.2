function Controller() {
    function openClickedSettings(e) {
        var selectedSettingWin;
        selectedSettingWin = -1 != e.source.window.search("http") ? Alloy.createController("webViewWin", {
            url: e.source.window
        }).getView() : Alloy.createController("/Settings/" + e.source.window).getView();
        selectedSettingWin.addEventListener("open", function() {
            selectedSettingWin.activity.actionBar.onHomeIconItemSelected = function() {
                selectedSettingWin.close();
            };
            selectedSettingWin.activity.actionBar.displayHomeAsUp = true;
        });
        selectedSettingWin.open();
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
    $.__views.__alloyId28 = Ti.UI.createLabel({
        font: {
            fontSize: "20dp"
        },
        color: "#2279bc",
        height: "60",
        text: "Settings",
        top: "40",
        id: "__alloyId28"
    });
    $.__views.win.add($.__views.__alloyId28);
    var __alloyId30 = [];
    $.__views.__alloyId31 = Ti.UI.createTableViewRow({
        window: "editProfileWin",
        id: "__alloyId31"
    });
    __alloyId30.push($.__views.__alloyId31);
    $.__views.__alloyId32 = Ti.UI.createLabel({
        font: {
            fontSize: "20"
        },
        color: "black",
        height: "60",
        text: "My Profile",
        window: "editProfileWin",
        id: "__alloyId32"
    });
    $.__views.__alloyId31.add($.__views.__alloyId32);
    $.__views.__alloyId33 = Ti.UI.createTableViewRow({
        window: "http://www.bofffme.com",
        id: "__alloyId33"
    });
    __alloyId30.push($.__views.__alloyId33);
    $.__views.__alloyId34 = Ti.UI.createLabel({
        font: {
            fontSize: "20"
        },
        color: "black",
        height: "60",
        text: "About",
        window: "http://www.bofffme.com",
        id: "__alloyId34"
    });
    $.__views.__alloyId33.add($.__views.__alloyId34);
    $.__views.__alloyId35 = Ti.UI.createTableViewRow({
        window: "http://www.google.com",
        id: "__alloyId35"
    });
    __alloyId30.push($.__views.__alloyId35);
    $.__views.__alloyId36 = Ti.UI.createLabel({
        font: {
            fontSize: "20"
        },
        color: "black",
        height: "60",
        text: "FAQ",
        window: "http://www.google.com",
        id: "__alloyId36"
    });
    $.__views.__alloyId35.add($.__views.__alloyId36);
    $.__views.__alloyId37 = Ti.UI.createTableViewRow({
        window: "tutorialWin",
        id: "__alloyId37"
    });
    __alloyId30.push($.__views.__alloyId37);
    $.__views.__alloyId38 = Ti.UI.createLabel({
        font: {
            fontSize: "20"
        },
        color: "black",
        height: "60",
        text: "Video Tutorial",
        window: "tutorialWin",
        id: "__alloyId38"
    });
    $.__views.__alloyId37.add($.__views.__alloyId38);
    $.__views.__alloyId39 = Ti.UI.createTableViewRow({
        window: "insertBofffWin",
        id: "__alloyId39"
    });
    __alloyId30.push($.__views.__alloyId39);
    $.__views.__alloyId40 = Ti.UI.createLabel({
        font: {
            fontSize: "20"
        },
        color: "black",
        height: "60",
        text: "Add Bofff Contact",
        window: "insertBofffWin",
        id: "__alloyId40"
    });
    $.__views.__alloyId39.add($.__views.__alloyId40);
    $.__views.__alloyId29 = Ti.UI.createTableView({
        top: 20,
        rowHeight: 60,
        data: __alloyId30,
        id: "__alloyId29"
    });
    $.__views.win.add($.__views.__alloyId29);
    openClickedSettings ? $.__views.__alloyId29.addEventListener("click", openClickedSettings) : __defers["$.__views.__alloyId29!click!openClickedSettings"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.__alloyId29!click!openClickedSettings"] && $.__views.__alloyId29.addEventListener("click", openClickedSettings);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;