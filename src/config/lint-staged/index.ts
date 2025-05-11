export default {
    '*.ts': () => 'tsc --noEmit',
    '*': ['eslint --fix --no-cache'],
};
