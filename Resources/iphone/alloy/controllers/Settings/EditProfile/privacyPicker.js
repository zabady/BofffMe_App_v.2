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
    var __alloyId120 = [];
    $.__views.__alloyId121 = Ti.UI.createButton({
        systemButton: Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE,
        id: "__alloyId121"
    });
    __alloyId120.push($.__views.__alloyId121);
    $.__views.btn_toolBarDone = Ti.UI.createButton({
        id: "btn_toolBarDone",
        style: Titanium.UI.iPhone.SystemButtonStyle.DONE,
        title: "Done"
    });
    __alloyId120.push($.__views.btn_toolBarDone);
    $.__views.__alloyId118 = Ti.UI.iOS.createToolbar({
        items: __alloyId120,
        id: "__alloyId118"
    });
    $.__views.pickerView.add($.__views.__alloyId118);
    $.__views.picker = Ti.UI.createPicker({
        id: "picker"
    });
    $.__views.pickerView.add($.__views.picker);
    var __alloyId122 = [];
    $.__views.__alloyId123 = Ti.UI.createPickerRow({
        title: "public",
        id: "__alloyId123"
    });
    __alloyId122.push($.__views.__alloyId123);
    $.__views.__alloyId124 = Ti.UI.createPickerRow({
        title: "friends",
        id: "__alloyId124"
    });
    __alloyId122.push($.__views.__alloyId124);
    $.__views.__alloyId125 = Ti.UI.createPickerRow({
        title: "favorites",
        id: "__alloyId125"
    });
    __alloyId122.push($.__views.__alloyId125);
    $.__views.__alloyId126 = Ti.UI.createPickerRow({
        title: "onlyMe",
        id: "__alloyId126"
    });
    __alloyId122.push($.__views.__alloyId126);
    $.__views.picker.add(__alloyId122);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;