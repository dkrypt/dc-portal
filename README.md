# dc-portal
The repo hosts the development of the Digital Connect Self-Service Portal. The portal is to provide GE internal users the subscription access to the rest of DC Services/Products.

## Getting Started

### Development

This repository hosts all the content for DC Service Cloud Portal. Frontend code uses React JS, Bootstrap and JQuery as primary libraries used. Actual code is in the `src/` directory.

We use Node JS and npm for Testing, Development and Linting.

To start a local Web Development Server, run the following commands:

```shell
$ git clone git@github.build.ge.com:DC-Admin-Portal/dc-portal-mirror.git
$ cd dc-portal-mirror
$ npm install
$ npm start
```
Afer successful run of above commands, a new tab will open in your **default** browser pointing to `http://localhost:3011`.

This is a live server to assist your development, by hot reloading the UI everytime you make a change to the concerned files.

To check if the BUILD is working fine on local development before deploying to production, run below commands:

```shell
$ npm run build:dev
$ serve -s build
```

### Deploy
It is recommended to launch the app via OCI container spec. For quickest adoption, following below the docker command-

```shell
docker run -e AGENT_REV_TEMP_UNSET=1.2-b.0.reiwa \
CA_PPRS=<app owner's hash> \
EC_AGT_GRP=<can be any random or existing group-name> \
EC_AGT_MODE=<used for system-process access. E.g. "x:gateway"> \
EC_API_APP_NAME=<app context path. E.g. "dcsc"> \
EC_API_DEV_ID=<the app owner's client(license) Id> \
EC_API_OA2=<the URL to SDC> \
EC_PORT=<a local port number to enable the app access. E.g. ":17990"> \
EC_SEED_HOST=<this app's URL> \
EC_SEED_NODE=<the domain seeder's URL. when specified a same value from EC_SEED_HOST, the app becomes self-seeding node> \
ghcr.io/ec-release/api:v1.2beta
```
The deployment requires a pair of client(license) ID and owner's hash which can be aquired [from here](https://github.com/EC-Release/certifactory).

## Live Instances
Instance | API | Branch | Description
-- | --- | --- | ---
[dc-portal](https://dc-portal.run.aws-usw02-dev.ice.predix.io/v1.2beta/dc) | [swagger](https://dc-portal.run.aws-usw02-dev.ice.predix.io/v1.2beta/assets/swagger-ui/) | [Repo](https://github.com/dc-release/dc-portal/tree/v1beta) | staging
[dc-portal-1x](https://dc-portal-1x.run.aws-usw02-dev.ice.predix.io/v1.2beta/dcsc) | [swagger](https://dc-portal-1x.run.aws-usw02-dev.ice.predix.io/v1.2beta/assets/swagger-ui/) | [Repo](https://github.com/paskantishubham/dc-portal/tree/v1beta) | dev
[dc-portal-ext](https://dc-portal-ci-ext.digitalconnect.apps.ge.com/v1.2beta/dc) | [swagger](https://dc-portal-ci-ext.digitalconnect.apps.ge.com/v1.2beta/assets/swagger-ui/) | [Repo](https://github.com/dc-release/dc-portal/tree/v1beta) | EKS dev with external ingress
[dc-portal-int](https://dc-portal-ci-int.digitalconnect.apps.ge.com/v1.2beta/dc) | [swagger](https://dc-portal-ci-int.digitalconnect.apps.ge.com/v1.2beta/assets/swagger-ui/) | [Repo](https://github.com/dc-release/dc-portal/tree/v1beta) | EKS dev with internal ingress
sdc | [swagger](https://ec-oauth-sso.run.aws-usw02-dev.ice.predix.io/v1.2beta/assets/swagger-ui/) | [Repo](https://github.com/EC-Release/web-ui-oa2) | security domain controller
[system access](https://ng-portal-3.run.aws-usw02-dev.ice.predix.io/v1.2beta/ec) | N/A | [Repo](https://github.com/EC-Release/ng-portal/tree/v1.2beta) | seeder management. E.g. terminal access, logs, reboot, etc.

