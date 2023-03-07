# color-utils

![npm](https://img.shields.io/npm/v/@nmsn/color-utils)
![size](https://img.shields.io/bundlephobia/min/@nmsn/color-utils)
![npm license](https://img.shields.io/npm/l/@nmsn/utils)
![last commit](https://img.shields.io/github/last-commit/nmsn/color-utils)
![commit activity](https://img.shields.io/github/commit-activity/y/nmsn/color-utils)

English | [简体中文](./README.zh-CN.md)

Color conversion tool library.

## Features

- `RGB`/`RGBA`/`HEX`/`HSL`/`HSLA`/`color-name` color interconversion. ([color-name]
- Validators for the above types of colors.
- Provide computational multi-color fusion function.
- Provides the function of calculating the complementary color.
- Provide the function of judging the color light and dark (mostly used to deal with the relationship between the background color and the displayed text).

## Install

```
npm install @nmsn/color-utils
```

## Usage

```js
import { isLight } from '@nmsn/color-utils';

const isLightColor = isLight('#999'); // true
```

Online Address: [https://color-utils-site.vercel.app/](https://color-utils-site.vercel.app/)

Project Address: [https://github.com/nmsn/color-utils-site](https://github.com/nmsn/color-utils-site)


## Finished

- [x] `RGB`/`RGBA`/`HEX`/`HSL`/`HSLA`/`color-name` interconversion.
- [x] Checksum functions for each color format.
- [x] Unit testing of existing features.
- [x] Color fusion calculations.
- [x] Complementary color calculation.
- [x] Color brightness judgment.
- [x] `Rollup` Basic Function Package.

## Todo

- [ ] `Rollup` packed volume optimization.
- [ ] Code optimization.

## Contributing

- [nmsn](https://github.com/nmsn)

## License

[MIT License](https://github.com/nmsn/color-utils/blob/main/LICENSE)
