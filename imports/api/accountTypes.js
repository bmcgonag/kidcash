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
    'accttypes.add' (type, intBear, intRate) {
        check(type, String);
        check(intBear, Boolean);
        check(intRate, Number);

        if (!this.userId) {
            throw new Meteor.Error('User is not allowed to add transaction types to the system, make sure you are logged in.');
        }

        return AcctTypes.insert({
            type: type,
            intBear: intBear,
            intRate: intRate,
            addedBy: Meteor.userId(),
        });
    },
    'accttypes.edit' (typeId, type, inBear, intRate) {
        check(typeId, String);
        check(type, String);
        check(intBear, Boolean);
        check(intRate, Number);

        if (!this.userId) {
            throw new Meteor.Error('User is not allowed to add transaction types to the system, make sure you are logged in.');
        }

        return AcctTypes.update({ _id: typeId }, {
            $set: {
                type: type,
                intBear: intBear,
                intRate: intRate,
                editedBy: Meteor.userId(),
            }
        });
    }
});