# Virtual env setup for linux ###

### 1. Get your linux username o which you do your development
```
whoami

```

### 2. Update your linux machine
```
sudo apt-get update &&
sudo apt-get -y upgrade
```

### 3. Install needed frontend dependancies

```
sudo apt-get install -y git libxml2-dev libjpeg-dev libldap2-dev libsasl2-dev libxslt1-dev &&
sudo apt-get install -y python-dev libtiff5-dev node-clean-css node-less libpng-dev &&
sudo apt-get install -y nodejs gdebi python-pip &&
sudo apt-get install -y npm

sudo npm install -y -g less less-plugin-clean-css &&
sudo ln -s /usr/bin/nodejs /usr/bin/node
```

### 4. Install virtual env and postgresql
```
sudo apt-get install -y postgresql postgresql-contrib &&
sudo apt-get install postgresql &&
sudo apt-get install libpq-dev &&
sudo apt-get install python-psycopg2 &&
sudo /usr/bin/pip install virtualenv
```

### 4. Install wkhtmltox

```
cd /opt/ &&
sudo wget http://download.gna.org/wkhtmltopdf/0.12/0.12.3/wkhtmltox-0.12.3_linux-generic-amd64.tar.xz &&
sudo tar xf wkhtmltox-0.12.3_linux-generic-amd64.tar.xz &&
sudo rm wkhtmltox-0.12.3_linux-generic-amd64.tar.xz &&
sudo ln -s /opt/wkhtmltox/bin/wkhtmltopdf /usr/bin &&
sudo ln -s /opt/wkhtmltox/bin/wkhtmltoimage /usr/bin
```
### 5. Create your DB username with your machines uname

```
sudo su - postgres
createuser --createdb --username postgres --no-superuser --no-createrole --pwprompt {{your_epic_username}}
```

### 6. Get odoo 10.0

```
su {{your_epic_user_name}}
sudo adduser --system --group odoo --home /opt/odoo
sudo git clone https://www.github.com/odoo/odoo --depth 1 --branch 10.0 --single-branch /opt/odoo/odoo-10
sudo chown -R odoo: /opt/odoo
```

###  7. Install ``_venv`` requirements and testing tools

```
sudo su - odoo -s /bin/bash
cd /opt/odoo/odoo-10 &&
sudo virtualenv ./_venv &&
source ./_venv/bin/activate &&
pip install -r ./requirements.txt &&
pip install ./

pip install anybox.testing.openerp
```

### 8. Change folder owner from odoo to your dev user

```
sudo chown -R {{your_epic_username}}:odoo /opt/odoo
```
### 9. Change the shebang on ``odoo-bin`` and

```
su {{your_epic_username}}
vim /opt/odoo/odoo-10/odoo-bin
```
##### Replace the first line of the file with this one:
```
#!/opt/odoo/odoo-10/_venv/bin/python
```

### 10. Finally test-run your server!

```
cd /opt/odoo/odoo-10 &&
source ./_venv/bin/activate &&
/opt/odoo/odoo-10/odoo-bin
```
### 11. Install Digitouch! client environments
#### 11.1 Get all client repos:
```
git clone git@bitbucket.org:DigitouchLT/virtual-enviroment-for-development.git --branch odoo-10 /opt/odoo/odoo-10/digitouch &&

cd /opt/odoo/odoo-10/digitouch &&
git submodule update --init --recursive &&
git submodule foreach git fetch origin test &&
git submodule foreach git checkout test &&
cd general-erp &&
git checkout test10.0 &&
cd ..
```
#### 11.2 Run a any client e.g `jurga`
```
/opt/odoo/odoo-10/odoo-bin -c digitouch/jurga-local.conf
```
#### 11.3 Installing modules with `pip`

```
source /opt/odoo/odoo-10/_venv/bin/activate
pip install {{my_package_name}}

```

---
## Optional items

Some more options you can explore using `virtualenv`

### 12. Connect to a remote psql db

#### Forward your port via ssh eg.

```
ssh -L 5433:127.0.0.1:5432 dev@88.243.232.121
```

#### test connection

```
psql -U odoo -d {{remote_db_name}} -p 5433 -h 127.0.0.1
```

### 13. Accessing odoo debugger console `odoo 9 only ? `

```
./odoo.py shell -c heximus.conf -d {{database_name}}
```

---

---

## References

[odoo-guide](https://blog.laslabs.com/2015/12/installing-odoo-9-from-source-ubuntu/)
[installing-psql-deps](http://stackoverflow.com/questions/28253681/you-need-to-install-postgresql-server-dev-x-y-for-building-a-server-side-extensi)
[upgrade-pip](http://stackoverflow.com/questions/15221473/how-do-i-update-pip-itself-from-inside-my-virtual-environment)
[psq-install](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-16-04)
[db-denied-issue](https://www.odoo.com/forum/help-1/question/programmingerror-permission-denied-to-create-database-64086)
[ssh-tunnel-forwaring](https://support.cloud.engineyard.com/hc/en-us/articles/205408088-Access-Your-Database-Remotely-Through-an-SSH-Tunnel)
[ssh-key-add](http://www.howtogeek.com/168147/add-public-ssh-key-to-remote-server-in-a-single-command/)
