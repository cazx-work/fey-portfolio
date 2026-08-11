# FAST — Portfolio Content Dossier

This is the editorial source for the FAST project narrative. It is organized into an executive layer for product and business readers and a technical layer for systems and application engineers.

## Publication status

- **Source basis:** User-provided FAST business and technical narrative; project-specific evidence and publication approval are still required.
- **Public posture:** Draft case-study content. Keep architecture and responsibilities at a high level until the implementation details are corroborated.
- **Code posture:** Illustrative or redacted examples only; do not publish production source, private schemas, credentials, hostnames, or proprietary OCR behavior.
- **Media posture:** Screenshots, recordings, and diagrams require review for customer data, document contents, identifiers, and unreleased UI.

# Executive content

## Title

FAST

## Expanded name

File Archiving & Smart Tracking

## One-line positioning

An enterprise document archiving and discovery platform that turns scanned files into governed, OCR-searchable records across desktop and mobile workflows.

## Product narrative

FAST is positioned as a secure digital vault for corporate documents, including scanned contracts, invoices, and physical records. Instead of treating PDFs and TIFF images as opaque files, the platform extracts searchable text and connects each match back to the source document. Teams can discover a relevant record from a desktop workstation or a mobile device without manually opening files one by one.

The platform combines document archiving, full-text OCR intelligence, permission-aware discovery, secure file sharing, and auditability. Its cross-platform clients preserve a common operational model across legacy Windows workstations and modern mobile workflows.

## The problem

Large organizations often accumulate scanned documents that are difficult to search. Traditional file storage can preserve the document without understanding its contents, forcing employees to open files manually to find names, invoice numbers, taglines, or line items. Access rules can also become fragmented when desktop and mobile clients evolve separately.

## Engineering contribution

The FAST narrative focuses on the boundaries that make document intelligence useful and safe:

- Connected a WinForms C# desktop client and Flutter mobile client through a unified service interface.
- Supported document ingestion and asynchronous OCR processing for scanned PDFs and TIFF images.
- Preserved text tokens and spatial coordinates so search matches could be highlighted on document previews.
- Designed full-text search around tokenized OCR payloads, positional metadata, fuzzy matching, phrase matching, and autocomplete.
- Applied permission evaluation before search results or OCR snippets were returned.
- Supported role-based access, department-scoped vaults, encrypted storage, and audit trails as governance concerns.

## Intended business impact

The requested product narrative emphasizes faster discovery of archived records, stronger governance of corporate files, and operational parity between Windows desktop and mobile access. Any specific time, volume, adoption, or compliance outcome must be backed by project evidence before it is presented as a measured result.

# Technical deep dive

## Architecture at a glance

```text
WinForms C# desktop client       Flutter mobile client
             |                             |
             +------ REST / WebSockets ---+
                              |
                    FAST Vault API Gateway
                       /              \
                      /                \
       OCR document intelligence       Governance and access
              |                        |
       Text and box metadata       Encrypted storage and audit
              |                        |
              +------ Full-text search index
```

The diagram is conceptual. Exact endpoints, message contracts, storage schemas, OCR vendors, infrastructure, and deployment topology should remain private unless separately approved.

## Dual-stack cross-platform architecture

The desktop and mobile clients had different interaction strengths: the WinForms application served established Windows workstation workflows, while Flutter supported responsive mobile access, camera uploads, voice search, and portable OCR previews. A shared REST/WebSocket boundary provided a common contract for authentication, vault access, document operations, search, and status updates.

The engineering challenge was not simply rendering the same screens twice. It was preserving consistent permissions, document state, search behavior, and security expectations across a legacy desktop client and a modern mobile client. Async/await patterns and purpose-built desktop controls supported heavier document workflows, while Flutter handled mobile-oriented capture and review flows.

## OCR extraction and bounding-box overlays

