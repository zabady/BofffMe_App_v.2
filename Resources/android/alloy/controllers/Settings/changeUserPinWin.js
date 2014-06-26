function Controller() {
    function createTableViewRow(user) {
        var name = Ti.UI.createLabel({
            text: user.fullName
        });
        var pin = Ti.UI.createLabel({
            text: user.pin
        });
        var newRow = Ti.UI.createTableViewRow({
            layout: "vertical",
            pin: user.pin
        });
        newRow.add(name);
        newRow.add(pin);
        $.tableView.appendRow(newRow, {
            animated: true
        });
    }
    function RowClicked(e) {
        alert(e.row.pin + "\nPlease Restart the App.");
        Titanium.App.Properties.setObject("pin", e.row.pin);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Settings/changeUserPinWin";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.tableView = Ti.UI.createTableView({
        id: "tableView"
    });
    $.__views.win.add($.__views.tableView);
    RowClicked ? $.__views.tableView.addEventListener("click", RowClicked) : __defers["$.__views.tableView!click!RowClicked"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var xhrrrr = Ti.Network.createHTTPClient({
        onload: function() {
            var allUsers = JSON.parse(this.responseText);
            for (var user in allUsers) createTableViewRow(allUsers[user]);
        },
        onerror: function() {
            alert(this.responseText);
        }
    });
    xhrrrr.open("POST", Alloy.Globals.apiUrl + "get_all_users_fullName_and_pin/bofff");
    xhrrrr.send();
    __defers["$.__views.tableView!click!RowClicked"] && $.__views.tableView.addEventListener("click", RowClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;