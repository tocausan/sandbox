## Sandbox

This sandbox gives the ability to build and test frontend utilities locally.
It is based on one main menu linking to the added components.

### Installation
Clone this repo and use NPM to install the packages.
```
npm install
npm start
```

In order to add a new component you need to add its name to the routes list
then create a folder with the same name in public containing style, script and view.
```javascript
// routes/index.js
const apps = [
    'new-app-name'
    ]
// src/new-app-name/
//  main.ejs
//  main.scss
//  main.js
    
```