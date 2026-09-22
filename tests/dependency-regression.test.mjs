import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import axios from 'axios';
import { createMemoryRouter, matchRoutes } from 'react-router-dom';
import { createServer } from 'vite';

const app = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
const paths = [...app.matchAll(/path="([^"]+)"/g)].map((match) => match[1]);

test('all existing route paths match and feed navigation retains its ID', async () => {
  const routes = paths.map((path) => ({ path }));
  assert.equal(routes.length, 15);
  for (const path of paths) {
    const location = path.replace(':id', '42');
    assert.equal(matchRoutes(routes, location)?.at(-1)?.route.path, path);
  }
  const router = createMemoryRouter(routes, { initialEntries: ['/friends/feed'] });
  try {
    await router.navigate('/friend/list/feed/entire/42');
    assert.equal(router.state.matches.at(-1).params.id, '42');
    await router.navigate('/friends/feed');
    assert.equal(router.state.location.pathname, '/friends/feed');
    assert.equal(matchRoutes(routes, '/friend/feed/entire/1'), null);
  } finally {
    router.dispose();
  }
});

test('application Axios interceptors rotate tokens once for concurrent 401 responses', async () => {
  const source = readFileSync(new URL('../src/api/axios.ts', import.meta.url), 'utf8');
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const state = {
    accessToken: 'old-access', refreshToken: 'old-refresh',
    setTokens(tokens) { Object.assign(state, tokens); },
    clearAuth() { state.accessToken = null; state.refreshToken = null; },
  };
  const clients = [];
  const instrumentedAxios = Object.assign({}, axios, {
    create(config) { const client = axios.create(config); clients.push(client); return client; },
  });
  const context = {
    exports: {}, console: globalThis.console,
    require(name) {
      if (name === 'axios') return { default: instrumentedAxios };
      if (name === '@/store/authStore') return { useAuthStore: { getState: () => state } };
      throw new Error('Unexpected import: ' + name);
    },
  };
  vm.runInNewContext(compiled, context);
  const [api, refreshApi] = clients;
  let refreshes = 0;
  let attempts = 0;
  refreshApi.defaults.adapter = async (config) => {
    refreshes++;
    assert.equal(config.url, '/auth/reissue');
    assert.equal(JSON.parse(config.data).refreshToken, 'old-refresh');
    return { config, status: 200, statusText: 'OK', headers: {}, data: { accessToken: 'new-access', refreshToken: 'new-refresh' } };
  };
  api.defaults.adapter = async (config) => {
    attempts++;
    assert.equal(config.baseURL, '/api');
    assert.equal(config.withCredentials, true);
    if (config.headers.Authorization === 'Bearer old-access') {
      throw new axios.AxiosError('Unauthorized', 'ERR_BAD_REQUEST', config, undefined,
        { config, status: 401, statusText: 'Unauthorized', headers: {}, data: {} });
    }
    assert.equal(config.headers.Authorization, 'Bearer new-access');
    return { config, status: 200, statusText: 'OK', headers: {}, data: { success: true } };
  };
  const responses = await Promise.all([api.get('/users/profile'), api.get('/diary/list')]);
  assert.ok(responses.every((response) => response.data.success));
  assert.equal(attempts, 4);
  assert.equal(refreshes, 1);
  assert.equal(state.refreshToken, 'new-refresh');
});

test('Vite, SWC and Tailwind transform the entry and lazy route modules', async () => {
  const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
  try {
    const modules = ['/src/main.tsx', '/src/App.tsx', '/src/index.css',
      ...[...app.matchAll(/import\("(\.\/pages\/[^"]+)"\)/g)].map((match) => '/src/' + match[1].slice(2) + '.tsx')];
    assert.equal(modules.length, 16);
    for (const module of modules) {
      const result = await server.transformRequest(module);
      assert.ok(result?.code, module + ' should transform');
    }
  } finally {
    await server.close();
  }
});
