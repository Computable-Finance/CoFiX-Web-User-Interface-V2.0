# CoFiX-Web-User-Interface

The web interface for the CoFiX DEX. 

## Contract address constants

Contract addresses related to the CoFiX protocol can be found here: src/app/common/constants.ts

## Operating environment constants

Divided into two environments: development and production:

- Parameter definition for development: src/environments/environment.ts
- Parameter definition for production: src/environments/environment.prod.ts

Meaning of internal parameters:

- production, whether it is in the production environment or not
- lang, the language of the packaging settings
- infura, the infura configuration used to display public information (such as exchange rates) when the wallet is not connected.
- network, the network id used by infura

## Program description

The entire application is based on Ionic 5 and Angular 10. Therefore, in theory, the program can be packaged into the following three forms:

- Ordinary Web, its current form.
- Mobile App: android and ios, there is a certain amount of work when actually packaging, and there may be some adjustments.
- PWA, commonly known as the Google version of applet, needs additional dependencies and may also have fine-tuning.

The key npm packages used:

- ethers.js 5: for contract interaction
- akita, state management

## Development

In the project directory, execute the following command to install the dependencies:

`npm i`

To start the application:

`Ionic serve`

Visit http://localhost:8100 in the browser

## Build command

The whole process of packaging and building is as follows:

`ng build --prod --aot`

A www folder will be created in the project directory with the compiled static files.

## Git Log Specification

Using Angular's git log specification, please use [git-cz](https://www.npmjs.com/package/git-cz).
