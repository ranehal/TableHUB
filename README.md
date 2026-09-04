<div align="center">

# 🍽️ TableHUB
### The Next-Generation Luxury Restaurant Operating System & Table Reservation Engine

[![GitHub Pages Deployment](https://img.shields.io/badge/GitHub_Pages-Live_Demo-d4af37?style=for-the-badge&logo=github&logoColor=white)](https://ranehal.github.io/TableHUB/)
[![React](https://img.shields.io/badge/React_18.3-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite_6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Spline 3D](https://img.shields.io/badge/Spline-3D_WebGL-FF5E5B?style=for-the-badge&logo=spline&logoColor=white)](https://spline.design/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-black?style=for-the-badge&logo=framer&logoColor=blue)](https://www.framer.com/motion/)
[![Zustand](https://img.shields.io/badge/Zustand-5.0-brown?style=for-the-badge&logo=react&logoColor=white)](https://zustand-demo.pmnd.rs/)

<p align="center">
  <b>An end-to-end multi-tenant dining ecosystem built with bespoke micro-interactions, an interactive Spline 3D viewport, real-time spatial table allocation, multi-gateway checkouts, and dedicated management portals for Guests, Restaurateurs, and Platform Administrators.</b>
</p>

[✨ Live Demo](https://ranehal.github.io/TableHUB/) • [📸 Visual Showcase](#-visual-showcase) • [📐 System Architecture](#-system-architecture) • [⚡ Quickstart](#-quickstart--local-development) • [🔑 Mock Credentials](#-quick-test-credentials)

</div>

---

## 🌟 Executive Summary & Philosophy

Most restaurant reservation platforms feel like clunky spreadsheets masquerading as software: rigid forms, stale slot lists, zero tactile visual feedback, and disconnected admin tools.

**TableHUB** was engineered to redefine how guests discover, preview, and book dining experiences—and how restaurants manage inventory and floor layout in real time. We merged high-fidelity design engineering (glassmorphic dark-gold luxury styling, GPU-accelerated motion curves, and real-time interactive 3D WebGL canvases) with algorithmic table scheduling, seat grouping heuristics, and a tripartite role-based portal architecture.

Whether you're a diner seeking a scenic 2-seater window table for a candlelit dinner, a restaurant operator auditing table turns and kitchen capacity, or a super-admin resolving customer disputes and tracking GMV across hundreds of venues—TableHUB delivers a unified, zero-latency reactive experience.

---

## 🔑 Quick-Test Credentials

You can test all 3 role perspectives directly on the [Live Demo](https://ranehal.github.io/TableHUB/#/login) without setting up a backend:

| Role | Email / ID | Password | Destination Portal | Permissions & Scope |
| :--- | :--- | :--- | :--- | :--- |
| **👑 Super Admin** | `a` | `a` | `#/admin` | Platform analytics, restaurant approvals, dispute resolution, customer governance |
| **👨‍🍳 Restaurant Manager** | `m` | `m` | `#/restaurant` | Live floorplan & table status mutation, reservation rules, menu editor, booking queue |
| **🍷 Diner / Guest** | `u` | `u` | `#/` | Discover restaurants, interactive booking modal, multi-rail checkout, digital QR pass |

---

## 📐 System Architecture

TableHUB operates on a modular, decoupled reactive architecture designed for rapid client execution, offline resilience, and fluid transitions:

```mermaid
graph TD
    subgraph Client Layer ["Client Layer (React 18 + Vite 6 + TypeScript)"]
        Router["HashRouter Routing Engine\n(SPA GitHub Pages 404 Resilient)"]
        AuthStore["Zustand Auth Store\n(localStorage Hydrated RBAC)"]
        
        Router --> AuthStore
        Router --> UserPortal["User Portal (Diners)"]
        Router --> RestPortal["Restaurant Portal (Operators)"]
        Router --> AdminPortal["Admin Portal (Super-Admins)"]
        
        subgraph UserPortalComponents ["User Experience Components"]
            SplineCanvas["Spline 3D Scene / WebGL Fallback"]
            SearchFilter["Multi-Vector Food & Venue Search"]
            BookingModal["Enhanced Booking Modal\n(2/3/4-Seat Matrix + Window Heuristic)"]
            PaymentModal["Payment Rail Orchestrator\n(Card / bKash / Nagad)"]
            PassGen["Digital Booking Pass + QR Generator"]
        end
        
        subgraph OperatorComponents ["Operator Components"]
            Floorplan["Interactive Table Layout Engine\n(Occupied / Available / Reserved)"]
            RuleEngine["Dynamic Reservation Rules & Buffers"]
            MenuMgr["Culinary Catalog & Inventory"]
            Analytics["Turnover & Peak Hour Visualizer"]
        end
        
        subgraph AdminComponents ["Platform Governance"]
            Vetting["Restaurant KyC / Approval Pipeline"]
            Disputes["Escrow & Dispute Arbitrator"]
            GMVTracker["Platform GMV & Financial Analytics"]
        end

        UserPortal --> UserPortalComponents
        RestPortal --> OperatorComponents
        AdminPortal --> AdminComponents
    end

    subgraph Persistence ["Persistence & Network Architecture"]
        LocalState["Browser Cache & Indexed Persistence"]
        ExpressAPI["Node.js / Express API Bridge\n(server/index.js)"]
        MySQLPool["MySQL Connection Pool\n(XAMPP / Remote Host)"]
        
        AuthStore -.-> LocalState
        RestPortal -.-> ExpressAPI
        ExpressAPI -.-> MySQLPool
    end
```

---

## 📸 Visual Showcase

### 1. Consumer Discovery & Landing Experience

<div align="center">

| Luxury Hero Section with Spline 3D Viewport | Meal-Time Reservation Matrix |
| :---: | :---: |
| ![Hero Home](docs/screenshots/01_hero_home.png) | ![Dining Features](docs/screenshots/02_dining_features.png) |
| *Real-time 3D canvas interaction, live search, and luxury dark-gold typography.* | *Smart meal-time filtering (Breakfast, Brunch, Lunch, Snacks, Dinner).* |

</div>

<div align="center">

| Interactive 3D Brand Cloud & Culinary Partners | Multi-Filter Food & Restaurant Explorer |
| :---: | :---: |
| ![Partners Cloud](docs/screenshots/03_partners_showcase.png) | ![Search & Filter](docs/screenshots/04_search_and_filter.png) |
| *Kinetic 3D icon sphere featuring partner brands and restaurant collectives.* | *Faceted filtering by price range, star rating, and geo-distance.* |

</div>

---

### 2. High-Fidelity Booking Flow

<div align="center">

| Venue Profile & Interactive Menu Explorer | Authentication & Guest Identity Modal |
| :---: | :---: |
| ![Restaurant Profile](docs/screenshots/05_restaurant_profile.png) | ![Auth Modal](docs/screenshots/06_auth_modal.png) |
| *High-res imagery, operating hours, amenities, and categorized dishes.* | *MagicCard auth with Google OAuth, SMS OTP, and instant mock sign-in.* |

</div>

<div align="center">

| Enhanced Booking Modal (Date, Guests, Meal) | Spatial Table View & Window-Side Selection |
| :---: | :---: |
| ![Booking Modal](docs/screenshots/07_table_booking_modal.png) | ![Table Selection](docs/screenshots/08_table_selection_view.png) |
| *HeroUI DatePicker with dynamic slot generation based on party size.* | *Floorplan preview showing 2/3/4-seater layouts and window proximity.* |

</div>

<div align="center">

| Multi-Rail Checkout & Escrow Deposit | Verified Digital Pass with QR Code |
| :---: | :---: |
| ![Payment Modal](docs/screenshots/09_payment_modal.png) | ![Booking Confirmation](docs/screenshots/10_booking_confirmation.png) |
| *Instant processing with Credit Card, bKash, and Nagad digital rails.* | *Deterministic QR payload ready for on-site hostess barcode verification.* |

</div>

---

### 3. Restaurant Operating System (Portal)

<div align="center">

| Operations Command Center & Schedule | Interactive Table Floorplan Management |
| :---: | :---: |
| ![Restaurant Dashboard](docs/screenshots/12_restaurant_dashboard.png) | ![Table Management](docs/screenshots/13_restaurant_table_management.png) |
| *Live table turnover, guest arrival queues, and peak occupancy graphs.* | *Real-time table state mutator (Available, Occupied, Reserved, Cleaning).* |

</div>

<div align="center">

| Menu & Culinary Catalog Manager | Dynamic Reservation Rules & Buffers |
| :---: | :---: |
| ![Menu Management](docs/screenshots/14_restaurant_menu_management.png) | ![Reservation Rules](docs/screenshots/15_restaurant_reservation_rules.png) |
| *Inventory toggles, pricing tiers, dietary tags, and chef specials.* | *Turn durations, cancellation grace periods, and deposit parameters.* |

</div>

<div align="center">

| Live Booking Queue & Guest Manifest | Turn Rate & Revenue Analytics |
| :---: | :---: |
| ![Restaurant Bookings](docs/screenshots/17_restaurant_bookings.png) | ![Restaurant Analytics](docs/screenshots/16_restaurant_analytics.png) |
| *Real-time booking verification with hostess seat-assignment controls.* | *Deep metric breakdown: table yield, hourly revenue, and repeat diner rate.* |

</div>

---

### 4. Super-Admin Platform Command Center

<div align="center">

| Super-Admin Global Platform Overview | Restaurant Onboarding & Vetting Queue |
| :---: | :---: |
| ![Admin Dashboard](docs/screenshots/18_admin_dashboard.png) | ![Restaurant Approval](docs/screenshots/19_admin_restaurant_approval.png) |
| *System-wide GMV, active dining seats, server load, and tenant count.* | *KYC verification, food hygiene certificate review, and instant activation.* |

</div>

<div align="center">

| Customer Governance & Trust Score | Escrow Dispute Settlement Center |
| :---: | :---: |
| ![Customer Management](docs/screenshots/20_admin_customer_management.png) | ![Dispute Resolution](docs/screenshots/21_admin_dispute_resolution.png) |
| *Audit diner activity, reliability index, no-show strikes, and VIP status.* | *Two-sided escrow arbitration for missed reservations and refunds.* |

</div>

<div align="center">

| Platform-Wide Financials & Growth Telemetry | Role-Based Gateway Login |
| :---: | :---: |
| ![Platform Analytics](docs/screenshots/22_admin_platform_analytics.png) | ![Portal Login](docs/screenshots/11_portal_login.png) |
| *Cohort retention, commission earnings, churn analysis, and volume trends.* | *Unified credentials portal with automatic role-based redirect routing.* |

</div>

---

## 🛠️ Technical Deep Dives

### 1. Spatial Table & Slot Allocation Engine
Rather than relying on naive timestamp reservation, TableHUB implements a spatial heuristic:
* **Seat Capacity Optimization:** When a guest selects $N$ diners, the engine evaluates available table clusters $\{2\text{-seat}, 3\text{-seat}, 4\text{-seat}\}$.
* **Window-Proximity Weighting:** Diners can request scenic/window seating; the scheduler flags tables situated on the venue periphery.
* **Meal-Phase Partitioning:** Hours are bucketed into distinct operational phases (`breakfast`: 06:00–11:00, `brunch`: 10:00–14:00, `lunch`: 12:00–16:00, `snacks`: 15:00–18:00, `dinner`: 18:00–23:00) with custom turn durations (default $1.5\text{h}$) to prevent double-booking.

### 2. Spline 3D Scene & WebGL Resilience
The hero experience integrates a real-time Spline 3D scene powered by `@splinetool/runtime`. To ensure fault-tolerance across hardware configurations (e.g. mobile devices with disabled WebGL or strict corporate firewalls), the canvas is wrapped in an `ErrorBoundary` that automatically falls back to high-resolution progressive imagery without layout shifting.

```typescript
useEffect(() => {
  if (canvasRef.current) {
    const app = new Application(canvasRef.current);
    // Prefer Spline community file URL with graceful fallback
    app.load('https://app.spline.design/community/file/cef26586-3853-44bb-b42b-cc462e774e8b')
      .catch(() => {
        app.load('https://prod.spline.design/TS91-wcgqLHYx5Nd/scene.splinecode')
          .catch(console.error);
      });
  }
}, []);
```

### 3. Role-Based Access Control (RBAC) with Zustand Persistence
Authentication state is managed via a reactive Zustand store utilizing the `persist` middleware. User claims and roles (`user` | `restaurant` | `admin`) are rehydrated from `localStorage` on page boot, enabling instant page reloads and protected route guards without session flicker:

```typescript
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}
```

Protected routes intercept unauthorized requests and route the actor to their designated dashboard or prompt the login gateway.

### 4. Zero-404 GitHub Pages SPA Deployment Architecture
Deploying single-page applications with dynamic client-side routes (e.g., `react-router-dom`) on static hosting like GitHub Pages typically leads to HTTP 404 errors on browser reload because the static file server lacks rewrite rules. 

TableHUB solves this with a two-pronged production strategy:
1. **`HashRouter` Engine:** Deep links take the form `/#/restaurant`, `/#/admin`, and `/#/login`, ensuring the base HTML document is always returned regardless of route depth.
2. **Dynamic `404.html` Redirection Script:** An intelligent fallback page captures any direct non-hash requests and re-encodes the path query before handing control back to React Router.
3. **Automated GitHub Actions CI/CD:** Any push to `master` triggers `.github/workflows/deploy.yml`, which executes `npm ci`, builds production assets via Vite, and deploys directly to GitHub Pages.

---

## 💻 Tech Stack & Dependencies

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Runtime & Framework** | [React 18.3](https://react.dev/) | Virtual DOM, concurrent rendering, compound components |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Strict static typing, discriminated unions, interface contracts |
| **Build Tooling** | [Vite 6](https://vitejs.dev/) + SWC | Instant HMR, Rollup chunk minification, tree-shaking |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) | Utility-first CSS, responsive dark-gold luxury palette |
| **3D & WebGL** | [@splinetool/runtime](https://spline.design/) | Real-time interactive 3D WebGL scenes |
| **Animation** | [Framer Motion 12](https://motion.dev/) | Spring physics, layout animations, exit transitions |
| **UI Primitives** | [Radix UI](https://www.radix-ui.com/) & [HeroUI](https://heroui.com/) | Accessible dialogs, popovers, calendars, dropdowns |
| **Specialized Effects** | [MagicUI](https://magicui.design/) & [React Icon Cloud](https://github.com/dogue/react-icon-cloud) | `MagicCard`, `ShinyButton`, `RainbowButton`, 3D Icon sphere |
| **State Management** | [Zustand 5](https://zustand-demo.pmnd.rs/) | Minimalist atomic store with `persist` middleware |
| **Routing** | [React Router 7](https://reactrouter.com/) | Client-side routing, route protection, history navigation |
| **Data Visualization** | [Recharts 2.15](https://recharts.org/) | Responsive analytics charts, revenue heatmaps |
| **Toast Notifications** | [Sonner 2.0](https://sonner.emilkowal.ski/) | Non-blocking stacked toast micro-feedback |
| **Icons** | [Lucide React](https://lucide.dev/) | Clean, consistent SVG icon set |
| **Backend (Optional)** | [Express](https://expressjs.com/) + [MySQL2](https://github.com/sidorares/node-mysql2) | REST endpoint scaffolding, connection pooling, SQL schemas |

---

## 📁 Repository Structure

```
TableHUB/
├── .github/
│   └── workflows/
│       └── deploy.yml           # Automated GitHub Pages CI/CD pipeline
├── docs/
│   └── screenshots/             # 22 high-resolution visual showcase captures
├── public/
│   └── 404.html                 # SPA redirection script for static hosting
├── server/
│   ├── .env                     # Database credentials & port config
│   ├── index.js                 # Express server & MySQL connection pool
│   └── package.json             # Backend dependencies (express, mysql2, cors)
├── src/
│   ├── components/
│   │   ├── admin/               # Super-Admin portal suite
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── AdminPortal.tsx
│   │   │   ├── CustomerManagement.tsx
│   │   │   ├── DisputeResolution.tsx
│   │   │   ├── PlatformAnalytics.tsx
│   │   │   └── RestaurantApproval.tsx
│   │   ├── magicui/             # Bespoke shader & canvas effects
│   │   ├── restaurant/          # Restaurant operator management suite
│   │   │   ├── Analytics.tsx
│   │   │   ├── BookingList.tsx
│   │   │   ├── MenuManagement.tsx
│   │   │   ├── ReservationRules.tsx
│   │   │   ├── RestaurantDashboard.tsx
│   │   │   ├── RestaurantPortal.tsx
│   │   │   └── TableManagement.tsx
│   │   ├── ui/                  # Reusable UI components & Radix wrappers
│   │   └── user/                # Consumer discovery & reservation suite
│   │       ├── AuthModal.tsx
│   │       ├── BookingConfirmation.tsx
│   │       ├── EnhancedBookingModal.tsx
│   │       ├── FoodSearchResults.tsx
│   │       ├── PaymentModal.tsx
│   │       ├── RestaurantProfile.tsx
│   │       ├── UserHomeAnimated.tsx
│   │       └── UserPortal.tsx
│   ├── pages/
│   │   └── Login.tsx            # Unified role-based login gateway
│   ├── store/
│   │   └── useAuthStore.ts      # Zustand persisted auth store
│   ├── types/
│   │   └── index.ts             # Domain type declarations (Restaurant, Booking, etc.)
│   ├── App.tsx                  # Root application wrapper
│   ├── Router.tsx               # Client-side routing engine & RBAC guards
│   ├── index.css                # Global Tailwind styles & dark luxury theme variables
│   └── main.tsx                 # React DOM mount & HeroUIProvider
├── index.html                   # HTML entry point with Spline viewer injection
├── package.json                 # Core dependencies and run scripts
├── vite.config.ts               # Vite configuration with aliases & base path
└── README.md                    # Project documentation
```

---

## ⚡ Quickstart & Local Development

### Prerequisites
* **Node.js**: `v18.0.0` or higher (v20+ recommended)
* **npm**: `v9.0.0` or higher

### 1. Clone & Install
```bash
# Clone the repository
git clone https://github.com/ranehal/TableHUB.git

# Enter the project root
cd TableHUB

# Install dependencies
npm install
```

### 2. Run the Development Server
```bash
# Start Vite in development mode
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser. The application will hot-reload automatically as you edit files.

### 3. Production Build & Local Preview
```bash
# Compile and bundle assets into /build
npm run build

# Preview the production bundle locally
npm run preview
```

### 4. Running the Optional Backend Server (Node.js + MySQL)
For database-backed persistence (requires a running MySQL/XAMPP instance):
```bash
# Navigate to the server folder
cd server

# Install server dependencies
npm install

# Start the Express server
node index.js
```
The API server listens on `http://localhost:3001` with CORS enabled for frontend communication.

---

## 🚀 GitHub Pages Deployment Guide

This project is pre-configured for automated deployment to GitHub Pages.

### Automated CI/CD (Recommended)
1. Push your changes to the `master` branch:
   ```bash
   git add .
   git commit -m "Deploy update"
   git push origin master
   ```
2. Navigate to your repository on GitHub: **Settings > Pages**.
3. Under **Build and deployment > Source**, select **GitHub Actions**.
4. The `.github/workflows/deploy.yml` workflow will automatically build and publish the site at:
   ```
   https://<your-username>.github.io/TableHUB/
   ```

---

## 🤝 Contribution Guidelines

We welcome contributions from designers, frontend craftspeople, and systems engineers alike!
1. **Fork** the project repository.
2. **Create** your feature branch (`git checkout -b feature/SpatialTableOptimizer`).
3. **Commit** your changes with clear, descriptive messages (`git commit -m "feat: implement dynamic table clustering heuristic"`).
4. **Push** to the branch (`git push origin feature/SpatialTableOptimizer`).
5. **Open** a Pull Request against `master`.

---

## 📜 License & Acknowledgments

This project is licensed under the **MIT License**.

Special thanks to:
* The **Spline** community for 3D asset modeling and WebGL tooling.
* The **Radix UI** and **HeroUI** teams for accessible component primitives.
* The original Figma design concept for inspiration.

---

<div align="center">
  <sub>Crafted with passion, caffeine, and precision engineering for the future of culinary hospitality.</sub><br>
  <sub><b>TableHUB © 2026</b></sub>
</div>
