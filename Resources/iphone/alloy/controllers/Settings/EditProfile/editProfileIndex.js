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
    var __alloyId122 = [];
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "win"
    });
    $.__views.__alloyId125 = Ti.UI.createView({
        layout: "horizontal",
        id: "__alloyId125"
    });
    $.__views.__alloyId126 = Ti.UI.createButton({
        title: "Edit",
        requiredViewId: "contactInfoWin",
        id: "__alloyId126"
    });
    $.__views.__alloyId125.add($.__views.__alloyId126);
    EditClicked ? $.__views.__alloyId126.addEventListener("click", EditClicked) : __defers["$.__views.__alloyId126!click!EditClicked"] = true;
    $.__views.__alloyId127 = Ti.UI.createButton({
        title: " Done",
        id: "__alloyId127"
    });
    $.__views.__alloyId125.add($.__views.__alloyId127);
    SubmitDataToServer ? $.__views.__alloyId127.addEventListener("click", SubmitDataToServer) : __defers["$.__views.__alloyId127!click!SubmitDataToServer"] = true;
    $.__views.win.rightNavButton = $.__views.__alloyId125;
    $.__views.__alloyId129 = Ti.UI.createButton({
        title: "Cancel",
        id: "__alloyId129"
    });
    CancelClicked ? $.__views.__alloyId129.addEventListener("click", CancelClicked) : __defers["$.__views.__alloyId129!click!CancelClicked"] = true;
    $.__views.win.leftNavButton = $.__views.__alloyId129;
    $.__views.contactInfoWin = Alloy.createController("/Settings/EditProfile/contactInfoWin", {
        id: "contactInfoWin",
        __parentSymbol: $.__views.win
    });
    $.__views.contactInfoWin.setParent($.__views.win);
    $.__views.__alloyId123 = Ti.UI.createTab({
        window: $.__views.win,
        title: "Contact Info",
        icon: "/images/man-7aram.png",
        id: "__alloyId123"
    });
    __alloyId122.push($.__views.__alloyId123);
    $.__views.basicInfoWin = Alloy.createController("/Settings/EditProfile/basicInfoWin", {
        id: "basicInfoWin",
        __parentSymbol: __parentSymbol
    });
    $.__views.__alloyId130 = Ti.UI.createTab({
        window: $.__views.basicInfoWin.getViewEx({
            recurse: true
        }),
        title: "Basic Info",
        icon: "/images/QR-code-7aram.png",
        id: "__alloyId130"
    });
    __alloyId122.push($.__views.__alloyId130);
    $.__views.__alloyId133 = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "__alloyId133"
    });
    $.__views.__alloyId135 = Ti.UI.createView({
        layout: "horizontal",
        id: "__alloyId135"
    });
    $.__views.__alloyId136 = Ti.UI.createButton({
        title: "Edit",
        id: "__alloyId136"
    });
    $.__views.__alloyId135.add($.__views.__alloyId136);
    $.__views.__alloyId137 = Ti.UI.createButton({
        title: " Done",
        id: "__alloyId137"
    });
    $.__views.__alloyId135.add($.__views.__alloyId137);
    SubmitDataToServer ? $.__views.__alloyId137.addEventListener("click", SubmitDataToServer) : __defers["$.__views.__alloyId137!click!SubmitDataToServer"] = true;
    $.__views.__alloyId133.rightNavButton = $.__views.__alloyId135;
    $.__views.__alloyId139 = Ti.UI.createButton({
        title: "Cancel",
        id: "__alloyId139"
    });
    CancelClicked ? $.__views.__alloyId139.addEventListener("click", CancelClicked) : __defers["$.__views.__alloyId139!click!CancelClicked"] = true;
    $.__views.__alloyId133.leftNavButton = $.__views.__alloyId139;
    $.__views.__alloyId132 = Ti.UI.createTab({
        window: $.__views.__alloyId133,
        title: "Info",
        icon: "/images/love-7aram.png",
        id: "__alloyId132"
    });
    __alloyId122.push($.__views.__alloyId132);
    $.__views.tabGroup = Ti.UI.createTabGroup({
        tabs: __alloyId122,
        id: "tabGroup"
    });
    $.__views.tabGroup && $.addTopLevelView($.__views.tabGroup);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    Ti.include("/userDataProcessing.js");
    __defers["$.__views.__alloyId126!click!EditClicked"] && $.__views.__alloyId126.addEventListener("click", EditClicked);
    __defers["$.__views.__alloyId127!click!SubmitDataToServer"] && $.__views.__alloyId127.addEventListener("click", SubmitDataToServer);
    __defers["$.__views.__alloyId129!click!CancelClicked"] && $.__views.__alloyId129.addEventListener("click", CancelClicked);
    __defers["$.__views.__alloyId137!click!SubmitDataToServer"] && $.__views.__alloyId137.addEventListener("click", SubmitDataToServer);
    __defers["$.__views.__alloyId139!click!CancelClicked"] && $.__views.__alloyId139.addEventListener("click", CancelClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;