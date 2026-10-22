import rss from './rss.mjs'
import { spawnSync } from 'node:child_process'
import { setTimeout as sleep } from 'node:timers/promises'

async function postbuild() {
  await rss()
  // A local production preview must reload after Next replaces .next assets.
  // Otherwise its old page manifest can point browsers at deleted JS chunks.
  if (process.platform !== 'darwin' || process.env.CI || process.env.VERCEL) return
  const label = `gui/${process.getuid()}/com.tonghanglab.web-preview`
  if (spawnSync('/bin/launchctl', ['print', label], { stdio: 'ignore' }).status !== 0) return
  const restart = spawnSync('/bin/launchctl', ['kickstart', '-k', label], { stdio: 'inherit' })
  if (restart.status !== 0) throw new Error('Local web preview failed to restart after build')
  for (let attempt = 0; attempt < 20; attempt++) {
    await sleep(500)
    try {
      const response = await fetch('http://127.0.0.1:3333/news/', { signal: AbortSignal.timeout(1500) })
      if (response.ok) {
        console.log('[postbuild] Local web preview restarted with the new build')
        return
      }
    } catch { /* The preview is still starting. */ }
  }
  throw new Error('Local web preview did not become ready after restart')
}

postbuild().catch((error) => {
  console.error('[postbuild]', error)
  process.exitCode = 1
})
