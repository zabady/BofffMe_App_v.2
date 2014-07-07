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
    priority: 10000.0002,
    key: "loadingMask",
    style: {
        backgroundColor: "#5000",
        backgroundImage: null,
        opacity: 1,
        navBarHidden: true,
        modal: false,
        exitOnClose: false
    }
}, {
    isClass: true,
    priority: 10000.0003,
    key: "loadingOuter",
    style: {
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        borderRadius: 10,
        backgroundColor: "#C000"
    }
}, {
    isClass: true,
    priority: 10000.0004,
    key: "loadingInner",
    style: {
        top: "20dp",
        right: "20dp",
        bottom: "20dp",
        left: "20dp",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        layout: "vertical"
    }
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
    priority: 10000.0005,
    key: "loadingIndicator",
    style: {
        top: "0dp",
        style: Ti.UI.ActivityIndicatorStyle.BIG
    }
}, {
    isClass: true,
    priority: 10000.0007,
    key: "loadingImages",
    style: {
        top: "0dp",
        images: [ "/images/nl.fokkezb.loading/00.png", "/images/nl.fokkezb.loading/01.png", "/images/nl.fokkezb.loading/02.png", "/images/nl.fokkezb.loading/03.png", "/images/nl.fokkezb.loading/04.png", "/images/nl.fokkezb.loading/05.png", "/images/nl.fokkezb.loading/06.png", "/images/nl.fokkezb.loading/07.png", "/images/nl.fokkezb.loading/08.png", "/images/nl.fokkezb.loading/09.png", "/images/nl.fokkezb.loading/10.png", "/images/nl.fokkezb.loading/11.png" ]
    }
}, {
    isClass: true,
    priority: 10000.0008,
    key: "loadingMessage",
    style: {
        top: "20dp",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: L("loadingMessage", "Loading.."),
        color: "#fff",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: "16dp"
        }
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
    priority: 10101.0006,
    key: "loadingIndicator",
    style: {
        style: Ti.UI.iPhone.ActivityIndicatorStyle.BIG
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