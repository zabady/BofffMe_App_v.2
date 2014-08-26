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
    $.__views.__alloyId189 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        bottom: "0",
        layout: "vertical",
        id: "__alloyId189"
    });
    $.__views.pickerView.add($.__views.__alloyId189);
    var __alloyId192 = [];
    $.__views.__alloyId193 = Ti.UI.createButton({
        systemButton: Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE,
        id: "__alloyId193"
    });
    __alloyId192.push($.__views.__alloyId193);
    $.__views.btn_toolBarDone = Ti.UI.createButton({
        id: "btn_toolBarDone",
        style: Titanium.UI.iPhone.SystemButtonStyle.DONE,
        title: "Done"
    });
    __alloyId192.push($.__views.btn_toolBarDone);
    $.__views.__alloyId190 = Ti.UI.iOS.createToolbar({
        items: __alloyId192,
        id: "__alloyId190"
    });
    $.__views.__alloyId189.add($.__views.__alloyId190);
    $.__views.picker = Ti.UI.createPicker({
        id: "picker"
    });
    $.__views.__alloyId189.add($.__views.picker);
    var __alloyId194 = [];
    $.__views.__alloyId195 = Ti.UI.createPickerRow({
        title: "public",
        id: "__alloyId195"
    });
    __alloyId194.push($.__views.__alloyId195);
    $.__views.__alloyId196 = Ti.UI.createPickerRow({
        title: "friends",
        id: "__alloyId196"
    });
    __alloyId194.push($.__views.__alloyId196);
    $.__views.__alloyId197 = Ti.UI.createPickerRow({
        title: "favorites",
        id: "__alloyId197"
    });
    __alloyId194.push($.__views.__alloyId197);
    $.__views.__alloyId198 = Ti.UI.createPickerRow({
        title: "onlyMe",
        id: "__alloyId198"
    });
    __alloyId194.push($.__views.__alloyId198);
    $.__views.picker.add(__alloyId194);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;