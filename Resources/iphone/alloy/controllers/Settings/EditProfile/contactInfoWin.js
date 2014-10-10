function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function createBindingRowData(fieldValue, privacy, isPhone, isSocial) {
        var data = {
            TextOfFieldTitle: isPhone ? "Phone" : isSocial ? "Url" : "Email",
            HintTextOfField: isPhone ? "Phone number" : isSocial ? "Social Link, eg. facebook" : "Email address",
            FieldType: isPhone ? "phone_numbers" : isSocial ? "social_links" : "mails",
            KeyboardType: isPhone ? Ti.UI.KEYBOARD_DECIMAL_PAD : isSocial ? Ti.UI.KEYBOARD_URL : Ti.UI.KEYBOARD_EMAIL,
            TextOfField: fieldValue,
            TextOfPrivacy: privacy
        };
        return data;
    }
    function AddRowButtonClicked() {
        addNewRowFlag = true;
    }
    function TableViewRowClicked(e) {
        if (addNewRowFlag) {
            addNewFieldToUserData(userDataInArrays, e.row.isPhone > 0 ? "phone_numbers" : e.row.isSocial ? "social_links" : "mails");
            var data = createBindingRowData("", "friends", e.row.isPhone > 0, e.row.isSocial > 0);
            AddNewRowAfter(data, e.index + 1);
            addNewRowFlag = false;
        }
    }
    function DeletePressed(e) {
        deleteAddableField(userDataInArrays, e.source.fieldType, e.source.fieldValue);
    }
    function PrimaryPhoneTextLongclick() {
        alert("How will we allow the user to change primary phone ?\nMaybe with FTR.");
    }
    function ValueLabelClicked(e) {
        DisplayEditView(e.source);
        clickedTextField = e.source;
        addableTextOldValue = e.source.fieldType && clickedTextField.text != clickedTextField.hintText ? e.source.text : "";
    }
    function EditViewTextChanged() {
        if (false == $.editViewContainer.editView.visible) return;
        clickedTextField.text = $.editViewContainer.fieldValue.value;
        if ("" == $.editViewContainer.fieldValue.value) {
            clickedTextField.text = clickedTextField.hintText;
            clickedTextField.color = "#C8C8C8";
        } else clickedTextField.color = "black";
        clickedTextField.fieldType ? AddableFieldTextChanged() : NonAddableFieldTextChanged();
    }
    function EditViewBlur() {
        $.editViewContainer.editView.visible = false;
        $.editViewContainer.fieldValue.blur();
        $.editViewContainer.fieldValue.value = "";
    }
    function PrivacyLabelClicked(e) {
        $.pickerContainer.pickerView.visible = true;
        $.pickerContainer.picker.setSelectedRow(0, privacyIndex[e.source.text], {
            animated: true
        });
        clickedPrivacyLabel = e.source;
    }
    function SelectedPrivacyChanged() {
        var newPrivacy = $.pickerContainer.picker.getSelectedRow(0).title;
        var newPrivacy;
        clickedPrivacyLabel.id ? changePrivacyOfNonAddableField(userDataInArrays, clickedPrivacyLabel.id, newPrivacy) : changePrivacyOfAddableField(userDataInArrays, clickedPrivacyLabel.fieldType, clickedPrivacyLabel.text, newPrivacy);
        clickedPrivacyLabel.text = newPrivacy;
    }
    function DismissPicker() {
        $.pickerContainer.pickerView.visible = false;
    }
    function DisplayEditView(clickedLabel) {
        $.editViewContainer.editView.visible = true;
        $.editViewContainer.fieldTitle.text = "Type " + clickedLabel.hintText;
        $.editViewContainer.fieldValue.hintText = clickedLabel.hintText;
        clickedLabel.text != clickedLabel.hintText && ($.editViewContainer.fieldValue.value = clickedLabel.text);
        $.editViewContainer.fieldValue.keyboardType = clickedLabel.keyboardType;
        $.editViewContainer.fieldValue.focus();
    }
    function NonAddableFieldTextChanged() {
        changeValueOfNonAddableField(userDataInArrays, clickedTextField.id, clickedTextField.text);
    }
    function AddableFieldTextChanged() {
        changeValueOfAddableField(userDataInArrays, clickedTextField.fieldType, addableTextOldValue, clickedTextField.text);
        addableTextOldValue = clickedTextField.text != clickedTextField.hintText ? clickedTextField.text : "";
    }
    function AddNewRowAfter(data, rowNum) {
        var fieldTitleLabel = Ti.UI.createLabel({
            text: data.TextOfFieldTitle
        });
        $.addClass(fieldTitleLabel, "fieldTitleLabel");
        var fieldTextField = Ti.UI.createLabel({
            text: "" != data.TextOfField ? data.TextOfField : data.HintTextOfField,
            hintText: data.HintTextOfField,
            fieldType: data.FieldType,
            keyboardType: data.KeyboardType,
            keyboardToolbar: data.KeyboardToolbar
        });
        $.addClass(fieldTextField, "fieldText");
        "" != data.TextOfField && (fieldTextField.color = "black");
        fieldTextField.addEventListener("click", ValueLabelClicked);
        var privacyLabel = Ti.UI.createLabel({
            text: data.TextOfPrivacy,
            fieldType: data.FieldType
        });
        privacyLabel.addEventListener("click", PrivacyLabelClicked);
        $.addClass(privacyLabel, "privacyLabel");
        var newRow = Ti.UI.createTableViewRow({
            fieldType: data.FieldType,
            fieldValue: data.TextOfField
        });
        $.addClass(newRow, "fieldRow");
        newRow.add(fieldTitleLabel);
        newRow.add(fieldTextField);
        newRow.add(privacyLabel);
        data.HintTextOfField.search("facebook") >= 0 && rowNum--;
        $.tableView.insertRowAfter(rowNum, newRow, {
            animated: true
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Settings/EditProfile/contactInfoWin";
    if (arguments[0]) {
        var __parentSymbol = __processArg(arguments[0], "__parentSymbol");
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
    var __alloyId111 = [];
    $.__views.__alloyId112 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        backgroundColor: "#D0D0D0",
        id: "__alloyId112"
    });
    __alloyId111.push($.__views.__alloyId112);
    $.__views.__alloyId113 = Ti.UI.createTableViewRow({
        editable: false,
        height: Ti.UI.SIZE,
        top: 20,
        isPhone: "1",
        id: "__alloyId113"
    });
    __alloyId111.push($.__views.__alloyId113);
    $.__views.__alloyId114 = Ti.UI.createLabel({
        left: 10,
        font: {
            fontSize: "17"
        },
        color: "#2279bc",
        text: "Phone Numbers",
        id: "__alloyId114"
    });
    $.__views.__alloyId113.add($.__views.__alloyId114);
    $.__views.__alloyId115 = Ti.UI.createButton({
        right: 10,
        style: Ti.UI.iPhone.SystemButton.CONTACT_ADD,
        id: "__alloyId115"
    });
    $.__views.__alloyId113.add($.__views.__alloyId115);
    AddRowButtonClicked ? $.__views.__alloyId115.addEventListener("click", AddRowButtonClicked) : __defers["$.__views.__alloyId115!click!AddRowButtonClicked"] = true;
    $.__views.__alloyId116 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        id: "__alloyId116"
    });
    __alloyId111.push($.__views.__alloyId116);
    $.__views.__alloyId117 = Ti.UI.createLabel({
        left: "5%",
        width: "22%",
        font: {
            fontSize: "15"
        },
        color: "#2279bc",
        bubbleParent: false,
        text: "Primary",
        id: "__alloyId117"
    });
    $.__views.__alloyId116.add($.__views.__alloyId117);
    $.__views.primary_mobile = Ti.UI.createLabel({
        left: "29%",
        width: "42%",
        font: {
            fontSize: "15"
        },
        bubbleParent: false,
        color: "#C8C8C8",
        id: "primary_mobile"
    });
    $.__views.__alloyId116.add($.__views.primary_mobile);
    PrimaryPhoneTextLongclick ? $.__views.primary_mobile.addEventListener("longclick", PrimaryPhoneTextLongclick) : __defers["$.__views.primary_mobile!longclick!PrimaryPhoneTextLongclick"] = true;
    $.__views.primary_mobile_privacy = Ti.UI.createLabel({
        left: "73%",
        width: "22%",
        font: {
            fontSize: "15"
        },
        bubbleParent: false,
        text: "Default",
        id: "primary_mobile_privacy"
    });
    $.__views.__alloyId116.add($.__views.primary_mobile_privacy);
    PrivacyLabelClicked ? $.__views.primary_mobile_privacy.addEventListener("click", PrivacyLabelClicked) : __defers["$.__views.primary_mobile_privacy!click!PrivacyLabelClicked"] = true;
    $.__views.__alloyId118 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        backgroundColor: "#D0D0D0",
        id: "__alloyId118"
    });
    __alloyId111.push($.__views.__alloyId118);
    $.__views.__alloyId119 = Ti.UI.createTableViewRow({
        editable: false,
        height: Ti.UI.SIZE,
        top: 20,
        isPhone: "0",
        id: "__alloyId119"
    });
    __alloyId111.push($.__views.__alloyId119);
    $.__views.__alloyId120 = Ti.UI.createLabel({
        left: 10,
        font: {
            fontSize: "17"
        },
        color: "#2279bc",
        text: "Email Addresses",
        id: "__alloyId120"
    });
    $.__views.__alloyId119.add($.__views.__alloyId120);
    $.__views.__alloyId121 = Ti.UI.createButton({
        right: 10,
        style: Ti.UI.iPhone.SystemButton.CONTACT_ADD,
        id: "__alloyId121"
    });
    $.__views.__alloyId119.add($.__views.__alloyId121);
    AddRowButtonClicked ? $.__views.__alloyId121.addEventListener("click", AddRowButtonClicked) : __defers["$.__views.__alloyId121!click!AddRowButtonClicked"] = true;
    $.__views.__alloyId122 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        id: "__alloyId122"
    });
    __alloyId111.push($.__views.__alloyId122);
    $.__views.__alloyId123 = Ti.UI.createLabel({
        left: "5%",
        width: "22%",
        font: {
            fontSize: "15"
        },
        color: "#2279bc",
        bubbleParent: false,
        text: "Primary",
        id: "__alloyId123"
    });
    $.__views.__alloyId122.add($.__views.__alloyId123);
    $.__views.primary_email = Ti.UI.createLabel({
        left: "29%",
        width: "42%",
        font: {
            fontSize: "15"
        },
        bubbleParent: false,
        color: "#C8C8C8",
        id: "primary_email",
        hintText: "Email address",
        keyboardType: Ti.UI.KEYBOARD_EMAIL
    });
    $.__views.__alloyId122.add($.__views.primary_email);
    ValueLabelClicked ? $.__views.primary_email.addEventListener("click", ValueLabelClicked) : __defers["$.__views.primary_email!click!ValueLabelClicked"] = true;
    $.__views.primary_email_privacy = Ti.UI.createLabel({
        left: "73%",
        width: "22%",
        font: {
            fontSize: "15"
        },
        bubbleParent: false,
        text: "Default",
        id: "primary_email_privacy"
    });
    $.__views.__alloyId122.add($.__views.primary_email_privacy);
    PrivacyLabelClicked ? $.__views.primary_email_privacy.addEventListener("click", PrivacyLabelClicked) : __defers["$.__views.primary_email_privacy!click!PrivacyLabelClicked"] = true;
    $.__views.__alloyId124 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        backgroundColor: "#D0D0D0",
        id: "__alloyId124"
    });
    __alloyId111.push($.__views.__alloyId124);
    $.__views.__alloyId125 = Ti.UI.createTableViewRow({
        editable: false,
        height: Ti.UI.SIZE,
        top: 20,
        isPhone: "0",
        isSocial: "1",
        id: "__alloyId125"
    });
    __alloyId111.push($.__views.__alloyId125);
    $.__views.__alloyId126 = Ti.UI.createLabel({
        left: 10,
        font: {
            fontSize: "17"
        },
        color: "#2279bc",
        text: "Social Links",
        id: "__alloyId126"
    });
    $.__views.__alloyId125.add($.__views.__alloyId126);
    $.__views.__alloyId127 = Ti.UI.createButton({
        right: 10,
        style: Ti.UI.iPhone.SystemButton.CONTACT_ADD,
        id: "__alloyId127"
    });
    $.__views.__alloyId125.add($.__views.__alloyId127);
    AddRowButtonClicked ? $.__views.__alloyId127.addEventListener("click", AddRowButtonClicked) : __defers["$.__views.__alloyId127!click!AddRowButtonClicked"] = true;
    $.__views.__alloyId128 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        backgroundColor: "#D0D0D0",
        id: "__alloyId128"
    });
    __alloyId111.push($.__views.__alloyId128);
    $.__views.__alloyId129 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        id: "__alloyId129"
    });
    __alloyId111.push($.__views.__alloyId129);
    $.__views.__alloyId130 = Ti.UI.createLabel({
        left: "5%",
        width: "22%",
        font: {
            fontSize: "15"
        },
        color: "#2279bc",
        bubbleParent: false,
        text: "Skype Name",
        id: "__alloyId130"
    });
    $.__views.__alloyId129.add($.__views.__alloyId130);
    $.__views.skype_name = Ti.UI.createLabel({
        left: "29%",
        width: "42%",
        font: {
            fontSize: "15"
        },
        bubbleParent: false,
        color: "#C8C8C8",
        text: "Skype Name",
        id: "skype_name",
        hintText: "Skype Name"
    });
    $.__views.__alloyId129.add($.__views.skype_name);
    ValueLabelClicked ? $.__views.skype_name.addEventListener("click", ValueLabelClicked) : __defers["$.__views.skype_name!click!ValueLabelClicked"] = true;
    $.__views.skype_name_privacy = Ti.UI.createLabel({
        left: "73%",
        width: "22%",
        font: {
            fontSize: "15"
        },
        bubbleParent: false,
        text: "Default",
        id: "skype_name_privacy"
    });
    $.__views.__alloyId129.add($.__views.skype_name_privacy);
    PrivacyLabelClicked ? $.__views.skype_name_privacy.addEventListener("click", PrivacyLabelClicked) : __defers["$.__views.skype_name_privacy!click!PrivacyLabelClicked"] = true;
    $.__views.__alloyId131 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        backgroundColor: "#D0D0D0",
        id: "__alloyId131"
    });
    __alloyId111.push($.__views.__alloyId131);
    $.__views.__alloyId132 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        id: "__alloyId132"
    });
    __alloyId111.push($.__views.__alloyId132);
    $.__views.__alloyId133 = Ti.UI.createLabel({
        left: "5%",
        width: "22%",
        font: {
            fontSize: "15"
        },
        color: "#2279bc",
        bubbleParent: false,
        text: "BBM Pin",
        id: "__alloyId133"
    });
    $.__views.__alloyId132.add($.__views.__alloyId133);
    $.__views.bbm_pin = Ti.UI.createLabel({
        left: "29%",
        width: "42%",
        font: {
            fontSize: "15"
        },
        bubbleParent: false,
        color: "#C8C8C8",
        text: "BBM Pin",
        id: "bbm_pin",
        hintText: "BBM Pin"
    });
    $.__views.__alloyId132.add($.__views.bbm_pin);
    ValueLabelClicked ? $.__views.bbm_pin.addEventListener("click", ValueLabelClicked) : __defers["$.__views.bbm_pin!click!ValueLabelClicked"] = true;
    $.__views.bbm_pin_privacy = Ti.UI.createLabel({
        left: "73%",
        width: "22%",
        font: {
            fontSize: "15"
        },
        bubbleParent: false,
        text: "Default",
        id: "bbm_pin_privacy"
    });
    $.__views.__alloyId132.add($.__views.bbm_pin_privacy);
    PrivacyLabelClicked ? $.__views.bbm_pin_privacy.addEventListener("click", PrivacyLabelClicked) : __defers["$.__views.bbm_pin_privacy!click!PrivacyLabelClicked"] = true;
    $.__views.__alloyId134 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        backgroundColor: "#D0D0D0",
        id: "__alloyId134"
    });
    __alloyId111.push($.__views.__alloyId134);
    $.__views.tableView = Ti.UI.createTableView({
        bottom: 0,
        data: __alloyId111,
        id: "tableView"
    });
    $.__views.tableView && $.addTopLevelView($.__views.tableView);
    TableViewRowClicked ? $.__views.tableView.addEventListener("click", TableViewRowClicked) : __defers["$.__views.tableView!click!TableViewRowClicked"] = true;
    DeletePressed ? $.__views.tableView.addEventListener("delete", DeletePressed) : __defers["$.__views.tableView!delete!DeletePressed"] = true;
    $.__views.editViewContainer = Alloy.createController("Settings/EditProfile/editFieldView", {
        id: "editViewContainer",
        __parentSymbol: __parentSymbol
    });
    $.__views.editViewContainer && $.addTopLevelView($.__views.editViewContainer);
    $.__views.pickerContainer = Alloy.createController("Settings/EditProfile/privacyPicker", {
        id: "pickerContainer",
        __parentSymbol: __parentSymbol
    });
    $.__views.pickerContainer && $.addTopLevelView($.__views.pickerContainer);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("/editProfileHelper.js");
    userDataInArrays = convertAddableFieldsToArrays(userData);
    var addNewRowFlag = false;
    var addableTextOldValue = "";
    var clickedPrivacyLabel;
    var privacyIndex = {
        "public": 0,
        friends: 1,
        favorites: 2,
        onlyMe: 3
    };
    var clickedTextField;
    var rows = $.tableView.sections[0].rows;
    for (var i = 0; i < rows.length; i++) {
        var children = rows[i].children;
        for (var j = 0; j < children.length; j++) switch (children[j].id) {
          case "primary_mobile":
          case "primary_email":
          case "skype_name":
          case "bbm_pin":
          case "primary_mobile_privacy":
          case "primary_email_privacy":
          case "skype_name_privacy":
          case "bbm_pin_privacy":
            if ("" != userData[children[j].id] && null != userData[children[j].id]) {
                children[j].text = userData[children[j].id];
                children[j].color = "black";
            }
        }
    }
    for (var i = userDataInArrays.social_links.length - 1; i >= 0; i--) {
        var data = createBindingRowData(userDataInArrays.social_links[i], userDataInArrays.social_links_privacy[i], false, true);
        AddNewRowAfter(data, 8);
    }
    for (var i = userDataInArrays.mails.length - 1; i >= 0; i--) {
        var data = createBindingRowData(userDataInArrays.mails[i], userDataInArrays.mails_privacy[i], false);
        AddNewRowAfter(data, 5);
    }
    for (var i = userDataInArrays.phone_numbers.length - 1; i >= 0; i--) {
        var data = createBindingRowData(userDataInArrays.phone_numbers[i], userDataInArrays.phone_numbers_privacy[i], true);
        AddNewRowAfter(data, 2);
    }
    $.pickerContainer.picker.addEventListener("change", SelectedPrivacyChanged);
    $.pickerContainer.transparentView1.addEventListener("click", DismissPicker);
    $.pickerContainer.btn_toolBarDone.addEventListener("click", DismissPicker);
    $.editViewContainer.cancelView1.addEventListener("click", EditViewBlur);
    $.editViewContainer.cancelView2.addEventListener("click", EditViewBlur);
    $.editViewContainer.fieldValue.addEventListener("return", EditViewBlur);
    $.editViewContainer.fieldValue.addEventListener("change", EditViewTextChanged);
    __defers["$.__views.__alloyId115!click!AddRowButtonClicked"] && $.__views.__alloyId115.addEventListener("click", AddRowButtonClicked);
    __defers["$.__views.primary_mobile!longclick!PrimaryPhoneTextLongclick"] && $.__views.primary_mobile.addEventListener("longclick", PrimaryPhoneTextLongclick);
    __defers["$.__views.primary_mobile_privacy!click!PrivacyLabelClicked"] && $.__views.primary_mobile_privacy.addEventListener("click", PrivacyLabelClicked);
    __defers["$.__views.__alloyId121!click!AddRowButtonClicked"] && $.__views.__alloyId121.addEventListener("click", AddRowButtonClicked);
    __defers["$.__views.primary_email!click!ValueLabelClicked"] && $.__views.primary_email.addEventListener("click", ValueLabelClicked);
    __defers["$.__views.primary_email_privacy!click!PrivacyLabelClicked"] && $.__views.primary_email_privacy.addEventListener("click", PrivacyLabelClicked);
    __defers["$.__views.__alloyId127!click!AddRowButtonClicked"] && $.__views.__alloyId127.addEventListener("click", AddRowButtonClicked);
    __defers["$.__views.skype_name!click!ValueLabelClicked"] && $.__views.skype_name.addEventListener("click", ValueLabelClicked);
    __defers["$.__views.skype_name_privacy!click!PrivacyLabelClicked"] && $.__views.skype_name_privacy.addEventListener("click", PrivacyLabelClicked);
    __defers["$.__views.bbm_pin!click!ValueLabelClicked"] && $.__views.bbm_pin.addEventListener("click", ValueLabelClicked);
    __defers["$.__views.bbm_pin_privacy!click!PrivacyLabelClicked"] && $.__views.bbm_pin_privacy.addEventListener("click", PrivacyLabelClicked);
    __defers["$.__views.tableView!click!TableViewRowClicked"] && $.__views.tableView.addEventListener("click", TableViewRowClicked);
    __defers["$.__views.tableView!delete!DeletePressed"] && $.__views.tableView.addEventListener("delete", DeletePressed);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;