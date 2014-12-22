function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function skipFTR() {
        var isFTR = Titanium.App.Properties.getObject("FTR");
        Titanium.App.Properties.setObject("FTR", !isFTR);
        alert("FTR will start after restarting the app.");
    }
    function windowOpen() {
        $.win.activity.actionBar.hide();
    }
    function continueClicked() {
        if (Alloy.Globals.countryCode) openPhoneNumberWin(); else {
            continueBtnClicked = true;
            Alloy.Globals.loading.show("Please Wait ..", false);
        }
    }
    function openPhoneNumberWin() {
        var phoneNumberWin = Alloy.createController("FTR/phoneNumberWin").getView();
        Alloy.Globals.mainNav.openWindow(phoneNumberWin);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "FTR/welcomeWin";
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
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "white",
        exitOnClose: true,
        navBarHidden: true,
        backgroundGradient: {
            type: "linear",
            startPoint: {
                x: "50%",
                y: "0%"
            },
            endPoint: {
                x: "50%",
                y: "100%"
            },
            colors: [ {
                color: "#58c8f3",
                offset: 0
            }, {
                color: "#41bae8",
                offset: .4
            }, {
                color: "#2585b7",
                offset: .9
            } ]
        },
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    windowOpen ? $.__views.win.addEventListener("open", windowOpen) : __defers["$.__views.win!open!windowOpen"] = true;
    $.__views.__alloyId95 = Ti.UI.createView({
        id: "__alloyId95"
    });
    $.__views.win.add($.__views.__alloyId95);
    $.__views.__alloyId96 = Ti.UI.createButton({
        bottom: "80",
        font: {
            fontSize: "22",
            fontWeight: "bold"
        },
        height: "10%",
        width: "100%",
        backgroundColor: "transparent",
        color: "white",
        title: "Skip FTR",
        id: "__alloyId96"
    });
    $.__views.__alloyId95.add($.__views.__alloyId96);
    skipFTR ? $.__views.__alloyId96.addEventListener("click", skipFTR) : __defers["$.__views.__alloyId96!click!skipFTR"] = true;
    $.__views.__alloyId97 = Ti.UI.createLabel({
        left: 10,
        top: "5%",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "white",
        font: {
            fontSize: "18"
        },
        text: "WELCOME TO BOFFF ME!",
        id: "__alloyId97"
    });
    $.__views.__alloyId95.add($.__views.__alloyId97);
    $.__views.__alloyId98 = Ti.UI.createImageView({
        image: "/images/bofffme_logo_512x512.png",
        width: "200",
        height: "200",
        top: "25%",
        id: "__alloyId98"
    });
    $.__views.__alloyId95.add($.__views.__alloyId98);
    $.__views.__alloyId99 = Ti.UI.createButton({
        bottom: 0,
        font: {
            fontSize: "22",
            fontWeight: "bold"
        },
        height: "10%",
        width: "100%",
        backgroundColor: "transparent",
        color: "white",
        title: "Continue",
        id: "__alloyId99"
    });
    $.__views.__alloyId95.add($.__views.__alloyId99);
    continueClicked ? $.__views.__alloyId99.addEventListener("click", continueClicked) : __defers["$.__views.__alloyId99!click!continueClicked"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var continueBtnClicked = false;
    var xhr = Ti.Network.createHTTPClient({
        onload: function() {
            var response = JSON.parse(this.responseText);
            Alloy.Globals.countryCode = response[0].cc.toLowerCase();
            if (continueBtnClicked) {
                Alloy.Globals.loading.hide();
                openPhoneNumberWin();
            }
        },
        onerror: function(e) {
            alert(JSON.stringify(e));
        }
    });
    xhr.open("POST", Alloy.Globals.apiUrl + "get_country_from_ip");
    xhr.send();
    $.win.navBarHidden = true;
    $.win.open();
    __defers["$.__views.win!open!windowOpen"] && $.__views.win.addEventListener("open", windowOpen);
    __defers["$.__views.__alloyId96!click!skipFTR"] && $.__views.__alloyId96.addEventListener("click", skipFTR);
    __defers["$.__views.__alloyId99!click!continueClicked"] && $.__views.__alloyId99.addEventListener("click", continueClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;