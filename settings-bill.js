//creating variables for the 

//updating settings button
const button_updateSettings = document.querySelector(".button_updateSettings");

//adding call or sms button
const button_primary = document.querySelector(".button_primary");

// variables for the update setting
var total = 0;
var sms = 0;
var call = 0;
var critical = 0;
var warning = 0;

// variables for bill type
var callTotal2 = 0;
var smsTotal2 = 0;


function updateSettings() {
    call = Number(document.getElementById("callCost").value)
    sms = Number(document.getElementById("smsCost").value)
    critical = Number(document.getElementById("critical").value)
    warning = Number(document.getElementById("warning").value)
    button_primary.disabled = false;

    document.querySelector(".colour2").classList.remove("danger");
    document.querySelector(".colour2").classList.remove("warning");


    if (total >= warning && total <= critical) {
        document.querySelector(".colour2").classList.remove("danger");

        document.querySelector(".colour2").classList.add("warning");
    }
    if (total >= critical) {
        document.querySelector(".colour2").classList.remove("warning");
        document.querySelector(".colour2").classList.add("danger");
        button_primary.disabled = true
    }

}

function settingsBillTotal() {

    var checkedRadioBtn = document.querySelector("input[name='billItemTypeWithSettings']:checked");
    if (checkedRadioBtn) {
        var billItemType = checkedRadioBtn.value

    }

    if (billItemType === "call") {
        callTotal2 += call;
    }
    else if (billItemType === "sms") {
        smsTotal2 += sms;
    }

    document.getElementById("callTotalSettings").innerHTML = callTotal2.toFixed(2);
    document.getElementById("smsTotalSettings").innerHTML = smsTotal2.toFixed(2);
     total = callTotal2 + smsTotal2;

    document.getElementById("totalSettings").innerHTML = total.toFixed(2);
    document.querySelector(".colour2").classList.remove("danger");
    document.querySelector(".colour2").classList.remove("warning");


    if (total >= warning && total <= critical) {

        document.querySelector(".colour2").classList.add("warning");
    }
    if (total >= critical) {
        document.querySelector(".colour2").classList.remove("warning");
        document.querySelector(".colour2").classList.add("danger");
        button_primary.disabled = true
    }



}







