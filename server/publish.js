import { AcctTypes } from '../imports/api/accountTypes.js';
import { TransTypes } from '../imports/api/transactionTypes.js';
import { MyAccount } from '../imports/api/myAccount.js';

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
    console.log("userId: " + myId);
    return MyAccount.find({ accountHolderId: myId });
});

Meteor.publish("allAccounts", function() {
    return MyAccount.find({});
});
