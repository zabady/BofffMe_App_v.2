function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "nl.fokkezb.loading/" + s : s.substring(0, index) + "/nl.fokkezb.loading/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
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
    priority: 1101.0004,
    key: "TextField",
    style: {
        color: "black",
        ellipsize: true,
        softKeyboardOnFocus: Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS
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
} ];