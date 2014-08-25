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
        $.tableView.appendRow(Ti.UI.createTableViewRow());
        $.tableView.deleteRow($.tableView.sections[0].rows.length - 1);
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
        if (true && "                                             " == newPrivacy) {
            $.pickerContainer.picker.setSelectedRow(0, 3);
            var newPrivacy = $.pickerContainer.picker.getSelectedRow(0).title;
        }
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
        var removeIcon = Ti.UI.createImageView();
        removeIcon.addEventListener("click", function() {
            androidDeleteRowFlag = true;
        });
        $.addClass(removeIcon, "removeRowImage");
        newRow.add(removeIcon);
        data.HintTextOfField.search("facebook") >= 0 && rowNum--;
        $.tableView.insertRowAfter(rowNum, newRow, {
            animated: true
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Settings/EditProfile/contactInfoWin";
    if (arguments[0]) {
        var __parentSymbol = __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    var __alloyId132 = [];
    $.__views.__alloyId133 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        backgroundColor: "#D0D0D0",
        id: "__alloyId133"
    });
    __alloyId132.push($.__views.__alloyId133);
    $.__views.__alloyId134 = Ti.UI.createTableViewRow({
        editable: false,
        height: Ti.UI.SIZE,
        top: 20,
        isPhone: "1",
        id: "__alloyId134"
    });
    __alloyId132.push($.__views.__alloyId134);
    $.__views.__alloyId135 = Ti.UI.createLabel({
        left: 10,
        font: {
            fontSize: "17"
        },
        color: "#2279bc",
        text: "Phone Numbers",
        id: "__alloyId135"
    });
    $.__views.__alloyId134.add($.__views.__alloyId135);
    $.__views.__alloyId136 = Ti.UI.createImageView({
        right: 10,
        width: 22,
        height: 22,
        image: "/images/addIcon-44x44.png",
        id: "__alloyId136"
    });
    $.__views.__alloyId134.add($.__views.__alloyId136);
    AddRowButtonClicked ? $.__views.__alloyId136.addEventListener("click", AddRowButtonClicked) : __defers["$.__views.__alloyId136!click!AddRowButtonClicked"] = true;
    $.__views.__alloyId137 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        id: "__alloyId137"
    });
    __alloyId132.push($.__views.__alloyId137);
    $.__views.__alloyId138 = Ti.UI.createLabel({
        left: "5%",
        width: "20%",
        font: {
            fontSize: "15"
        },
        color: "#2279bc",
        bubbleParent: false,
        text: "Primary",
        id: "__alloyId138"
    });
    $.__views.__alloyId137.add($.__views.__alloyId138);
    $.__views.primary_mobile = Ti.UI.createLabel({
        left: "25%",
        width: "42%",
        font: {
            fontSize: "15"
        },
        bubbleParent: false,
        color: "#C8C8C8",
        id: "primary_mobile"
    });
    $.__views.__alloyId137.add($.__views.primary_mobile);
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
    $.__views.__alloyId137.add($.__views.primary_mobile_privacy);
    PrivacyLabelClicked ? $.__views.primary_mobile_privacy.addEventListener("click", PrivacyLabelClicked) : __defers["$.__views.primary_mobile_privacy!click!PrivacyLabelClicked"] = true;
    $.__views.__alloyId139 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        backgroundColor: "#D0D0D0",
        id: "__alloyId139"
    });
    __alloyId132.push($.__views.__alloyId139);
    $.__views.__alloyId140 = Ti.UI.createTableViewRow({
        editable: false,
        height: Ti.UI.SIZE,
        top: 20,
        isPhone: "0",
        id: "__alloyId140"
    });
    __alloyId132.push($.__views.__alloyId140);
    $.__views.__alloyId141 = Ti.UI.createLabel({
        left: 10,
        font: {
            fontSize: "17"
        },
        color: "#2279bc",
        text: "Email Addresses",
        id: "__alloyId141"
    });
    $.__views.__alloyId140.add($.__views.__alloyId141);
    $.__views.__alloyId142 = Ti.UI.createImageView({
        right: 10,
        width: 22,
        height: 22,
        image: "/images/addIcon-44x44.png",
        id: "__alloyId142"
    });
    $.__views.__alloyId140.add($.__views.__alloyId142);
    AddRowButtonClicked ? $.__views.__alloyId142.addEventListener("click", AddRowButtonClicked) : __defers["$.__views.__alloyId142!click!AddRowButtonClicked"] = true;
    $.__views.__alloyId143 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        id: "__alloyId143"
    });
    __alloyId132.push($.__views.__alloyId143);
    $.__views.__alloyId144 = Ti.UI.createLabel({
        left: "5%",
        width: "20%",
        font: {
            fontSize: "15"
        },
        color: "#2279bc",
        bubbleParent: false,
        text: "Primary",
        id: "__alloyId144"
    });
    $.__views.__alloyId143.add($.__views.__alloyId144);
    $.__views.primary_email = Ti.UI.createLabel({
        left: "25%",
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
    $.__views.__alloyId143.add($.__views.primary_email);
    ValueLabelClicked ? $.__views.primary_email.addEventListener("click", ValueLabelClicked) : __defers["$.__views.primary_email!click!ValueLabelClicked"] = true;
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
    $.__views.__alloyId143.add($.__views.primary_email_privacy);
    PrivacyLabelClicked ? $.__views.primary_email_privacy.addEventListener("click", PrivacyLabelClicked) : __defers["$.__views.primary_email_privacy!click!PrivacyLabelClicked"] = true;
    $.__views.__alloyId145 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        backgroundColor: "#D0D0D0",
        id: "__alloyId145"
    });
    __alloyId132.push($.__views.__alloyId145);
    $.__views.__alloyId146 = Ti.UI.createTableViewRow({
        editable: false,
        height: Ti.UI.SIZE,
        top: 20,
        isPhone: "0",
        isSocial: "1",
        id: "__alloyId146"
    });
    __alloyId132.push($.__views.__alloyId146);
    $.__views.__alloyId147 = Ti.UI.createLabel({
        left: 10,
        font: {
            fontSize: "17"
        },
        color: "#2279bc",
        text: "Social Links",
        id: "__alloyId147"
    });
    $.__views.__alloyId146.add($.__views.__alloyId147);
    $.__views.__alloyId148 = Ti.UI.createImageView({
        right: 10,
        width: 22,
        height: 22,
        image: "/images/addIcon-44x44.png",
        id: "__alloyId148"
    });
    $.__views.__alloyId146.add($.__views.__alloyId148);
    AddRowButtonClicked ? $.__views.__alloyId148.addEventListener("click", AddRowButtonClicked) : __defers["$.__views.__alloyId148!click!AddRowButtonClicked"] = true;
    $.__views.__alloyId149 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        backgroundColor: "#D0D0D0",
        id: "__alloyId149"
    });
    __alloyId132.push($.__views.__alloyId149);
    $.__views.__alloyId150 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        id: "__alloyId150"
    });
    __alloyId132.push($.__views.__alloyId150);
    $.__views.__alloyId151 = Ti.UI.createLabel({
        left: "5%",
        width: "20%",
        font: {
            fontSize: "15"
        },
        color: "#2279bc",
        bubbleParent: false,
        text: "Skype Name",
        id: "__alloyId151"
    });
    $.__views.__alloyId150.add($.__views.__alloyId151);
    $.__views.skype_name = Ti.UI.createLabel({
        left: "25%",
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
    $.__views.__alloyId150.add($.__views.skype_name);
    ValueLabelClicked ? $.__views.skype_name.addEventListener("click", ValueLabelClicked) : __defers["$.__views.skype_name!click!ValueLabelClicked"] = true;
    $.__views.skype_name_privacy = Ti.UI.createLabel({
        left: "71%",
        width: "20%",
        font: {
            fontSize: "15"
        },
        bubbleParent: false,
        color: "black",
        text: "Default",
        id: "skype_name_privacy"
    });
    $.__views.__alloyId150.add($.__views.skype_name_privacy);
    PrivacyLabelClicked ? $.__views.skype_name_privacy.addEventListener("click", PrivacyLabelClicked) : __defers["$.__views.skype_name_privacy!click!PrivacyLabelClicked"] = true;
    $.__views.__alloyId152 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        backgroundColor: "#D0D0D0",
        id: "__alloyId152"
    });
    __alloyId132.push($.__views.__alloyId152);
    $.__views.__alloyId153 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        id: "__alloyId153"
    });
    __alloyId132.push($.__views.__alloyId153);
    $.__views.__alloyId154 = Ti.UI.createLabel({
        left: "5%",
        width: "20%",
        font: {
            fontSize: "15"
        },
        color: "#2279bc",
        bubbleParent: false,
        text: "BBM Pin",
        id: "__alloyId154"
    });
    $.__views.__alloyId153.add($.__views.__alloyId154);
    $.__views.bbm_pin = Ti.UI.createLabel({
        left: "25%",
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
    $.__views.__alloyId153.add($.__views.bbm_pin);
    ValueLabelClicked ? $.__views.bbm_pin.addEventListener("click", ValueLabelClicked) : __defers["$.__views.bbm_pin!click!ValueLabelClicked"] = true;
    $.__views.bbm_pin_privacy = Ti.UI.createLabel({
        left: "71%",
        width: "20%",
        font: {
            fontSize: "15"
        },
        bubbleParent: false,
        color: "black",
        text: "Default",
        id: "bbm_pin_privacy"
    });
    $.__views.__alloyId153.add($.__views.bbm_pin_privacy);
    PrivacyLabelClicked ? $.__views.bbm_pin_privacy.addEventListener("click", PrivacyLabelClicked) : __defers["$.__views.bbm_pin_privacy!click!PrivacyLabelClicked"] = true;
    $.__views.__alloyId155 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        backgroundColor: "#D0D0D0",
        id: "__alloyId155"
    });
    __alloyId132.push($.__views.__alloyId155);
    $.__views.tableView = Ti.UI.createTableView({
        bottom: 0,
        data: __alloyId132,
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
    var androidDeleteRowFlag = false;
    var rows = $.tableView.sections[0].rows;
    for (var i = 0; rows.length > i; i++) {
        var children = rows[i].children;
        for (var j = 0; children.length > j; j++) switch (children[j].id) {
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
    $.pickerContainer.transparentView2.addEventListener("click", DismissPicker);
    $.editViewContainer.cancelView1.addEventListener("click", EditViewBlur);
    $.editViewContainer.cancelView2.addEventListener("click", EditViewBlur);
    $.editViewContainer.fieldValue.addEventListener("return", EditViewBlur);
    $.editViewContainer.fieldValue.addEventListener("change", EditViewTextChanged);
    __defers["$.__views.__alloyId136!click!AddRowButtonClicked"] && $.__views.__alloyId136.addEventListener("click", AddRowButtonClicked);
    __defers["$.__views.primary_mobile!longclick!PrimaryPhoneTextLongclick"] && $.__views.primary_mobile.addEventListener("longclick", PrimaryPhoneTextLongclick);
    __defers["$.__views.primary_mobile_privacy!click!PrivacyLabelClicked"] && $.__views.primary_mobile_privacy.addEventListener("click", PrivacyLabelClicked);
    __defers["$.__views.__alloyId142!click!AddRowButtonClicked"] && $.__views.__alloyId142.addEventListener("click", AddRowButtonClicked);
    __defers["$.__views.primary_email!click!ValueLabelClicked"] && $.__views.primary_email.addEventListener("click", ValueLabelClicked);
    __defers["$.__views.primary_email_privacy!click!PrivacyLabelClicked"] && $.__views.primary_email_privacy.addEventListener("click", PrivacyLabelClicked);
    __defers["$.__views.__alloyId148!click!AddRowButtonClicked"] && $.__views.__alloyId148.addEventListener("click", AddRowButtonClicked);
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