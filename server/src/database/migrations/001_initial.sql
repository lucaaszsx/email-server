create table users (
    id         uuid primary key default gen_random_uuid(),
    username   text not null unique,

    -- password must be stored as a hash
    password   text not null,

    created_at timestamp not null default now(),
    updated_at timestamp not null default now()
);
