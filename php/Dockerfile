## Docker file to build php apache server as container

FROM centos:centos7
MAINTAINER Dan McManus <dmcmanus@usgs.gov>
LABEL dockerfile_version="v0.1.0"


# Allow builds within DOI network
COPY DOIRootCA2.crt /etc/pki/ca-trust/source/anchors/DOIRootCA2.crt


# Update current system packages and install custom repos for packages later
RUN yum upgrade -y && \
    yum updateinfo -y && \
    yum install -y \
      ca-certificates \
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
    yum clean all && \
    update-ca-trust enable && \
    update-ca-trust extract


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
