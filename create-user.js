use admin;
db.createUser( { user: "root",
                 pwd: "...",                 
                 roles: [ { role: "clusterAdmin", db: "admin" },
                          { role: "userAdminAnyDatabase", db: "admin" }] });
                        
db.createRole({ 
    role: "changePasswordRole",
    privileges: [
        {
        resource: { db: "admin", collection: "" },
        actions: [ "changePassword" ]
        }
    ],
    roles: []
    }
);

// Create certificate user
db.getSiblingDB("$external").createUser( { 
    user: "emailAddress=koby.aharon@cyberark.com,CN=root,OU=R&D-Users,O=CyberArk,L=TelAviv,ST=TelAviv,C=IL",
    roles: [ 
        { 
            role: "changePasswordRole", 
            db: "admin" 
        }
    ]
});

db.getSiblingDB("$external").dropUser( "emailAddress=koby.aharon@cyberark.com,CN=root,OU=R&D-Users,O=CyberArk,L=TelAviv,ST=TelAviv,C=IL");

db.changeUserPassword("root", "...")

db.getSiblingDB("$external").auth(
    {
        mechanism: "MONGODB-X509",
        user: "emailAddress=koby.aharon@cyberark.com,CN=root,OU=R&D-Users,O=CyberArk,L=TelAviv,ST=TelAviv,C=IL"
    }
);