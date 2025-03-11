/* eslint-disable no-template-curly-in-string */
export default {
    branches: ['main'], // ✅ Only release from the main branch
    repositoryUrl: 'https://github.com/cyberskill-world/shared.git',
    plugins: [
        '@semantic-release/commit-analyzer', // ✅ Analyze commits for version bumping
        '@semantic-release/release-notes-generator', // ✅ Generate release notes
        '@semantic-release/changelog', // ✅ Generate CHANGELOG.md updates
        [
            '@semantic-release/npm',
            {
                npmPublish: true, // ✅ Ensure npm publish works
                tarballDir: 'dist', // ✅ Include dist in npm package
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
                    'dist/**/*', // ✅ Include ALL files in dist/ in the commit
                ],
                message:
                    'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
            },
        ],
    ],
    github: {
        labels: ['release'], // ✅ Add a "release" label to GitHub release
    },
    npmPublish: true, // ✅ Ensure npm publish is enabled
    prepare: [
        {
            path: '@semantic-release/npm',
            npmPublish: true,
            tarballDir: 'dist',
        },
        {
            path: '@semantic-release/git',
            assets: [
                'package.json', // ✅ Include version bump in commit
                'CHANGELOG.md', // ✅ Include changelog updates
                'dist/**/*', // ✅ Include all built files in the commit
            ],
            message:
                'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
        },
    ],
};
