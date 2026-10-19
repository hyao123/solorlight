import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import ts from 'typescript'

// Exercise the actual TypeScript/TSX without adding a second test framework.
export function loadTypeScript(relativePath) {
  const url = new URL(relativePath, import.meta.url)
  const source = readFileSync(url, 'utf8')
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
    fileName: url.pathname,
  })
  const moduleRecord = { exports: {} }
  new Function('require', 'module', 'exports', outputText)(createRequire(url), moduleRecord, moduleRecord.exports)
  return moduleRecord.exports
}
