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

FlowRouter.route('/dashboard', {
    name: 'dashboard',
    action() {
        BlazeLayout.render('MainLayout', { main: "dashboard" });
    }
});

FlowRouter.route('/setup', {
    name: 'adminSetup',
    action() {
        BlazeLayout.render('MainLayout', { main: "setup" });
    }
});