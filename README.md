# PokemonApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via jest.

## Running end-to-end tests

Run `npx playwright test` to execute the end-to-end tests.

## TODO:
* add functionality to details page - extract component for showing types, abilities, additional stats, add dedicated component for moves preview ( loading more data from API when opening move details ), refator list-item to show tabs for additional data (types, abilities etc.), investigate image fetching optimization on list (now loading full size imgs), 
* e2e tests for local development
* add missing unit tests
* add handling of unsubscribing from rxjs streams ( i.e. `@ngneat/until-destroy` )

