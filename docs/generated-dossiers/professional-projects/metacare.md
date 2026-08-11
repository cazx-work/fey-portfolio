---
type: professional-project
slug: metacare
title: MetaCare — Web3-Enabled Health & Wellness Superapp
project: Xurpas Inc.
visibility: private
status: draft
featured: false
tags: Flutter, Firebase, Xendit, REST APIs, HealthTech, Marketplace, Mobile Engineering
homepageTitle: MetaCare — Web3-Enabled Health & Wellness Superapp
homepageSummary: A Flutter health and wellness marketplace bringing products, services, benefits, and appointments into one experience for independent workers and entrepreneurs.
---

# MetaCare — Web3-Enabled Health & Wellness Superapp

## Executive Content

### Overview

MetaCare was a mobile health and wellness superapp developed at Xurpas Inc. for independent workers, digital creators, freelancers, and entrepreneurs. It brought healthcare, wellness, insurance, financial, and lifestyle services into one cross-platform Flutter experience, with marketplace discovery, membership benefits, checkout, fulfillment, and appointment workflows connected in a single product.

This dossier is a draft. The supplied product narrative supports the engineering themes below; the exact Web3 implementation, release scope, timeline, team context, and measurable outcomes still require publication approval before this case study becomes public.

### Product narrative

Corporate employees may receive group healthcare benefits and negotiated rates, while independent workers often have to assemble those services across separate platforms. MetaCare addressed that gap through a unified marketplace for health and lifestyle needs: users could browse products, book services, discover merchants, manage benefits, and track orders from one account.

The product had to make very different service models feel coherent. A pharmacy order involved catalog filtering, inventory, delivery or pickup, and return handling. A tele-consultation involved scheduling and appointment status. Insurance, loans, subscriptions, education, mental health, and co-working services introduced their own eligibility, fulfillment, and voucher requirements.

### The problem

Independent workers and gig professionals needed more accessible healthcare and lifestyle services, but separate providers created friction around discovery, pricing, payments, appointments, and order follow-up. The engineering challenge was to unify these flows without pretending that every vertical had the same transaction model.

### Engineering contribution

As a Flutter / Mobile Software Engineer, the contribution centered on the cross-platform client architecture and the boundaries between feature domains, marketplace state, payment processing, and real-time fulfillment. The work included modularizing divergent service verticals, supporting dynamic membership pricing, integrating Xendit payment flows, and keeping catalog and order interactions responsive on mobile devices.

### Intended value

MetaCare was designed to give members one place to discover health and wellness benefits, access partner services, complete transactions, and follow what happened next. The strongest engineering value was the shared workflow model underneath the marketplace: different products and services could use the checkout and account experience while retaining their own fulfillment rules.

### Key takeaway

A superapp is not made coherent by collecting screens in one package. It becomes coherent when domain-specific service rules meet shared boundaries for identity, pricing, checkout, payment confirmation, order state, and user feedback.

### Evidence and media

The supplied mobile screenshots illustrate the product’s major surfaces. Filenames are retained as local asset references and should be reviewed for publication approval before being exposed in the site:

- `public/images/optimized/projects/Metacare/metacare-1.jpg` — home experience, savings summary, marketplace categories, popular products, and discoveries.
- `public/images/optimized/projects/Metacare/metacare-2.jpg` — benefits tab, subscriptions, and appointment schedules.
- `public/images/optimized/projects/Metacare/metacare-3.jpg` — product catalog search, categories, brands, and product discovery.
- `public/images/optimized/projects/Metacare/metacare-4.jpg` — services discovery, categories, merchants, and subscriptions.
- `public/images/optimized/projects/Metacare/metacare-5.jpg` — merchant discovery, featured merchants, and new merchants.
- `public/images/optimized/projects/Metacare/metacare-6.jpg` — order history with product and service states.
- `public/images/optimized/projects/Metacare/metacare-7.jpg` — order summary, delivery details, merchant contact details, and refund action.

## Technical Deep-Dive

### Architecture thesis

```text
Flutter feature modules
          |
          v
Shared identity, catalog, cart, and checkout state
          |
          +--> Physical fulfillment: address, delivery/pickup, returns
          |
          +--> Digital fulfillment: scheduling, vouchers, appointments
          |
          v
REST APIs and merchant integrations
          |
          +--> Firebase Auth, Firestore / Realtime Database, FCM
          |
          v
Xendit payment orchestration and transaction verification
```

The architectural goal was to keep cross-cutting infrastructure reusable while isolating the rules of each service vertical. The app-facing model could represent a product, consultation, subscription, insurance offering, or other benefit without forcing every domain through an identical UI or fulfillment path.

### Feature-first modularization

The application was organized around feature and domain boundaries such as marketplace, telehealth, insurance and loans, and checkout. Shared design-system components, network behavior, Firebase services, and payment bridges stayed separate from feature-specific catalog, appointment, application, and fulfillment logic.

