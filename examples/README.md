# Sanitized Technical Examples

These examples illustrate engineering patterns I used while building PPL Connect without publishing production source code, organization-specific identifiers, credentials, or internal data.

They are deliberately small so the idea behind each pattern is easy to inspect.

## Included examples

- [`authentication-principal.ts`](authentication-principal.ts) shows how an authenticated Microsoft principal can be decoded and validated before the application resolves its own user state.
- [`role-authorization.ts`](role-authorization.ts) shows server-side role checks and the separation between active-user validation and privileged authorization.
- [`sharepoint-gateway.ts`](sharepoint-gateway.ts) shows the idea of putting document operations behind a backend-controlled integration boundary.
- [`migration-example.sql`](migration-example.sql) shows a simplified versioned PostgreSQL migration for workflow state and audit records.
- [`integration-test-example.ts`](integration-test-example.ts) shows the style of regression testing around authorization behavior.

## What these files are not

They are not copies of the production application and they are not meant to recreate PPL Connect as an installable open-source project.

The production repository remains private because it contains real operational configuration and internal data. These files exist to make the engineering approach inspectable without exposing that material.