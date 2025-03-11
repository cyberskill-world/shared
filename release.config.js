/* eslint-disable no-template-curly-in-string */
/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
    branches: ['main'],
    plugins: [
        '@semantic-release/commit-analyzer', // ✅ Analyze commits for version bumping
        '@semantic-release/release-notes-generator', // ✅ Generate clean release notes
        '@semantic-release/changelog', // ✅ Update CHANGELOG.md
        [
            '@semantic-release/npm',
            {
                npmPublish: true, // ✅ Ensure npm publish works
                tarballDir: 'dist', // ✅ Include dist in the npm package
                pkgRoot: '.', // ✅ Package root is project root
            },
        ],
        '@semantic-release/github', // ✅ Create GitHub release
        [
            '@semantic-release/git',
            {
                assets: [
                    'package.json', // ✅ Include version bump in package.json
                    'CHANGELOG.md', // ✅ Include changelog updates
                    'dist/**/*', // ✅ Include ALL files in dist/ in the release commit
                ],
                message:
                    '🚀 chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
            },
        ],
    ],
    github: {
        labels: ['release'], // ✅ Add a "release" label to GitHub release
        releaseName: '🚀 Release ${nextRelease.version}', // ✅ Clean release name
    },
    generateNotes: {
        preset: 'conventionalcommits', // ✅ Use conventional commits for structured notes
        presetConfig: {
            types: [
                { type: 'feat', section: '✨ Features', hidden: false },
                { type: 'fix', section: '🐛 Fixes', hidden: false },
                { type: 'chore', section: '🧹 Maintenance', hidden: false },
                { type: 'docs', section: '📝 Documentation', hidden: false },
                { type: 'refactor', section: '🛠 Refactoring', hidden: false },
                { type: 'test', section: '✅ Tests', hidden: false },
                { type: 'ci', section: '⚙️ CI/CD', hidden: false },
            ],
        },
    },
    npmPublish: true, // ✅ Ensure npm publish is enabled
};
