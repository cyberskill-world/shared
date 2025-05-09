export default {
    branches: ['release'],
    plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        '@semantic-release/npm',
        '@semantic-release/github',
        '@semantic-release/git',
        [
            "semantic-release-github-pullrequest",
            {
                "assets": ["package.json"],
            }
        ]
    ],
};
