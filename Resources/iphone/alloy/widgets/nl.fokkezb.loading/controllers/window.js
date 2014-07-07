function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "nl.fokkezb.loading/" + s : s.substring(0, index) + "/nl.fokkezb.loading/" + s.substring(index + 1);
    return path;
}

function Controller() {
    function init() {
        if ($.loadingMask.images) {
            useImages = true;
            $.loadingInner.remove($.loadingIndicator);
            $.loadingIndicator = null;
        } else {
            $.loadingInner.remove($.loadingImages);
            $.loadingImages = null;
        }
        update(args.message, args.cancelable);
        args = null;
    }
    function update(_message, _cancelable) {
        $.loadingMessage.text = _message || L("loadingMessage", "Loading...");
        cancelable = _cancelable;
    }
    function cancel() {
        if (!cancelable) return;
        close();
        _.isFunction(cancelable) && cancelable();
        return;
    }
    function open() {
        Ti.API.debug("window open " + $.loadingMask.n);
        $.loadingMask.open();
        useImages ? $.loadingImages.start() : $.loadingIndicator.show();
    }
    function close() {
        _close();
    }
    function _close() {
        $.loadingMask.close();
        useImages ? $.loadingImages.stop() : $.loadingIndicator.hide();
        cancelable = null;
    }
    function onFocus() {
        $.hasFocus = true;
    }
    function onBlur() {
        $.hasFocus = false;
    }
    new (require("alloy/widget"))("nl.fokkezb.loading");
    this.__widgetId = "nl.fokkezb.loading";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "window";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.loadingMask = Ti.UI.createWindow({
        backgroundColor: "#5000",
        backgroundImage: null,
        opacity: 1,
        navBarHidden: true,
        modal: false,
        exitOnClose: false,
        id: "loadingMask"
    });
    $.__views.loadingMask && $.addTopLevelView($.__views.loadingMask);
    cancel ? $.__views.loadingMask.addEventListener("click", cancel) : __defers["$.__views.loadingMask!click!cancel"] = true;
    onFocus ? $.__views.loadingMask.addEventListener("focus", onFocus) : __defers["$.__views.loadingMask!focus!onFocus"] = true;
    onBlur ? $.__views.loadingMask.addEventListener("blur", onBlur) : __defers["$.__views.loadingMask!blur!onBlur"] = true;
    $.__views.loadingOuter = Ti.UI.createView({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        borderRadius: 10,
        backgroundColor: "#C000",
        id: "loadingOuter"
    });
    $.__views.loadingMask.add($.__views.loadingOuter);
    $.__views.loadingInner = Ti.UI.createView({
        top: "20dp",
        right: "20dp",
        bottom: "20dp",
        left: "20dp",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "loadingInner"
    });
    $.__views.loadingOuter.add($.__views.loadingInner);
    $.__views.loadingIndicator = Ti.UI.createActivityIndicator({
        top: "0dp",
        style: Ti.UI.iPhone.ActivityIndicatorStyle.BIG,
        id: "loadingIndicator"
    });
    $.__views.loadingInner.add($.__views.loadingIndicator);
    $.__views.loadingImages = Ti.UI.createImageView({
        top: "0dp",
        images: [ "/images/nl.fokkezb.loading/00.png", "/images/nl.fokkezb.loading/01.png", "/images/nl.fokkezb.loading/02.png", "/images/nl.fokkezb.loading/03.png", "/images/nl.fokkezb.loading/04.png", "/images/nl.fokkezb.loading/05.png", "/images/nl.fokkezb.loading/06.png", "/images/nl.fokkezb.loading/07.png", "/images/nl.fokkezb.loading/08.png", "/images/nl.fokkezb.loading/09.png", "/images/nl.fokkezb.loading/10.png", "/images/nl.fokkezb.loading/11.png" ],
        id: "loadingImages"
    });
    $.__views.loadingInner.add($.__views.loadingImages);
    $.__views.loadingMessage = Ti.UI.createLabel({
        top: "20dp",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: L("loadingMessage", "Loading.."),
        color: "#fff",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: "16dp"
        },
        id: "loadingMessage"
    });
    $.__views.loadingInner.add($.__views.loadingMessage);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {}, useImages = false, cancelable = false;
    init();
    exports.hasFocus = true;
    exports.open = open;
    exports.update = update;
    exports.close = close;
    __defers["$.__views.loadingMask!click!cancel"] && $.__views.loadingMask.addEventListener("click", cancel);
    __defers["$.__views.loadingMask!focus!onFocus"] && $.__views.loadingMask.addEventListener("focus", onFocus);
    __defers["$.__views.loadingMask!blur!onBlur"] && $.__views.loadingMask.addEventListener("blur", onBlur);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;