function Controller() {
    function __alloyId157() {
        $.__views.tabGroup.removeEventListener("open", __alloyId157);
        if ($.__views.tabGroup.activity) $.__views.tabGroup.activity.onCreateOptionsMenu = function(e) {
            var __alloyId156 = {
                title: "Done",
                showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM,
                id: "__alloyId155"
            };
            $.__views.__alloyId155 = e.menu.add(_.pick(__alloyId156, Alloy.Android.menuItemCreateArgs));
            $.__views.__alloyId155.applyProperties(_.omit(__alloyId156, Alloy.Android.menuItemCreateArgs));
            SubmitDataToServer ? $.__views.__alloyId155.addEventListener("click", SubmitDataToServer) : __defers["$.__views.__alloyId155!click!SubmitDataToServer"] = true;
        }; else {
            Ti.API.warn("You attempted to attach an Android Menu to a lightweight Window");
            Ti.API.warn("or other UI component which does not have an Android activity.");
            Ti.API.warn("Android Menus can only be opened on TabGroups and heavyweight Windows.");
        }
    }
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
    var __alloyId136 = [];
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "win"
    });
    $.__views.__alloyId139 = Ti.UI.createView({
        layout: "horizontal",
        id: "__alloyId139"
    });
    $.__views.__alloyId140 = Ti.UI.createButton({
        title: "Edit",
        requiredViewId: "contactInfoWin",
        id: "__alloyId140"
    });
    $.__views.__alloyId139.add($.__views.__alloyId140);
    EditClicked ? $.__views.__alloyId140.addEventListener("click", EditClicked) : __defers["$.__views.__alloyId140!click!EditClicked"] = true;
    $.__views.__alloyId141 = Ti.UI.createButton({
        title: " Done",
        id: "__alloyId141"
    });
    $.__views.__alloyId139.add($.__views.__alloyId141);
    SubmitDataToServer ? $.__views.__alloyId141.addEventListener("click", SubmitDataToServer) : __defers["$.__views.__alloyId141!click!SubmitDataToServer"] = true;
    $.__views.win.rightNavButton = $.__views.__alloyId139;
    $.__views.__alloyId143 = Ti.UI.createButton({
        title: "Cancel",
        id: "__alloyId143"
    });
    CancelClicked ? $.__views.__alloyId143.addEventListener("click", CancelClicked) : __defers["$.__views.__alloyId143!click!CancelClicked"] = true;
    $.__views.win.leftNavButton = $.__views.__alloyId143;
    $.__views.contactInfoWin = Alloy.createController("Settings/EditProfile/contactInfoWin", {
        id: "contactInfoWin",
        __parentSymbol: $.__views.win
    });
    $.__views.contactInfoWin.setParent($.__views.win);
    $.__views.__alloyId137 = Ti.UI.createTab({
        window: $.__views.win,
        title: "Contact Info",
        icon: "/images/man-7aram.png",
        id: "__alloyId137"
    });
    __alloyId136.push($.__views.__alloyId137);
    $.__views.basicInfoWin = Alloy.createController("Settings/EditProfile/basicInfoWin", {
        id: "basicInfoWin",
        __parentSymbol: __parentSymbol
    });
    $.__views.__alloyId144 = Ti.UI.createTab({
        window: $.__views.basicInfoWin.getViewEx({
            recurse: true
        }),
        title: "Basic Info",
        icon: "/images/QR-code-7aram.png",
        id: "__alloyId144"
    });
    __alloyId136.push($.__views.__alloyId144);
    $.__views.__alloyId147 = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "__alloyId147"
    });
    $.__views.__alloyId149 = Ti.UI.createView({
        layout: "horizontal",
        id: "__alloyId149"
    });
    $.__views.__alloyId150 = Ti.UI.createButton({
        title: "Edit",
        id: "__alloyId150"
    });
    $.__views.__alloyId149.add($.__views.__alloyId150);
    $.__views.__alloyId151 = Ti.UI.createButton({
        title: " Done",
        id: "__alloyId151"
    });
    $.__views.__alloyId149.add($.__views.__alloyId151);
    SubmitDataToServer ? $.__views.__alloyId151.addEventListener("click", SubmitDataToServer) : __defers["$.__views.__alloyId151!click!SubmitDataToServer"] = true;
    $.__views.__alloyId147.rightNavButton = $.__views.__alloyId149;
    $.__views.__alloyId153 = Ti.UI.createButton({
        title: "Cancel",
        id: "__alloyId153"
    });
    CancelClicked ? $.__views.__alloyId153.addEventListener("click", CancelClicked) : __defers["$.__views.__alloyId153!click!CancelClicked"] = true;
    $.__views.__alloyId147.leftNavButton = $.__views.__alloyId153;
    $.__views.__alloyId146 = Ti.UI.createTab({
        window: $.__views.__alloyId147,
        title: "Info",
        icon: "/images/love-7aram.png",
        id: "__alloyId146"
    });
    __alloyId136.push($.__views.__alloyId146);
    $.__views.tabGroup = Ti.UI.createTabGroup({
        tabs: __alloyId136,
        id: "tabGroup"
    });
    $.__views.tabGroup.addEventListener("open", __alloyId157);
    $.__views.tabGroup && $.addTopLevelView($.__views.tabGroup);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    Ti.include("/userDataProcessing.js");
    __defers["$.__views.__alloyId140!click!EditClicked"] && $.__views.__alloyId140.addEventListener("click", EditClicked);
    __defers["$.__views.__alloyId141!click!SubmitDataToServer"] && $.__views.__alloyId141.addEventListener("click", SubmitDataToServer);
    __defers["$.__views.__alloyId143!click!CancelClicked"] && $.__views.__alloyId143.addEventListener("click", CancelClicked);
    __defers["$.__views.__alloyId151!click!SubmitDataToServer"] && $.__views.__alloyId151.addEventListener("click", SubmitDataToServer);
    __defers["$.__views.__alloyId153!click!CancelClicked"] && $.__views.__alloyId153.addEventListener("click", CancelClicked);
    __defers["$.__views.__alloyId155!click!SubmitDataToServer"] && $.__views.__alloyId155.addEventListener("click", SubmitDataToServer);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;