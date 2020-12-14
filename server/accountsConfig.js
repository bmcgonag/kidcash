var postSignUp = function(userId, info) {
    if (Meteor.users.find().count() > 1) {
        Roles.addUsersToRoles(userId, 'AccountHolder');
    } else if (Meteor.users.find().count() === 1){
        Roles.addUsersToRoles(userId, 'Admin');
    }
};

var onLogOut = function() {
    FlowRouter.go('/');
};

AccountsTemplates.configure({
    postSignUpHook: postSignUp,
});