# Public application placement policy

The `apps/` directory is for small, open, browser-based tools that form part of
QED-AI's public-benefit work. The catalog at `/apps/` is generated from
`catalog.json`.

## Keep an app in this repository when

- every deployed file is appropriate for unrestricted public access;
- the app runs as static HTML, CSS, JavaScript, WebAssembly, or public data;
- it does not need a secret, server process, private API, durable write, user
  account, or sensitive transaction;
- it has a bounded purpose and a lightweight dependency and asset footprint;
- it can share this site's release cadence and maintainers; and
- its source, limitations, and status can be stated publicly.

## Use a separate repository and service when

- the app needs authentication, server-side logic, a database, uploads, email,
  payments, signatures, or confidential inputs;
- it has its own contributors, release cycle, license, compliance boundary, or
  likely independent reuse;
- its build or assets materially increase the public site's size or bandwidth;
  or
- failure or compromise should be isolated from the main public website.

A separately hosted public app may still appear in `catalog.json` using its
external HTTPS URL.

## Never publish here

- Operations Hub state, exports, meeting recordings, signatures, or internal
  governance records;
- residential addresses, credentials, API keys, private email, or personal
  identifiers not intentionally approved for public release;
- unreviewed source corpora, confidential correspondence, or restricted filing
  evidence; or
- a form that collects sensitive information or claims to provide identity
  verification.

## Directory convention

```text
apps/
  catalog.json
  shared/
  <app-slug>/
    index.html
    assets/
    README.md
```

The app README should record its purpose, audience, inputs, outputs,
limitations, data behavior, accessibility notes, source provenance, license,
version, and responsible maintainer.

## Catalog entry

Add one object to the `apps` array in `catalog.json`:

```json
{
  "slug": "example-tool",
  "name": "Example Tool",
  "summary": "A concise public description.",
  "status": "Released",
  "version": "1.0.0",
  "path": "example-tool/"
}
```

## Release checklist

1. Confirm the repository placement rules above.
2. Confirm no private data, secrets, source maps containing private paths, or
   internal records are included.
3. Document inputs, outputs, limitations, data handling, accessibility, and
   source provenance.
4. Test direct navigation and relative assets under `/apps/<app-slug>/`.
5. Add the catalog entry and verify the public catalog.
6. Record the release in version control.
