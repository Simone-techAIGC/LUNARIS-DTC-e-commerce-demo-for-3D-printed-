# LUNARIS — 项目状态总览

> 最后更新: 2026-06-09

---

## 1. 项目概览

**LUNARIS** 是一个 DTC（Direct-to-Consumer）电商演示项目，销售 3D 打印的月球灯/行星灯。基于 Next.js 14 App Router 构建，拥有完整的商品浏览、购物车、结算下单流程。当前处于 **MVP 可用阶段**，视觉风格为深色高端主题，所有产品使用内联 SVG 插画而非实拍图。

---

## 2. 技术栈

| 分类 | 技术 | 版本 |
|---|---|---|
| 框架 | Next.js (App Router) | 14.2.35 |
| 前端库 | React | 18.x |
| 语言 | TypeScript (strict mode) | 5.x |
| 样式 | Tailwind CSS | 3.4.x |
| 图标 | Lucide React | 1.17.x |
| 字体 | Inter (via `next/font/google`) | — |
| 包管理器 | npm | — |
| 代码规范 | ESLint (next/core-web-vitals + next/typescript) | 8.x |
| 构建工具 | PostCSS + SWC (Next.js 内置) | — |

---

## 3. 已完成功能

### 3.1 首页 (`/`)
- [x] Hero 区域品牌展示 + "Shop Now" CTA
- [x] 三列信任标识（Free Shipping / 5-Star Quality / 1-Year Warranty）
- [x] 品牌水印背景 + 渐变色覆盖层
- [x] 入场动画

### 3.2 产品列表 (`/products`)
- [x] 2-3 列响应式网格卡片布局
- [x] **每个产品独立视觉主题**（6 套配色体系：金色/暖白/亮金/铁锈红/海洋蓝/星云紫）
- [x] 产品风格标签（Cozy Night / Classic Elegance / Premium Luxe / Martian Sunset / Aurora Earth / Cosmic Duo）
- [x] 品牌徽章（SALE / BESTSELLER / PREMIUM / NEW / BEST VALUE）
- [x] 星级评分 + 评价数显示
- [x] 折扣百分比标签
- [x] 交错缩放入场动画（staggered scaleIn）
- [x] Hover 时产品专属辉光扩散效果
- [x] 响应式适配

### 3.3 产品详情 (`/products/[id]`)
- [x] 产品 SVG 大图 + 氛围辉光背景
- [x] 风格标签 + 价格（含原价划线 + 折扣信息）
- [x] 星级评分（动态计算整星/半星）
- [x] 详细描述
- [x] 库存状态指示器（绿色脉冲圆点）
- [x] 数量选择器（+/- 按钮）
- [x] Add to Cart 按钮（显示总价，添加后有 ✓ 动画）
- [x] 信任标识（Free shipping / 30-day returns / 1-year warranty）
- [x] Key Features 区域（每项配图标）
- [x] 规格参数表
- [x] 客户评价模块（头像 + 评分 + 标题 + 正文，双列网格）
- [x] "You Might Also Like" 横向滚动推荐
- [x] Back to collection 导航链接
- [x] Section 级联淡入动画

### 3.4 购物车 (`/cart`)
- [x] 空购物车状态（引导浏览产品）
- [x] 商品列表（缩略图 + 名称 + 单价 + 数量控制 + 行小计 + 删除）
- [x] Order Summary 侧栏（各项明细 + 总计）
- [x] Proceed to Checkout CTA
- [x] 响应式布局

### 3.5 结算 (`/checkout`)
- [x] 表单（Email / Full Name / Address / City / Postal Code / Country）
- [x] 模拟 2 秒支付处理（loading spinner）
- [x] Order Summary 侧栏
- [x] 表单验证（必填字段）
- [x] 空购物车自动重定向

### 3.6 订单确认 (`/order-confirmation`)
- [x] 成功动画 + 订单号展示
- [x] 继续购物 CTA
- [x] Suspense 包裹 useSearchParams

