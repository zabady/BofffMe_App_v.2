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
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        layout: "vertical",
        visible: "false"
    });
    $.__views.pickerView && $.addTopLevelView($.__views.pickerView);
    $.__views.transparentView1 = Ti.UI.createView({
        id: "transparentView1",
        opacity: "0.5",
        height: "25%",
        backgroundColor: "black"
    });
    $.__views.pickerView.add($.__views.transparentView1);
    $.__views.picker = Ti.UI.createPicker({
        id: "picker",
        useSpinner: "true"
    });
    $.__views.pickerView.add($.__views.picker);
    var __alloyId219 = [];
    $.__views.__alloyId220 = Ti.UI.createPickerRow({
        title: "public",
        id: "__alloyId220"
    });
    __alloyId219.push($.__views.__alloyId220);
    $.__views.__alloyId221 = Ti.UI.createPickerRow({
        title: "friends",
        id: "__alloyId221"
    });
    __alloyId219.push($.__views.__alloyId221);
    $.__views.__alloyId222 = Ti.UI.createPickerRow({
        title: "favorites",
        id: "__alloyId222"
    });
    __alloyId219.push($.__views.__alloyId222);
    $.__views.__alloyId223 = Ti.UI.createPickerRow({
        title: "onlyMe",
        id: "__alloyId223"
    });
    __alloyId219.push($.__views.__alloyId223);
    $.__views.__alloyId224 = Ti.UI.createPickerRow({
        title: "                                             ",
        id: "__alloyId224"
    });
    __alloyId219.push($.__views.__alloyId224);
    $.__views.picker.add(__alloyId219);
    $.__views.transparentView2 = Ti.UI.createView({
        id: "transparentView2",
        opacity: "0.5",
        height: "60%",
        backgroundColor: "black"
    });
    $.__views.pickerView.add($.__views.transparentView2);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;