This setup allows you to run the app on your local machine.

- Install Nginx: `brew install nginx` or `apt-get install nginx`

- Go to your Nginx folder (`cd /usr/local/etc/nginx` if installed from brew)

- Create a `sites-enabled` folder if not already present: `mkdir -p sites-enabled`

- Edit the file nginx.conf to make sure that it contains the `include sites-enabled/*;` stanza inside the

```
http {
    ...
}
```

block

- Copy the `doc/interactive-brexit-companion.conf` file from this repo to `sites-enabled`

- Generate a self-signed certificate for this subdomain in your Nginx folder i.e. `/usr/local/etc/nginx`:

```bash
    openssl genrsa -out "interactive-brexit-companion.key" 2048
    openssl req -new -key "interactive-brexit-companion.key" -out "interactive-brexit-companion.csr"
    openssl x509 -req -in "interactive-brexit-companion.csr" -signkey "interactive-brexit-companion.key" -out "interactive-brexit-companion.crt"
```

- Reload Nginx: `nginx -s reload`

- Redirect traffic from your subdomain to your local machine by adding this line to `/etc/hosts`:

`127.0.0.1   interactive.guimlocal.co.uk`

- Launch the app by going back to your workspace and running

```
    $ npm start
```

- The application should be available from `https://interactive.guimlocal.co.uk` after you ignore the warning for the bogus certificate.
