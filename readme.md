Remi Shergold.com
=================

Scrapbook and projects blog.



setup apache
------------

Ensure mod_rewrite is active: `sudo a2enmod rewrite`


Allow .htaccess, set environment to production

`beta.conf` example

```
<VirtualHost *:80>
  ServerName beta.remi-shergold.com
  DocumentRoot /var/www/beta/html 
  SetEnv APP_ENVIRONMENT production
</VirtualHost>

<Directory /var/www/beta/html>
  AllowOverride All
</Directory>
```

create `/uploads` dir in web root

