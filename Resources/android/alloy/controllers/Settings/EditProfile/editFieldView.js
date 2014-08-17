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
    this.__controllerPath = "Settings/EditProfile/editFieldView";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.editView = Ti.UI.createView({
        id: "editView",
        visible: "false",
        height: "100%",
        layout: "vertical"
    });
    $.__views.editView && $.addTopLevelView($.__views.editView);
    $.__views.cancelView1 = Ti.UI.createView({
        id: "cancelView1",
        opacity: "0.5",
        height: "25%",
        backgroundColor: "black"
    });
    $.__views.editView.add($.__views.cancelView1);
    $.__views.__alloyId151 = Ti.UI.createView({
        layout: "vertical",
        backgroundColor: "white",
        height: Ti.UI.SIZE,
        id: "__alloyId151"
    });
    $.__views.editView.add($.__views.__alloyId151);
    $.__views.fieldTitle = Ti.UI.createLabel({
        font: {
            fontSize: 20,
            fontWeight: "bold"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        bubbleParent: false,
        height: 60,
        width: "100%",
        returnKeyType: Titanium.UI.RETURNKEY_DONE,
        id: "fieldTitle",
        color: "#2279bc"
    });
    $.__views.__alloyId151.add($.__views.fieldTitle);
    $.__views.fieldValue = Ti.UI.createTextField({
        bubbleParent: false,
        color: "black",
        ellipsize: true,
        softKeyboardOnFocus: Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS,
        font: {
            fontSize: 20,
            fontWeight: "bold"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        height: 60,
        width: "100%",
        returnKeyType: Titanium.UI.RETURNKEY_DONE,
        id: "fieldValue"
    });
    $.__views.__alloyId151.add($.__views.fieldValue);
    $.__views.cancelView2 = Ti.UI.createView({
        id: "cancelView2",
        opacity: "0.5",
        height: "60%",
        backgroundColor: "black"
    });
    $.__views.editView.add($.__views.cancelView2);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;