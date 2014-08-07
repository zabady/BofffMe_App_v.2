function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function scanBtnClicked() {
        Barcode.allowRotation = false;
        Barcode.allowInstructions = false;
        Barcode.allowMenu = false;
        Barcode.capture({
            overlay: $.view_overlay,
            showCancel: true,
            animate: true,
            showRectangle: true,
            keepOpen: false,
            acceptedFormats: [ Barcode.FORMAT_QR_CODE ]
        });
    }
    function cancelBarcode() {
        Barcode.cancel();
    }
    function openCloseLedBarcode() {
        Barcode.useLED = !Barcode.useLED;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "qrCodeWin";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.qrCodeWin = Ti.UI.createWindow({
        backgroundColor: "white",
        title: "QR Code",
        id: "qrCodeWin"
    });
    $.__views.qrCodeWin && $.addTopLevelView($.__views.qrCodeWin);
    $.__views.btn_settings = Ti.UI.createButton({
        bottom: 0,
        height: 30,
        width: 30,
        color: "white",
        backgroundColor: "transparent",
        font: {
            fontSize: "20",
            fontWeight: "bold"
        },
        backgroundImage: "/images/icon_settings.png",
        id: "btn_settings"
    });
    $.__views.qrCodeWin.rightNavButton = $.__views.btn_settings;
    $.__views.__alloyId18 = Ti.UI.createImageView({
        top: "10%",
        width: 40,
        height: 40,
        image: "/images/app_icon_60x60.png",
        id: "__alloyId18"
    });
    $.__views.qrCodeWin.leftNavButton = $.__views.__alloyId18;
    $.__views.__alloyId19 = Ti.UI.createLabel({
        top: 0,
        height: "10%",
        font: {
            fontSize: "20dp"
        },
        color: "#2279bc",
        text: "Your Bofff Me Code!",
        id: "__alloyId19"
    });
    $.__views.qrCodeWin.add($.__views.__alloyId19);
    $.__views.img = Ti.UI.createImageView({
        top: "10%",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "img"
    });
    $.__views.qrCodeWin.add($.__views.img);
    $.__views.__alloyId20 = Ti.UI.createButton({
        bottom: 0,
        height: "15%",
        width: Ti.UI.FILL,
        color: "white",
        backgroundColor: "#2279bc",
        font: {
            fontSize: "20",
            fontWeight: "bold"
        },
        title: "Scan a Bofff QR Code",
        id: "__alloyId20"
    });
    $.__views.qrCodeWin.add($.__views.__alloyId20);
    scanBtnClicked ? $.__views.__alloyId20.addEventListener("click", scanBtnClicked) : __defers["$.__views.__alloyId20!click!scanBtnClicked"] = true;
    $.__views.view_overlay = Ti.UI.createView({
        id: "view_overlay"
    });
    $.__views.view_overlay && $.addTopLevelView($.__views.view_overlay);
    $.__views.__alloyId21 = Ti.UI.createButton({
        bottom: 0,
        height: 50,
        width: 100,
        color: "white",
        backgroundColor: "#2279bc",
        font: {
            fontSize: "20",
            fontWeight: "bold"
        },
        opacity: .5,
        borderRadius: 5,
        title: "Flash",
        left: "0",
        id: "__alloyId21"
    });
    $.__views.view_overlay.add($.__views.__alloyId21);
    openCloseLedBarcode ? $.__views.__alloyId21.addEventListener("click", openCloseLedBarcode) : __defers["$.__views.__alloyId21!click!openCloseLedBarcode"] = true;
    $.__views.__alloyId22 = Ti.UI.createButton({
        bottom: 0,
        height: 50,
        width: 100,
        color: "white",
        backgroundColor: "#2279bc",
        font: {
            fontSize: "20",
            fontWeight: "bold"
        },
        opacity: .5,
        borderRadius: 5,
        title: "Cancel",
        right: "0",
        id: "__alloyId22"
    });
    $.__views.view_overlay.add($.__views.__alloyId22);
    cancelBarcode ? $.__views.__alloyId22.addEventListener("click", cancelBarcode) : __defers["$.__views.__alloyId22!click!cancelBarcode"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.img.image = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory + "qrcode.jpg").read();
    if (500 > Ti.Platform.displayCaps.platformHeight) {
        $.img.width = "90%";
        $.img.height = Ti.UI.SIZE;
    }
    var Barcode = require("ti.barcode");
    Barcode.addEventListener("success", function(e) {
        alert(e.result);
    });
    Barcode.addEventListener("error", function(e) {
        alert(JSON.parse(e.message));
    });
    __defers["$.__views.__alloyId20!click!scanBtnClicked"] && $.__views.__alloyId20.addEventListener("click", scanBtnClicked);
    __defers["$.__views.__alloyId21!click!openCloseLedBarcode"] && $.__views.__alloyId21.addEventListener("click", openCloseLedBarcode);
    __defers["$.__views.__alloyId22!click!cancelBarcode"] && $.__views.__alloyId22.addEventListener("click", cancelBarcode);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;