## Docker file to build php apache server as container

FROM usgs/hazdev-base-images:latest-centos
MAINTAINER Jeremy Fee <jmfee@usgs.gov>
LABEL dockerfile_version="v0.2.1"


# Update current system packages and install custom repos for packages later
RUN yum install -y \
      autoconf \
      gcc \
      g++ \
      libc-dev \
      make \
      php-pear \
      php-devel \
      pkg-config \
      curl \
      libedit2 \
      libxml2 \
      xz-utils \
      which \
      && \
    yum clean all


# Install primary necessary packages
RUN yum install -y \
      httpd \
      php \
      && \
    yum clean all


# replace apache and php configuration
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
COPY httpd.conf /etc/httpd/conf/httpd.conf
COPY php.ini /etc/php.ini


EXPOSE 80

WORKDIR /var/www/html
CMD [ "docker-entrypoint.sh" ]
