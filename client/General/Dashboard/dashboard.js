import { MyAccount } from '../../../imports/api/myAccount.js';
import { Trans } from '../../../imports/api/transactions.js'; 

Template.dashboard.onCreated(function() {
    this.subscribe("my-acct-info");
    this.subscribe("myTransactions");
});

Template.dashboard.onRendered(function() {

});

Template.dashboard.helpers({
    totalBal: function() {
        let myTotalBal = 0;
        let myId = Meteor.userId;
        let myAcctInfo = MyAccount.find({ accountHolderId: myId }).fetch();
        let myAcctLen = myAcctInfo.length;
        for (i=0; i<myAcctLen; i++) {
            myTotalBal = myTotalBal + myAcctInfo[i].accountBalance;
        }
        return myTotalBal;
    },
    myTrans: function() {
        return Trans.find({});
    },
    myTransDate: function() {
        return moment(this.transDate).format("YYYY-MM-DD");
    }
});

Template.dashboard.events({

});
