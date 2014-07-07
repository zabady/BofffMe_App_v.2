function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "nl.fokkezb.loading/" + s : s.substring(0, index) + "/nl.fokkezb.loading/" + s.substring(index + 1);
    return path;
}

function Controller() {
    function show(_message, _cancelable) {
        if (ctrl && ctrl.hasFocus) {
            ctrl.update(_message, _cancelable);
            return;
        }
        var newCtrl = Widget.createController("window", {
            message: _message,
            cancelable: _cancelable
        });
        newCtrl.open();
        ctrl && hide();
        ctrl = newCtrl;
    }
    function hide() {
        if (ctrl) {
            ctrl.close();
            ctrl = null;
        }
        return;
    }
    var Widget = new (require("alloy/widget"))("nl.fokkezb.loading");
    this.__widgetId = "nl.fokkezb.loading";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    exports.destroy = function() {};
    _.extend($, $.__views);
    var ctrl;
    arguments[0] || {};
    Object.defineProperty($, "visible", {
        get: function() {
            return ctrl && ctrl.hasFocus;
        },
        set: function(visible) {
            return visible ? show() : hide();
        }
    });
    exports.show = show;
    exports.hide = hide;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;