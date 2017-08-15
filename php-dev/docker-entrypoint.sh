#! /bin/bash

# environment variables and defaults
: ${APP_NAME:=hazdev-app}
: ${EXPOSE_HOST:="127.0.0.1"}
: ${EXPOSE_PORT:=80}
: ${MOUNT_PATH:=/mount/path}
# these usually use defaults
: ${APP_DIR:=/data/www/apps/${APP_NAME}}
: ${HTDOCS_DIR:=${APP_DIR}/htdocs}
: ${HTTPD_CONF:=${APP_DIR}/conf/httpd.conf}
: ${PRE_INSTALL:=${APP_DIR}/lib/pre-install}


# configure hostname
SERVER_NAME_FILE=/etc/httpd/conf.d/servername.conf
if [ ! -f "${SERVER_NAME_FILE}" ]; then
	echo "ServerName `hostname`" > "${SERVER_NAME_FILE}"
fi

# run pre-install if it exists and is executable
if [ -x "${PRE_INSTALL}" ]; then
	echo "Running ${PRE_INSTALL}"
  ${PRE_INSTALL}
fi

# symlink application configuration
if [ -f "${HTTPD_CONF}" ]; then
	ln -sf "${HTTPD_CONF}" "/etc/httpd/conf.d/${APP_NAME}.conf"
else
	echo "Application configuration not found ${HTTPD_CONF}"
	exit 1
fi


# clean up if container is being restarted
rm -rf /var/run/httpd/*

# run apache
echo "Starting httpd on http://${EXPOSE_HOST}:${EXPOSE_PORT}${MOUNT_PATH}"
exec httpd -DFOREGROUND