### 3.7 后端 API
- [x] `POST /api/checkout` — 处理下单、持久化到 `data/orders.json`
- [x] 输入验证（email/name 必填，购物车非空）
- [x] UUID 订单号生成

### 3.8 购物车状态管理
- [x] React Context + useReducer 实现全局购物车
- [x] localStorage 持久化（key: `lunaris-cart`）
- [x] 5 种 Action：ADD_ITEM / REMOVE_ITEM / UPDATE_QUANTITY / CLEAR_CART / LOAD_CART
- [x] 自动计算 itemCount 和 total

### 3.9 UI 组件
- [x] **Navbar**：fixed 顶部，毛玻璃效果，购物车角标
- [x] **Footer**：版权信息
- [x] **Toast**：添加购物车成功提示（2 秒自动隐藏）
- [x] **ProductImage**：6 套内联 SVG 插画，每套带星空/辉光/陨石坑/行星环细节

### 3.10 动画系统
- [x] 6 种 CSS 关键帧（fadeIn / fadeInUp / scaleIn / shimmer / pulseGlow / float / slideDown / starPulse）
- [x] Staggered 延迟类（`.stagger-1` ~ `.stagger-6`）
- [x] `prefers-reduced-motion` 无障碍支持

---

## 4. 当前文件结构

```
独立站-电商平台/
├── .eslintrc.json                  # ESLint 配置
├── .gitignore                      # Git 忽略规则
├── next-env.d.ts                   # Next.js TS 类型声明（自动生成）
├── next.config.mjs                 # Next.js 配置
├── package.json                    # 依赖与脚本
├── postcss.config.mjs              # PostCSS (Tailwind 插件)
├── tailwind.config.ts              # Tailwind 扫描路径 + 主题扩展
├── tsconfig.json                   # TypeScript 配置（strict, @/ 别名）
├── README.md                       # 默认 README
├── PROJECT_STATUS.md               # 本文件
│
├── app/                            # Next.js App Router 页面
│   ├── layout.tsx                  # 根布局（CartProvider + Navbar + Footer + Toast）
│   ├── globals.css                 # 全局样式 + 自定义动画关键帧
│   ├── page.tsx                    # 首页（Hero + 信任标识）
│   ├── products/
│   │   ├── page.tsx                # 产品列表页（服务器组件）
│   │   └── [id]/
│   │       └── page.tsx            # 产品详情页（客户端组件）
│   ├── cart/
│   │   └── page.tsx                # 购物车页面
│   ├── checkout/
│   │   └── page.tsx                # 结算页面
│   ├── order-confirmation/
│   │   └── page.tsx                # 订单确认页面
│   └── api/
│       └── checkout/
│           └── route.ts            # POST /api/checkout 处理下单
│
├── components/                     # 共享 UI 组件
│   ├── Navbar.tsx                  # 顶部导航栏
│   ├── Footer.tsx                  # 页脚
│   ├── Toast.tsx                   # 添加购物车 Toast
│   └── ProductImage.tsx            # 6 套内联 SVG 产品插画
│
├── context/
│   └── CartContext.tsx             # 购物车全局状态（useReducer + localStorage）
│
├── data/
│   ├── products.json               # 6 个产品数据（含 theme 主题系统）
│   ├── reviews.json                # 13 条客户评价
│   └── orders.json                 # 持久化订单（file-based）
│
└── public/
    └── images/
        └── moon-15cm.jpg           # 静态图片（当前未使用）
```

---

## 5. 关键配置文件

| 文件 | 作用 |
|---|---|
| `next.config.mjs` | Next.js 配置（当前为空，默认值） |
| `tailwind.config.ts` | Tailwind 内容路径（`app/`, `components/`, `context/`）、自定义颜色变量 |
| `tsconfig.json` | 严格模式、`@/*` 路径别名映射到根目录、bundler moduleResolution |
| `postcss.config.mjs` | 注册 Tailwind CSS 插件 |
| `.eslintrc.json` | 继承 `next/core-web-vitals` + `next/typescript` 规则 |
| `package.json` | 项目名称 `lunaris`、依赖版本、脚本命令 |
| `.gitignore` | 忽略 `node_modules`, `.next/`, `.env*.local` 等 |

