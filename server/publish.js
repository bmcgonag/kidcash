import { AcctTypes } from '../imports/api/accountTypes.js';
import { TransTypes } from '../imports/api/transactionTypes.js';
import { MyAccount } from '../imports/api/myAccount.js';
import { Trans } from '../imports/api/transactions.js';

Meteor.publish("acctTypes", function() {
    return AcctTypes.find({});
});

Meteor.publish("transTypes", function() {
    return TransTypes.find({});
});

Meteor.publish('userList', function (){ 
    return Meteor.users.find({});
});

Meteor.publish('my-acct-info', function() {
    let myId = this.userId;
    return MyAccount.find({ accountHolderId: myId });
});

Meteor.publish("allAccounts", function() {
    return MyAccount.find({});
});

Meteor.publish('allTransactions', function() {
    return Trans.find({});
});

Meteor.publish('myTransactions', function() {
    let myId = this.userId;
    return Trans.find({ transAccountHolderId: myId });
});
