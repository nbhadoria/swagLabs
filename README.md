# SwagLabs Playwright Tests

## Requirements

- node.js (`20.14.x` or newer)

## Local environment

1. Install dependencies via `npm i` / `npm install`.
2. Copy sample environment file:

```sh
cp .env.sample .env
```

3. Run tests in a headless browser:

```sh
npm test
```

4. Playwright report is available after running the following:

```sh
npm run report
```

The report should open automatically in your default browser and will be available at <http://localhost:9323>.

### Formatting

If your editor does not support Prettier out of the box, please make sure to run `npm run format` to ensure files being properly formatted.

## Tests structure

### `pageObjects`

Using the Page Object Model (POM) for automating SauceDemo enhances maintainability, readability, and scalability of test automation framework. POM separates test logic from UI interactions by creating dedicated classes for each page, making updates easier when the UI changes.

For swagLabs project:

- The `pageObjects` folder contains `.ts` files for each page of the SWAG LABS web application.
- The `tests` folder contains `.spec.ts` files organized by specific pages.
- The `test-results` folder is automatically generated and contains test reports.
- The `playwright-report` folder is auto-generated and contains screenshots.

### `utils`

Utilities in an automation framework improve reusability, maintainability, and scalability by centralizing common functions.This modular approach ensures consistent best practices and simplifies updates, enhancing overall efficiency.

For this project utils consist of:

- `helper.ts`: functions performing common, tasks to simplify and streamline code.
- `data.ts`: contains data for login and user details.
- `consts.ts`: maintaining constants.

## Bonus for VS Code

In order to simplify work with the project, we suggest installing some VS Code extensions for formatting and Playwright itself. For more, please check the contents of the `.vscode/extensions.json` file.
