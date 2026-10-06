# Security Model

PPL Connect handles internal employee workflows, so I treated authentication and authorization as application design problems rather than UI details.

This document describes the security approach at a high level. It intentionally omits real identities, production identifiers, internal URLs, and configuration values.

## Authentication

Users sign in with Microsoft Entra ID. The application receives an authenticated Microsoft principal and validates that the request represents an authenticated identity.

Authentication alone is not enough. A valid Microsoft account does not automatically mean the user should have access to every PPL Connect feature.

## Application identity

After sign-in, the backend resolves the authenticated identity to an application user and, when applicable, to an employee record.

This allows the application to separate:

- external identity
- application user state
- employee relationship
- application role
- lifecycle and access status

That separation made it possible to support provisioning, deactivation, role changes, and employee lifecycle rules without treating Microsoft sign-in as the entire authorization model.

## Server-side authorization

Privileged routes enforce authorization in the API.

I use the browser to guide the user experience, but I do not rely on hidden navigation or disabled controls as security. If an operation requires elevated access, the server checks the application user before performing it.

A generic version of that pattern is included in [`examples/role-authorization.ts`](../examples/role-authorization.ts).

## Role boundaries

The production platform distinguishes among normal employee access and elevated operational roles such as manager, HR, business administration, and restricted technical administration.

The exact organization-specific mappings are not published here, but the important architectural idea is that not all administrative access is equal.

For example, a person who can manage a business workflow should not automatically gain access to technical maintenance functions.

## Restricted data separation

General employee-directory information and more sensitive employee information are treated as separate concerns.

The application avoids assuming that access to an employee profile implies access to every related private record or document.

## Document security

Document workflows are mediated through the backend. The browser does not receive unrestricted authority to choose privileged SharePoint destinations.

The server validates the operation, selects the allowed storage context, and then performs the Graph or SharePoint action.

This reduces the chance that a modified browser request can redirect a protected document into an unintended location.

## Secrets and configuration

Secrets are expected through environment configuration rather than being committed to source control.

Examples include database connection details, Microsoft application credentials, and environment-specific integration settings.

The public showcase contains none of those values.

## Development and Production

Development and Production are separate environments with separate configuration and release concerns.

I do not treat production as a copy of development with a different URL. Production changes deserve stronger controls because they can affect real users, data, identity, and document workflows.

## Audit-oriented behavior

Important privileged changes can be represented as explicit application events so the system has a durable record of who performed an action and what type of entity was affected.

The public examples use synthetic records only, but the underlying principle is consistent: important administrative behavior should be traceable.

## Security principles I used

1. Authenticate users through the organization's Microsoft identity provider.
2. Resolve identity to application-specific user and employee state.
3. Enforce privileged actions on the server.
4. Keep sensitive data boundaries explicit.
5. Give document integrations only the authority needed for the requested operation.
6. Keep secrets out of source control.
7. Separate business administration from restricted technical maintenance.
8. Treat production access and database changes as controlled operations.