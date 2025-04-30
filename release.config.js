/* eslint-disable no-template-curly-in-string */
export default {
    branches: ['main'],
    plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        '@semantic-release/changelog',
        [
            '@semantic-release/npm',
            {
                npmPublish: true,
                pkgRoot: '.',
            },
        ],
        '@semantic-release/github',
        [
            '@semantic-release/git',
            {
                assets: [
                    'package.json',
                    'CHANGELOG.md',
                    'dist/**/*',
                ],
                message:
                    'chore(release): ${nextRelease.version} [🚀 CI - Deploy]\n\n${nextRelease.notes}',
            },
        ],
    ],
    github: {
        labels: ['release'],
        releaseName: '🚀 Release ${nextRelease.version}',
    },
    generateNotes: {
        preset: 'conventionalcommits',
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
    npmPublish: true,
};
