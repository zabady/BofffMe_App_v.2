function Controller() {
    function scanBtnClicked() {
        Barcode.allowRotation = true;
        Barcode.allowInstructions = false;
        Barcode.allowMenu = false;
        Barcode.displayedMessage = "You may need to rotate the device.";
        Barcode.addEventListener("success", function(e) {
            alert(e.result);
        });
        Barcode.addEventListener("error", function(e) {
            alert(e.message);
        });
        Barcode.capture({
            overlay: $.view_overlay,
            showCancel: false,
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
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.qrCodeWin = Ti.UI.createWindow({
        backgroundColor: "white",
        title: "QR Code",
        autoAdjustScrollViewInsets: "true",
        id: "qrCodeWin"
    });
    $.__views.qrCodeWin && $.addTopLevelView($.__views.qrCodeWin);
    $.__views.btn_settings = Ti.UI.createButton({
        bottom: 0,
        height: "15%",
        width: Ti.UI.FILL,
        color: "white",
        backgroundColor: "#2279bc",
        font: {
            fontSize: "20",
            fontWeight: "bold"
        },
        id: "btn_settings"
    });
    $.__views.qrCodeWin.rightNavButton = $.__views.btn_settings;
    $.__views.__alloyId23 = Ti.UI.createImageView({
        top: "10%",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "__alloyId23"
    });
    $.__views.qrCodeWin.leftNavButton = $.__views.__alloyId23;
    $.__views.__alloyId24 = Ti.UI.createLabel({
        top: 0,
        height: "10%",
        font: {
            fontSize: "20dp"
        },
        color: "#2279bc",
        text: "Your Bofff Me Code!",
        id: "__alloyId24"
    });
    $.__views.qrCodeWin.add($.__views.__alloyId24);
    $.__views.img = Ti.UI.createImageView({
        top: "10%",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "img"
    });
    $.__views.qrCodeWin.add($.__views.img);
    $.__views.__alloyId25 = Ti.UI.createButton({
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
        id: "__alloyId25"
    });
    $.__views.qrCodeWin.add($.__views.__alloyId25);
    scanBtnClicked ? $.__views.__alloyId25.addEventListener("click", scanBtnClicked) : __defers["$.__views.__alloyId25!click!scanBtnClicked"] = true;
    $.__views.view_overlay = Ti.UI.createView({
        id: "view_overlay"
    });
    $.__views.view_overlay && $.addTopLevelView($.__views.view_overlay);
    $.__views.__alloyId26 = Ti.UI.createButton({
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
        id: "__alloyId26"
    });
    $.__views.view_overlay.add($.__views.__alloyId26);
    openCloseLedBarcode ? $.__views.__alloyId26.addEventListener("click", openCloseLedBarcode) : __defers["$.__views.__alloyId26!click!openCloseLedBarcode"] = true;
    $.__views.__alloyId27 = Ti.UI.createButton({
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
        id: "__alloyId27"
    });
    $.__views.view_overlay.add($.__views.__alloyId27);
    cancelBarcode ? $.__views.__alloyId27.addEventListener("click", cancelBarcode) : __defers["$.__views.__alloyId27!click!cancelBarcode"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.img.image = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory + "qrcode.jpg").read();
    if (500 > Ti.Platform.displayCaps.platformHeight) {
        $.img.width = "90%";
        $.img.height = Ti.UI.SIZE;
    }
    var Barcode = require("ti.barcode");
    __defers["$.__views.__alloyId25!click!scanBtnClicked"] && $.__views.__alloyId25.addEventListener("click", scanBtnClicked);
    __defers["$.__views.__alloyId26!click!openCloseLedBarcode"] && $.__views.__alloyId26.addEventListener("click", openCloseLedBarcode);
    __defers["$.__views.__alloyId27!click!cancelBarcode"] && $.__views.__alloyId27.addEventListener("click", cancelBarcode);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;