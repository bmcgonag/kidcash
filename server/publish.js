import { AcctTypes } from '../imports/api/accountTypes.js';
import { TransTypes } from '../imports/api/transactionTypes.js';

Meteor.publish("acctTypes", function() {
    return AcctTypes.find({});
});

Meteor.publish("transTypes", function() {
    return TransTypes.find({});
});

