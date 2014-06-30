function Controller() {
    function __alloyId152() {
        $.__views.tabGroup.removeEventListener("open", __alloyId152);
        if ($.__views.tabGroup.activity) $.__views.tabGroup.activity.onCreateOptionsMenu = function(e) {
            var __alloyId151 = {
                title: "Done",
                showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM,
                id: "__alloyId150"
            };
            $.__views.__alloyId150 = e.menu.add(_.pick(__alloyId151, Alloy.Android.menuItemCreateArgs));
            $.__views.__alloyId150.applyProperties(_.omit(__alloyId151, Alloy.Android.menuItemCreateArgs));
            SubmitDataToServer ? $.__views.__alloyId150.addEventListener("click", SubmitDataToServer) : __defers["$.__views.__alloyId150!click!SubmitDataToServer"] = true;
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
    var __alloyId131 = [];
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "win"
    });
    $.__views.__alloyId134 = Ti.UI.createView({
        layout: "horizontal",
        id: "__alloyId134"
    });
    $.__views.__alloyId135 = Ti.UI.createButton({
        title: "Edit",
        requiredViewId: "contactInfoWin",
        id: "__alloyId135"
    });
    $.__views.__alloyId134.add($.__views.__alloyId135);
    EditClicked ? $.__views.__alloyId135.addEventListener("click", EditClicked) : __defers["$.__views.__alloyId135!click!EditClicked"] = true;
    $.__views.__alloyId136 = Ti.UI.createButton({
        title: " Done",
        id: "__alloyId136"
    });
    $.__views.__alloyId134.add($.__views.__alloyId136);
    SubmitDataToServer ? $.__views.__alloyId136.addEventListener("click", SubmitDataToServer) : __defers["$.__views.__alloyId136!click!SubmitDataToServer"] = true;
    $.__views.win.rightNavButton = $.__views.__alloyId134;
    $.__views.__alloyId138 = Ti.UI.createButton({
        title: "Cancel",
        id: "__alloyId138"
    });
    CancelClicked ? $.__views.__alloyId138.addEventListener("click", CancelClicked) : __defers["$.__views.__alloyId138!click!CancelClicked"] = true;
    $.__views.win.leftNavButton = $.__views.__alloyId138;
    $.__views.contactInfoWin = Alloy.createController("Settings/EditProfile/contactInfoWin", {
        id: "contactInfoWin",
        __parentSymbol: $.__views.win
    });
    $.__views.contactInfoWin.setParent($.__views.win);
    $.__views.__alloyId132 = Ti.UI.createTab({
        window: $.__views.win,
        title: "Contact Info",
        icon: "/images/man-7aram.png",
        id: "__alloyId132"
    });
    __alloyId131.push($.__views.__alloyId132);
    $.__views.basicInfoWin = Alloy.createController("Settings/EditProfile/basicInfoWin", {
        id: "basicInfoWin",
        __parentSymbol: __parentSymbol
    });
    $.__views.__alloyId139 = Ti.UI.createTab({
        window: $.__views.basicInfoWin.getViewEx({
            recurse: true
        }),
        title: "Basic Info",
        icon: "/images/QR-code-7aram.png",
        id: "__alloyId139"
    });
    __alloyId131.push($.__views.__alloyId139);
    $.__views.__alloyId142 = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "__alloyId142"
    });
    $.__views.__alloyId144 = Ti.UI.createView({
        layout: "horizontal",
        id: "__alloyId144"
    });
    $.__views.__alloyId145 = Ti.UI.createButton({
        title: "Edit",
        id: "__alloyId145"
    });
    $.__views.__alloyId144.add($.__views.__alloyId145);
    $.__views.__alloyId146 = Ti.UI.createButton({
        title: " Done",
        id: "__alloyId146"
    });
    $.__views.__alloyId144.add($.__views.__alloyId146);
    SubmitDataToServer ? $.__views.__alloyId146.addEventListener("click", SubmitDataToServer) : __defers["$.__views.__alloyId146!click!SubmitDataToServer"] = true;
    $.__views.__alloyId142.rightNavButton = $.__views.__alloyId144;
    $.__views.__alloyId148 = Ti.UI.createButton({
        title: "Cancel",
        id: "__alloyId148"
    });
    CancelClicked ? $.__views.__alloyId148.addEventListener("click", CancelClicked) : __defers["$.__views.__alloyId148!click!CancelClicked"] = true;
    $.__views.__alloyId142.leftNavButton = $.__views.__alloyId148;
    $.__views.__alloyId141 = Ti.UI.createTab({
        window: $.__views.__alloyId142,
        title: "Info",
        icon: "/images/love-7aram.png",
        id: "__alloyId141"
    });
    __alloyId131.push($.__views.__alloyId141);
    $.__views.tabGroup = Ti.UI.createTabGroup({
        tabs: __alloyId131,
        id: "tabGroup"
    });
    $.__views.tabGroup.addEventListener("open", __alloyId152);
    $.__views.tabGroup && $.addTopLevelView($.__views.tabGroup);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    Ti.include("/userDataProcessing.js");
    __defers["$.__views.__alloyId135!click!EditClicked"] && $.__views.__alloyId135.addEventListener("click", EditClicked);
    __defers["$.__views.__alloyId136!click!SubmitDataToServer"] && $.__views.__alloyId136.addEventListener("click", SubmitDataToServer);
    __defers["$.__views.__alloyId138!click!CancelClicked"] && $.__views.__alloyId138.addEventListener("click", CancelClicked);
    __defers["$.__views.__alloyId146!click!SubmitDataToServer"] && $.__views.__alloyId146.addEventListener("click", SubmitDataToServer);
    __defers["$.__views.__alloyId148!click!CancelClicked"] && $.__views.__alloyId148.addEventListener("click", CancelClicked);
    __defers["$.__views.__alloyId150!click!SubmitDataToServer"] && $.__views.__alloyId150.addEventListener("click", SubmitDataToServer);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;