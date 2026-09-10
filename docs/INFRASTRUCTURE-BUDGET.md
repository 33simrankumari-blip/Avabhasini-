# Infrastructure Budget Proposal

## AYURDISHA — Meet the Mentors Experience Zone

**11th World Ayurveda Congress · Bhubaneswar 2026**

---

| | |
|---|---|
| **Organization** | World Ayurveda Foundation |
| **Programme** | AYURDISHA — Meet the Mentors Experience Zone |
| **Production Application** | [https://ayushmarg.vercel.app](https://ayushmarg.vercel.app) |
| **Planned Domain** | [ayurdisha.ai](https://ayurdisha.ai) |
| **Document Date** | September 2026 |
| **Classification** | Committee Presentation — Infrastructure & Technical Services |
| **Exchange Reference** | USD equivalents at ₹85 per USD |
| **Total Approved Allocation** | **₹1,00,000 (~$1,176 USD)** |

---

## Executive Summary

This document presents the comprehensive infrastructure, platform development, and operational personnel budget to ensure reliable, secure, multi-user operation of the **AYURDISHA Meet the Mentors** web application during the 11th World Ayurveda Congress. The application supports delegate registration (email OTP verification), live question submission, mentor cluster curation by staff, and AI-assisted journal search in the Knowledge tab.

The current architecture is **fully serverless** — Google Cloud Firestore, Vercel serverless functions, Google Gemini API, and transactional email — requiring **no dedicated servers**. Free-tier limits are sufficient for development and low-traffic preview but will **throttle or fail under congress-day load** (estimated 200–500+ concurrent delegates).

This proposal is structured in two phases: **Phase 1 — Technical Infrastructure & Platform Development (₹60,000)** covering cloud premium tiers, domain registration, software engineering, and congress-week technical assurance; and **Phase 2 — Personnel & Operational Support (₹29,000)** covering congress-day staffing, analytics, documentation, and delegate-facing support. A **contingency reserve of ₹11,000** is held for unforeseen requirements.

Phase 1 is broken into three transparent subtotals that add up exactly — no lump-sum jump:

| Subtotal | Description | Amount (INR) |
|----------|-------------|--------------|
| **A** | Cloud & Infrastructure (Firebase, Vercel, Gemini, email, domain, SSL, security) | **₹26,361** |
| **B** | Software Engineering & Web Development (design, build, test, deploy) | **₹30,000** |
| **C** | Technical Assurance — congress-week operations (monitoring, on-call, hotfix) | **₹3,639** |
| | **Phase 1 Total (A + B + C)** | **₹60,000** |

| Scenario | Phase 1 (INR) | Phase 2 (INR) | Contingency | **Total (INR)** | **Total (USD)** | Use case |
|----------|---------------|---------------|-------------|-----------------|-----------------|----------|
| **Minimum** | ₹40,000 | ₹24,000 | ₹11,000 (15%) | **₹75,000** | ~$882 | Essential cloud upgrades and minimal personnel |
| **Recommended ★** | ₹60,000 | ₹29,000 | ₹11,000 (11%) | **₹1,00,000** | ~$1,176 | Full platform build + cloud premium + congress operations team |
| **Maximum** | ₹88,000 | ₹30,000 | ₹12,000 (10%) | **₹1,30,000** | ~$1,529 | Enterprise buffers; extended personnel and redundancy |

---

## 1. Project Overview

### 1.1 Application Purpose

The Meet the Mentors Experience Zone enables congress delegates to:

- Register and verify identity via email OTP
- Browse mentor profiles and thematic clusters
- Submit questions for mentor sessions
- Search Ayurvedic journals via AI-powered Knowledge tab (Google Gemini)
- Allow staff to curate, cluster, and export delegate data in real time

### 1.2 Technical Architecture

| Layer | Technology | Project / Provider |
|-------|------------|-------------------|
| Frontend | React (Vite), deployed on Vercel | `ayushmarg.vercel.app` → `ayurdisha.ai` |
| API / Serverless | Vercel Functions (Node.js) | Vercel |
| Primary Database | Google Cloud Firestore | Firebase project `ayurdisha-4917b` |
| AI Search | Google Gemini API | Google AI Studio |
| Email (OTP) | Resend / SendGrid (transactional) | Resend or equivalent |
| Authentication | Signed HttpOnly cookies, server-side OTP | Application layer |
| Security | Firebase App Check, Firestore security rules | Firebase |
| Monitoring | Sentry / UptimeRobot / Vercel Analytics | Third-party SaaS |

**Note:** No virtual machines, containers, or dedicated hosting are required. All services scale automatically with demand. Premium tiers, platform development, and operational personnel ensure reliability under peak congress load.

---

## 2. Budget Structure

### Phase 1 — Technical Infrastructure & Platform Development (₹60,000)

Phase 1 = **Subtotal A + Subtotal B + Subtotal C**. Each block is a distinct cost category with its own subtotal row before the Phase 1 total.

#### A. Cloud & Infrastructure — Premium Tiers

| # | Service | Description | Recommended (INR) | USD |
|---|---------|-------------|-------------------|-----|
| 1 | Firebase Blaze (Firestore) — premium buffer | Pay-as-you-go scaling for registration, questions, and staff dashboard | ₹5,500 | ~$65 |
| 2 | Vercel Pro — hosting & API | 2-month event period; extended serverless timeouts and concurrency | ₹7,500 | ~$88 |
| 3 | Google Gemini API — enterprise buffer | Paid quota for sustained Knowledge tab journal search | ₹3,500 | ~$41 |
| 4 | Resend Pro / SendGrid — OTP at scale | Reliable OTP delivery during registration bursts | ₹1,800 | ~$21 |
| 5 | **Domain registration — ayurdisha.ai (1st year)** | Official congress domain; registrar quote attached in Annexure A | **₹4,761** | ~$56 |
| 6 | SSL + CDN extras | Certificate management and bandwidth headroom for media-rich profiles | ₹800 | ~$9 |
| 7 | Firebase App Check / security rules audit | Professional review before public registration opens | ₹2,500 | ~$29 |

**Subtotal A — Cloud & Infrastructure:** **₹26,361** (~$310)

#### B. Software Engineering & Web Development

Congress-grade platform scope: delegate registration with OTP, staff curation tools, Gemini-powered Knowledge hub, and Firestore backend. The ₹30,000 fee covers end-to-end design, build, pre-launch testing, security hardening, and production deployment — a realistic committee rate for the Indian market.

| # | Service | Description | Recommended (INR) | USD |
|---|---------|-------------|-------------------|-----|
| 8a | UI/UX design & wireframes | Delegate and staff journey design; responsive layouts for congress branding | ₹6,000 | ~$71 |
| 8b | Frontend development | React/Vite — registration flow, Knowledge tab, mentor hall, staff dashboard | ₹8,000 | ~$94 |
| 8c | Backend/API & Firestore integration | Serverless APIs, OTP auth, Gemini search, security rules, data models | ₹8,000 | ~$94 |
| 8d | Testing, load testing & security review | Pre-launch QA, performance audit (500+ users), OWASP-aligned review | ₹5,000 | ~$59 |
| 8e | Deployment, backup/DR & production handover | Vercel + Firebase config, automated backups, DNS cutover to ayurdisha.ai | ₹3,000 | ~$35 |

**Subtotal B — Software Engineering & Web Development:** **₹30,000** (~$353)

#### C. Technical Assurance — Congress-Week Operations

Live-event technical support during the 3-day congress. Pre-launch assurance (load testing, security review, backup setup) is included in Subtotal B above.

| # | Service | Description | Recommended (INR) | USD |
|---|---------|-------------|-------------------|-----|
| 9 | Real-time monitoring (Sentry / UptimeRobot premium) | Error tracking, uptime alerts, and performance dashboards for event week | ₹1,200 | ~$14 |
| 10 | On-call technical support during congress (3 days) | Dedicated technical contact on-site / remote during event dates | ₹1,639 | ~$19 |
| 11 | Bug fixes & hotfix buffer during event | Reserved capacity for same-day fixes during congress week | ₹800 | ~$9 |

**Subtotal C — Technical Assurance:** **₹3,639** (~$43)

| | **Phase 1 Total (A + B + C)** | **₹60,000** | **~$706** |
|---|-------------------------------|-------------|-----------|
| | ₹26,361 + ₹30,000 + ₹3,639 | | |

---

### Phase 2 — Personnel & Operational Support (₹29,000)

| # | Role / Service | Description | Recommended (INR) | USD |
|---|----------------|-------------|-------------------|-----|
| 12 | Data Analyst | Congress usage analysis, delegate engagement metrics, and post-event reporting | ₹7,500 | ~$88 |
| 13 | Observer / field coordinator | On-ground monitoring of Experience Zone operations during congress | ₹6,000 | ~$71 |
| 14 | Technical documentation specialist | Operator manuals, runbooks, and staff workflow documentation | ₹4,500 | ~$53 |
| 15 | User experience reviewer | Pre-launch UX audit of delegate and staff journeys | ₹3,500 | ~$41 |
| 16 | Event-day helpdesk support | Delegate-facing support desk for registration and Track my answer queries | ₹5,500 | ~$65 |
| 17 | Communications & delegate liaison | Coordination with congress communications team; FAQ and signage alignment | ₹2,000 | ~$24 |

**Phase 2 Total:** **₹29,000** (~$341)

---

## 3. Itemized Budget — Recommended Scenario (★)

| # | Service | Category | Phase | Minimum (INR) | Recommended (INR) | Maximum (INR) | USD (Rec.) |
|---|---------|----------|-------|---------------|-------------------|---------------|------------|
| **A. Cloud & Infrastructure** | | | **1** | | | | |
| 1 | Firebase Blaze (Firestore) — premium buffer | Database | 1 | ₹3,500 | ₹5,500 | ₹8,000 | ~$65 |
| 2 | Vercel Pro — hosting & API | Hosting | 1 | ₹5,000 | ₹7,500 | ₹12,000 | ~$88 |
| 3 | Google Gemini API — enterprise buffer | AI Search | 1 | ₹2,000 | ₹3,500 | ₹5,000 | ~$41 |
| 4 | Resend Pro / SendGrid — OTP at scale | Email | 1 | ₹1,200 | ₹1,800 | ₹3,000 | ~$21 |
| 5 | Domain registration — ayurdisha.ai (1st year) | Infrastructure | 1 | ₹4,761 | **₹4,761** | ₹4,761 | ~$56 |
| 6 | SSL + CDN extras | Infrastructure | 1 | ₹500 | ₹800 | ₹1,500 | ~$9 |
| 7 | Firebase App Check / security rules audit | Security | 1 | ₹1,500 | ₹2,500 | ₹4,000 | ~$29 |
| | **Subtotal A — Cloud & Infrastructure** | | | **₹18,461** | **₹26,361** | **₹38,261** | **~$310** |
| **B. Software Engineering & Web Development** | | | **1** | | | | |
| 8a | UI/UX design & wireframes | Design | 1 | ₹3,000 | ₹6,000 | ₹8,000 | ~$71 |
| 8b | Frontend development (React/Vite) | Development | 1 | ₹4,000 | ₹8,000 | ₹12,000 | ~$94 |
| 8c | Backend/API & Firestore integration | Development | 1 | ₹4,000 | ₹8,000 | ₹12,000 | ~$94 |
| 8d | Testing, load testing & security review | QA | 1 | ₹2,500 | ₹5,000 | ₹8,000 | ~$59 |
| 8e | Deployment, backup/DR & production handover | DevOps | 1 | ₹1,500 | ₹3,000 | ₹5,000 | ~$35 |
| | **Subtotal B — Software Engineering** | | | **₹15,000** | **₹30,000** | **₹45,000** | **~$353** |
| **C. Technical Assurance — Congress-Week Operations** | | | **1** | | | | |
| 9 | Real-time monitoring (Sentry / UptimeRobot) | Operations | 1 | ₹2,000 | ₹1,200 | ₹2,000 | ~$14 |
| 10 | On-call technical support (3 days congress) | Support | 1 | ₹3,000 | ₹1,639 | ₹2,000 | ~$19 |
| 11 | Bug fixes & hotfix buffer during event | Support | 1 | ₹1,539 | ₹800 | ₹739 | ~$9 |
| | **Subtotal C — Technical Assurance** | | | **₹6,539** | **₹3,639** | **₹4,739** | **~$43** |
| | **Phase 1 Total (A + B + C)** | | | **₹40,000** | **₹60,000** | **₹88,000** | **~$706** |
| **Phase 2 — Personnel & Operational Support** | | | **2** | | | | |
| 12 | Data Analyst — usage analysis & reporting | Personnel | 2 | ₹6,000 | ₹7,500 | ₹12,000 | ~$88 |
| 13 | Observer / field coordinator | Personnel | 2 | ₹5,000 | ₹6,000 | ₹10,000 | ~$71 |
| 14 | Technical documentation specialist | Personnel | 2 | ₹4,000 | ₹4,500 | ₹8,000 | ~$53 |
| 15 | User experience reviewer | Personnel | 2 | ₹3,000 | ₹3,500 | ₹6,500 | ~$41 |
| 16 | Event-day helpdesk support | Personnel | 2 | ₹4,000 | ₹5,500 | ₹8,500 | ~$65 |
| 17 | Communications & delegate liaison | Personnel | 2 | ₹2,000 | ₹2,000 | ₹5,000 | ~$24 |
| | **Phase 2 Total** | | | **₹24,000** | **₹29,000** | **₹30,000** | **~$341** |
| | **Subtotal — Allocated Expenditure** | | | **₹64,000** | **₹89,000** | **₹1,18,000** | **~$1,047** |
| 18 | **Contingency Reserve** — unutilized buffer | Reserve | — | ₹11,000 | **₹11,000** | ₹12,000 (capped) | ~$129 |
| | **GRAND TOTAL** | | | **₹75,000** | **₹1,00,000** | **₹1,30,000** | **~$1,176** |

*USD figures rounded at ₹85/USD. Actual provider billing is in USD; INR shown for committee reference. Domain registration (Item 5) per registrar quote dated September 2026 — see Annexure A. Phase 1 total is the exact sum of Subtotals A + B + C — no rounding adjustment.*

---

## 4. Fund Allocation Summary — Recommended Scenario (★)

| Line Item | Amount (INR) | Amount (USD) | Status |
|-----------|--------------|--------------|--------|
| **A.** Cloud & Infrastructure (Items 1–7) | ₹26,361 | ~$310 | Allocated |
| **B.** Software Engineering & Web Development (Items 8a–8e) | ₹30,000 | ~$353 | Allocated |
| **C.** Technical Assurance — congress-week (Items 9–11) | ₹3,639 | ~$43 | Allocated |
| **Phase 1 Total (A + B + C)** | **₹60,000** | **~$706** | Allocated |
| Phase 2 — Personnel & Operational Support (Items 12–17) | ₹29,000 | ~$341 | Allocated |
| **Total Allocated Expenditure** | **₹89,000** | **~$1,047** | — |
| Contingency Reserve — unforeseen technical and operational requirements | ₹11,000 | ~$129 | **Reserve — not yet allocated** |
| **Grand Total** | **₹1,00,000** | **~$1,176** | **Fully allocated** |
| | | | |
| Funds not yet allocated (contingency reserve) | **₹11,000** | **~$129** | Available for mid-event top-ups, emergency procurement, or scope additions |

*The contingency reserve is held for unforeseen technical and operational requirements such as unexpected traffic spikes, additional API quota, emergency contractor support, unplanned personnel coverage, or security remediation. Release requires technical lead approval and committee notification.*

---

## 5. Cost Scenarios

### 5.1 Minimum — ₹75,000 (~$882)

- Essential cloud upgrades (Firebase Blaze, Vercel Pro, domain registration, basic email)
- Reduced platform development scope and minimal pre-event assurance
- Limited personnel: data analyst and helpdesk only
- Contingency reserve: ₹11,000 (15%)

**Risk:** Moderate — adequate for controlled preview deployment but limited assurance and on-ground support for peak congress load.

### 5.2 Recommended — ₹1,00,000 (~$1,176) ★

- Full premium cloud stack including **ayurdisha.ai** domain registration (Subtotal A: ₹26,361)
- Complete platform development at realistic committee rate (Subtotal B: ₹30,000)
- Congress-week monitoring, on-call support, and hotfix reserve (Subtotal C: ₹3,639)
- Dedicated personnel for analytics, field coordination, documentation, UX review, and helpdesk
- Contingency reserve: ₹11,000 for unforeseen requirements

**Risk:** Low — aligns with professional event technology and operational standards for a national congress Experience Zone.

### 5.3 Maximum — ₹1,30,000 (~$1,529)

- Enterprise-grade cloud buffers (higher Firestore, Vercel, Gemini quotas)
- Extended platform development, penetration testing, and load testing cycles
- Full-week on-call support, larger hotfix reserve, and premium monitoring
- Expanded personnel team including additional field coordinators and communications support
- Contingency reserve: ₹12,000

**Risk:** Very low — suitable if national media coverage or record attendance is anticipated.

---

## 6. Timeline & Recommendations

| Phase | Timing | Action | Est. Cost (Recommended) |
|-------|--------|--------|-------------------------|
| **Immediate** | September 2026 | Register ayurdisha.ai domain; upgrade Firebase to Blaze; initiate security audit | ₹7,261 (domain + audit) + usage-based |
| **Platform build** | 8–10 weeks before congress | Software engineering sprint (Subtotal B); UX review; documentation draft | ~₹30,000 |
| **Pre-registration** | 6–8 weeks before congress | Activate Vercel Pro, Resend Pro; complete load test (in B) | ~₹18,000 (Subtotal A services) |
| **Registration open** | 4 weeks before congress | Penetration test; staff training; backup/DR verification | Included in Subtotal B |
| **Congress week** | Event dates (3 days) | On-call support; helpdesk active; monitoring live (Subtotal C) | ~₹3,639 + Phase 2 personnel |
| **Post-event** | Within 2 weeks after | Data analyst report; downgrade Vercel; final Firebase reconciliation | ~₹8,000 |

### Committee Decision Requested

1. **Approve total infrastructure budget of ₹1,00,000 (~$1,176 USD)** for the Recommended scenario
2. **Authorize domain registration (ayurdisha.ai)** and **Firebase Blaze / Vercel Pro** procurement before public registration opens
3. **Approve contingency reserve of ₹11,000** for unforeseen technical and operational requirements, releasable on technical lead recommendation
4. **Authorize technical team** to engage platform development, load testing, security review, and congress personnel upon approval

---

## 7. Annexures

### Annexure A — Domain Registration Quote

Registrar quote for **ayurdisha.ai** — first year: **₹4,760.95** (budget line: **₹4,761**). Screenshot on file at `public/docs/budget/domain-ayurdisha-ai.jpg`.

### Annexure B — Application Screenshots

Live production preview at [https://ayushmarg.vercel.app](https://ayushmarg.vercel.app):

| Screenshot | Description |
|------------|-------------|
| `app-landing.png` | Landing page / hero — delegate introduction |
| `app-knowledge.png` | Knowledge section — career pods and journal themes |
| `app-gemini.png` | Google Gemini journal search explainer |
| `app-hall.png` | The hall — mentor cluster overview |

---

## 8. Prepared By

| | |
|---|---|
| **Document** | Infrastructure Budget — AYURDISHA Meet the Mentors |
| **Prepared by** | AYURDISHA Technical Team, World Ayurveda Foundation |
| **Application** | [https://ayushmarg.vercel.app](https://ayushmarg.vercel.app) |
| **Planned Domain** | ayurdisha.ai |
| **Backend** | Google Firestore (`ayurdisha-4917b`), Vercel Serverless, Gemini API |
| **Prepared for** | World Ayurveda Foundation — Congress Organising Committee |
| **Date** | September 2026 |

---

*This document is intended for internal committee review. Cost estimates are based on published provider pricing, vendor quotes, and projected usage for the 11th World Ayurveda Congress; actual charges may vary with attendance and usage patterns. The contingency reserve ensures professional fund management and operational flexibility during the event period.*
