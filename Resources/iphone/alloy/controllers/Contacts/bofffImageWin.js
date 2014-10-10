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
    this.__controllerPath = "Contacts/bofffImageWin";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    $.__views.bofffImageWin = Ti.UI.createWindow({
        backgroundColor: "black",
        title: "Contact Image",
        id: "bofffImageWin"
    });
    $.__views.bofffImageWin && $.addTopLevelView($.__views.bofffImageWin);
    $.__views.__alloyId40 = Ti.UI.createScrollView({
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        showHorizontalScrollIndicator: false,
        showVerticalScrollIndicator: false,
        maxZoomScale: 10,
        minZoomScale: 1,
        backgroundColor: "transparent",
        id: "__alloyId40"
    });
    $.__views.bofffImageWin.add($.__views.__alloyId40);
    $.__views.img = Ti.UI.createImageView({
        width: "100%",
        height: Ti.UI.SIZE,
        enableZoomControls: true,
        id: "img"
    });
    $.__views.__alloyId40.add($.__views.img);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.img.defaultImage = arguments[0].iconImage || {};
    $.img.image = arguments[0].profilePicture || {};
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;