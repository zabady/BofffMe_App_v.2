function Controller() {
    function createBindingRowData(fieldValue, privacy, isPhone) {
        var data = {
            TextOfFieldTitle: isPhone ? "Phone" : "Email",
            HintTextOfField: isPhone ? "Phone number" : "Email address",
            FieldType: isPhone ? "phone_numbers" : "mails",
            KeyboardType: isPhone ? Ti.UI.KEYBOARD_DECIMAL_PAD : Ti.UI.KEYBOARD_EMAIL,
            KeyboardToolbar: isPhone ? $.keyboardToolbar : null,
            TextOfField: fieldValue,
            TextOfPrivacy: privacy
        };
        return data;
    }
    function AddRowButtonClicked() {
        addNewRow = true;
    }
    function TableViewRowClicked(e) {
        if (addNewRow) {
            addNewFieldToUserData(userDataInArrays, e.row.isPhone > 0 ? "phone_numbers" : "mails");
            var data = createBindingRowData("", "public", e.row.isPhone > 0);
            addNewRowAfter(data, e.index + 1);
            addNewRow = false;
        } else if (true && androidDeleteRowFlag) {
            DeletePressed({
                source: {
                    fieldType: e.row.fieldType,
                    fieldValue: e.row.fieldValue
                }
            });
            $.tableView.deleteRow(e.index);
            androidDeleteRowFlag = false;
        }
    }
    function DeletePressed(e) {
        deleteAddableField(userDataInArrays, e.source.fieldType, e.source.fieldValue);
    }
    function PrimaryPhoneTextLongclick() {
        alert("How will we allow the user to change primary phone ?\nMaybe with FTR.");
    }
    function TextFieldFocused(e) {
        e.source.blur();
        $.androidEditView.visible = true;
        $.fieldTitle.text = "Type " + e.source.hintText;
        $.fieldValue.hintText = e.source.hintText;
        $.fieldValue.value = e.source.value;
        $.fieldValue.keyboardType = e.source.keyboardType;
        e.source.fieldType && (addableTextOldValue = e.source.value);
        clickedTextField = e.source;
    }
    function AndroidEditViewTextChanged() {
        clickedTextField.value = $.fieldValue.value;
    }
    function AndroidEditViewBlur() {
        $.androidEditView.visible = false;
    }
    function NonAddableTextChanged(e) {
        changeValueOfNonAddableField(userDataInArrays, e.source.id, e.source.value);
    }
    function AddableTextChanged(e) {
        changeValueOfAddableField(userDataInArrays, e.source.fieldType, addableTextOldValue, e.source.value);
        addableTextOldValue = e.source.value;
    }
    function PrivacyLabelClicked(e) {
        DismissKeyboardClicked();
        clickedPrivacyLabel = e.source;
    }
    function DismissKeyboardClicked() {
        clickedTextField && clickedTextField.blur();
    }
    function addNewRowAfter(data, rowNum) {
        var fieldTitleLabel = Ti.UI.createLabel({
            text: data.TextOfFieldTitle
        });
        $.addClass(fieldTitleLabel, "fieldTitleLabel");
        var fieldTextField = Ti.UI.createTextField({
            value: data.TextOfField,
            hintText: data.HintTextOfField,
            fieldType: data.FieldType,
            keyboardType: data.KeyboardType,
            keyboardToolbar: data.KeyboardToolbar
        });
        fieldTextField.addEventListener("change", AddableTextChanged);
        fieldTextField.addEventListener("focus", TextFieldFocused);
        $.addClass(fieldTextField, "fieldText");
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
        var removeIcon = Ti.UI.createImageView();
        removeIcon.addEventListener("click", function() {
            androidDeleteRowFlag = true;
        });
        $.addClass(removeIcon, "removeRowImage");
        newRow.add(removeIcon);
        $.tableView.insertRowAfter(rowNum, newRow, {
            animated: true
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Settings/EditProfile/contactInfoWin";
    {
        arguments[0] ? arguments[0]["__parentSymbol"] : null;
    }
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    var __alloyId105 = [];
    $.__views.__alloyId106 = Ti.UI.createTableViewRow({
        editable: false,
        height: Ti.UI.SIZE,
        top: 20,
        isPhone: "1",
        id: "__alloyId106"
    });
    __alloyId105.push($.__views.__alloyId106);
    $.__views.__alloyId107 = Ti.UI.createLabel({
        left: 10,
        font: {
            fontSize: "17"
        },
        color: "#2279bc",
        text: "Phone Numbers",
        id: "__alloyId107"
    });
    $.__views.__alloyId106.add($.__views.__alloyId107);
    $.__views.__alloyId109 = Ti.UI.createImageView({
        right: 10,
        width: 22,
        height: 22,
        image: "/images/addIcon-44x44.png",
        id: "__alloyId109"
    });
    $.__views.__alloyId106.add($.__views.__alloyId109);
    AddRowButtonClicked ? $.__views.__alloyId109.addEventListener("click", AddRowButtonClicked) : __defers["$.__views.__alloyId109!click!AddRowButtonClicked"] = true;
    $.__views.__alloyId110 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        id: "__alloyId110"
    });
    __alloyId105.push($.__views.__alloyId110);
    $.__views.__alloyId111 = Ti.UI.createLabel({
        left: "5%",
        width: "20%",
        font: {
            fontSize: "15"
        },
        color: "#2279bc",
        bubbleParent: false,
        text: "Priamry",
        id: "__alloyId111"
    });
    $.__views.__alloyId110.add($.__views.__alloyId111);
    $.__views.primary_mobile = Ti.UI.createTextField({
        left: "27%",
        width: "42%",
        font: {
            fontSize: "15"
        },
        bubbleParent: false,
        color: "white",
        id: "primary_mobile",
        editable: "false"
    });
    $.__views.__alloyId110.add($.__views.primary_mobile);
    PrimaryPhoneTextLongclick ? $.__views.primary_mobile.addEventListener("longclick", PrimaryPhoneTextLongclick) : __defers["$.__views.primary_mobile!longclick!PrimaryPhoneTextLongclick"] = true;
    $.__views.primary_mobile_privacy = Ti.UI.createLabel({
        left: "71%",
        width: "20%",
        font: {
            fontSize: "15"
        },
        bubbleParent: false,
        color: "black",
        text: "Default",
        id: "primary_mobile_privacy"
    });
    $.__views.__alloyId110.add($.__views.primary_mobile_privacy);
    PrivacyLabelClicked ? $.__views.primary_mobile_privacy.addEventListener("click", PrivacyLabelClicked) : __defers["$.__views.primary_mobile_privacy!click!PrivacyLabelClicked"] = true;
    $.__views.__alloyId112 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        backgroundColor: "#D0D0D0",
        id: "__alloyId112"
    });
    __alloyId105.push($.__views.__alloyId112);
    $.__views.__alloyId113 = Ti.UI.createTableViewRow({
        editable: false,
        height: Ti.UI.SIZE,
        top: 20,
        isPhone: "0",
        id: "__alloyId113"
    });
    __alloyId105.push($.__views.__alloyId113);
    $.__views.__alloyId114 = Ti.UI.createLabel({
        left: 10,
        font: {
            fontSize: "17"
        },
        color: "#2279bc",
        text: "Email Addresses",
        id: "__alloyId114"
    });
    $.__views.__alloyId113.add($.__views.__alloyId114);
    $.__views.__alloyId116 = Ti.UI.createImageView({
        right: 10,
        width: 22,
        height: 22,
        image: "/images/addIcon-44x44.png",
        id: "__alloyId116"
    });
    $.__views.__alloyId113.add($.__views.__alloyId116);
    AddRowButtonClicked ? $.__views.__alloyId116.addEventListener("click", AddRowButtonClicked) : __defers["$.__views.__alloyId116!click!AddRowButtonClicked"] = true;
    $.__views.__alloyId117 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        id: "__alloyId117"
    });
    __alloyId105.push($.__views.__alloyId117);
    $.__views.__alloyId118 = Ti.UI.createLabel({
        left: "5%",
        width: "20%",
        font: {
            fontSize: "15"
        },
        color: "#2279bc",
        bubbleParent: false,
        text: "Priamry",
        id: "__alloyId118"
    });
    $.__views.__alloyId117.add($.__views.__alloyId118);
    $.__views.primary_email = Ti.UI.createTextField({
        left: "27%",
        width: "42%",
        font: {
            fontSize: "15"
        },
        bubbleParent: false,
        color: "white",
        id: "primary_email",
        hintText: "Email address",
        keyboardType: Ti.UI.KEYBOARD_EMAIL
    });
    $.__views.__alloyId117.add($.__views.primary_email);
    NonAddableTextChanged ? $.__views.primary_email.addEventListener("change", NonAddableTextChanged) : __defers["$.__views.primary_email!change!NonAddableTextChanged"] = true;
    TextFieldFocused ? $.__views.primary_email.addEventListener("focus", TextFieldFocused) : __defers["$.__views.primary_email!focus!TextFieldFocused"] = true;
    $.__views.primary_email_privacy = Ti.UI.createLabel({
        left: "71%",
        width: "20%",
        font: {
            fontSize: "15"
        },
        bubbleParent: false,
        color: "black",
        text: "Default",
        id: "primary_email_privacy"
    });
    $.__views.__alloyId117.add($.__views.primary_email_privacy);
    PrivacyLabelClicked ? $.__views.primary_email_privacy.addEventListener("click", PrivacyLabelClicked) : __defers["$.__views.primary_email_privacy!click!PrivacyLabelClicked"] = true;
    $.__views.__alloyId119 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        backgroundColor: "#D0D0D0",
        id: "__alloyId119"
    });
    __alloyId105.push($.__views.__alloyId119);
    $.__views.__alloyId120 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        id: "__alloyId120"
    });
    __alloyId105.push($.__views.__alloyId120);
    $.__views.__alloyId121 = Ti.UI.createLabel({
        left: "5%",
        width: "20%",
        font: {
            fontSize: "15"
        },
        color: "#2279bc",
        bubbleParent: false,
        text: "Skype Name",
        id: "__alloyId121"
    });
    $.__views.__alloyId120.add($.__views.__alloyId121);
    $.__views.skype = Ti.UI.createTextField({
        left: "27%",
        width: "42%",
        font: {
            fontSize: "15"
        },
        bubbleParent: false,
        color: "white",
        id: "skype",
        hintText: "Skype name"
    });
    $.__views.__alloyId120.add($.__views.skype);
    $.__views.skype_privacy = Ti.UI.createLabel({
        left: "71%",
        width: "20%",
        font: {
            fontSize: "15"
        },
        bubbleParent: false,
        color: "black",
        text: "Default",
        id: "skype_privacy"
    });
    $.__views.__alloyId120.add($.__views.skype_privacy);
    $.__views.__alloyId122 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        backgroundColor: "#D0D0D0",
        id: "__alloyId122"
    });
    __alloyId105.push($.__views.__alloyId122);
    $.__views.__alloyId123 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        id: "__alloyId123"
    });
    __alloyId105.push($.__views.__alloyId123);
    $.__views.__alloyId124 = Ti.UI.createLabel({
        left: "5%",
        width: "20%",
        font: {
            fontSize: "15"
        },
        color: "#2279bc",
        bubbleParent: false,
        text: "BBM Pin",
        id: "__alloyId124"
    });
    $.__views.__alloyId123.add($.__views.__alloyId124);
    $.__views.bbm = Ti.UI.createTextField({
        left: "27%",
        width: "42%",
        font: {
            fontSize: "15"
        },
        bubbleParent: false,
        color: "white",
        id: "bbm",
        hintText: "BBM Pin Number"
    });
    $.__views.__alloyId123.add($.__views.bbm);
    $.__views.bbm_privacy = Ti.UI.createLabel({
        left: "71%",
        width: "20%",
        font: {
            fontSize: "15"
        },
        bubbleParent: false,
        color: "black",
        text: "Default",
        id: "bbm_privacy"
    });
    $.__views.__alloyId123.add($.__views.bbm_privacy);
    $.__views.tableView = Ti.UI.createTableView({
        bottom: 0,
        data: __alloyId105,
        id: "tableView"
    });
    $.__views.tableView && $.addTopLevelView($.__views.tableView);
    TableViewRowClicked ? $.__views.tableView.addEventListener("click", TableViewRowClicked) : __defers["$.__views.tableView!click!TableViewRowClicked"] = true;
    DeletePressed ? $.__views.tableView.addEventListener("delete", DeletePressed) : __defers["$.__views.tableView!delete!DeletePressed"] = true;
    $.__views.androidEditView = Ti.UI.createView({
        id: "androidEditView",
        visible: "false",
        height: "100%",
        layout: "vertical"
    });
    $.__views.androidEditView && $.addTopLevelView($.__views.androidEditView);
    $.__views.__alloyId125 = Ti.UI.createView({
        opacity: "0.4",
        height: "25%",
        backgroundColor: "black",
        id: "__alloyId125"
    });
    $.__views.androidEditView.add($.__views.__alloyId125);
    AndroidEditViewBlur ? $.__views.__alloyId125.addEventListener("click", AndroidEditViewBlur) : __defers["$.__views.__alloyId125!click!AndroidEditViewBlur"] = true;
    $.__views.__alloyId126 = Ti.UI.createView({
        layout: "vertical",
        backgroundColor: "#58c8f3",
        height: Ti.UI.SIZE,
        softKeyboardOnFocus: Titanium.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS,
        id: "__alloyId126"
    });
    $.__views.androidEditView.add($.__views.__alloyId126);
    $.__views.fieldTitle = Ti.UI.createLabel({
        font: {
            fontSize: 20,
            fontWeight: "bold"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        color: "white",
        bubbleParent: false,
        height: 60,
        width: "100%",
        returnKeyType: Titanium.UI.RETURNKEY_DONE,
        id: "fieldTitle"
    });
    $.__views.__alloyId126.add($.__views.fieldTitle);
    $.__views.fieldValue = Ti.UI.createTextField({
        font: {
            fontSize: 20,
            fontWeight: "bold"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        color: "white",
        bubbleParent: false,
        height: 60,
        width: "100%",
        returnKeyType: Titanium.UI.RETURNKEY_DONE,
        id: "fieldValue",
        softKeyboardOnFocus: Titanium.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS
    });
    $.__views.__alloyId126.add($.__views.fieldValue);
    AndroidEditViewBlur ? $.__views.fieldValue.addEventListener("return", AndroidEditViewBlur) : __defers["$.__views.fieldValue!return!AndroidEditViewBlur"] = true;
    AndroidEditViewTextChanged ? $.__views.fieldValue.addEventListener("change", AndroidEditViewTextChanged) : __defers["$.__views.fieldValue!change!AndroidEditViewTextChanged"] = true;
    $.__views.__alloyId127 = Ti.UI.createView({
        opacity: "0.4",
        height: "60%",
        backgroundColor: "black",
        id: "__alloyId127"
    });
    $.__views.androidEditView.add($.__views.__alloyId127);
    AndroidEditViewBlur ? $.__views.__alloyId127.addEventListener("click", AndroidEditViewBlur) : __defers["$.__views.__alloyId127!click!AndroidEditViewBlur"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("/userDataProcessing.js");
    arguments[0] || {};
    userDataInArrays = convertAddableFieldsToArrays(userData);
    var rows = $.tableView.sections[0].rows;
    for (var i = 0; rows.length > i; i++) {
        var children = rows[i].children;
        for (var j = 0; children.length > j; j++) switch (children[j].id) {
          case "primary_mobile":
          case "primary_email":
            children[j].value = userData[children[j].id];
            break;

          case "primary_mobile_privacy":
          case "primary_email_privacy":
            children[j].text = userData[children[j].id];
        }
    }
    for (var i = userDataInArrays.mails.length - 1; i >= 0; i--) {
        var data = createBindingRowData(userDataInArrays.mails[i], userDataInArrays.mails_privacy[i], false);
        addNewRowAfter(data, 4);
    }
    for (var i = userDataInArrays.phone_numbers.length - 1; i >= 0; i--) {
        var data = createBindingRowData(userDataInArrays.phone_numbers[i], userDataInArrays.phone_numbers_privacy[i], true);
        addNewRowAfter(data, 1);
    }
    var addNewRow = false;
    var addableTextOldValue = "";
    var clickedPrivacyLabel;
    var clickedTextField;
    var androidDeleteRowFlag = false;
    __defers["$.__views.__alloyId108!click!AddRowButtonClicked"] && $.__views.__alloyId108.addEventListener("click", AddRowButtonClicked);
    __defers["$.__views.__alloyId109!click!AddRowButtonClicked"] && $.__views.__alloyId109.addEventListener("click", AddRowButtonClicked);
    __defers["$.__views.primary_mobile!longclick!PrimaryPhoneTextLongclick"] && $.__views.primary_mobile.addEventListener("longclick", PrimaryPhoneTextLongclick);
    __defers["$.__views.primary_mobile_privacy!click!PrivacyLabelClicked"] && $.__views.primary_mobile_privacy.addEventListener("click", PrivacyLabelClicked);
    __defers["$.__views.__alloyId115!click!AddRowButtonClicked"] && $.__views.__alloyId115.addEventListener("click", AddRowButtonClicked);
    __defers["$.__views.__alloyId116!click!AddRowButtonClicked"] && $.__views.__alloyId116.addEventListener("click", AddRowButtonClicked);
    __defers["$.__views.primary_email!change!NonAddableTextChanged"] && $.__views.primary_email.addEventListener("change", NonAddableTextChanged);
    __defers["$.__views.primary_email!focus!TextFieldFocused"] && $.__views.primary_email.addEventListener("focus", TextFieldFocused);
    __defers["$.__views.primary_email_privacy!click!PrivacyLabelClicked"] && $.__views.primary_email_privacy.addEventListener("click", PrivacyLabelClicked);
    __defers["$.__views.tableView!click!TableViewRowClicked"] && $.__views.tableView.addEventListener("click", TableViewRowClicked);
    __defers["$.__views.tableView!delete!DeletePressed"] && $.__views.tableView.addEventListener("delete", DeletePressed);
    __defers["$.__views.__alloyId125!click!AndroidEditViewBlur"] && $.__views.__alloyId125.addEventListener("click", AndroidEditViewBlur);
    __defers["$.__views.fieldValue!return!AndroidEditViewBlur"] && $.__views.fieldValue.addEventListener("return", AndroidEditViewBlur);
    __defers["$.__views.fieldValue!change!AndroidEditViewTextChanged"] && $.__views.fieldValue.addEventListener("change", AndroidEditViewTextChanged);
    __defers["$.__views.__alloyId127!click!AndroidEditViewBlur"] && $.__views.__alloyId127.addEventListener("click", AndroidEditViewBlur);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;