Document ingestion was treated as an asynchronous pipeline. OCR output included extracted tokens and spatial metadata represented conceptually as $(x, y, w, h)$ coordinates. Search results could therefore identify both the matching text and its location on the source page, allowing clients to render a contextual highlight over a scanned document preview.

This separates three concerns:

1. Extracting text from a scanned asset.
2. Indexing text while retaining page and position metadata.
3. Translating a search match into a client-side visual overlay.

The public case study should describe these boundaries without publishing OCR payload schemas or proprietary extraction logic.

## Full-text search and high-throughput indexing

The search layer was designed for large OCR corpora containing names, taglines, invoice numbers, timestamps, and line items. OCR payloads were sanitized and tokenized before indexing. The proposed technical framing references PostgreSQL `tsvector` and SQLite FTS5 as possible full-text indexing engines; the deployed engine and its operating characteristics must be confirmed before either is presented as an implementation fact.

The intended search capabilities include:

- Full-text and phrase matching.
- Fuzzy matching for imperfect OCR results.
- Positional metadata for page and overlay rendering.
- Autocomplete over indexed document vocabulary.
- Result scoping before snippets are exposed to a user.

## Governance, RBAC, and audit trails

FAST treats authorization as part of search correctness, not only a client-side display concern. A search request is evaluated against the active session and department role matrix before matching documents or OCR snippets are returned. Unauthorized records should be absent from the result set rather than filtered only after sensitive metadata has already crossed a service boundary.

The governance model includes the following conceptual responsibilities:

- Role-based access to department and document vaults.
- Secure file sharing within explicit permission boundaries.
- Encrypted document storage.
- Audit records for relevant access and document operations.
- Permission-aware search and snippet generation.

Exact token formats, encryption mechanisms, audit event schemas, and policy-evaluation implementation are not public content without further approval.

## Key engineering decisions

### Search authorization before retrieval

Authorization belongs in the service-side query path so unauthorized documents do not leak through filenames, OCR snippets, autocomplete suggestions, counts, or ranking signals.

### OCR metadata as a first-class model

Text and spatial coordinates are retained together rather than treating OCR as a plain text dump. This enables search results to explain where a match appears and supports consistent highlighting across clients.

### Shared contracts, platform-specific experiences

The API boundary establishes consistent business behavior while allowing WinForms and Flutter to use interaction patterns appropriate to their operating environments.

### Asynchronous processing with visible state

OCR and indexing should be modeled as background work with explicit document-processing state. Clients can then distinguish an archived document from a document that is fully searchable.

## Proof plan

The strongest public case study would combine:

1. A redacted workflow showing archive, OCR processing, search, and highlighted retrieval.
2. A conceptual architecture diagram showing both client stacks and the governance boundary.
3. A permission scenario demonstrating that unauthorized documents and snippets do not appear in search.
4. A simplified overlay example using generated or synthetic document content.
5. Evidence for any claimed scale, latency, compliance, or operational improvements.

## Interview prompts

- How do you preserve permission boundaries when OCR turns document contents into searchable metadata?
- Why should authorization happen before full-text matching and snippet generation?
- How do bounding boxes change the design of a document search result?
- Which behaviors belong in a shared API contract versus a platform-specific client?
- How should clients communicate the difference between archived, OCR-processing, indexed, and failed documents?
- What tradeoffs determine whether PostgreSQL full-text search or SQLite FTS5 is appropriate?

## Open verification questions

Before promoting this dossier into production-facing project content, confirm:

- The public project name and expanded name.
- Whether FAST was a shipped product, internal platform, prototype, or contribution to a larger system.
- The exact responsibilities and ownership boundaries for the WinForms C# and Flutter clients.
- The deployed OCR engine, search engine, storage system, and transport details.
- Whether voice search, camera uploads, WebSockets, encrypted storage, and audit trails were implemented in the described scope.
- Any measurable search-time, document-volume, reliability, compliance, or adoption outcomes.
- Which screenshots, recordings, diagrams, and code examples are approved for publication.