function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

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
        Alloy.Globals.userPin = e.row.pin;
        getUserData();
    }
    function getUserData() {
        var xhr = Ti.Network.createHTTPClient({
            onload: function() {
                userData = JSON.parse(this.responseText).rows[0];
                userData.phone_numbers || (userData.phone_numbers = []);
                userData.phone_numbers_privacy || (userData.phone_numbers_privacy = []);
                userData.mails || (userData.mails = []);
                userData.mails_privacy || (userData.mails_privacy = []);
                userData.social_links || (userData.social_links = []);
                userData.social_links_privacy || (userData.social_links_privacy = []);
                userData.interests || (userData.interests = []);
                userData.interests_privacy || (userData.interests_privacy = []);
                userData.favorite_places || (userData.favorite_places = []);
                userData.favorite_places_privacy || (userData.favorite_places_privacy = []);
                Titanium.App.Properties.setObject("userData", userData);
                alert(userData.fullName);
            },
            onerror: function() {
                alert(this.responseText);
            }
        });
        xhr.open("POST", Alloy.Globals.apiUrl + "search_user_by/bofff/user_accounts/pin/" + Alloy.Globals.userPin);
        xhr.send();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Settings/changeUserPinWin";
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