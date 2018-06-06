# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

$mongoInitScript = <<-"SCRIPT"
  YUM_REPO_CONFIG_PATH="/etc/yum.repos.d/mongodb-org-3.6.repo"

  tee $YUM_REPO_CONFIG_PATH <<-"EOF"
[mongodb-org-3.6]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/3.6/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-3.6.asc
EOF

  yum -y install openssl openssl-devel mongodb-org

  mkdir /etc/mongo
  cp /vagrant/keyfile /etc/mongo/ && chmod 400 /etc/mongo/keyfile

  MONGOD_CONF_FILE="/etc/mongod.conf"

  tee -a $MONGOD_CONF_FILE <<-"EOF"
security:
  keyFile: /etc/mongo/keyfile
replication:
  oplogSizeMB: 64
  replSetName: bogus-replica-set
net:
  bindIpAll: true
EOF

  chown -R mongod:mongod /etc/mongo*

  iptables -I INPUT -p tcp -m state --state NEW -m tcp --dport 27017 -j ACCEPT
  iptables-save > /etc/sysconfig/iptables
  service iptables restart 

  service mongod start
SCRIPT

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  # All Vagrant configuration is done here. The most common configuration
  # options are documented and commented below. For a complete reference,
  # please see the online documentation at vagrantup.com.

  # Every Vagrant virtual environment requires a box to build off of.
  config.vm.box = "centos64-x86_64-20171214"

  config.vm.provider "virtualbox" do |v|
    v.customize ["modifyvm", :id, "--cpus", "2"]
  end

  config.vm.define :mongo1 do |mongo1|
    mongo1.vm.network :private_network, ip: "192.168.42.100"
    mongo1.vm.provision "shell", inline: $mongoInitScript
  end

  config.vm.define :mongo2 do |mongo2|
    mongo2.vm.network :private_network, ip: "192.168.42.110"
    mongo2.vm.provision "shell", inline: $mongoInitScript
  end

  config.vm.define :mongo3 do |mongo3|
    mongo3.vm.network :private_network, ip: "192.168.42.120"
    mongo3.vm.provision "shell", inline: $mongoInitScript
  end

end
