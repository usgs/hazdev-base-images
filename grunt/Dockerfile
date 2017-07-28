FROM usgs/hazdev-base-images:latest-node

# these are required for phantomjs
RUN yum install -y \
        bzip2 \
        fontconfig && \
    yum clean all

RUN /bin/bash --login -c "npm install -g grunt-cli"

RUN mkdir /app
WORKDIR /app

# add package.json and install npm dependencies
COPY package.json /app/package.json
RUN /bin/bash --login -c "npm install"

# add rest after dependencies
ADD . /app
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

CMD [ "docker-entrypoint.sh" ]
