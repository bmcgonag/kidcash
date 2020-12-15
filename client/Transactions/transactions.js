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
});