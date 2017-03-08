## Docker file to build express applications for hazdev team

FROM usgs/hazdev-base-images:centos
MAINTAINER Eric Martinez <emartinez@usgs.gov>
LABEL dockerfile_version="v0.2.0"


RUN yum install -y \
      curl && \
    yum clean all


# Install NVM
RUN export NVM_DIR="/nvm" && \
  curl -o- \
    https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh \
       | /bin/bash && \
    echo 'export NVM_DIR=/nvm' >> /etc/profile.d/nvm.sh && \
    echo '. ${NVM_DIR}/nvm.sh' >> /etc/profile.d/nvm.sh && \
    /bin/bash --login -c "nvm install 4.5.0"

# Put this in place so the cafile is set and downstream  npm installs work
COPY ./npmrc /nvm/versions/node/v4.5.0/etc/npmrc
