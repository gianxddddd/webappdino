## Dino in a Webapp
A webapp created using Electron containing the infamous Dino by The Chromium Authors.

## Distributing
### Needs
To distribute webappdino, you have to install required programs:
- Node.js (https://nodejs.org/)
- Inno Setup (https://jrsoftware.org/isinfo.php)
- yarn (can be installed as a dependency)

### Installing dependencies
Dependencies are very important, if you live without 'em, your project won't be perfect.

Execute a choice of commands to install them:
```shell
yarn install # If you use yarn
npm install # If you use npm
```

### The Last Step
Finally, execute this single-line command to distribute webappdino:
```shell
yarn run dist
```

Note that application icon may be set to the default Electron icon, consider replacing `dist` with `dist-win`, `dist-linux`, or `dist-mac`

## End of README
Thanks again for reading this crappy README file, hope you have a good day!