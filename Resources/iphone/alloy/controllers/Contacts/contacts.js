function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Contacts/contacts";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.contacts = Ti.UI.createWindow({
        backgroundColor: "white",
        title: "Contacts",
        id: "contacts"
    });
    $.__views.contacts && $.addTopLevelView($.__views.contacts);
    $.__views.btn_settings = Ti.UI.createButton({
        backgroundImage: "/images/icon_settings.png",
        backgroundColor: "transparent",
        width: 30,
        height: 30,
        id: "btn_settings"
    });
    $.__views.contacts.rightNavButton = $.__views.btn_settings;
    $.__views.__alloyId35 = Ti.UI.createImageView({
        image: "/images/app_icon_60x60.png",
        width: 40,
        height: 40,
        id: "__alloyId35"
    });
    $.__views.contacts.leftNavButton = $.__views.__alloyId35;
    $.__views.__alloyId36 = Ti.UI.createLabel({
        text: "E7na Feshar",
        id: "__alloyId36"
    });
    $.__views.contacts.add($.__views.__alloyId36);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;