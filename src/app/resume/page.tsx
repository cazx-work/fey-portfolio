export default function Resume() {
  return (
    <div className="resume-page mx-auto max-w-6xl px-5 py-12 md:py-20">
      <section className="resume-hero" aria-labelledby="resume-title">
        <div>
          <p className="resume-eyebrow">Résumé <span>/ 2026</span></p>
          <h1 id="resume-title">Felix Edrian Ybañez</h1>
          <p className="resume-role">Software Engineer <span>·</span> Cebu, Philippines</p>
        </div>
        <a
          href="/Felix%20Edrian%20Ybanez%20-%20Resume%202026.pdf"
          download
          className="resume-download inline-flex w-fit items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-slate-950 transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          aria-label="Download Felix Edrian Ybañez's résumé as a PDF"
        >
          <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 fill-current">
            <path d="M10 2a1 1 0 0 1 1 1v7.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L8 10.586V3a1 1 0 0 1 1-1Zm-6 13a1 1 0 0 1 1 1v1h10v-1a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1Z" />
          </svg>
          Download résumé
        </a>
      </section>
      <div className="resume-card mt-8 grid gap-10 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 md:p-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(15rem,0.65fr)] lg:gap-12">
        <div className="prose resume-content text-justify">
          <div className="resume-section-heading">
            <span className="resume-section-number">01</span>
            <h2>Professional summary</h2>
          </div>
          <p>
            Software Engineer with 7+ years of experience building production applications across mobile, web, and desktop platforms. Specialized in Flutter with Dart FFI for native system integration. Experienced in modernizing legacy systems and developing cross-platform applications for enterprise and professional audio solutions.
          </p>

          <div className="resume-section-heading">
            <span className="resume-section-number">02</span>
            <h2>Technical skills</h2>
          </div>
          <ul>
            <li><strong>Languages:</strong> Dart, JavaScript, TypeScript, C++, C#</li>
            <li><strong>Frameworks:</strong> Flutter, React, Node.js, NestJS</li>
            <li><strong>Native integration:</strong> Dart FFI, Dante Audio Networking, AES70 OCA Protocol</li>
            <li><strong>Backend &amp; APIs:</strong> REST APIs, GraphQL, Firebase</li>
            <li><strong>State management:</strong> BLoC, Provider, Riverpod</li>
            <li><strong>Databases:</strong> SQLite, PostgreSQL, Firestore, SQL Server, MySQL</li>
            <li><strong>Development &amp; DevOps:</strong> Git, GitHub, Docker, GitHub Actions, CI/CD, VS Code</li>
            <li><strong>Platforms:</strong> Android, iOS, Web, Windows, macOS, Linux</li>
          </ul>

          <div className="resume-section-heading">
            <span className="resume-section-number">03</span>
            <h2>Work experience</h2>
          </div>
          <h3>Software Engineer — Karno Sound</h3>
          <p><strong>Remote (London, UK) · Jan 2024 – Jul 2026</strong></p>
          <p>Developing SEPIA, Karno’s modular, digitally controlled true-analog audio platform for live sound, studio recording, and theatrical production.</p>
          <ul>
            <li>Developed Flutter applications with Dart FFI to integrate native C++ audio libraries.</li>
            <li>Integrated Dante APIs and AES70 to enable audio routing, device discovery, and remote device control.</li>
            <li>Refactored legacy modules into a modular BLoC architecture for improved maintainability.</li>
            <li>Enhanced GitHub Actions CI/CD workflows for automated testing and deployment.</li>
            <li>Collaborated with frontend, native, and firmware engineers to deliver integrated software solutions.</li>
          </ul>

          <h3>Software Engineer — Experience Digital</h3>
          <p><strong>Remote (Sydney, AU) · Mar 2023 – Nov 2023</strong></p>
          <p>Developed enterprise business and event management applications.</p>
          <ul>
            <li>Developed Flutter features for a production event management application.</li>
            <li>Migrated legacy platform modules to React, NestJS, and TypeScript.</li>
            <li>Designed PostgreSQL database schemas and implemented GraphQL integrations.</li>
            <li>Utilized Riverpod, Redux, Docker, and CI/CD throughout the development workflow.</li>
          </ul>

          <h3>Flutter Developer — Xurpas Inc.</h3>
          <p><strong>Remote (Makati, PH) · Aug 2022 – Feb 2023</strong></p>
          <p>Contributed to the development of MetaCare, a healthcare mobile application.</p>
          <ul>
            <li>Developed responsive Flutter user interfaces from Figma designs.</li>
            <li>Built reusable Flutter widgets and shared UI components for consistent application design.</li>
            <li>Implemented BLoC architecture to improve state management and code organization.</li>
          </ul>

          <h3>Software Engineer — Kyocera Document Solutions Philippines</h3>
          <p><strong>Hybrid (Cebu, PH) · Jul 2021 – Aug 2022</strong></p>
          <p>Developed enterprise software supporting printer management, device communication, and business operations.</p>
          <ul>
            <li>Developed C# backend services for enterprise device communication.</li>
            <li>Maintained AngularJS web applications supporting printer management systems.</li>
            <li>Developed and maintained SQL Server databases for business applications.</li>
          </ul>

          <h3>Software Engineer — Bluebeans Systems</h3>
          <p><strong>On-site (Dumaguete, PH) · Jun 2018 – Jun 2021</strong></p>
          <p>Built business process automation and document management solutions for enterprise clients.</p>
          <ul>
            <li>Built the QPro queue management system for customer service operations.</li>
            <li>Built document archiving applications using C# WinForms and Flutter.</li>
            <li>Developed MySQL backend integrations for business management applications.</li>
          </ul>
        </div>

        <aside className="prose resume-sidebar lg:border-l lg:border-[var(--line)] lg:pl-10">
          <div className="resume-section-heading">
            <span className="resume-section-number">04</span>
            <h2>Core competencies</h2>
          </div>
          <ul>
            <li>Structured problem solving</li>
            <li>AI-assisted development</li>
            <li>Cross-functional collaboration</li>
            <li>System integration</li>
            <li>Software design</li>
            <li>Continuous improvement</li>
            <li>Quality-focused engineering</li>
            <li>Ownership &amp; accountability</li>
          </ul>

          <div className="resume-section-heading">
            <span className="resume-section-number">05</span>
            <h2>Education</h2>
          </div>
          <p><strong>Bachelor of Science in Computer Engineering</strong><br />Negros Oriental State University · 2019</p>

          <div className="resume-section-heading resume-contact-heading">
            <span className="resume-section-number">06</span>
            <h2>Contact</h2>
          </div>
          <p className="resume-contact-links">
            <a href="tel:+639558175624">+63 955-8175-624</a>
            <a href="mailto:yfelixedrian@gmail.com">yfelixedrian@gmail.com</a>
            <a href="https://linkedin.com/in/ybanezfe">linkedin.com/in/ybanezfe</a>
          </p>
        </aside>
      </div>
    </div>
  );
}
