import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Trans = new Mongo.Collection('transactions');

Trans.allow({
    insert: function(userId, doc){
        // if use id exists, allow insert
        return !!userId;
    },
});

Meteor.methods({
    'transaction.new' (transType, transAccountId, transAccountType, transAccountHolder, transAccountHolderId, transAmount) {
        check(transType, String);
        check(transAccountId, String);
        check(transAccountHolder, String);
        check(transAccountHolderId, String);
        check(transAccountType, String);
        check(transAmount, Number);

        if (!this.userId) {
            throw new Meteor.Error('User is not allowed to edit account information, make sure you are logged in.');
        }

        return Trans.insert({
            transType: transType,
            transAccountId: transAccountId,
            transAccountHolder: transAccountHolder,
            transAccountHolderId: transAccountHolderId,
            transAccountType: transAccountType,
            transAmount: transAmount,
            transBy: Meteor.user().emails[0].address,
            transDate: new Date(),
        });
    },
});