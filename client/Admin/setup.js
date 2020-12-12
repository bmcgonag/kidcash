import { AcctTypes } from '../../imports/api/accountTypes.js';

Template.setup.onCreated(function() {

});

Template.setup.onRendered(function() {
    let intBearCheck = $("#interestBearing").prop("checked");
    if (intBearCheck == true) {
        Session.set("disabled", true);
    } else {
        Session.set("disabled", false);
    }

    Session.set("activeTab", "permissionsSetup");
});

Template.setup.helpers({
    needsInterest: function() {
        return Session.get("disabled");
    },
});

Template.setup.events({
    'click #interestBearing' (event) {
        console.log("clicked interestBearing");

        let intBearCheck = $("#interestBearing").prop('checked');
        if (intBearCheck == true) {
            Session.set("disabled", true);
        } else {
            Session.set("disabled", false);
        }
    },
    'click .tabNav' (event) {
        event.preventDefault();
        let tabClicked = event.currentTarget.id;

        console.log("ID clicked: " + tabClicked);
        // this is a crappy way of doing this I'm sure, but it should work.
        let tab1 = "permissionsDiv";
        let tab2 = "transDiv";
        let tab3 = "accountDiv";

        let permName = document.getElementById("permissionsDiv");
        let transName = document.getElementById("transDiv");
        let acctName = document.getElementById("accountDiv");

        permName.style.display = "none";
        transName.style.display = "none";
        acctName.style.display = "none";

        if (tabClicked == "permissionsSetup") {
            permName.style.display = "block";
        } else if (tabClicked == "transactionSetup") {
            transName.style.display = "block";
        } else {
            acctName.style.display = "block";
        }
        

    }
});