import { TransTypes } from '../../imports/api/transactionTypes.js';
import { AcctTypes } from '../../imports/api/accountTypes.js';
import { MyAccount } from '../../imports/api/myAccount.js';

Template.transactions.onCreated(function() {
    this.subscribe("transTypes");
    this.subscribe("acctTypes");
    this.subscribe('allAccounts');
});

Template.transactions.onRendered(function() {

});

Template.transactions.helpers({
    transTypes: function() {
        return TransTypes.find({});
    },
    accountList: function() {
        return MyAccount.find({});
    },
});

Template.transactions.events({
    'click #newTransaction' (event) {
        event.preventDefault();

        let trans = document.getElementById('newTransactionForm');
        trans.style.display = "block";
    },
    'click #saveTransaction' (event) {
        event.preventDefault();

        let transType = $("#newTransType").val();
        let transAcct = $("#transAccount").val();
        let transAmt = Number($("#transAmount").val());

        if (transAmt == 0 || transAmt == null) {
            console.log("Transactioin Amount must be non-zero!");
            return;
        } else if (transAcct == "" || transAcct == null) {
            console.log("You must select an account to apply this transaction to.");
            return;
        } else if (transType == "" || transType == null) {
            console.log("You must select a transaction type.");
            return;
        } else {
            // split the transAcct info out
            let transAcctInfo = transAcct.split(" - ");
            console.log("---------------------------");
            console.dir(transAcctInfo);

            let acctHolderId = transAcctInfo[0];
            let acctHolder = transAcctInfo[1];
            let transAcctType = transAcctInfo[2];
            let transAcctId = transAcctInfo[3];

            Meteor.call("transaction.new", transType, transAcctId, transAcctType, acctHolder, acctHolderId, transAmt, function(err, result) {
                if (err) {
                    console.log("Error adding new Transaction: " + err);
                } else {
                    console.log("Successfully made new Transaction record.");
                    Meteor.call('myAccount.transaction', transAmt, transAcctId, function(error, results) {
                        if (error) {
                            console.log("Error updating myAccount during transaction: " + error);
                        } else {
                            console.log("Successfully updated myAccount balance.");
                        }
                    });
                }
            });
        }
    },
});