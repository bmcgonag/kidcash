import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const TransTypes = new Mongo.Collection('transTypes');

TransTypes.allow({
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
    'transTypes.add' (type, subType) {
        check(type, String);
        check(subType, String);

        if (!this.userId) {
            throw new Meteor.Error('User is not allowed to add transaction types to the system, make sure you are logged in.');
        }

        return TransTypes.insert({
            type: type,
            subtype: subType,
            addedBy: Meteor.user().emails[0].address,
        });
    },
    'transTypes.edit' (type_id, type, subType) {
        check(type_id, String);
        check(type, String);
        check(subType, String);

        if (!this.userId) {
            throw new Meteor.Error('User is not allowed to add transaction types to the system, make sure you are logged in.');
        }

        return TransTypes.update({ _id: type_id }, {
            $set: {
                type: type,
                subtype: subType,
                editedBy: Meteor.user().emails[0].address,
            }
        });
    },
});