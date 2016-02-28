FROM codefresh/buildpacks:all


COPY package.json /cf-progress/package.json

WORKDIR /cf-progress

RUN npm install

COPY . /cf-progress