This structure reduced the chance that a new vertical would spread special cases through unrelated screens. It also gave each domain a clearer place for validation, state transitions, repository access, and UI composition. The public case study should describe this as a contribution to a scalable client architecture rather than claim sole ownership of the whole application.

### State management and unidirectional flow

Reactive state management handled cart contents, tier-based pricing, catalog filters, membership changes, payment progress, appointments, and order status. A unidirectional flow made user intent and service responses easier to distinguish: a filter action changed local query state, a checkout action entered a transaction state, and a backend or payment update confirmed or rejected the next transition.

The same discipline was useful for membership benefits. Premium pricing could be reflected immediately in the client experience while authoritative validation remained on the backend, preventing a display calculation from becoming the source of truth for a transaction.

### Dual checkout pipeline

Physical and digital items require different validation and fulfillment rules. The checkout model used item metadata to select the appropriate path:

- **Physical commodities:** shipping address, merchant stock, delivery or pickup selection, payment, fulfillment status, and a return request window.
- **Digital or scheduled services:** appointment or session selection, provider availability, voucher or entitlement generation, and digital fulfillment without a delivery step.

Keeping these paths behind a shared cart and order vocabulary allowed the app to present one checkout journey while preserving domain-specific requirements.

### Xendit payment resilience

Xendit provided the payment integration for local e-wallets, cards, bank transfers, and other configured payment rails. Mobile payment flows can leave the app or lose connectivity, so checkout could not depend on a single uninterrupted foreground session.

The transaction flow was designed around idempotent initiation, retry-aware client state, and asynchronous confirmation. Payment status could be reconciled through backend webhook handling, status polling, and Firebase-driven updates, allowing the order state to converge even if a user was redirected to an external payment surface or closed the app before returning.

The important boundary is that the client presents progress and recovery affordances, while the verified payment and order state comes from trusted service responses rather than a local success flag.

### Firebase services and real-time order state

Firebase Authentication supported account identity and configured sign-in methods. Custom claims and backend authorization could gate access to membership benefits, while the client treated the authenticated session as a capability rather than a reason to expose privileged data directly.

Firestore or Realtime Database supported synchronized order lifecycle updates, and Firebase Cloud Messaging supported context-aware notifications such as appointment reminders, order changes, and relevant offers. These streams reduced the need for users to repeatedly refresh a history or appointment screen, while explicit loading, stale, pending, and error states kept asynchronous behavior legible.

### Catalog rendering and filtering

The marketplace combined rich imagery, product and merchant metadata, categories, brands, pricing, and membership context. Lazy-loaded list builders, image caching, selective widget rebuilding, and decoupled filter computation were used to protect scroll and interaction responsiveness as catalog state changed.

The performance strategy was structural rather than dependent on one benchmark: render only what is needed, avoid rebuilding unrelated regions, cache repeated assets, and keep compound filter work away from the most sensitive interaction path where possible. No unsupported device, frame-rate, or scale claim is published here.

### Merchant and fulfillment boundaries

Third-party merchants and providers introduced external stock, service availability, product authenticity, and fulfillment state. The client needed to represent those conditions without making a partner response look like a durable order guarantee.

A resilient flow distinguishes catalog discovery, cart intent, payment state, merchant confirmation, fulfillment, completion, and return or refund requests. That distinction is visible in the supplied screens: product and service history entries share an account surface, but retain different labels, quantities, statuses, dates, and follow-up actions.

### Tradeoffs

- **Shared checkout versus vertical autonomy:** common cart and order primitives reduce repeated UX, while item metadata and domain adapters preserve different fulfillment rules.
- **Immediate client feedback versus authoritative state:** optimistic presentation improves responsiveness, while payment, membership, and order confirmation remain service-owned.
- **Real-time updates versus lifecycle complexity:** synchronized order and appointment state improves visibility, but requires explicit subscription cleanup, stale-state handling, and reconnection policy.
- **Rich catalogs versus mobile performance:** visual discovery is valuable, but lazy rendering, image caching, and narrow update boundaries are necessary to keep interaction costs bounded.

### Interview discussion topics

- How would you model a cart containing both a delivered medicine item and a scheduled consultation?
- Which payment states must be idempotent when an e-wallet redirect is interrupted?
- Where should premium pricing be calculated, validated, and displayed?
- How should real-time order updates converge with a locally pending checkout?
- What belongs in a shared superapp core, and what must remain inside a vertical feature module?

### Publication boundary

This dossier remains private and draft until Xurpas, relevant partners, and the project owner approve the product identity, exact employment and role framing, Web3 terminology, implemented technologies, screenshots, merchant/provider references, payment details, dates, and any user or business outcomes. Do not expose it through public navigation until those confirmations are complete.
