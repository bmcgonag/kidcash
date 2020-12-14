Template.navbar.onCreated(function() {

});

Template.navbar.onRendered(function() {

});

Template.navbar.helpers({

});

Template.navbar.events({
    "click .navItem" (event) {
        let navPage = event.currentTarget.id;
        
        if (navPage == "hometab") {
            FlowRouter.go('/');
        } else if (navPage == "setuptab") {
            FlowRouter.go('/setup');
        } else if (navPage == "accounttab") {
            FlowRouter.go('/myaccount');
        } else if (navPage == "dashboardtab") {
            FlowRouter.go('/dashboard');
        } else if (navPage == "transactionstab") {
            FlowRouter.go('/transactions');
        }
    },
});
