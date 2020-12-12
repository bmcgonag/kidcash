FlowRouter.route('/', {
    name: 'home',
    action() {
        BlazeLayout.render('MainLayout', { main: "dashboard" });
    }
});

FlowRouter.route('/myaccount', {
    name: 'hostInput',
    action() {
        BlazeLayout.render('MainLayout', { main: "myAccount" });
    }
});

FlowRouter.route('/setup', {
    name: 'hostInput',
    action() {
        BlazeLayout.render('MainLayout', { main: "setup" });
    }
});