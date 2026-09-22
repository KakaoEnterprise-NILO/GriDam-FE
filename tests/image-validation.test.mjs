import test from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import vm from "node:vm"
import ts from "typescript"

const source = readFileSync(new URL("../src/lib/imageValidation.ts", import.meta.url), "utf8")
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText
const module = { exports: {} }
vm.runInNewContext(compiled, { exports: module.exports, module })
const { validateImageFile } = module.exports

test("허용된 이미지 형식과 용량을 통과시킨다", () => {
  assert.equal(validateImageFile({ type: "image/jpeg", size: 1024 }).valid, true)
})

test("지원하지 않는 이미지 형식을 거부한다", () => {
  const result = validateImageFile({ type: "image/gif", size: 1024 })
  assert.equal(result.valid, false)
  assert.match(result.error, /JPG, PNG, WEBP/)
})

test("10MB를 초과한 이미지를 거부한다", () => {
  const result = validateImageFile({ type: "image/png", size: 10 * 1024 * 1024 + 1 })
  assert.equal(result.valid, false)
  assert.match(result.error, /10MB/)
})
