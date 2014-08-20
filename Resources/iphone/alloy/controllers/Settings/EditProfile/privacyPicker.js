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
    $.__views.__alloyId190 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        bottom: "0",
        layout: "vertical",
        id: "__alloyId190"
    });
    $.__views.pickerView.add($.__views.__alloyId190);
    var __alloyId193 = [];
    $.__views.__alloyId194 = Ti.UI.createButton({
        systemButton: Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE,
        id: "__alloyId194"
    });
    __alloyId193.push($.__views.__alloyId194);
    $.__views.btn_toolBarDone = Ti.UI.createButton({
        id: "btn_toolBarDone",
        style: Titanium.UI.iPhone.SystemButtonStyle.DONE,
        title: "Done"
    });
    __alloyId193.push($.__views.btn_toolBarDone);
    $.__views.__alloyId191 = Ti.UI.iOS.createToolbar({
        items: __alloyId193,
        id: "__alloyId191"
    });
    $.__views.__alloyId190.add($.__views.__alloyId191);
    $.__views.picker = Ti.UI.createPicker({
        id: "picker"
    });
    $.__views.__alloyId190.add($.__views.picker);
    var __alloyId195 = [];
    $.__views.__alloyId196 = Ti.UI.createPickerRow({
        title: "public",
        id: "__alloyId196"
    });
    __alloyId195.push($.__views.__alloyId196);
    $.__views.__alloyId197 = Ti.UI.createPickerRow({
        title: "friends",
        id: "__alloyId197"
    });
    __alloyId195.push($.__views.__alloyId197);
    $.__views.__alloyId198 = Ti.UI.createPickerRow({
        title: "favorites",
        id: "__alloyId198"
    });
    __alloyId195.push($.__views.__alloyId198);
    $.__views.__alloyId199 = Ti.UI.createPickerRow({
        title: "onlyMe",
        id: "__alloyId199"
    });
    __alloyId195.push($.__views.__alloyId199);
    $.__views.picker.add(__alloyId195);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;