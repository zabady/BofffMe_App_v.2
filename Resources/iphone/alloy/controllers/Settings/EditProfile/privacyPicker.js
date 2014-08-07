function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Settings/EditProfile/privacyPicker";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.pickerView = Ti.UI.createView({
        id: "pickerView",
        visible: "false"
    });
    $.__views.pickerView && $.addTopLevelView($.__views.pickerView);
    $.__views.transparentView1 = Ti.UI.createView({
        id: "transparentView1",
        opacity: "0.5",
        top: "0",
        height: "80%",
        backgroundColor: "black"
    });
    $.__views.pickerView.add($.__views.transparentView1);
    $.__views.__alloyId154 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        bottom: "0",
        layout: "vertical",
        id: "__alloyId154"
    });
    $.__views.pickerView.add($.__views.__alloyId154);
    var __alloyId157 = [];
    $.__views.__alloyId158 = Ti.UI.createButton({
        systemButton: Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE,
        id: "__alloyId158"
    });
    __alloyId157.push($.__views.__alloyId158);
    $.__views.btn_toolBarDone = Ti.UI.createButton({
        id: "btn_toolBarDone",
        style: Titanium.UI.iPhone.SystemButtonStyle.DONE,
        title: "Done"
    });
    __alloyId157.push($.__views.btn_toolBarDone);
    $.__views.__alloyId155 = Ti.UI.iOS.createToolbar({
        items: __alloyId157,
        id: "__alloyId155"
    });
    $.__views.__alloyId154.add($.__views.__alloyId155);
    $.__views.picker = Ti.UI.createPicker({
        id: "picker"
    });
    $.__views.__alloyId154.add($.__views.picker);
    var __alloyId159 = [];
    $.__views.__alloyId160 = Ti.UI.createPickerRow({
        title: "public",
        id: "__alloyId160"
    });
    __alloyId159.push($.__views.__alloyId160);
    $.__views.__alloyId161 = Ti.UI.createPickerRow({
        title: "friends",
        id: "__alloyId161"
    });
    __alloyId159.push($.__views.__alloyId161);
    $.__views.__alloyId162 = Ti.UI.createPickerRow({
        title: "favorites",
        id: "__alloyId162"
    });
    __alloyId159.push($.__views.__alloyId162);
    $.__views.__alloyId163 = Ti.UI.createPickerRow({
        title: "onlyMe",
        id: "__alloyId163"
    });
    __alloyId159.push($.__views.__alloyId163);
    $.__views.picker.add(__alloyId159);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;