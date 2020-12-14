import { AcctTypes } from '../../imports/api/accountTypes.js';
import { TransTypes } from '../../imports/api/transactionTypes.js';

Template.setup.onCreated(function() {
    this.subscribe("acctTypes");
    this.subscribe("transTypes");
    this.subscribe("userList");
});

Template.setup.onRendered(function() {
    let intBearCheck = $("#interestBearing").prop("checked");
    if (intBearCheck == true) {
        Session.set("disabled", true);
    } else {
        Session.set("disabled", false);
    }

    Session.set("activeTab", "permissionsSetup");
    Session.set("isActiveTab", "trans");
});

Template.setup.helpers({
    needsInterest: function() {
        return Session.get("disabled");
    },
    isActiveTab: function() {
        return Session.get("isActiveTab");
    },
    acctInfo: function() {
        return AcctTypes.find();
    },
    transInfo: function() {
        return TransTypes.find();
    },
    permInfo: function() {
        return Meteor.users.find({});
    },
    userEmail: function() {
        let userId = this._id;
        let emailname = Meteor.users.findOne({ _id: userId }).emails[0].address;
        return emailname;
    },
    userRole: function() {
        let userId = this._id;
        return Roles.getRolesForUser(userId);
    }
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
            Session.set("isActiveTab", "perm");
        } else if (tabClicked == "transactionSetup") {
            transName.style.display = "block";
            Session.set("isActiveTab", "trans");
        } else {
            acctName.style.display = "block";
            Session.set("isActiveTab", "acct");
        }
    },
    'click #saveSetup' (event) {
        event.preventDefault();

        let callTransMethod;
        let callAcctMethod;
        let callPermMethod;

        // first get Transaction Type values
        let transName = $("#transTypeName").val();
        let transSub = $("#transSubType").val();

        // next get Account Type values
        let acctType = $("#acctType").val();
        let intBearing = $("#interestBearing").prop('checked');
        let intRate = Number($("#interestRate").val());
        let accrualTime = $("#rateAccrualTime").val();

        if (accrualTime == null) {
            accrualTime = "";
        }

        // get Permissions values



        // check each section to validate whether it should be saved or not
        // then call only the methods for saving those sections that have 
        // new values or edited values.

        if (transName == null || transName == "") {
            callTransMethod = false;
        } else {
            callTransMethod = true;
        }

        if (acctType == null || acctType == "") {
            callAcctMethod = false;
        } else {
            callAcctMethod = true;
        }

        // now call the methods, first checking if they should be called.
        if (callTransMethod == true) {
            Meteor.call("transTypes.add", transName, transSub, function(err, result) {
                if (err) {
                    console.log("Error saving to Transaction Types: " + err);
                } else {
                    console.log("Successfully Saved Transaction Type.");
                }
            })
        }

        if (callAcctMethod == true) {
            Meteor.call("accttypes.add", acctType, intBearing, intRate, accrualTime, function(err, result) {
                if (err) {
                    console.log("Error saving Account Type: " + err);
                } else {
                    console.log("Successfully Saved Account Type");
                }
            })
        }
    },
});