function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "webViewWin";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
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