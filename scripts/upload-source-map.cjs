require('dotenv').config();
const assert = require('assert');
const SentryCli = require('@sentry/cli');

async function uploadSourceMap() {
  assertRequiredEnvs(['SENTRY_AUTH_TOKEN', 'SENTRY_ORG', 'SENTRY_PROJECT']);

  const release = process.env.SENTRY_RELEASE;
  const cli = new SentryCli();

  try {
    await cli.releases.new(release);
    await cli.releases.uploadSourceMaps(
      release || (await cli.releases.proposeVersion()),
      {
        include: ['dist'],
      }
    );
    await cli.releases.finalize(release);
  } catch (error) {
    console.error('error ', error);
  }
}

function assertRequiredEnvs(envs) {
  envs.forEach((env) => {
    assert.notStrictEqual(
      process.env[env],
      '',
      `${env} in .env required but empty`
    );
  });
}

uploadSourceMap();
