function Controller() {
    function LoadNotifications() {
        var allNotifications = Titanium.App.Properties.getObject("notifications");
        var mainSection = Ti.UI.createListSection({
            headerTitle: "All Notifications"
        });
        if (allNotifications) {
            var listItems = [];
            for (var i in allNotifications) {
                var notification = {
                    pic: {
                        image: allNotifications[i].iconImage
                    },
                    notificationTitle: {
                        text: allNotifications[i].notificationTitle
                    },
                    message: {
                        text: allNotifications[i].notificationMessage
                    },
                    properties: {
                        height: 90
                    }
                };
                listItems.push(notification);
            }
        } else var listItems = [ {
            notificationTitle: {
                text: "No Notifications"
            },
            message: {
                text: "No friend updates, you will be notified when one of your friends updates his profile."
            },
            properties: {
                height: 90
            }
        } ];
        mainSection.setItems(listItems);
        var sections = [];
        sections.push(mainSection);
        $.listView.sections = sections;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "notificationCenterWin";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.notificationCenterWin = Ti.UI.createWindow({
        backgroundColor: "white",
        title: "Notifications",
        id: "notificationCenterWin"
    });
    $.__views.notificationCenterWin && $.addTopLevelView($.__views.notificationCenterWin);
    LoadNotifications ? $.__views.notificationCenterWin.addEventListener("focus", LoadNotifications) : __defers["$.__views.notificationCenterWin!focus!LoadNotifications"] = true;
    $.__views.btn_settings = Ti.UI.createButton({
        backgroundImage: "/images/icon_settings.png",
        backgroundColor: "transparent",
        width: 30,
        height: 30,
        id: "btn_settings"
    });
    $.__views.notificationCenterWin.rightNavButton = $.__views.btn_settings;
    $.__views.__alloyId9 = Ti.UI.createImageView({
        image: "/images/app_icon_60x60.png",
        width: 40,
        height: 40,
        id: "__alloyId9"
    });
    $.__views.notificationCenterWin.leftNavButton = $.__views.__alloyId9;
    var __alloyId10 = {};
    var __alloyId13 = [];
    var __alloyId14 = {
        type: "Ti.UI.ImageView",
        bindId: "pic",
        properties: {
            width: "75",
            height: "75",
            left: 0,
            bindId: "pic"
        }
    };
    __alloyId13.push(__alloyId14);
    var __alloyId15 = {
        type: "Ti.UI.Label",
        bindId: "notificationTitle",
        properties: {
            color: "#2279bc",
            font: {
                fontFamily: "Arial",
                fontSize: "18dp",
                fontWeight: "bold"
            },
            left: "90",
            top: 4,
            bindId: "notificationTitle"
        }
    };
    __alloyId13.push(__alloyId15);
    var __alloyId16 = {
        type: "Ti.UI.Label",
        bindId: "message",
        properties: {
            color: "black",
            font: {
                fontFamily: "Arial",
                fontSize: "14dp"
            },
            left: "90",
            top: 29,
            width: "70%",
            bindId: "message"
        }
    };
    __alloyId13.push(__alloyId16);
    var __alloyId12 = {
        properties: {
            name: "template"
        },
        childTemplates: __alloyId13
    };
    __alloyId10["template"] = __alloyId12;
    $.__views.listView = Ti.UI.createListView({
        separatorColor: "#2279bc",
        templates: __alloyId10,
        id: "listView",
        defaultItemTemplate: "template"
    });
    $.__views.notificationCenterWin.add($.__views.listView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.LoadNotifications = LoadNotifications;
    LoadNotifications();
    __defers["$.__views.notificationCenterWin!focus!LoadNotifications"] && $.__views.notificationCenterWin.addEventListener("focus", LoadNotifications);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;