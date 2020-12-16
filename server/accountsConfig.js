import { MyAccount } from '../imports/api/myAccount.js';

var postSignUp = function(userId, info) {
    if (Meteor.users.find().count() > 1) {
        Roles.addUsersToRoles(userId, 'AccountHolder');
    } else if (Meteor.users.find().count() === 1){
        Roles.addUsersToRoles(userId, 'Admin');
    }

    // Next - let's add the user to an Account record with $0 to start.
    Meteor.call("newMyAccount.add", userId, "General", "G0", 0, function(err, result) {
        if (err) {
            console.log("Error cretaing new account after sign up: " + err);
        } else {
            console.log("Success! New Account Created with ID: " + result);
        }
    });
};

var onLogOut = function() {
    FlowRouter.go('/');
};

AccountsTemplates.configure({
    postSignUpHook: postSignUp,
});