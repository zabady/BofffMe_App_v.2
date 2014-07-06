function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Contacts/bofffImageWin";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.bofffImageWin = Ti.UI.createWindow({
        backgroundColor: "black",
        title: "Contact Image",
        id: "bofffImageWin"
    });
    $.__views.bofffImageWin && $.addTopLevelView($.__views.bofffImageWin);
    $.__views.__alloyId48 = Ti.UI.createScrollView({
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        showHorizontalScrollIndicator: false,
        showVerticalScrollIndicator: false,
        maxZoomScale: 10,
        minZoomScale: 1,
        backgroundColor: "transparent",
        id: "__alloyId48"
    });
    $.__views.bofffImageWin.add($.__views.__alloyId48);
    $.__views.img = Ti.UI.createImageView({
        width: "100%",
        height: Ti.UI.SIZE,
        enableZoomControls: true,
        id: "img"
    });
    $.__views.__alloyId48.add($.__views.img);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.img.defaultImage = arguments[0].iconImage || {};
    $.img.image = arguments[0].profilePicture || {};
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;