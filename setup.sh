mongo --host 192.168.42.100 << 'EOF'
config = { _id: "m101", members:[
          { _id : 0, host : "localhost:27017"},
          { _id : 1, host : "localhost:27018"},
          { _id : 2, host : "localhost:27019"} ]
         };
rs.initiate(config);

rs.status();
EOF