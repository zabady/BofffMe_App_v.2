function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "nl.fokkezb.loading/" + s : s.substring(0, index) + "/nl.fokkezb.loading/" + s.substring(index + 1);
    return path;
}

module.exports = [ {
    isApi: true,
    priority: 1000.0001,
    key: "Window",
    style: {
        backgroundColor: "white"
    }
}, {
    isApi: true,
    priority: 1000.0003,
    key: "TextField",
    style: {
        bubbleParent: false
    }
}, {
    isApi: true,
    priority: 1101.0002,
    key: "TabGroup",
    style: {}
}, {
    isClass: true,
    priority: 10000.0005,
    key: "appTitleLabel",
    style: {
        font: {
            fontSize: "20dp"
        },
        color: "#2279bc"
    }
}, {
    isClass: true,
    priority: 10000.0008,
    key: "andoridEditViewField",
    style: {
        font: {
            fontSize: 20,
            fontWeight: "bold"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        bubbleParent: false,
        height: 60,
        width: "100%",
        returnKeyType: Titanium.UI.RETURNKEY_DONE
    }
}, {
    isClass: true,
    priority: 10101.0006,
    key: "settingsBtn",
    style: {
        backgroundImage: "/images/icon_settings.png",
        backgroundColor: "transparent",
        width: 30,
        height: 30
    }
}, {
    isClass: true,
    priority: 10101.0007,
    key: "logo",
    style: {
        image: "/images/app_icon_60x60.png",
        width: 40,
        height: 40
    }
} ];