-- Sanitized adaptation for the public PPL Connect case study.
-- All identifiers and sample values are generic.

create table if not exists employee_workflows (
    id uuid primary key,
    employee_id uuid not null,
    workflow_type text not null,
    status text not null check (
        status in ('not_started', 'in_progress', 'completed', 'cancelled')
    ),
    owner_user_id uuid,
    started_at timestamptz,
    completed_at timestamptz,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create index if not exists employee_workflows_employee_idx
    on employee_workflows (employee_id, status);

create table if not exists workflow_audit_events (
    id uuid primary key,
    workflow_id uuid not null references employee_workflows(id),
    actor_user_id uuid not null,
    action text not null,
    metadata jsonb not null default '{}'::jsonb,
    created_at timestamptz not null default now()
);

create index if not exists workflow_audit_events_workflow_idx
    on workflow_audit_events (workflow_id, created_at desc);
