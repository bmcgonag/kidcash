import { TransTypes } from '../../imports/api/transactionTypes.js';
import { AcctTypes } from '../../imports/api/accountTypes.js';

Template.transactions.onCreated(function() {
    this.subscribe("transTypes");
    this.subscribe("acctTypes");
});

Template.transactions.onRendered(function() {

});

Template.transactions.helpers({
    transTypes: function() {
        return TransTypes.find({});
    },
    accountTypes: function() {
        return AcctTypes.find({});
    },
});

Template.transactions.events({
    'click #newTransaction' (event) {
        event.preventDefault();

        let trans = document.getElementById('newTransactionForm');
        trans.style.display = "block";
    },
});