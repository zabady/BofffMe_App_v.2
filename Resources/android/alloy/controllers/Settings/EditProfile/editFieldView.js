function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Settings/EditProfile/editFieldView";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.editView = Ti.UI.createView({
        id: "editView",
        visible: "false",
        height: "100%",
        layout: "vertical"
    });
    $.__views.editView && $.addTopLevelView($.__views.editView);
    $.__views.__alloyId128 = Ti.UI.createView({
        opacity: "0.4",
        height: "25%",
        backgroundColor: "black",
        id: "__alloyId128"
    });
    $.__views.editView.add($.__views.__alloyId128);
    Zeby ? $.__views.__alloyId128.addEventListener("click", Zeby) : __defers["$.__views.__alloyId128!click!Zeby"] = true;
    $.__views.__alloyId129 = Ti.UI.createView({
        layout: "vertical",
        backgroundColor: "#58c8f3",
        height: Ti.UI.SIZE,
        softKeyboardOnFocus: Titanium.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS,
        id: "__alloyId129"
    });
    $.__views.editView.add($.__views.__alloyId129);
    $.__views.fieldTitle = Ti.UI.createLabel({
        font: {
            fontSize: 20,
            fontWeight: "bold"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        color: "white",
        bubbleParent: false,
        height: 60,
        width: "100%",
        returnKeyType: Titanium.UI.RETURNKEY_DONE,
        id: "fieldTitle"
    });
    $.__views.__alloyId129.add($.__views.fieldTitle);
    $.__views.fieldValue = Ti.UI.createTextField({
        font: {
            fontSize: 20,
            fontWeight: "bold"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        color: "white",
        bubbleParent: false,
        height: 60,
        width: "100%",
        returnKeyType: Titanium.UI.RETURNKEY_DONE,
        id: "fieldValue"
    });
    $.__views.__alloyId129.add($.__views.fieldValue);
    $.__views.__alloyId130 = Ti.UI.createView({
        opacity: "0.4",
        height: "60%",
        backgroundColor: "black",
        id: "__alloyId130"
    });
    $.__views.editView.add($.__views.__alloyId130);
    Zeby ? $.__views.__alloyId130.addEventListener("click", Zeby) : __defers["$.__views.__alloyId130!click!Zeby"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.__alloyId128!click!Zeby"] && $.__views.__alloyId128.addEventListener("click", Zeby);
    __defers["$.__views.__alloyId130!click!Zeby"] && $.__views.__alloyId130.addEventListener("click", Zeby);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;