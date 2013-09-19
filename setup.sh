mongo --host 192.168.42.100 << 'EOF'
config = { _id: "bogus-replica-set", members:[
          { _id : 0, host : "192.168.42.100:27017"},
          { _id : 1, host : "192.168.42.110:27017"},
          { _id : 2, host : "192.168.42.120:27017"} ]
         };
rs.initiate(config);

rs.status();
EOF