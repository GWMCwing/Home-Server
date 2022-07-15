const { UserManager } = require('./server/user/manage-user');
const um = new UserManager();
um.createUser_CLI('GW_MC', 'password');
um.createUser_CLI('GW_MC', 'password', 60);
um.createUser_CLI('GW_MC', 'password', 60);
um.createUser_CLI('GW_MC', 'password', 50);
um.logUserList();
