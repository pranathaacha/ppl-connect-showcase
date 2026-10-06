# Technical Documentation

This directory contains the deeper technical material behind the PPL Connect case study.

## Start here

- [Product walkthrough](product-walkthrough.md) for the sanitized application screens and the workflows they represent
- [How PPL Connect evolved](project-evolution.md) for the progression from browser prototype to a multi-layer internal application

## Architecture and engineering

- [Architecture](architecture.md) for the major application layers and system boundaries
- [Security model](security-model.md) for authentication, application identity, authorization, restricted data, and production controls
- [Database and migrations](database-and-migrations.md) for PostgreSQL persistence, workflow state, transactions, auditability, and migration strategy
- [Document management](document-management.md) for the Microsoft Graph and SharePoint integration boundary
- [Testing and deployment](testing-and-deployment.md) for automated testing, PostgreSQL integration coverage, GitHub Actions, and release controls

## Code examples

The [`examples`](../examples/) directory contains small sanitized adaptations of engineering patterns used in the project. They are intentionally generic and are not copies of production source files.