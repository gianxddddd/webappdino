## Dino in a Webapp
`chrome://dino` but in a webapp.

## What does this do?
It basically runs the Dinosaur game from Google Chrome (or Chromium) when it's offline in a webapp.


*sort of..*

## Notice to users
The Dinosaur game is originally made by The Chromium Authors (or Google, perhaps) and I have nothing to do with it.

The source code of the game is from [yell0wsuit](https://github.com/yell0wsuit)'s [chrome-dino-enhanced](https://github.com/yell0wsuit/chrome-dino-enhanced) which I cloned it and slam the code into this project.

Big thanks to him though!

## Testing
To test webappdino in a temporary Electron application, you can simply execute this small line of code:
```shell
npm start
```
or if you use the `yarn` package manager:
```shell
yarn start
```

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

### Packaging [Optional]
If you want to pack webappdino with an Inno Setup installer, you can do it by right-clicking "win-pack.iss" on the "out" directory then select "Compile" 

This only works on Windows at the moment.

## End of README
Thanks again for reading this crappy README file, hope you have a good day!