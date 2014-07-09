function Controller() {
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
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "white",
        exitOnClose: true,
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
    $.__views.__alloyId104 = Ti.UI.createView({
        id: "__alloyId104"
    });
    $.__views.win.add($.__views.__alloyId104);
    $.__views.__alloyId105 = Ti.UI.createLabel({
        left: 10,
        top: "5%",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "white",
        font: {
            fontSize: "18"
        },
        text: "WELCOME TO BOFFF ME!",
        id: "__alloyId105"
    });
    $.__views.__alloyId104.add($.__views.__alloyId105);
    $.__views.__alloyId106 = Ti.UI.createImageView({
        image: "/images/bofffme_logo_512x512.png",
        width: "200",
        height: "200",
        top: "25%",
        id: "__alloyId106"
    });
    $.__views.__alloyId104.add($.__views.__alloyId106);
    $.__views.__alloyId107 = Ti.UI.createButton({
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
        id: "__alloyId107"
    });
    $.__views.__alloyId104.add($.__views.__alloyId107);
    continueClicked ? $.__views.__alloyId107.addEventListener("click", continueClicked) : __defers["$.__views.__alloyId107!click!continueClicked"] = true;
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
    __defers["$.__views.__alloyId107!click!continueClicked"] && $.__views.__alloyId107.addEventListener("click", continueClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;