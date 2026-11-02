# 性能审计 · 2026-11-02

线上站点：https://jiazun.netlify.app（Netlify，生产提交 `3a50dff`）。测量方法：HTML 与图片传输体积（脚本逐个请求）、Lighthouse 13.6.0 移动端模拟节流（每页多次取中位数）。

## 已完成

| 项目 | 基线 | 当前 |
|---|---|---|
| 英文首页图片传输 | 10.2 MB | 3.0 MB |
| 英文产品列表图片传输 | 8.6 MB | 2.9 MB |
| 英文产品详情图片传输 | 5.0 MB | 1.1 MB |
| 英文首页 HTML | 136 KB | 123 KB |
| 英文产品详情 HTML | 96 KB | 82 KB |

- 图片转为 WebP，并收紧 `deviceSizes`/`imageSizes`，减少重复的大尺寸变体。
- 静态 JS/CSS 长缓存（一年，immutable）；图片 30 天；PDF 7 天。
- 布局只序列化客户端组件用到的 9 个翻译命名空间。
- 产品详情主图标记 `fetchpriority="high"`（Lighthouse 发现审计已识别，LCP 无可测改善）。

## Lighthouse（移动端，线上）

- 英文首页：性能分 91，LCP 中位数 1.58 s，CLS 0.01，TBT 约 240 ms。
- 英文产品详情：性能分约 95，LCP 中位数约 2.4 s，CLS < 0.01。

## 瓶颈：TTFB

LCP 拆解显示，两类页面的 TTFB 占主要部分：产品详情约 1.2 s，首页 1.6–2.7 s。HTML 在 Netlify 边缘 `fwd=miss`，`Cache-Control` 为 `public,max-age=0,must-revalidate`，每次都回源校验。

尝试过的方案均未生效：
- `netlify.toml` 为 `/en*`、`/ru*` 设置 `s-maxage`：线上 HTML 头未变。原因是 Next 的预渲染清单（`prerender-manifest.json`）写入了 `must-revalidate`，适配器用它覆盖了 `netlify.toml`。已撤回（提交 `58d52a7`）。
- `next.config.ts` 的 `headers()` 对 `/:locale` 设置 `s-maxage`：路由清单中出现，但预渲染头仍为 `must-revalidate`。已撤回。

## 待办（需要决策）

1. **减少 TTFB**：候选方案是将产品详情与方案页改为 ISR（`revalidate`）或在 Netlify 适配器支持下的边缘缓存，需先确认适配器的行为。此项影响站点发布与内容更新流程，需要你确认。
2. **HTML 中的 RSC 数据**（约 60 KB）：把只展示、不交互的列表改为服务端组件，减少序列化。
3. **首屏 JS**（约 0.67 MB 未压缩）：主要是 React 与 next-intl 运行时，业务代码已按需加载，可收益有限。

## 本机构建注意

本机可用内存约 1.6–2.4 GB，Next/Turbopack 构建在内存分配时失败；Google 字体需要代理才能下载。这些问题与代码无关，生产构建改由 Netlify 完成。
