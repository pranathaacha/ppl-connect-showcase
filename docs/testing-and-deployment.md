# Testing and Deployment

PPL Connect became more useful as it became more reliable. I added automated tests, build checks, environment separation, and controlled release paths as the application moved from prototype behavior toward production use.

## TypeScript build

The backend is written in TypeScript and built before deployment. The build process also packages the database migration files needed by the deployed API.

Keeping migrations with the application makes schema evolution part of the same versioned codebase instead of a separate collection of manual scripts.

## Automated tests

The backend uses Vitest for automated testing.

Coverage grew with the platform and includes areas such as:

- authentication and application-user resolution
- role and permission rules
- employee lifecycle workflows
- onboarding and offboarding services
- document workflow behavior
- messaging and request services
- database-backed application paths
- regression cases discovered during production hardening

The exact production test suite is not copied into this repository. The public example shows the style of authorization testing without internal data.

[See the sanitized test example](../examples/integration-test-example.ts)

## PostgreSQL integration testing

Some behavior cannot be tested meaningfully with only mocked persistence.

For database-sensitive workflows, I added integration coverage against PostgreSQL so that queries, constraints, transactions, and application behavior are exercised together.

That was especially valuable for lifecycle and onboarding flows where a small mismatch between code and schema could break a complete user journey.

## CI checks

GitHub Actions is used to make repeatable checks part of the development process.

A release path can verify the backend through tests and build steps before deployment rather than relying on a local machine being in the right state.

## Development and Production

The platform uses separate Development and Production concerns instead of deploying everything into one shared environment.

That separation applies to configuration, database behavior, identity settings, document integration, and deployment credentials.

## Production release controls

Production deployment is intentionally more controlled than development deployment.

I added explicit release gates so production changes are deliberate. Database maintenance is handled separately from normal application deployment because schema changes have a different risk profile from shipping a new web or API build.

## Production troubleshooting

Moving a system into production exposes problems that do not always appear in a development environment.

PPL Connect required hardening around areas such as document behavior, identity mapping, database compatibility, workflow completion, and administrative access. I treated those issues as feedback on the architecture and added regression coverage where appropriate.

## Release principle

The principle I followed was simple: make routine changes repeatable, and make high-risk changes explicit.

Automation should remove unnecessary manual work, but it should not hide consequential production operations.