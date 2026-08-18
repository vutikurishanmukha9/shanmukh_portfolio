# Vutikuri Shanmukha — Systems Engineering & Technical Portfolio

[![React 19](https://img.shields.io/badge/React-19.2.8-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![React Doctor Score](https://img.shields.io/badge/React_Doctor-100%2F100-success)](https://react.doctor/)
[![Oxlint Anti-Slop](https://img.shields.io/badge/Oxlint_Anti--Slop-0_Warnings-emerald)](https://oxc.rs/)
[![Netlify Status](https://img.shields.io/badge/Netlify-Deployed-00C7B7?logo=netlify&logoColor=white)](https://shanmukhworld.netlify.app/)

A high-performance, tactile, editorial-grade developer portfolio website engineered to showcase systems programming, cloud architecture, and technical projects. This interface represents a complete departure from generic template designs, rejecting decorative glowing blobs and cursor trails in favor of technical layout honesty, sub-pixel grid alignment, and precision telemetry visualizations.

🔗 **Live Production Site:** [https://shanmukhworld.netlify.app/](https://shanmukhworld.netlify.app/)

---

## Design Philosophy & Visual Formula

The portfolio is structured around a precise design split, drawing inspiration from modern technical interfaces:

*   **Linear (60%): Precision Minimalism.** Sleek warm cream surfaces, sub-pixel `0.5px` borders, micro-spacing grids, interactive project telemetry inspection, and tactile spring transition physics.
*   **Claude (25%): Warm Editorial Canvas.** A welcoming light-mode cream canvas (`#faf9f5`) paired with classical serif display typography.
*   **Cohere (15%): Structural Tabular Lists.** Dense monospaced metadata columns, thin rule-separated lists, and technical tabular alignment.

---

## Architectural Systems & Highlights

### 1. Typography Hierarchy
To maintain strict visual restraint and establish credibility, the typography is partitioned into three distinct layers:
*   **Cormorant Garamond (Classical Serif):** Restricted strictly to main headers, publication papers, and section leads to convey a human-crafted editorial tone.
*   **JetBrains Mono (Technical Monospace):** Used for terminal logs, metrics, active statuses, dates, skills tags, and telemetry data labels.
*   **Inter (Neo-Grotesque Sans):** Reserved exclusively for high-readability body copy, progressive text reveals, and descriptive paragraphs.

### 2. Systems Telemetry Console Panel
The landing hero features a fully interactive Systems Telemetry Console Panel that simulates active infrastructure telemetry, including:
*   **Cloud Deployment State:** Real-time indicator for AWS resources.
*   **ML Model Training Loss:** Dynamic vector visualization rendering a custom convergence curve directly via SVG with live circuit telemetry pulses and magnetic cursor attraction.
*   **Database Metrics:** Live monospaced counts showing indexed vectors (FAISS store) with dynamic numerical counters.
*   **Service Status Logs & RAG Simulator:** Responsive rows listing runtime statuses and interactive token inference benchmarks.

### 3. Telemetry Project Silhouettes & Blueprint Drawer
Rather than generic cards, projects are represented as interactive flat-dashboard wireframes with fluid layout transitions, spring physics, and dynamic telemetry indicators. Clicking any project launches a detailed **Architecture Blueprint Drawer** with comprehensive microservices topology, P99 SLAs, and design decisions.

### 4. Rule-Separated Tabular Lists
All timelines, career journey items, verified credential certifications, and IEEE publications are structured as clean, rule-separated list tables (`border-[0.5px] border-border`) with interactive vector previews and responsive containers for mobile viewports.

---

## Quality Engineering & Benchmarks

| Metric / Suite | Target | Result | Status |
| :--- | :---: | :---: | :---: |
| **React Doctor Health Score** | 100 / 100 | **100 / 100** | ✅ **PASSED** |
| **Oxlint Anti-Slop Rules** | 0 Warnings | **0 Warnings, 0 Errors** (111 rules) | ✅ **PASSED** |
| **TypeScript Typecheck (`tsc`)** | Strict Mode | **0 Diagnostics** | ✅ **PASSED** |
| **Production Build (`vite build`)** | Bundle Optimization | **Clean Build (0 errors)** | ✅ **PASSED** |
| **Accessibility Standard** | WCAG 2.1 AA | **Accessible Controls & Semantic HTML** | ✅ **PASSED** |

---

## Technical Stack

*   **Runtime & Framework:** React 19 + TypeScript 5.8
*   **Bundler & Build Tool:** Vite 5 + SWC
*   **Styling & UI:** Tailwind CSS v3 + Radix UI Primitives + CVA
*   **Physics & Animation:** Framer Motion 12 + Lenis Momentum Kinetic Smooth Scroll
*   **Linter & Quality Engine:** Oxlint Anti-Slop Plugin + React Doctor
*   **Iconography:** Lucide React
*   **Integrations:** GitHub Contribution API + Netlify Forms

---

## Getting Started

### Prerequisites
Ensure you have Node.js (v18+) and npm installed locally.

### Local Development Setup

```bash
# Clone the repository
git clone https://github.com/vutikurishanmukha9/shanmukh-vutikuri-portfolio.git

# Navigate to the project directory
cd shanmukh-vutikuri-portfolio

# Install project dependencies
npm install

# Run the local Vite development server
npm run dev

# Run Anti-Slop Oxlint analysis
npm run lint:oxlint

# Run React Doctor health scan
npm run doctor

# Compile a production-ready static bundle
npm run build
```

---

## Directory Structure

```
shanmukh-vutikuri-portfolio/
├── src/
│   ├── components/
│   │   ├── ui/                         # Atomic primitives (SpotlightCard, TiltCard, Magnetic, etc.)
│   │   ├── AboutSection.tsx            # Operator dossier & spec ledger
│   │   ├── CareerJourneySection.tsx    # Tabular work history timeline
│   │   ├── CaseStudiesSection.tsx      # Deep dive engineering case studies
│   │   ├── CertificationsSection.tsx   # Professional credentials table
│   │   ├── ContactForm.tsx             # Contact input telemetry
│   │   ├── ContactSection.tsx          # Structured networking links
│   │   ├── Footer.tsx                  # Monospaced system status and clocks
│   │   ├── GrindingActivitySection.tsx # Contributions calendar grid
│   │   ├── HeroSection.tsx             # Telemetry console and display headers
│   │   ├── Navigation.tsx              # Floating sub-pixel navigation pill
│   │   ├── NewsTicker.tsx              # Continuous system updates ticker
│   │   ├── PageLoader.tsx              # Minimal initial loading state
│   │   ├── ProjectsSection.tsx         # Technical dashboard interactive grid
│   │   ├── PublicationsSection.tsx     # Peer-reviewed publication records
│   │   └── SkillsSection.tsx           # Category-filtered skill matrices
│   ├── context/
│   │   ├── ThemeContext.tsx            # Cream and charcoal state controller
│   │   └── SkillFilterContext.tsx      # Skills-to-projects interactive mapping
│   ├── hooks/
│   │   ├── use-toast.ts                # Lightweight system notifications
│   │   └── useSound.ts                 # Haptic audio synthesis hook
│   ├── pages/
│   │   ├── Index.tsx                   # Main portfolio single-page application
│   │   ├── CaseStudyAdidas.tsx         # Adidas sales analytics case study
│   │   ├── CaseStudySalesReport.tsx   # Multi-region sales report case study
│   │   ├── CaseStudyUnicorn.tsx        # Global Unicorn EDA case study
│   │   └── ProjectContextLy.tsx        # Context-Ly CLI case study
│   ├── lib/
│   │   └── utils.ts                    # Tailwind merging helpers
│   ├── index.css                       # Editorial typography setups & design tokens
│   ├── App.tsx                         # Main router and provider wrapper
│   └── main.tsx                        # Application render entrypoint
├── doctor.config.ts                    # React Doctor rule & project configuration
├── .oxlintrc.json                      # Oxlint anti-slop configuration
├── package.json                        # Scripts & dependencies
└── vite.config.ts                      # Vite build configuration
```

---

## Author

**Vutikuri Shanmukha**
*   **GitHub:** [@vutikurishanmukha9](https://github.com/vutikurishanmukha9)
*   **LinkedIn:** [shanmukha-vutikuri](https://linkedin.com/in/shanmukha-vutikuri)
*   **Email:** [vutikurishanmukh17@gmail.com](mailto:vutikurishanmukh17@gmail.com)

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
