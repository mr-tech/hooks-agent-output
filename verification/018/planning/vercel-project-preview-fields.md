# Vercel project fields for the preview walk (planner, 2026-11-20T03:19Z)

Command: npx -y vercel@latest api /v9/projects/hooks-gg-website --scope hooks-gg (read-only), fields extracted with python3; file not kept.

- ssoProtection: absent; passwordProtection: absent; trustedIps: absent; protectionBypass: 0 keys
- nodeVersion: 24.x; framework: nextjs; buildCommand: null (framework default, next build)
- installCommand: a git url rewrite then `pnpm install 1> /dev/null` (credential variable names only; values not read)
- link.productionBranch: master

Reading (planner inference): with no ssoProtection/passwordProtection, a preview URL answers without a Vercel login; every branch other than master deploys as a preview.
