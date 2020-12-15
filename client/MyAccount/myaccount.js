import { MyAccount } from '../../imports/api/myAccount.js';

Template.myAccount.onCreated(function() {
    this.subscribe("my-acct-info");
});

Template.myAccount.onRendered(function() {

});

Template.myAccount.helpers({
    myAccountInfo: function() {
        let userId = Meteor.userId();
        console.log("UserId is: " + userId);
        return MyAccount.find({ accountHolderId: userId });
    },
    myAcctTotal: function () {
        let myTotalBal = 0;
        let userId = Meteor.userId();
        let acctInfo = MyAccount.find({ accountHolderId: userId }).fetch();
        let acctInfoLen = acctInfo.length;
        for (i=0; i< acctInfoLen; i++) {
            // add the acct balances
            myTotalBal = myTotalBal + acctInfo[i].accountBalance;
        }
        return myTotalBal;
    },
});

Template.myAccount.events({

});
