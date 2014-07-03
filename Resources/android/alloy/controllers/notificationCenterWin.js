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
        } else {
            alert("allNotifications is empty !");
            var listItems = [ {
                notificationTitle: {
                    text: "No Notifications"
                },
                message: {
                    text: "No friend updates, you will be notified when one of your friends updates his profile."
                }
            } ];
        }
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
        id: "notificationCenterWin"
    });
    $.__views.notificationCenterWin && $.addTopLevelView($.__views.notificationCenterWin);
    LoadNotifications ? $.__views.notificationCenterWin.addEventListener("focus", LoadNotifications) : __defers["$.__views.notificationCenterWin!focus!LoadNotifications"] = true;
    $.__views.btn_settings = Ti.UI.createButton({
        id: "btn_settings"
    });
    $.__views.notificationCenterWin.rightNavButton = $.__views.btn_settings;
    $.__views.__alloyId12 = Ti.UI.createImageView({
        id: "__alloyId12"
    });
    $.__views.notificationCenterWin.leftNavButton = $.__views.__alloyId12;
    var __alloyId13 = {};
    var __alloyId16 = [];
    var __alloyId17 = {
        type: "Ti.UI.ImageView",
        bindId: "pic",
        properties: {
            width: "75",
            height: "75",
            left: 0,
            bindId: "pic"
        }
    };
    __alloyId16.push(__alloyId17);
    var __alloyId18 = {
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
    __alloyId16.push(__alloyId18);
    var __alloyId19 = {
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
    __alloyId16.push(__alloyId19);
    var __alloyId15 = {
        properties: {
            name: "template"
        },
        childTemplates: __alloyId16
    };
    __alloyId13["template"] = __alloyId15;
    $.__views.listView = Ti.UI.createListView({
        separatorColor: "#2279bc",
        templates: __alloyId13,
        id: "listView",
        defaultItemTemplate: "template"
    });
    $.__views.notificationCenterWin.add($.__views.listView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.LoadNotifications = LoadNotifications;
    __defers["$.__views.notificationCenterWin!focus!LoadNotifications"] && $.__views.notificationCenterWin.addEventListener("focus", LoadNotifications);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;