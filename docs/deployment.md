# Deployment

The site is a static-friendly Next.js application with no database or runtime secrets.

## Vercel

1. Import the repository into Vercel.
2. Use the detected Next.js build settings.
3. Set the production domain used by `metadataBase`, sitemap, and robots.
4. No deployment secrets are required by the repository workflow.

## Cloudflare

Use the Next.js deployment adapter appropriate for the selected Cloudflare product, or export static output after confirming all desired features are compatible. Update the canonical domain in `src/app/layout.tsx`, `src/app/sitemap.ts`, and `src/app/robots.ts`.

The GitHub Actions workflow validates code; it does not deploy.

This is a **moderate match**, strongest for Flutter project takeover, refactoring, architecture, state management, and AI-generated code cleanup.

**Strong alignment**

- Five years of Flutter experience
- Experience improving complex existing codebases
- BLoC/state management and service boundaries
- Firebase, REST APIs, and backend integrations
- AI-assisted development with independent code review
- Mobile application and CI/CD experience
- Strong written communication
- Experience with content and healthcare-related mobile products

**Gaps to answer honestly**

- Vimeo, YouTube, Kajabi, and WordPress REST API experience are not clearly documented.
- Video/audio persistence and background audio are not strongly evidenced.
- Gamification is not a core proven area. You can mention your experience with domain modeling and synchronized control logic, but do not present it as gamification.
- You need to provide real backup hardware and secondary ISP details.
- You need actual media-heavy app links or screenshots. Your portfolio alone may not satisfy that requirement.

The required application starts with **Audio**, so you could use this response:

---

Audio

Hello,

I am an experienced Flutter and Dart developer with five years of Flutter experience and more than seven years of professional software development experience across mobile, web, desktop, and connected systems.

I am interested in this role because it focuses on taking ownership of an existing Flutter application, improving its structure, fixing integration issues, and preparing it for reliable long-term maintenance and store release.

Background audio in three steps:

1. I would separate the audio service and playback state from individual screens so navigation does not dispose of the active player.
2. I would use a central playback controller or service to manage the queue, current position, play/pause state, and lifecycle events.
3. I would connect screens to the shared playback state and handle app lifecycle, interruptions, completion, and cleanup explicitly so playback remains consistent across navigation and background transitions.

Project takeover process:

I have worked on complex existing applications and understand the importance of auditing before rewriting. My process would be:

1. Run the application, reproduce current bugs, and document the existing flows and integrations.
2. Map the architecture, state ownership, API boundaries, dependencies, and areas where business logic is inside UI code.
3. Prioritize stability issues and integration failures before making broader structural changes.
4. Move duplicated or UI-owned logic into focused services, repositories, and state-management boundaries.
5. Refactor incrementally with tests and small reviewable changes, preserving working behavior while improving maintainability.

I also use AI-assisted tools such as GitHub Copilot, but I do not depend on generated code without review. I inspect the architecture, verify assumptions, test behavior, and fix code when generated solutions are incomplete or incorrect.

Gamification:

Gamification has not been my primary production specialization. However, I have experience designing stateful domain logic, validation rules, synchronized workflows, and complex user interactions. For example, I worked on a Flutter module-layout system where user actions were converted into validated domain events, synchronized across related data, and reflected predictably in the interface. I would apply the same discipline to learning paths, progress tracking, completion states, points, badges, or other engagement features.

Understanding of the role:

The primary goal is to take over the existing Flutter application, make it stable and maintainable, complete the media and backend integrations, fix the remaining bugs, and prepare a polished version for App Store and Google Play release. The role also requires close coordination with the web developer and designer so the app remains synchronized with the website and backend data.

Availability and communication:

I am based in Cebu, Philippines, and am available for full-time work. I can provide 2-4 hours of daily overlap with South African Standard Time. My usual response time is within 30 minutes to 1 hour after I see a message during my active working hours.

Rate:

USD 10 per hour.

Portfolio:

https://feybanez.vercel.app/

Introduction video:

https://www.loom.com/share/0f6ebea5c5bc4f1b8111443c6a69ad81

Backup and connectivity:

City/region: Cebu, Philippines
Power-outage backup: Power Station
Primary ISP: PLDT
Secondary ISP: Globe

Best regards,
Felix Edrian Ybañez
