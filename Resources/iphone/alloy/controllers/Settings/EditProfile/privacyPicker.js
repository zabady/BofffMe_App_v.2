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
    var __alloyId148 = [];
    $.__views.__alloyId149 = Ti.UI.createButton({
        systemButton: Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE,
        id: "__alloyId149"
    });
    __alloyId148.push($.__views.__alloyId149);
    $.__views.btn_toolBarDone = Ti.UI.createButton({
        id: "btn_toolBarDone",
        style: Titanium.UI.iPhone.SystemButtonStyle.DONE,
        title: "Done"
    });
    __alloyId148.push($.__views.btn_toolBarDone);
    $.__views.__alloyId146 = Ti.UI.iOS.createToolbar({
        items: __alloyId148,
        id: "__alloyId146"
    });
    $.__views.pickerView.add($.__views.__alloyId146);
    $.__views.picker = Ti.UI.createPicker({
        id: "picker"
    });
    $.__views.pickerView.add($.__views.picker);
    var __alloyId150 = [];
    $.__views.__alloyId151 = Ti.UI.createPickerRow({
        title: "public",
        id: "__alloyId151"
    });
    __alloyId150.push($.__views.__alloyId151);
    $.__views.__alloyId152 = Ti.UI.createPickerRow({
        title: "friends",
        id: "__alloyId152"
    });
    __alloyId150.push($.__views.__alloyId152);
    $.__views.__alloyId153 = Ti.UI.createPickerRow({
        title: "favorites",
        id: "__alloyId153"
    });
    __alloyId150.push($.__views.__alloyId153);
    $.__views.__alloyId154 = Ti.UI.createPickerRow({
        title: "onlyMe",
        id: "__alloyId154"
    });
    __alloyId150.push($.__views.__alloyId154);
    $.__views.picker.add(__alloyId150);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;