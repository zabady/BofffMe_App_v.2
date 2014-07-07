function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Settings/EditProfile/privacyPicker";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.pickerView = Ti.UI.createView({
        id: "pickerView",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        bottom: "0",
        layout: "vertical",
        visible: "false"
    });
    $.__views.pickerView && $.addTopLevelView($.__views.pickerView);
    var __alloyId176 = [];
    $.__views.__alloyId177 = Ti.UI.createButton({
        systemButton: Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE,
        id: "__alloyId177"
    });
    __alloyId176.push($.__views.__alloyId177);
    $.__views.btn_toolBarDone = Ti.UI.createButton({
        id: "btn_toolBarDone",
        style: Titanium.UI.iPhone.SystemButtonStyle.DONE,
        title: "Done"
    });
    __alloyId176.push($.__views.btn_toolBarDone);
    $.__views.__alloyId174 = Ti.UI.iOS.createToolbar({
        items: __alloyId176,
        id: "__alloyId174"
    });
    $.__views.pickerView.add($.__views.__alloyId174);
    $.__views.picker = Ti.UI.createPicker({
        id: "picker"
    });
    $.__views.pickerView.add($.__views.picker);
    var __alloyId178 = [];
    $.__views.__alloyId179 = Ti.UI.createPickerRow({
        title: "public",
        id: "__alloyId179"
    });
    __alloyId178.push($.__views.__alloyId179);
    $.__views.__alloyId180 = Ti.UI.createPickerRow({
        title: "friends",
        id: "__alloyId180"
    });
    __alloyId178.push($.__views.__alloyId180);
    $.__views.__alloyId181 = Ti.UI.createPickerRow({
        title: "favorites",
        id: "__alloyId181"
    });
    __alloyId178.push($.__views.__alloyId181);
    $.__views.__alloyId182 = Ti.UI.createPickerRow({
        title: "onlyMe",
        id: "__alloyId182"
    });
    __alloyId178.push($.__views.__alloyId182);
    $.__views.picker.add(__alloyId178);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;