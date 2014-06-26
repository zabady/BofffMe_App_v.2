function Controller() {
    function CancelClicked() {
        $.tabGroup.close();
    }
    function EditClicked(e) {
        $[e.source.requiredViewId].tableView.editing = !$.contactInfoWin.tableView.editing;
    }
    function SubmitDataToServer() {
        var validReturnString = postUserDataUpdatesOnServer(userData, userDataInArrays);
        validReturnString.search("Wrong") >= 0 && alert(validReturnString);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Settings/EditProfile/editProfileIndex";
    var __parentSymbol = arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    var __alloyId127 = [];
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "win",
        windowSoftInputMode: Titanium.UI.Android.SOFT_INPUT_ADJUST_PAN
    });
    $.__views.__alloyId130 = Ti.UI.createView({
        layout: "horizontal",
        id: "__alloyId130"
    });
    $.__views.__alloyId131 = Ti.UI.createButton({
        title: "Edit",
        requiredViewId: "contactInfoWin",
        id: "__alloyId131"
    });
    $.__views.__alloyId130.add($.__views.__alloyId131);
    EditClicked ? $.__views.__alloyId131.addEventListener("click", EditClicked) : __defers["$.__views.__alloyId131!click!EditClicked"] = true;
    $.__views.__alloyId132 = Ti.UI.createButton({
        title: " Done",
        id: "__alloyId132"
    });
    $.__views.__alloyId130.add($.__views.__alloyId132);
    SubmitDataToServer ? $.__views.__alloyId132.addEventListener("click", SubmitDataToServer) : __defers["$.__views.__alloyId132!click!SubmitDataToServer"] = true;
    $.__views.win.rightNavButton = $.__views.__alloyId130;
    $.__views.__alloyId134 = Ti.UI.createButton({
        title: "Cancel",
        id: "__alloyId134"
    });
    CancelClicked ? $.__views.__alloyId134.addEventListener("click", CancelClicked) : __defers["$.__views.__alloyId134!click!CancelClicked"] = true;
    $.__views.win.leftNavButton = $.__views.__alloyId134;
    $.__views.contactInfoWin = Alloy.createController("Settings/EditProfile/contactInfoWin", {
        id: "contactInfoWin",
        __parentSymbol: $.__views.win
    });
    $.__views.contactInfoWin.setParent($.__views.win);
    $.__views.__alloyId128 = Ti.UI.createTab({
        window: $.__views.win,
        title: "Contact Info",
        icon: "/images/man-7aram.png",
        id: "__alloyId128"
    });
    __alloyId127.push($.__views.__alloyId128);
    $.__views.basicInfoWin = Alloy.createController("Settings/EditProfile/basicInfoWin", {
        id: "basicInfoWin",
        __parentSymbol: __parentSymbol
    });
    $.__views.__alloyId135 = Ti.UI.createTab({
        window: $.__views.basicInfoWin.getViewEx({
            recurse: true
        }),
        title: "Basic Info",
        icon: "/images/QR-code-7aram.png",
        id: "__alloyId135"
    });
    __alloyId127.push($.__views.__alloyId135);
    $.__views.__alloyId138 = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "__alloyId138"
    });
    $.__views.__alloyId140 = Ti.UI.createView({
        layout: "horizontal",
        id: "__alloyId140"
    });
    $.__views.__alloyId141 = Ti.UI.createButton({
        title: "Edit",
        id: "__alloyId141"
    });
    $.__views.__alloyId140.add($.__views.__alloyId141);
    $.__views.__alloyId142 = Ti.UI.createButton({
        title: " Done",
        id: "__alloyId142"
    });
    $.__views.__alloyId140.add($.__views.__alloyId142);
    SubmitDataToServer ? $.__views.__alloyId142.addEventListener("click", SubmitDataToServer) : __defers["$.__views.__alloyId142!click!SubmitDataToServer"] = true;
    $.__views.__alloyId138.rightNavButton = $.__views.__alloyId140;
    $.__views.__alloyId144 = Ti.UI.createButton({
        title: "Cancel",
        id: "__alloyId144"
    });
    CancelClicked ? $.__views.__alloyId144.addEventListener("click", CancelClicked) : __defers["$.__views.__alloyId144!click!CancelClicked"] = true;
    $.__views.__alloyId138.leftNavButton = $.__views.__alloyId144;
    $.__views.__alloyId137 = Ti.UI.createTab({
        window: $.__views.__alloyId138,
        title: "Info",
        icon: "/images/love-7aram.png",
        id: "__alloyId137"
    });
    __alloyId127.push($.__views.__alloyId137);
    $.__views.tabGroup = Ti.UI.createTabGroup({
        tabs: __alloyId127,
        id: "tabGroup"
    });
    $.__views.tabGroup && $.addTopLevelView($.__views.tabGroup);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    Ti.include("/userDataProcessing.js");
    __defers["$.__views.__alloyId131!click!EditClicked"] && $.__views.__alloyId131.addEventListener("click", EditClicked);
    __defers["$.__views.__alloyId132!click!SubmitDataToServer"] && $.__views.__alloyId132.addEventListener("click", SubmitDataToServer);
    __defers["$.__views.__alloyId134!click!CancelClicked"] && $.__views.__alloyId134.addEventListener("click", CancelClicked);
    __defers["$.__views.__alloyId142!click!SubmitDataToServer"] && $.__views.__alloyId142.addEventListener("click", SubmitDataToServer);
    __defers["$.__views.__alloyId144!click!CancelClicked"] && $.__views.__alloyId144.addEventListener("click", CancelClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;