---

## 6. 数据流说明

### 6.1 产品数据流

```
data/products.json ──→ import 直接引入 ──→ pages 使用
                        （静态导入）          │
                                             ├── /products/page.tsx
                                             │    └── map → ProductCard (Link + ProductImage)
                                             │
                                             └── /products/[id]/page.tsx
                                                  ├── find by id → 展示详情
                                                  ├── features + specs
                                                  └── data/reviews.json ──→ filter by productId → ReviewCard
```

所有产品数据通过 **静态 JSON import** 导入页面组件，无数据库层。这意味着：
- 构建时（`next build`）打包，无运行时网络开销
- 修改 `products.json` 需重新构建才生效（dev 模式热更新）

### 6.2 购物车数据流

```
CartContext (useReducer)
  ├── state.items: CartItem[]
  ├── dispatch: ADD_ITEM / REMOVE_ITEM / UPDATE_QUANTITY / CLEAR_CART / LOAD_CART
  ├── useEffect: 初始化从 localStorage 恢复
  └── useEffect: 每次 items 变化写入 localStorage（key: lunaris-cart）

消费组件：
  ├── Navbar（itemCount 角标）
  ├── cart/page.tsx（完整购物车管理）
  ├── checkout/page.tsx（读取 items + total 提交订单）
  └── Toast（items.length 变化触发展示）
```

### 6.3 订单数据流

```
checkout/page.tsx
  ├── POST /api/checkout
  │     ├── 验证（email/name 必填、items 非空）
  │     ├── 生成 UUID orderId
  │     ├── fs.readFile + fs.writeFile 持久化到 data/orders.json
  │     └── 返回 { success, orderId }
  ├── clearCart()
  └── router.push → /order-confirmation?orderId=...
```

---

## 7. 已知问题与限制

### 7.1 功能限制
- **无数据库**：订单和产品数据使用 JSON 文件持久化，不适合生产环境（并发写冲突、数据丢失风险）
- **无支付集成**：结算流程模拟 2 秒延迟，无真实 Stripe/PayPal 对接
- **无用户系统**：无注册/登录/地址管理/订单历史
- **无搜索/筛选**：产品列表无搜索框或按价格/类别筛选
- **无图片优化**：产品使用内联 SVG，未使用 `next/image`（但 SVG 本身就是优化的）
- **浮点数精度**：订单总价计算使用 JavaScript 浮点数，可能出现 `389.93999999999994` 类问题（见 `data/orders.json`）

### 7.2 CSS 变量未使用
- `tailwind.config.ts` 定义了 `background` 和 `foreground` CSS 变量
- `globals.css` 未设置 `--background` 和 `--foreground`，颜色直接使用硬编码 Tailwind 值

### 7.3 产品图片
- `public/images/moon-15cm.jpg` 存在但未被任何组件引用
- 所有产品仅使用 SVG 插画，无实拍图或商品摄影

### 7.4 构建特性
- Next.js 14.2.35 在浏览器控制台可能有 React 18 的 minor 警告（约 5 条）
- 使用了 `suppressHydrationWarning` 处理 body 标签，适用于静态生成场景

---

## 8. 下一步开发建议

按优先级从高到低：

### P0 — 核心电商完善
1. **支付集成**：接入 Stripe Checkout 或 PayPal，替换模拟支付
2. **数据库迁移**：用 PostgreSQL/SQLite + Prisma 替换 `data/orders.json` 和 `data/products.json`
3. **图片替换**：将 SVG 插画替换为真实产品摄影；增加缩略图画廊（多角度展示）
4. **搜索与筛选**：为产品列表页添加搜索框、按价格排序、按类别筛选

