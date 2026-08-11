---
type: professional-project
slug: fast
title: FAST
project: Experience Digital
visibility: public
status: published
featured: false
tags: C#, WinForms, Flutter, OCR, Full-text Search, Document Systems
homepageTitle: FAST
homepageSummary: A cross-platform document archiving and discovery platform that turns scanned records into searchable, governed workflows.
---

# FAST

## Executive Content

### Overview

FAST (File Archiving & Smart Tracking) was an Experience Digital project for making scanned corporate records easier to archive, discover, and review across desktop and mobile workflows. Instead of treating PDFs and TIFFs as opaque files, the product connected searchable OCR text back to the source document and its visual context.

### Product narrative

Large organizations can preserve years of contracts, invoices, and physical records while still making them difficult to find. FAST addressed that gap through a governed document vault: users could ingest records, wait for OCR and indexing to complete, search across extracted content, and open the matching document with the relevant text highlighted.

The product had to support two different working environments. A WinForms C# client served established Windows workstations and heavier document workflows, while a Flutter client supported mobile capture, review, and portable access. A shared service boundary kept authentication, vault access, document state, search, and status behavior aligned across both clients.

### What made the product difficult

The core challenge was not adding a search field to a file browser. OCR creates new searchable metadata from sensitive documents, and that metadata must inherit the same access boundaries as the original files. The system also had to represent asynchronous processing honestly: an archived document is not necessarily an OCR-ready document.

### Engineering contribution

The public narrative focuses on the cross-platform service boundary, document-processing states, OCR metadata, search behavior, and permission-aware retrieval. It does not claim ownership of the complete product or disclose private schemas, OCR vendors, infrastructure, or production implementation details.

### Results

The verified outcomes are structural and behavioral:

- Desktop and mobile clients shared a common model for vault access, document operations, and processing status.
- OCR results retained page and position context so a match could lead to a visual document highlight.
- Search was framed as a governed retrieval path rather than a client-side filter over exposed files.
- Background OCR and indexing states gave clients a way to distinguish archived, processing, indexed, and failed records.

No document-volume, search-latency, adoption, compliance, or business KPI is claimed because approved sources do not provide one.

### Key takeaway

FAST demonstrates that document intelligence is only useful when extraction, retrieval, authorization, and visual explanation are designed as one boundary. Search can find a record quickly without making the document vault less governed.

## Technical Deep-Dive

### System boundary

```text
WinForms desktop client        Flutter mobile client
             |                          |
             +---- shared service -----+
                          |
                  Vault and search API
                    /             \
                   /               \
          OCR and indexing     Access and audit
                   |               |
                   +-------+-------+
                           v
                 Document storage and metadata
```

The diagram is conceptual. It intentionally omits private endpoint names, storage schemas, OCR engines, deployment topology, and transport contracts.

### Asynchronous document intelligence

Ingestion was treated as a workflow rather than an immediate file write. A document could move through states such as archived, OCR-processing, indexed, or failed. That distinction matters because a user should not be told that a document is searchable while extraction or indexing is still incomplete.

The processing boundary separates three responsibilities:

1. Accept and retain the source asset.
2. Extract text and spatial metadata in background work.
3. Publish searchable state and connect matches to the source preview.

This model also creates a clear place for retry, failure explanation, and reconciliation without making either client guess what happened.

### OCR tokens and visual context

A text match is more useful when it can answer both “what matched?” and “where is it on the page?” FAST retained token-level context conceptually represented by page and bounding-box coordinates such as `(x, y, w, h)`. The search layer could use that information while the client translated it into a highlight overlay.

Keeping extraction, indexing, and rendering separate avoids coupling the mobile or desktop interface to proprietary OCR payload details. It also makes synthetic examples possible for public demonstrations without exposing customer documents.

### Permission-aware search

Authorization belongs before retrieval and snippet generation. A service-side query path should evaluate the active session, role, department, and vault scope before returning matching documents, OCR excerpts, autocomplete terms, counts, or ranking signals.

This is more than a security filter added after search. OCR turns document contents into new searchable surfaces, so every derived representation needs to remain inside the original permission boundary. Unauthorized records should be absent from the result set rather than removed after sensitive metadata has already crossed the service boundary.

### Cross-platform contract

The WinForms and Flutter clients had different interaction strengths, but they needed consistent behavior for authentication, vault navigation, document status, search, and permissions. A shared REST/WebSocket boundary provided the conceptual contract while allowing each client to use platform-appropriate controls and workflows.

The important design decision was to share business behavior, not to force identical screens. Desktop could prioritize dense document operations; mobile could prioritize capture, voice-oriented search, and preview. Both still needed to communicate the same processing state and access decision.

### Search and indexing tradeoffs

OCR corpora benefit from tokenization, phrase matching, fuzzy matching, autocomplete, and positional metadata, but each capability adds indexing and governance considerations. The public dossier does not identify the deployed search engine. PostgreSQL full-text search and SQLite FTS5 are useful comparison points, not implementation claims.

The durable tradeoff is between expressive retrieval and predictable authorization. Search quality should not be improved by widening the metadata surface beyond what the current user can access.

### Failure paths and auditability

Important failure cases include OCR timeout, malformed extraction, duplicate ingestion, stale processing status, permission changes during retrieval, and a search result whose source document is no longer available. Clients should expose those states without presenting a failed or unauthorized operation as a successful match.

Audit records provide a separate governance trail for relevant document and access operations. Exact event schemas, retention periods, encryption mechanisms, and policy engines remain private until verified for publication.

### Public-content boundary

This case study generalizes implementation details and does not publish private schemas, source paths, credentials, hostnames, OCR behavior, customer data, document identifiers, or unsupported compliance and scale claims. The attached FAST screens should be treated as illustrative media until reviewed for synthetic content and publication approval.
