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
    this.__controllerPath = "webViewWin";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.webViewWin = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "webViewWin"
    });
    $.__views.webViewWin && $.addTopLevelView($.__views.webViewWin);
    $.__views.webview = Ti.UI.createWebView({
        id: "webview"
    });
    $.__views.webViewWin.add($.__views.webview);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var url = arguments[0].url || "http://www.bofffme.com";
    $.webview.url = url;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;