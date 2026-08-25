# Security Remediation Status

**Last updated:** August 25, 2026
**Project:** fuaad-portfolio

The previous contact API exposure has been remediated, and the newer admin-only surfaces are now covered by route tests and documentation.

## Resolved

| Surface | Current behavior |
|---|---|
| `GET /api/contact` | Requires `Authorization: Bearer <ADMIN_TOKEN>`. Missing or invalid tokens return `401`. |
| `POST /api/ai` and `GET /api/ai` | Admin-only. Public portfolio chat calls `/api/mock-ai` instead. |
| `/api/upload` | Blob upload, list, and delete operations are admin-only. |
| Email filtering | Contact retrieval allows exact email filtering only after admin authentication. |
| Proof media | Referenced project and case-study assets are validated by tests. |

## Canonical Docs

- [docs/SECURITY_CONFIG.md](docs/SECURITY_CONFIG.md) for environment and verification setup
- [docs/API.md](docs/API.md) for endpoint behavior
- [docs/openapi.yaml](docs/openapi.yaml) for the generated-contract source
- [SECURITY_AUDIT.md](SECURITY_AUDIT.md) for the active audit summary

## Verification

Run the release gate locally with:

```bash
corepack pnpm typecheck
corepack pnpm lint
corepack pnpm test
corepack pnpm build
corepack pnpm e2e
```
