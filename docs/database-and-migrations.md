# Database and Migrations

PostgreSQL became the persistence layer for PPL Connect as the platform moved beyond browser-local workflows.

The database is not just storage. It represents employee relationships, workflow state, document metadata, messages, requests, audit events, and other application behavior that needs to survive across sessions and users.

## Why PostgreSQL

The platform needed reliable relational state, transactional updates, explicit constraints, and a migration path that could evolve with the application.

PostgreSQL fit that well and worked cleanly with the TypeScript API through the `pg` client.

## Versioned migrations

Schema changes are maintained as ordered SQL migrations.

That gives me a repeatable record of how the data model changed over time and prevents production structure from depending on undocumented manual edits.

A synthetic example is included in [`examples/migration-example.sql`](../examples/migration-example.sql).

## Workflow state

Several PPL Connect features are stateful processes rather than single CRUD forms.

Examples include:

- onboarding progress
- Day-30 follow-up
- offboarding
- employee access state
- document requests
- document completion and review
- internal inbox state
- administrative workflows

I model these as explicit records and statuses so the application can reason about what has happened, what is allowed next, and who is responsible.

## Transactions

Where one business action affects several related records, I use transactions so the database does not end up partially updated.

For example, a privileged access change may need to update the application user and also record an audit event. Those changes should succeed together or roll back together.

## Auditability

Important administrative actions can create durable audit records containing information such as:

- actor
- action type
- entity type
- entity identifier
- structured metadata
- timestamp

The public repository does not contain production audit data.

## Document metadata

SharePoint stores document content, while PostgreSQL can store the application metadata needed to understand the workflow around that content.

That separation allows the system to keep document storage in Microsoft 365 while still maintaining application-specific state, review status, associations, and audit behavior.

## Production migration controls

I intentionally separated production database migration from normal application deployment.

A new frontend or API build should not automatically change production schema simply because code was deployed. Production migrations are treated as an explicit maintenance action with a deliberate operator step.

That approach makes releases slightly less automatic, but it reduces the risk of an application deployment making an unexpected database change.

## Simplified data-model pattern

A workflow-oriented model can look conceptually like this:

```text
employee_records
  └── portal_access
        └── application_users

onboarding_workflows
  ├── workflow_tasks
  └── document_workflows
        └── document_revisions

communications / requests / announcements

audit_events
```

These are intentionally generic labels and do not reproduce production table names or the production schema.

## What I learned

The most important lesson was that workflow behavior and data modeling have to be designed together.

A UI can make a process look simple, but reliable state requires clear identifiers, statuses, relationships, validation rules, and migration discipline underneath it.