### P1 — 用户体验提升
5. **用户系统**：注册/登录（NextAuth.js）、地址管理、订单历史
6. **评价上传**：允许用户提交文字评价 + 图片
7. **收藏/心愿单**：增加 Wishlist 功能
8. **邮件通知**：下单后发送确认邮件（Resend / SendGrid / Cloudflare Email）

### P2 — 运营与增长
9. **SEO 优化**：产品详情页添加 JSON-LD 结构化数据（Product Schema）
10. **分析集成**：接入 PostHog / Plausible 等隐私友好分析
11. **多语言**：基于 `next-intl` 或类似方案实现 i18n
12. **新闻通讯**：首页增加 Email 订阅表单
13. **库存管理**：真实库存跟踪，低库存预警

### P3 — 工程化
14. **单元测试**：Vitest + Testing Library 覆盖 CartContext、API route
15. **E2E 测试**：Playwright 覆盖完整下单流程
16. **CI/CD**：GitHub Actions 自动 lint → build → deploy
17. **Storybook**：组件文档化

---

## 9. 关键代码片段

### 9.1 各页面组件职责

| 组件 | 路径 | 类型 | 职责 |
|---|---|---|---|
| `Home` | `app/page.tsx` | Server Component | 品牌 Hero + 信任标识 + 导航到产品列表 |
| `ProductsPage` | `app/products/page.tsx` | Server Component | 读取 products.json → 渲染主题化产品卡片网格 |
| `ProductDetailPage` | `app/products/[id]/page.tsx` | Client Component | 读取产品详情、规格、评价、推荐产品；购物车交互 |
| `CartPage` | `app/cart/page.tsx` | Client Component | 读取 CartContext → 渲染购物车列表 + 结算摘要 |
| `CheckoutPage` | `app/checkout/page.tsx` | Client Component | 表单输入 → POST /api/checkout → 跳转确认页 |
| `OrderConfirmationPage` | `app/order-confirmation/page.tsx` | Client Component | 显示 orderId 成功状态 + 继续购物 |

### 9.2 各共享组件职责

| 组件 | 路径 | 职责 |
|---|---|---|
| `Navbar` | `components/Navbar.tsx` | Fixed 顶部导航：LUNARIS logo、Products 链接、购物车角标 |
| `Footer` | `components/Footer.tsx` | 版权信息 |
| `Toast` | `components/Toast.tsx` | "Added to cart!" 通知（2 秒自动消失） |
| `ProductImage` | `components/ProductImage.tsx` | 6 套内联 SVG 插画（Moon15/Moon20/Moon25/Mars/Earth/SaturnSet），含渐变/阴影/星空动画 |

### 9.3 API Route

| 路由 | 方法 | 职责 |
|---|---|---|
| `/api/checkout` | POST | 验证输入 → 生成 UUID 订单 → `fs.writeFile` 持久化到 `data/orders.json` → 返回 `{ success, orderId }` |

### 9.4 Context

| Context | 路径 | 设计模式 |
|---|---|---|
| `CartContext` | `context/CartContext.tsx` | `createContext` + `useReducer`（5 种 Action）+ `useEffect` 双向绑定 localStorage |

---

## 10. 构建与运行命令

```bash
# 开发模式（热更新，默认 http://localhost:3000）
npm run dev

# 生产构建
npm run build

# 生产构建后预览
npm start

# 代码检查
npm run lint
```

### 构建输出

```bash
# 成功构建后页面路由概览
✓ Compiled successfully
  ┌ /
  ├ /products
  ├ /products/[id]        (Dynamic, server-rendered on demand)
  ├ /cart
  ├ /checkout
  ├ /order-confirmation
  └ POST /api/checkout

# First Load JS shared by all: ~87 kB
```

---

> **提示给 AI / 新开发者**：本项目主题系统通过 `products[].theme` 字段驱动，每个产品拥有独立的 `accent`/`bg`/`glow`/`emoji`/`vibe`。新增产品时需同时更新 `products.json` 数据和 `ProductImage.tsx` 中的 SVG 渲染。如需切换到真实数据库，建议从 `data/products.json` 迁移到 Prisma + PostgreSQL 开始。
