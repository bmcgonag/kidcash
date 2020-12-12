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
    'accttypes.add' (type) {
        check(type, String);

        if (!this.userId) {
            throw new Meteor.Error('User is not allowed to add transaction types to the system, make sure you are logged in.');
        }

        return AcctType.insert({
            type: type,
            addedBy: Meteor.userId(),
        });
    },
    'accttypes.edit' (typeId, type) {
        check(typeId, String);
        check(type, String);

        if (!this.userId) {
            throw new Meteor.Error('User is not allowed to add transaction types to the system, make sure you are logged in.');
        }

        return AcctType.update({ _id: typeId }, {
            $set: {
                type: type,
                editedBy: Meteor.userId(),
            }
        });
    }
});