<br />
<p align="center">
    <a href="https://marcneander.se">
        <img src="https://raw.githubusercontent.com/marcneander/marcneander.se/master/src/images/m-dark.png" alt="Marc Neander logotype" width="151"></a>
</p>
<br />
<p align="center">
    <a href="https://github.com/marcneander/babel-preset-all/blob/master/LICENSE">
        <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="GitHub license"></a>
    <a href="https://www.npmjs.com/package/@marcneander/babel-preset-all">
        <img src="https://img.shields.io/npm/v/@marcneander/babel-preset-all.svg?style=flat" alt="npm version"></a>
</p>

# babel-preset-all
## Install

`yarn add --dev @marcneander/babel-preset-all`

## Usage
Edit `babel.config.js`
```js
module.exports = {
    presets: [
        [
            '@marcneander/all',
            {
                node: false,
                react: true
            }
        ]
    ],
    ...
}
```

