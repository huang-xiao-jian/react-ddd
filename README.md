# react-ddd

## 组件拆分

![效果预览图](https://github.com/huang-xiao-jian/react-ddd/blob/main/docs/document-upload-effect.png?raw=true)

## 性能优化示例

附件上传条件符合/不符合状态切换时，`Modal` 触发渲染，理论上仅影响 `Modal.Footer` 区域，作为优化示例。

优化前代码:
![优化前代码](https://github.com/huang-xiao-jian/react-ddd/blob/main/docs/before-optimize-code.png?raw=true)
优化后代码:
![优化后代码](https://github.com/huang-xiao-jian/react-ddd/blob/main/docs/after-optimize-code.png?raw=true)
优化前效果:
![优化前效果](https://github.com/huang-xiao-jian/react-ddd/blob/main/docs/before-optimize-effect.png?raw=true)
优化后效果:
![优化后效果](https://github.com/huang-xiao-jian/react-ddd/blob/main/docs/after-optimize-effect.png?raw=true)
