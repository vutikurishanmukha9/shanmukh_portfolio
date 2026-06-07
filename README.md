# Vutikuri Shanmukha — Systems Engineering and Technical Portfolio

![Vutikuri Shanmukha Portfolio - Technical Systems Console](Portfolio.png)

A high-performance, tactile, editorial-grade developer portfolio website engineered to showcase systems programming, cloud architecture, and technical projects. This interface represents a complete departure from generic template designs, rejecting decorative glowing blobs, mesh gradients, and cursor trails in favor of technical layout honesty, sub-pixel grid alignment, and precision telemetry visualizations.

[View Live Portfolio](https://shanmukhworld.netlify.app/)

---

## Design Philosophy and Visual Formula

The portfolio is structured around a precise design split, drawing inspiration from leading modern technical interfaces:

*   **Linear (60%): Precision Minimalism.** Sleek dark charcoal surfaces, sub-pixel 0.5px borders, micro-spacing grids, and ultra-snappy transition eases.
*   **Claude (25%): Warm Editorial Canvas.** A welcoming light-mode cream canvas (`#faf9f5`) paired with classical serif display typography.
*   **Cohere (15%): Structural Tabular Lists.** Dense monospaced metadata columns, thin rule-separated lists, and technical tabular alignment.

---

## Architectural Revamp Details

### 1. Typography Hierarchy
To maintain strict visual restraint and establish credibility, the typography is partitioned into three distinct layers:
*   **Cormorant Garamond (Classical Serif):** Restricted strictly to main headers, publication papers, and section leads to convey a human-crafted editorial tone.
*   **JetBrains Mono (Technical Monospace):** Used for terminal logs, metrics, active statuses, dates, skills tags, and telemetry data labels.
*   **Inter (Neo-Grotesque Sans):** Reserved exclusively for high-readability body copy and descriptive paragraphs.

### 2. Systems Telemetry Console Panel
The landing hero replaces static image placeholders with a fully interactive Systems Telemetry Console Panel. This component simulates active infrastructure telemetry, including:
*   **Cloud Deployment State:** Real-time indicator for AWS resources.
*   **ML Model Training Loss:** Dynamic vector visualization rendering a custom convergence curve directly via SVG.
*   **Database Metrics:** Live monospaced counts showing indexed vectors (FAISS store).
*   **Service Status Logs:** Responsive rows listing runtime statuses of API servers, Vite environments, and Docker containers.

### 3. Telemetry Project Silhouettes
Rather than generic cards, projects are represented as ten interactive flat-dashboard wireframes. These silhouettes depict specialized engineering layouts such as neural network token layers, RAG chunking maps, financial candlestick charts, and coordinate index fields.

### 4. Rule-Separated Tabular Lists
All timelines, career journey items, certifications, and IEEE publications are structured as clean, rule-separated list tables (`border-[0.5px] border-border`). This provides high information density and structural clarity reminiscent of academic and technical documentation.

### 5. Repository Optimization
To ensure production-grade engineering standards, all unused aesthetic assets, legacy component templates, and redundant files have been pruned. This includes the removal of old custom cursor scripts, particle background renderers, snowfall modules, and unused skeletons, leaving a highly optimized, lean codebase.

---

## Technical Stack

*   **Core Framework:** React 18 + TypeScript
*   **Build Pipeline:** Vite
*   **Styling Engine:** TailwindCSS 3.4 + Custom Vanilla CSS Utilities
*   **Animation System:** Framer Motion 12 (configured with high-restraint cubic-bezier transition curves)
*   **Iconography:** Lucide React
*   **GitHub Integration:** `react-github-calendar`
*   **Contact Telemetry:** Netlify Forms

---

## Getting Started

### Prerequisites
Ensure you have Node.js and a package manager (npm or bun) installed locally.

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

# Compile a production-ready static bundle
npm run build
```

---

## Directory Structure

```
src/
├── components/
│   ├── ui/                       # Core atomic layout elements
│   ├── AboutSection.tsx          # Bio summary and academic highlights
│   ├── CareerJourneySection.tsx  # Tabular work history timeline
│   ├── CertificationsSection.tsx  # Professional credentials table
│   ├── ContactForm.tsx           # Contact input telemetry
│   ├── ContactSection.tsx        # Structured networking links
│   ├── Footer.tsx                # Monospaced system status and logs
│   ├── GrindingActivitySection.tsx # Contributions calendar grid
│   ├── HeroSection.tsx           # Telemetry console and display headers
│   ├── MobileHeader.tsx          # Responsive mobile control bar
│   ├── MobileNavDrawer.tsx       # Off-screen mobile navigational drawer
│   ├── Navigation.tsx            # Floating sub-pixel navigation pill
│   ├── NewsTicker.tsx            # Continuous system updates ticker
│   ├── PageLoader.tsx            # Minimal initial loading state
│   ├── ProjectsSection.tsx       # Technical dashboard interactive grid
│   ├── PublicationsSection.tsx   # Peer-reviewed publication records
│   └── SkillsSection.tsx         # Category-filtered skill matrices
├── context/
│   ├── ThemeContext.tsx          # Cream and charcoal state controller
│   └── SkillFilterContext.tsx    # Skills-to-projects interactive mapping
├── hooks/
│   └── use-toast.ts              # Lightweight system notifications
├── lib/
│   └── utils.ts                  # Tailwind merging helpers
├── index.css                     # Editorial typography setups & keyframes
├── App.tsx                       # Main application state and providers
└── main.tsx                      # Render entrypoint
```

---

## Author

**Vutikuri Shanmukha**
*   **GitHub:** [@vutikurishanmukha9](https://github.com/vutikurishanmukha9)
*   **LinkedIn:** [shanmukha-vutikuri](https://linkedin.com/in/shanmukha-vutikuri)
*   **Email:** vutikurishanmukh17@gmail.com

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
