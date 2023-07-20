/**
 * @type {import('lint-staged').Config}
 */
const config = {
  '*.{js,json}': ['prettier --write'],
  '*.?(c|m){js,ts}?(x)': ['eslint --quiet --fix', 'prettier --write'],
}

export default config
