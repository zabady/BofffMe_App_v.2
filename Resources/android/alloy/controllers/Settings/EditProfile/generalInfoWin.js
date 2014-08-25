function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function createBindingRowData(fieldValue, privacy, isInterest) {
        var data = {
            TextOfFieldTitle: isInterest ? "Interest" : "Place",
            HintTextOfField: isInterest ? "eg. Playing Football" : "eg. Spectra Resturant",
            FieldType: isInterest ? "interests" : "favorite_places",
            TextOfField: fieldValue,
            TextOfPrivacy: privacy
        };
        return data;
    }
    function AddRowButtonClicked() {
        addNewRowFlag = true;
    }
    function DeletePressed(e) {
        deleteAddableField(userDataInArrays, e.source.fieldType, e.source.fieldValue);
    }
    function TableViewRowClicked(e) {
        if (addNewRowFlag) {
            addNewFieldToUserData(userDataInArrays, e.row.isInterest > 0 ? "interests" : "favorite_places");
            var data = createBindingRowData("", "friends", e.row.isInterest > 0);
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
    function BirthDay(e) {
        var dateArray = [];
        dateArray[0] = e.source.value.getDate();
        dateArray[1] = e.source.value.getMonth() + 1;
        dateArray[2] = e.source.value.getFullYear();
        var date = dateArray.join("/");
        date != userDataInArrays.birthday_date && (userDataInArrays.birthday_date = date);
    }
    function GenderSelected(e) {
        if ("img_gender_male" == e.source.id) {
            $.lbl_gender_male.font = {
                fontSize: "20"
            };
            $.lbl_gender_female.font = {
                fontSize: "17"
            };
            $.lbl_gender_male.color = "#2279bc";
            $.lbl_gender_female.color = "gray";
            $.img_gender_male.image = "/images/gender_male.png";
            $.img_gender_female.image = "/images/gender_female[shaded].png";
            userDataInArrays.gender = "Male";
        } else {
            $.lbl_gender_male.font = {
                fontSize: "17"
            };
            $.lbl_gender_female.font = {
                fontSize: "20"
            };
            $.img_gender_male.image = "/images/gender_male[shaded].png";
            $.img_gender_female.image = "/images/gender_female.png";
            $.lbl_gender_male.color = "gray";
            $.lbl_gender_female.color = "#2279bc";
            userDataInArrays.gender = "Female";
        }
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
        $.tableView.insertRowAfter(rowNum - 1, newRow, {
            animated: true
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Settings/EditProfile/generalInfoWin";
    if (arguments[0]) {
        var __parentSymbol = __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    var __alloyId194 = [];
    $.__views.pictureView = Alloy.createController("Settings/EditProfile/editPictureWin", {
        id: "pictureView",
        __parentSymbol: __parentSymbol
    });
    __alloyId194.push($.__views.pictureView.getViewEx({
        recurse: true
    }));
    $.__views.__alloyId195 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        id: "__alloyId195"
    });
    __alloyId194.push($.__views.__alloyId195);
    $.__views.__alloyId196 = Ti.UI.createLabel({
        left: "5%",
        width: "20%",
        font: {
            fontSize: "15"
        },
        color: "#2279bc",
        bubbleParent: false,
        text: "Full Name",
        id: "__alloyId196"
    });
    $.__views.__alloyId195.add($.__views.__alloyId196);
    $.__views.fullName = Ti.UI.createLabel({
        left: "25%",
        width: "42%",
        font: {
            fontSize: "15"
        },
        bubbleParent: false,
        color: "#C8C8C8",
        text: "Full Name",
        id: "fullName",
        hintText: "Full Name"
    });
    $.__views.__alloyId195.add($.__views.fullName);
    ValueLabelClicked ? $.__views.fullName.addEventListener("click", ValueLabelClicked) : __defers["$.__views.fullName!click!ValueLabelClicked"] = true;
    $.__views.__alloyId197 = Ti.UI.createLabel({
        left: "71%",
        width: "20%",
        font: {
            fontSize: "15"
        },
        bubbleParent: false,
        color: "black",
        text: "friends",
        id: "__alloyId197"
    });
    $.__views.__alloyId195.add($.__views.__alloyId197);
    $.__views.__alloyId198 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        backgroundColor: "#D0D0D0",
        id: "__alloyId198"
    });
    __alloyId194.push($.__views.__alloyId198);
    $.__views.__alloyId199 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        id: "__alloyId199"
    });
    __alloyId194.push($.__views.__alloyId199);
    $.__views.__alloyId200 = Ti.UI.createLabel({
        left: "5%",
        width: "20%",
        font: {
            fontSize: "15"
        },
        color: "#2279bc",
        bubbleParent: false,
        text: "Marital Status",
        id: "__alloyId200"
    });
    $.__views.__alloyId199.add($.__views.__alloyId200);
    $.__views.marital_status = Ti.UI.createLabel({
        left: "25%",
        width: "42%",
        font: {
            fontSize: "15"
        },
        bubbleParent: false,
        color: "#C8C8C8",
        text: "Marital Status",
        id: "marital_status",
        hintText: "Marital Status"
    });
    $.__views.__alloyId199.add($.__views.marital_status);
    ValueLabelClicked ? $.__views.marital_status.addEventListener("click", ValueLabelClicked) : __defers["$.__views.marital_status!click!ValueLabelClicked"] = true;
    $.__views.marital_status_privacy = Ti.UI.createLabel({
        left: "71%",
        width: "20%",
        font: {
            fontSize: "15"
        },
        bubbleParent: false,
        color: "black",
        text: "Default",
        id: "marital_status_privacy"
    });
    $.__views.__alloyId199.add($.__views.marital_status_privacy);
    PrivacyLabelClicked ? $.__views.marital_status_privacy.addEventListener("click", PrivacyLabelClicked) : __defers["$.__views.marital_status_privacy!click!PrivacyLabelClicked"] = true;
    $.__views.__alloyId201 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        backgroundColor: "#D0D0D0",
        id: "__alloyId201"
    });
    __alloyId194.push($.__views.__alloyId201);
    $.__views.__alloyId202 = Ti.UI.createTableViewRow({
        editable: false,
        height: Ti.UI.SIZE,
        top: 20,
        id: "__alloyId202"
    });
    __alloyId194.push($.__views.__alloyId202);
    $.__views.__alloyId203 = Ti.UI.createLabel({
        left: 10,
        font: {
            fontSize: "17"
        },
        color: "#2279bc",
        text: "Gender",
        id: "__alloyId203"
    });
    $.__views.__alloyId202.add($.__views.__alloyId203);
    $.__views.gender_privacy = Ti.UI.createLabel({
        left: "71%",
        width: "20%",
        font: {
            fontSize: "15"
        },
        bubbleParent: false,
        color: "black",
        text: "Default",
        id: "gender_privacy"
    });
    $.__views.__alloyId202.add($.__views.gender_privacy);
    PrivacyLabelClicked ? $.__views.gender_privacy.addEventListener("click", PrivacyLabelClicked) : __defers["$.__views.gender_privacy!click!PrivacyLabelClicked"] = true;
    $.__views.__alloyId204 = Ti.UI.createTableViewRow({
        editable: false,
        height: "auto",
        id: "__alloyId204"
    });
    __alloyId194.push($.__views.__alloyId204);
    $.__views.gender = Ti.UI.createView({
        id: "gender",
        layout: "horizontal",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE
    });
    $.__views.__alloyId204.add($.__views.gender);
    $.__views.lbl_gender_male = Ti.UI.createLabel({
        width: "75",
        color: "gray",
        text: "Male",
        id: "lbl_gender_male",
        textAlign: "right"
    });
    $.__views.gender.add($.__views.lbl_gender_male);
    $.__views.img_gender_male = Ti.UI.createImageView({
        image: "/images/gender_male[shaded].png",
        width: "75",
        height: "75",
        id: "img_gender_male"
    });
    $.__views.gender.add($.__views.img_gender_male);
    GenderSelected ? $.__views.img_gender_male.addEventListener("click", GenderSelected) : __defers["$.__views.img_gender_male!click!GenderSelected"] = true;
    $.__views.img_gender_female = Ti.UI.createImageView({
        image: "/images/gender_female[shaded].png",
        width: "75",
        height: "75",
        id: "img_gender_female"
    });
    $.__views.gender.add($.__views.img_gender_female);
    GenderSelected ? $.__views.img_gender_female.addEventListener("click", GenderSelected) : __defers["$.__views.img_gender_female!click!GenderSelected"] = true;
    $.__views.lbl_gender_female = Ti.UI.createLabel({
        width: "75",
        color: "gray",
        text: "Female",
        id: "lbl_gender_female",
        textAlign: "left"
    });
    $.__views.gender.add($.__views.lbl_gender_female);
    $.__views.__alloyId205 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        backgroundColor: "#D0D0D0",
        id: "__alloyId205"
    });
    __alloyId194.push($.__views.__alloyId205);
    $.__views.__alloyId206 = Ti.UI.createTableViewRow({
        editable: false,
        height: Ti.UI.SIZE,
        top: 20,
        id: "__alloyId206"
    });
    __alloyId194.push($.__views.__alloyId206);
    $.__views.__alloyId207 = Ti.UI.createLabel({
        left: 10,
        font: {
            fontSize: "17"
        },
        color: "#2279bc",
        text: "Birthday",
        id: "__alloyId207"
    });
    $.__views.__alloyId206.add($.__views.__alloyId207);
    $.__views.birthday_date_privacy = Ti.UI.createLabel({
        left: "71%",
        width: "20%",
        font: {
            fontSize: "15"
        },
        bubbleParent: false,
        color: "black",
        text: "Default",
        id: "birthday_date_privacy"
    });
    $.__views.__alloyId206.add($.__views.birthday_date_privacy);
    PrivacyLabelClicked ? $.__views.birthday_date_privacy.addEventListener("click", PrivacyLabelClicked) : __defers["$.__views.birthday_date_privacy!click!PrivacyLabelClicked"] = true;
    $.__views.__alloyId208 = Ti.UI.createTableViewRow({
        editable: false,
        height: "auto",
        id: "__alloyId208"
    });
    __alloyId194.push($.__views.__alloyId208);
    $.__views.birthday_date = Ti.UI.createPicker({
        format24: false,
        calendarViewShown: false,
        id: "birthday_date",
        backgroundColor: "#D0D0D0",
        type: Titanium.UI.PICKER_TYPE_DATE
    });
    $.__views.__alloyId208.add($.__views.birthday_date);
    BirthDay ? $.__views.birthday_date.addEventListener("change", BirthDay) : __defers["$.__views.birthday_date!change!BirthDay"] = true;
    $.__views.__alloyId209 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        backgroundColor: "#D0D0D0",
        id: "__alloyId209"
    });
    __alloyId194.push($.__views.__alloyId209);
    $.__views.__alloyId210 = Ti.UI.createTableViewRow({
        editable: false,
        height: Ti.UI.SIZE,
        top: 20,
        isInterest: "1",
        id: "__alloyId210"
    });
    __alloyId194.push($.__views.__alloyId210);
    $.__views.__alloyId211 = Ti.UI.createLabel({
        left: 10,
        font: {
            fontSize: "17"
        },
        color: "#2279bc",
        text: "Interests",
        id: "__alloyId211"
    });
    $.__views.__alloyId210.add($.__views.__alloyId211);
    $.__views.__alloyId212 = Ti.UI.createImageView({
        right: 10,
        width: 22,
        height: 22,
        image: "/images/addIcon-44x44.png",
        id: "__alloyId212"
    });
    $.__views.__alloyId210.add($.__views.__alloyId212);
    AddRowButtonClicked ? $.__views.__alloyId212.addEventListener("click", AddRowButtonClicked) : __defers["$.__views.__alloyId212!click!AddRowButtonClicked"] = true;
    $.__views.__alloyId213 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        backgroundColor: "#D0D0D0",
        id: "__alloyId213"
    });
    __alloyId194.push($.__views.__alloyId213);
    $.__views.__alloyId214 = Ti.UI.createTableViewRow({
        editable: false,
        height: Ti.UI.SIZE,
        top: 20,
        isInterest: "0",
        id: "__alloyId214"
    });
    __alloyId194.push($.__views.__alloyId214);
    $.__views.__alloyId215 = Ti.UI.createLabel({
        left: 10,
        font: {
            fontSize: "17"
        },
        color: "#2279bc",
        text: "Favorite Places",
        id: "__alloyId215"
    });
    $.__views.__alloyId214.add($.__views.__alloyId215);
    $.__views.__alloyId216 = Ti.UI.createImageView({
        right: 10,
        width: 22,
        height: 22,
        image: "/images/addIcon-44x44.png",
        id: "__alloyId216"
    });
    $.__views.__alloyId214.add($.__views.__alloyId216);
    AddRowButtonClicked ? $.__views.__alloyId216.addEventListener("click", AddRowButtonClicked) : __defers["$.__views.__alloyId216!click!AddRowButtonClicked"] = true;
    $.__views.__alloyId217 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        backgroundColor: "#D0D0D0",
        id: "__alloyId217"
    });
    __alloyId194.push($.__views.__alloyId217);
    $.__views.__alloyId218 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        id: "__alloyId218"
    });
    __alloyId194.push($.__views.__alloyId218);
    $.__views.__alloyId219 = Ti.UI.createLabel({
        left: "5%",
        width: "20%",
        font: {
            fontSize: "15"
        },
        color: "#2279bc",
        bubbleParent: false,
        text: "Residence",
        id: "__alloyId219"
    });
    $.__views.__alloyId218.add($.__views.__alloyId219);
    $.__views.residence = Ti.UI.createLabel({
        left: "25%",
        width: "42%",
        font: {
            fontSize: "15"
        },
        bubbleParent: false,
        color: "#C8C8C8",
        text: "Residence",
        id: "residence",
        hintText: "Residence"
    });
    $.__views.__alloyId218.add($.__views.residence);
    ValueLabelClicked ? $.__views.residence.addEventListener("click", ValueLabelClicked) : __defers["$.__views.residence!click!ValueLabelClicked"] = true;
    $.__views.residence_privacy = Ti.UI.createLabel({
        left: "71%",
        width: "20%",
        font: {
            fontSize: "15"
        },
        bubbleParent: false,
        color: "black",
        text: "Default",
        id: "residence_privacy"
    });
    $.__views.__alloyId218.add($.__views.residence_privacy);
    PrivacyLabelClicked ? $.__views.residence_privacy.addEventListener("click", PrivacyLabelClicked) : __defers["$.__views.residence_privacy!click!PrivacyLabelClicked"] = true;
    $.__views.tableView = Ti.UI.createTableView({
        bottom: 0,
        data: __alloyId194,
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
          case "fullName":
          case "marital_status":
          case "marital_status_privacy":
          case "residence":
          case "residence_privacy":
          case "birthday_date_privacy":
          case "gender_privacy":
          case "profile_picture_privacy":
            if ("" != userData[children[j].id] && null != userData[children[j].id]) {
                children[j].text = userData[children[j].id];
                children[j].color = "black";
            }
            break;

          case "birthday_date":
            if ("" != userData[children[j].id] && null != userData[children[j].id]) {
                var date = userData[children[j].id];
                date.split("/");
                var dateArray = date.split("/");
                $.birthday_date.value = new Date(dateArray[2], dateArray[1], dateArray[0]);
            }
            break;

          case "gender":
            "" != userData[children[j].id] && null != userData[children[j].id] && GenderSelected({
                source: {
                    id: ("img_gender_" + userData[children[j].id]).toLowerCase()
                }
            });
            break;

          case "profile_picture":
            "" != userData["profile_picture"] && null != userData["profile_picture"] && (children[j].image = userData["profile_picture"]);
            $.pictureView.profile_picture_privacy.addEventListener("click", PrivacyLabelClicked);
        }
    }
    for (var i = userDataInArrays.favorite_places.length - 1; i >= 0; i--) {
        var data = createBindingRowData(userDataInArrays.favorite_places[i], userDataInArrays.favorite_places_privacy[i], false);
        AddNewRowAfter(data, 14);
    }
    for (var i = userDataInArrays.interests.length - 1; i >= 0; i--) {
        var data = createBindingRowData(userDataInArrays.interests[i], userDataInArrays.interests_privacy[i], true);
        AddNewRowAfter(data, 12);
    }
    $.pickerContainer.picker.addEventListener("change", SelectedPrivacyChanged);
    $.pickerContainer.transparentView1.addEventListener("click", DismissPicker);
    $.pickerContainer.transparentView2.addEventListener("click", DismissPicker);
    $.editViewContainer.cancelView1.addEventListener("click", EditViewBlur);
    $.editViewContainer.cancelView2.addEventListener("click", EditViewBlur);
    $.editViewContainer.fieldValue.addEventListener("return", EditViewBlur);
    $.editViewContainer.fieldValue.addEventListener("change", EditViewTextChanged);
    __defers["$.__views.fullName!click!ValueLabelClicked"] && $.__views.fullName.addEventListener("click", ValueLabelClicked);
    __defers["$.__views.marital_status!click!ValueLabelClicked"] && $.__views.marital_status.addEventListener("click", ValueLabelClicked);
    __defers["$.__views.marital_status_privacy!click!PrivacyLabelClicked"] && $.__views.marital_status_privacy.addEventListener("click", PrivacyLabelClicked);
    __defers["$.__views.gender_privacy!click!PrivacyLabelClicked"] && $.__views.gender_privacy.addEventListener("click", PrivacyLabelClicked);
    __defers["$.__views.img_gender_male!click!GenderSelected"] && $.__views.img_gender_male.addEventListener("click", GenderSelected);
    __defers["$.__views.img_gender_female!click!GenderSelected"] && $.__views.img_gender_female.addEventListener("click", GenderSelected);
    __defers["$.__views.birthday_date_privacy!click!PrivacyLabelClicked"] && $.__views.birthday_date_privacy.addEventListener("click", PrivacyLabelClicked);
    __defers["$.__views.birthday_date!change!BirthDay"] && $.__views.birthday_date.addEventListener("change", BirthDay);
    __defers["$.__views.__alloyId212!click!AddRowButtonClicked"] && $.__views.__alloyId212.addEventListener("click", AddRowButtonClicked);
    __defers["$.__views.__alloyId216!click!AddRowButtonClicked"] && $.__views.__alloyId216.addEventListener("click", AddRowButtonClicked);
    __defers["$.__views.residence!click!ValueLabelClicked"] && $.__views.residence.addEventListener("click", ValueLabelClicked);
    __defers["$.__views.residence_privacy!click!PrivacyLabelClicked"] && $.__views.residence_privacy.addEventListener("click", PrivacyLabelClicked);
    __defers["$.__views.tableView!click!TableViewRowClicked"] && $.__views.tableView.addEventListener("click", TableViewRowClicked);
    __defers["$.__views.tableView!delete!DeletePressed"] && $.__views.tableView.addEventListener("delete", DeletePressed);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;