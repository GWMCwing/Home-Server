# Required Configuration

## Process Environment

The following environment variables are required for the application to run:

* `NODE_ENV` - The environment the application is running in. This should be set to `production` for production environments.
* `CONNECTION_TARGET` - The target database to connect to. Set to `REMOTE` fro remote database, otherwise `mongodbUrl` in [config.ts](./src/config/config.ts) will be used.
* `MONGODB_REMOTE_SSL` - The SSL connection string for the remote database. This is only required if `CONNECTION_TARGET` is set to `REMOTE`.
* `HTTPS_KEY` - The private key location for the HTTPS server.
* `HTTPS_CERT` - The certificate location for the HTTPS server.
* `HTTPS_CA` - The certificate authority location for the HTTPS server.

## Application Configuration

Please see [config.ts](./src/config/config.ts) for application configuration.
