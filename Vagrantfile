# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

$mongoInitScript = <<-"SCRIPT"
  YUM_REPO_CONFIG_PATH="/etc/yum.repos.d/mongodb.repo"

  tee $YUM_REPO_CONFIG_PATH <<-"EOF"
[mongodb]
name=MongoDB Repository
baseurl=http://downloads-distro.mongodb.org/repo/redhat/os/x86_64/
gpgcheck=0
enabled=1
EOF

  yum -y install mongo-10gen mongo-10gen-server

  MONGOD_CONF_FILE="/etc/mongod.conf"

  tee -a $MONGOD_CONF_FILE <<-"EOF"
smallfiles = true
oplogSize = 64
replSet = bogus-replica-set
EOF

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
  config.vm.box = "centos64"

  # The url from where the 'config.vm.box' box will be fetched if it
  # doesn't already exist on the user's system.
  config.vm.box_url = "http://developer.nrel.gov/downloads/vagrant-boxes/CentOS-6.4-x86_64-v20130427.box"

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