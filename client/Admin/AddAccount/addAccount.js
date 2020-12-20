import { TransTypes } from '../../../imports/api/transactionTypes.js';
import { AcctTypes } from '../../../imports/api/accountTypes.js';
import { MyAccount } from '../../../imports/api/myAccount.js';

Template.addAccount.onCreated(function() {
    this.subscribe("acctTypes");
    this.subscribe("transTypes");
    this.subscribe("userList");
    this.subscribe("allAccounts");
});

Template.addAccount.onRendered(function() {

});

Template.addAccount.helpers({
    accountFor: function() {
        let userId = Session.get("addAccountForUserId");
        return Meteor.users.find({ _id: userId });
    },
    currentAccounts: function() {
        return MyAccount.find({});
    },
});

Template.addAccount.events({

});
