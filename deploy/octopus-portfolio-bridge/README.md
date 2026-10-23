# Portfolio Octopus / GitHub status bridge

This is a **separately provisioned Cloudflare Worker** for `fuaadabdullah/fuaad-portfolio`. Its Octopus project, environment, KV namespace, secrets, webhook and GitHub status context are distinct from AyahOS.

- Entrypoint: `src/index.js`, which rejects config drift before invoking `src/worker.js`.
- Exact destination: Octopus project `Fuaad Portfolio CI`, environment `Portfolio-CI`, space `Spaces-1`.
- Commit context: `octopus/portfolio-ci`, never AyahOS's `octopus/verify`.
- Only signed push webhooks are accepted. Only non-deleted branches of the specified repository are eligible. A SHA status becomes green only after Octopus reports a completed successful task.
- Each verification is constrained to this portfolio project; no production deployment target is accessed.
- Poll every fifteen minutes to conserve the shared Cloudflare KV Free quota. Leave `BRANCH_QUEUE_ENABLED` unset.
- Run local tests: `node --test test/*.test.js` (no npm dependencies).

## Provenance

The core `src/worker.js`, `src/branch_queue.js`, and their focused regression tests were taken **unchanged** from `fuaadabdullah/AyahOS_Dual_Lineage` at the recorded blob SHAs:

- `worker.js`: `1f794cb03e8d66687c42f66e1e886d3181f71d37`
- `branch_queue.js`: `23fbc24b6a1984353a5bd1f93d50b2125af64e84`

The portfolio-specific `src/index.js` and `test/isolation.test.js` add the boundaries. Future upstream security fixes should be reviewed and ported intentionally, never by pointing this Worker at the AyahOS live KV or services.

See [full operator runbook](../../docs/ci/octopus-portfolio.md) for first-time environment/project creation, credentials kept out of source, status checks, rollback, and the explicit condition for retiring GitHub Actions. **The KV namespace ID placeholder blocks blind deployments** until the new namespace has been created. A committed file is not proof of a deployed Worker.
