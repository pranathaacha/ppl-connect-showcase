# How PPL Connect Evolved

PPL Connect did not begin with a finished architecture. It grew as the operational problems became clearer and the consequences of the workflows became more serious.

That evolution is important because many of the technical decisions came from real constraints rather than from trying to maximize the number of technologies in the stack.

## 1. Browser prototype

The earliest version focused on proving that a single internal portal could organize processes, systems, people, documents, training, requests, onboarding, and other employee resources in one place.

At that stage, speed of iteration mattered more than building every production layer up front.

## 2. API and persistence foundation

As workflows needed to survive across sessions and users, browser-local state stopped being enough.

I added a TypeScript backend with Azure Functions and PostgreSQL persistence, then began moving important workflow state behind server APIs. This created a foundation for validation, authorization, durable state, migrations, and automated testing.

## 3. Employee lifecycle workflows

Onboarding, Day-30 follow-up, and offboarding turned the portal into a stateful operational system.

These features required clearer ownership, workflow statuses, employee relationships, task persistence, and rules around what could happen next. They also forced the data model and user experience to evolve together.

## 4. SharePoint-backed document management

Document workflows introduced a different class of problem. The application needed to work with Microsoft 365 storage without giving the browser direct control over privileged storage behavior.

I introduced a backend-controlled Microsoft Graph and SharePoint integration so the application could support document browsing, uploads, downloads, requests, and restricted employee document workflows while keeping authorization and storage rules on the server.

## 5. Real identity and stronger authorization

As the application moved toward broader internal use, identity became more than a development convenience.

Microsoft Entra ID provided authentication, while PPL Connect maintained its own application-user, employee, role, and lifecycle state. I moved privileged decisions to the API and separated normal employee access, business administration, HR-oriented functions, and restricted technical maintenance.

## 6. Production separation and release controls

Development and Production became separate operational concerns with different configuration, database, identity, integration, and release requirements.

I added repeatable GitHub Actions workflows, production release gates, explicit database-maintenance paths, and regression coverage around problems discovered during production hardening.

## 7. Employee experience and richer workflows

Once the core platform was stable enough to support more use cases, the product expanded into internal inbox, announcements, requests, recognition, training, employee journeys, process guidance, and additional administrative workflows.

The challenge at this stage was not simply adding screens. New capabilities had to reuse the same identity, authorization, persistence, document, audit, and deployment foundations.

## 8. Document completion and review

Document workflows later became more structured, with concepts such as source versions, revisions, completion state, integrity metadata, supporting attachments, review, correction, and finalization.

This pushed the system beyond basic file storage into application-managed document processes while still keeping the underlying document content in Microsoft 365.

## 9. Restricted business operations

The platform also expanded into restricted operational areas such as contract administration, where access, ownership, renewal timing, status, and auditability matter.

This reinforced an architectural principle I had already learned elsewhere in the project: business administration and technical administration should not automatically be the same permission.

## What changed in my approach

The biggest shift was learning not to over-design the first version and not to under-design the system once a workflow becomes important.

I started with the smallest thing that could prove the idea, then added persistence, security boundaries, testing, integrations, and release controls as the application earned the need for them.

That is how I prefer to build now: understand the real problem first, keep the first solution practical, and strengthen the architecture as the consequences of the system become real.