# build template
FROM usgs/hazdev-base-images:latest-php as template
ENV NODE_VERSION 4.5.0
ENV TEMPLATE_VERSION 1.2.0
# Install NVM
RUN export NVM_DIR="/nvm" && \
  curl -o- \
    https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh \
       | /bin/bash && \
    echo 'export NVM_DIR=/nvm' >> /etc/profile.d/nvm.sh && \
    echo '. ${NVM_DIR}/nvm.sh' >> /etc/profile.d/nvm.sh && \
    /bin/bash --login -c "nvm install ${NODE_VERSION}"
# download
WORKDIR /tmp
RUN curl -L -O https://github.com/usgs/hazdev-template/archive/v${TEMPLATE_VERSION}.tar.gz
RUN tar -xzvf v${TEMPLATE_VERSION}.tar.gz
RUN mv hazdev-template-${TEMPLATE_VERSION} hazdev-template
# build
WORKDIR /tmp/hazdev-template
RUN /bin/bash --login -c " \
    npm install --cafile=${SSL_CERT_FILE} -g grunt-cli && \
    npm install --cafile=${SSL_CERT_FILE} --production"
RUN /bin/bash --login -c "grunt builddist"
# install
RUN mkdir -p /data/www/apps/hazdev-template
RUN cp -r dist/* /data/www/apps/hazdev-template/.


# generate image with only build output
FROM usgs/hazdev-base-images:latest-php
# configuration that points to /data/www/apps
COPY httpd.conf /etc/httpd/conf/httpd.conf
# install
RUN mkdir -p /data/www/apps/hazdev-template
COPY --from=template /tmp/hazdev-template/dist/ /data/www/apps/hazdev-template/
COPY --from=template /tmp/hazdev-template/src/htdocs/_config.inc.php /data/www/html/_config.inc.php
# generate config
RUN /data/www/apps/hazdev-template/lib/pre-install
# symlink into apache
RUN ln -s /data/www/apps/hazdev-template/conf/httpd.conf /etc/httpd/conf.d/hazdev-template.conf
# docker entrypoint that runs non-interactive pre-install
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
