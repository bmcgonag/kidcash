import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const MyAccount = new Mongo.Collection('myAccount');

MyAccount.allow({
    insert: function(userId, doc){
        // if use id exists, allow insert
        return !!userId;
    },
});

Meteor.methods({
    "newMyAccount.add" (userId, accountType, accountTypeId, accountBalance) {
        check(userId, String);
        check(accountType, String);
        check(accountBalance, Number);

        let userInfo = Meteor.users.find({ _id: userId }).fetch();
        let userEmail = userInfo[0].emails[0].address;

        return MyAccount.insert({
            accountHolderId: userId,
            accountHolder: userEmail,
            accountType: accountType,
            accountTypeId: accountTypeId,
            accountBalance: accountBalance,
            addedBy: "System On Sign Up",
            addedDate: new Date(),
        });
    },
    'myAccount.add' (userId, accountType, accountBalance) {
        check(userId, String);
        check(accountType, String);
        check(accountBalance, Number);

        let userInfo = Meteor.users.find({ _id: userId }).fetch();
        let userEmail = userInfo[0].emails[0].address;

        let accounts = Meteor.AcctTypes.find({ type: accountType }).fetch();
        let accountTypeId = accounts._id;

        return MyAccount.insert({
            accountHolderId: userId,
            accountHolder: userEmail,
            accountType: accountType,
            accountTypeId: accountTypeId,
            accountBalance: accountBalance,
            addedBy: Meteor.user().emails[0].address,
            addedDate: new Date(),
        });
    },
    'myAccount.edit' (accountId, accountType, accountBalanceChange) {
        check(accountId, String);
        check(accountType, String);
        check(accountBalanceChange, Number);

        if (!this.userId) {
            throw new Meteor.Error('User is not allowed to edit account information, make sure you are logged in.');
        }

        let newAccountBalance = accountBalance + accountBalanceChange;

        return MyAccount.update({ _id: accountId}, {
            set: {
                accountType: accountType,
                accountBalance: newAccountBalance,
                editedby: Meteor.user().emails[0].address,
                editedDate: new Date(),
            }
        });
    },
    'myAccount.delete' (accountId) {
        check(accountId, String);

        if (!this.userId) {
            throw new Meteor.Error('User is not allowed to delete account information, make sure you are logged in.');
        }

        return MyAccount.update({ _id: accountId }, {
            $set: {
                isDeleted: true,
                deletedBy: Meteor.user().emails[0].address,
                deletedOn: new Date(),
            }
        });
    },
    'myAccount.transaction' (transAmt, transAcctId) {
        check(transAmt, Number);
        check(transAcctId, String);
        
        if (!this.userId) {
            throw new Meteor.Error('User is not allowed to delete account information, make sure you are logged in.');
        }

        let acctInfo = MyAccount.find({ _id: transAcctId }).fetch();
        console.dir(acctInfo);
        let currBal = acctInfo[0].accountBalance;
        console.log("found account bal to be: " + currBal);
        let newAccountBalance = currBal + transAmt;
        console.log("--------------------------------------");
        console.log("newBal shoudl be: " + newAccountBalance);

        return MyAccount.update({ _id: transAcctId }, {
            $set: {
                accountBalance: newAccountBalance,
                editedby: Meteor.user().emails[0].address,
                editedDate: new Date(),
            }
        });

    }
});