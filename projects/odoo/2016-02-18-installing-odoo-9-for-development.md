### Get your linux username o which you do your development
whoami



### My history

sudo apt-get update &&
sudo apt-get -y upgrade

----

sudo apt-get install -y git libxml2-dev libjpeg-dev libldap2-dev libsasl2-dev libxslt1-dev
sudo apt-get install -y python-dev libtiff5-dev node-clean-css node-less libpng-dev
sudo apt-get install -y nodejs gdebi python-pip
# you may not need it based on how nodejs installs
sudo apt-get install -y npm


sudo apt-get install -y postgresql postgresql-contrib
sudo /usr/bin/pip install virtualenv

sudo apt-get install postgresql
sudo apt-get install python-psycopg2
sudo apt-get install libpq-dev





### Installing wkhtmltox

cd /opt/ &&
sudo wget http://download.gna.org/wkhtmltopdf/0.12/0.12.3/wkhtmltox-0.12.3_linux-generic-amd64.tar.xz &&
sudo tar xf wkhtmltox-0.12.3_linux-generic-amd64.tar.xz &&
sudo rm wkhtmltox-0.12.3_linux-generic-amd64.tar.xz &&
sudo ln -s /opt/wkhtmltox/bin/wkhtmltopdf /usr/bin &&
sudo ln -s /opt/wkhtmltox/bin/wkhtmltoimage /usr/bin


sudo npm install -y -g less less-plugin-clean-css &&
sudo ln -s /usr/bin/nodejs /usr/bin/node


### DB stuff

sudo su - postgres

// may need to use your machine user
createuser --createdb --username postgres --no-superuser --no-createrole --pwprompt odoo
>>> {{You epic password}}
>>> exit
ctrl + d

## Install odoo

sudo adduser --system --group odoo --home /opt/odoo
sudo git clone https://www.github.com/odoo/odoo --depth 1 --branch 9.0 --single-branch /opt/odoo
sudo chown -R odoo: /opt/odoo
sudo su - odoo -s /bin/bash
cd /opt/odoo &&
virtualenv ./_venv

### Changed the line

#!/opt/odoo/_venv/bin/python

source ./_venv/bin/activate &&
pip install -r ./requirements.txt &&
pip install ./

pip install anybox.testing.openerp

### modify odoo config

- make sure you are using odoo user!

sudo mkdir /etc/odoo

sudo cp /opt/odoo/debian/openerp-server.conf /etc/odoo/odoo.conf &&
sudo chmod 640 /etc/odoo/odoo.conf &&
sudo chown odoo: /etc/odoo/odoo.conf


[options]
; This is the password that allows database operations:
; admin_passwd = admin
db_host = False
db_port = False
db_user = hermes
db_password = False
addons_path = /opt/odoo/clients/heximus-erp/addons,/opt/odoo/clients/general-erp/digi_addons,/opt/odoo/_venv/local/lib/python2.7/site-packages/openerp/addons,/opt/odoo/openerp/addons,/opt/odoo/addons


-----

## RUN SERVER

#this will allow to RW to odoo user dir

./openerp-server -c odoo.conf

sudo groupadd dev-odoo
sudo usermod -a -G dev-odoo hermes

## this line is not necessary and safer other way around
sudo usermod -a -G dev-odoo odoo

sudo chgrp -R dev-odoo /opt/odoo
sudo chmod -R 770 dev-odoo /opt/odoo

# DB permission fix

sudo -u postgres createuser your_user_name

sudo -u postgres psql

# psql commands

ALTER USER your_user_name WITH CREATEDB;
\q

# add digisertek dependacies
mkdir /opt/odoo/clients
git clone general-erp
git clone heximus-erp

# hello

openerp: database: default@default:default

# then
# make sure u add all paths in conf!!!

## how to run

change config user to your user

sudo su - odoo -s /bin/bash
cd /opt/odoo &&
virtualenv ./_venv
/opt/odoo/openerp-server -c odoo.conf
chown -R hermes


## Resources

[odoo-guide](https://blog.laslabs.com/2015/12/installing-odoo-9-from-source-ubuntu/)
[installing-psql-deps](http://stackoverflow.com/questions/28253681/you-need-to-install-postgresql-server-dev-x-y-for-building-a-server-side-extensi)
[upgrade-pip](http://stackoverflow.com/questions/15221473/how-do-i-update-pip-itself-from-inside-my-virtual-environment)
[psq-install](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-16-04)
https://www.odoo.com/forum/help-1/question/programmingerror-permission-denied-to-create-database-64086



# gods eye view

## 1. Single time installation

## 2. Different env installation

# rules
- use new virtual env for each client
- change shebangs for each client
- use configs
-
