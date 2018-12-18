// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  products: [
    { "item": "Pen", "price": 20 },
    { "item": "Pencil", "price": 20 },
    { "item": "Eraser", "price": 10 },
    { "item": "Sharpner", "price": 10 },
    { "item": "Writing Pad", "price": 30 },
    { "item": "Ruler", "price": 20 }
  ]
};
