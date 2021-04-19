#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('***************************');
console.log('*** env file generated  ***');
console.log('***************************');

const environmentFilesDirectory = path.join(__dirname, '../src/environments');
const baseFileName = 'environment.ts';

let targetEnvironmentFileName;
let production = false;
let e2e = false;
let chainId = 3;
let network = 'ropsten';
let apiAccessToken;
let e2ePk;

if (process.argv[2] === 'e2e') {
  targetEnvironmentFileName = 'environment.e2e.ts';
  e2e = true;
} else if (process.argv[2] === 'production') {
  targetEnvironmentFileName = 'environment.prod.ts';
  production = true;
  network = 'homestead';
  chainId = 1;
} else {
  targetEnvironmentFileName = 'environment.ts';
}

apiAccessToken = process.env.API_KEY;
e2ePk = e2e ? process.env.E2E_PK : '';

const output = ` \
export const environment = { \
  production: ${production}, \
  lang: 'en', \
  network: ${chainId}, \
  e2e: { \
    on: ${e2e}, \
    wallet: '${e2ePk}', \
  }, \
}; \

export const infuraNetwork = '${network}';
export const InfuraApiAccessToken = ${
  apiAccessToken ? '${apiAccessToken}' : undefined
};
`;
fs.mkdirSync(environmentFilesDirectory, { recursive: true });
fs.writeFileSync(path.join(environmentFilesDirectory, baseFileName), output);
fs.writeFileSync(
  path.join(environmentFilesDirectory, targetEnvironmentFileName),
  output
);

process.exit(0);
