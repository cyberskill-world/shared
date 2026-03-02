# Releasing

## Version Management

We use [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

## Automated Releases

Releases are fully automated via [semantic-release](https://github.com/semantic-release/semantic-release) and the [Deploy workflow](../.github/workflows/deploy.yml):

1. Merge changes to `main` branch
2. Trigger the **Deploy** workflow via `workflow_dispatch`
3. The workflow will:
   - Rebase `main` → `release`
   - Build the project
   - Run `semantic-release` to determine the next version
   - Publish to [npm](https://www.npmjs.com/package/@cyberskill/shared)
   - Create a GitHub Release with auto-generated notes
   - Open a PR from `release` → `main`

## Commit Message Convention

Version bumps are determined automatically from commit messages following [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix       | Version Bump | Example                              |
| ------------ | ------------ | ------------------------------------ |
| `fix:`       | Patch        | `fix: handle null input in validate` |
| `feat:`      | Minor        | `feat: add formatPhoneNumber util`   |
| `feat!:`     | Major        | `feat!: remove deprecated API`       |
| `BREAKING CHANGE:` | Major | In commit body or footer             |

## Manual Steps (if needed)

If the automated release fails or you need a manual release:

```bash
# Ensure you're on the release branch
git checkout release
git pull origin release

# Build and verify
pnpm run build
pnpm run test

# Publish (requires NPM_TOKEN)
npm publish --provenance --access public
```

## Release Checklist

- [ ] All CI checks pass on `main`
- [ ] No pending security advisories (`pnpm audit`)
- [ ] CHANGELOG updated via GitHub Releases
- [ ] npm package published with provenance
