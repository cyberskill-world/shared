export default {
    '**/*.(ts|tsx)': ['tsc --noEmit'],
    '**/*.(ts|tsx|js|jsx)': ['eslint --fix', 'prettier --write'],
    '**/*.(json|css|scss|less)': ['prettier --write'],
};
