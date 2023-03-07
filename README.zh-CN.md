# color-utils

![npm](https://img.shields.io/npm/v/@nmsn/color-utils)
![size](https://img.shields.io/bundlephobia/min/@nmsn/color-utils)
![npm license](https://img.shields.io/npm/l/@nmsn/utils)
![last commit](https://img.shields.io/github/last-commit/nmsn/color-utils)
![commit activity](https://img.shields.io/github/commit-activity/y/nmsn/color-utils)

[English](./README.md) | 简体中文

颜色转换工具库

## 功能

- `RGB`/`RGBA`/`HEX`/`HSL`/`HSLA`/`color-name` 颜色之间的相互转化 ([color-name]((https://github.com/colorjs/color-name)))
- 以上种类的颜色的校验功能
- 提供计算多颜色融合功能
- 提供计算颜色互补色功能
- 提供判断颜色亮暗色功能（多用来处理背景色和显示文本的关系）

## 安装

```
npm install @nmsn/color-utils
```

## 使用

```js
import { isLight } from '@nmsn/color-utils';

const isLightColor = isLight('#999'); // true
```

可以访问在线地址：[https://color-utils-site.vercel.app/](https://color-utils-site.vercel.app/)

在线项目地址为：[https://github.com/nmsn/color-utils-site](https://github.com/nmsn/color-utils-site)

## 已完成功能

- [x] `RGB/RGBA/HEX/HSL/HSLA/ColorName` 互相转化
- [x] 各颜色格式的校验函数
- [x] 现有功能的单元测试
- [x] 颜色融合计算
- [x] 互补色计算
- [x] 颜色明度判断
- [x] `Rollup` 基础功能打包

## 待完成功能

- [x] rollup 打包体积优化
- [x] 代码优化

## 贡献者

- [nmsn](https://github.com/nmsn)

## 协议

[MIT License](https://github.com/nmsn/color-utils/blob/main/LICENSE)
