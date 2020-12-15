import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const AcctTypes = new Mongo.Collection('acctTypes');

AcctTypes.allow({
    insert: function(userId, doc){
        // if use id exists, allow insert
        return !!userId;
    },
});

Meteor.methods({
    // ******************************************************************
    //
    //  add transaction types
    //
    // ******************************************************************
    'accttypes.add' (type, intBear, intRate, accrualTime) {
        check(type, String);
        check(intBear, Boolean);
        check(intRate, Number);
        check(accrualTime, String);

        if (!this.userId) {
            throw new Meteor.Error('User is not allowed to add account types to the system, make sure you are logged in.');
        }

        return AcctTypes.insert({
            type: type,
            intBear: intBear,
            intRate: intRate,
            accrualTime: accrualTime,
            addedBy: Meteor.user().emails[0].address,
        });
    },
    'accttypes.edit' (typeId, type, inBear, intRate, accrualTime) {
        check(typeId, String);
        check(type, String);
        check(intBear, Boolean);
        check(intRate, Number);
        check(accrualTime, String);

        if (!this.userId) {
            throw new Meteor.Error('User is not allowed to edit account types to the system, make sure you are logged in.');
        }

        return AcctTypes.update({ _id: typeId }, {
            $set: {
                type: type,
                intBear: intBear,
                intRate: intRate,
                accrualTime: accrualTime,
                editedBy: Meteor.user().emails[0].address,
            }
        });
    },
});