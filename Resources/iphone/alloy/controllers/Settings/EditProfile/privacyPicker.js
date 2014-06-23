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
    var __alloyId142 = [];
    $.__views.__alloyId143 = Ti.UI.createButton({
        systemButton: Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE,
        id: "__alloyId143"
    });
    __alloyId142.push($.__views.__alloyId143);
    $.__views.btn_toolBarDone = Ti.UI.createButton({
        id: "btn_toolBarDone",
        style: Titanium.UI.iPhone.SystemButtonStyle.DONE,
        title: "Done"
    });
    __alloyId142.push($.__views.btn_toolBarDone);
    $.__views.__alloyId140 = Ti.UI.iOS.createToolbar({
        items: __alloyId142,
        id: "__alloyId140"
    });
    $.__views.pickerView.add($.__views.__alloyId140);
    $.__views.picker = Ti.UI.createPicker({
        id: "picker"
    });
    $.__views.pickerView.add($.__views.picker);
    var __alloyId144 = [];
    $.__views.__alloyId145 = Ti.UI.createPickerRow({
        title: "public",
        id: "__alloyId145"
    });
    __alloyId144.push($.__views.__alloyId145);
    $.__views.__alloyId146 = Ti.UI.createPickerRow({
        title: "friends",
        id: "__alloyId146"
    });
    __alloyId144.push($.__views.__alloyId146);
    $.__views.__alloyId147 = Ti.UI.createPickerRow({
        title: "favorites",
        id: "__alloyId147"
    });
    __alloyId144.push($.__views.__alloyId147);
    $.__views.__alloyId148 = Ti.UI.createPickerRow({
        title: "onlyMe",
        id: "__alloyId148"
    });
    __alloyId144.push($.__views.__alloyId148);
    $.__views.picker.add(__alloyId144);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;