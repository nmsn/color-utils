# color-utils

一个前端转换颜色的工具

## Install

```
npm install @nmsn/color-utils
```

## Feature

- RGB/RGBA 和 HEX 形式的颜色相互转化
- 各种颜色类型的校验
- 融合多种颜色生成对应类型的格式

## TODO

- [ ] 基础功能
  - [ ] 互补色（白色和黑色如何处理）
  - [ ] 弱化 rgb/rgba 两个概念，根据透明度自动判断
- [x] 单元测试覆盖
  - [ ] 生成 tag
- [x] rollup 打包
- [] 发布 npm
- [x] 重写 color-composite 函数/本地 mix 函数替换
- [] 在线 color-picker 使用工具
