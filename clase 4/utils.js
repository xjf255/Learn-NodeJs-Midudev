import { createRequire } from 'module'

const require = createRequire(import.meta.url)
export const importJSON = (path) => require(path)
