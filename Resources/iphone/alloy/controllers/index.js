function Controller() {
    function runAppOrFTR() {
        var appOrFTRWin;
        var prefixWin = "";
        appOrFTRWin = Alloy.Globals.firstTimeRun ? Alloy.createController(prefixWin + "FTR/index").getView() : Alloy.createController(prefixWin + "appTabGroup").getView();
        stillHere = false;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    exports.destroy = function() {};
    _.extend($, $.__views);
    var stillHere = true;
    Ti.Network.online ? runAppOrFTR() : Ti.Network.addEventListener("change", function() {
        if (Ti.Network.online && stillHere) runAppOrFTR(); else {
            var alertDialog = Titanium.UI.createAlertDialog({
                title: "WARNING!",
                message: "Your device is not online, please connect to the internet.",
                buttonNames: [ "OK" ]
            });
            alertDialog.show();
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;