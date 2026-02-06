/**
 * GSC 404 verification: fetch each URL (www and non-www), record status and redirect chain.
 * Run: pnpm run verify-gsc-404s  or  npx tsx scripts/verify-gsc-404s.ts
 * Writes scripts/gsc-404-report.md
 */

const GSC_404_PATHS = [
  '/',
  '/neighborhoods',
  '/tour/mls',
  '/contact',
  '/about',
  '/builders/toll-brothers',
  '/builders/lennar',
  '/builders/pulte',
  '/zip/89135',
  '/zip/89138',
  '/zip/89144',
  '/resources/home-buying-guide',
  '/resources/hoa-communities',
  '/resources/lifestyle-guide',
  '/resources/new-construction',
  '/neighborhoods/mesa-ridge',
  '/neighborhoods/regency',
  '/neighborhoods/willows',
  '/neighborhoods/the-trails',
  '/market-report',
  '/schools',
  '/disclaimer',
  '/privacy-policy',
  '/terms-of-service',
] as const

const NON_WWW_ORIGIN = 'https://openhousemarketplace.com'
const WWW_ORIGIN = 'https://www.openhousemarketplace.com'

type ChainStep = { status: number; url: string; location?: string }
type Result = { url: string; status: number; chain: ChainStep[]; finalUrl: string; ok: boolean }

async function fetchWithChain(url: string): Promise<Result> {
  const chain: ChainStep[] = []
  let currentUrl = url
  const seen = new Set<string>()

  while (true) {
    if (seen.has(currentUrl)) {
      chain.push({ status: 0, url: currentUrl })
      return { url, status: 0, chain, finalUrl: currentUrl, ok: false }
    }
    seen.add(currentUrl)

    const res = await fetch(currentUrl, {
      redirect: 'manual',
      headers: { 'User-Agent': 'GSC-Verify-Script/1.0' },
    })
    const location = res.headers.get('location')
    chain.push({
      status: res.status,
      url: currentUrl,
      ...(location && { location: location.startsWith('http') ? location : new URL(location, currentUrl).href }),
    })

    if (res.status >= 300 && res.status < 400 && location) {
      currentUrl = location.startsWith('http') ? location : new URL(location, currentUrl).href
      continue
    }

    const lastStep = chain[chain.length - 1]
    const lastStatus = lastStep?.status ?? res.status
    return {
      url,
      status: res.status,
      chain,
      finalUrl: currentUrl,
      ok: lastStatus === 200,
    }
  }
}

function formatChain(chain: ChainStep[]): string {
  return chain.map((s) => `${s.status}${s.location ? ` → ${s.location}` : ''}`).join(' ; ')
}

async function main() {
  const results: Result[] = []

  for (const path of GSC_404_PATHS) {
    const pathSuffix = path === '/' ? '' : path
    const nonWwwUrl = `${NON_WWW_ORIGIN}${pathSuffix}`
    const wwwUrl = `${WWW_ORIGIN}${pathSuffix}`

    results.push(await fetchWithChain(nonWwwUrl))
    results.push(await fetchWithChain(wwwUrl))
  }

  const okCount = results.filter((r) => r.ok).length
  const failed = results.filter((r) => !r.ok)

  const lines: string[] = [
    '# GSC 404 verification report',
    '',
    `Generated: ${new Date().toISOString()}`,
    '',
    '## Summary',
    '',
    `- **OK (200 or 301→200):** ${okCount}`,
    `- **Failed (404 or other):** ${failed.length}`,
    `- **Total URLs checked:** ${results.length}`,
    '',
    '## Results',
    '',
    '| URL | Status | Redirect chain | Final URL |',
    '|-----|--------|----------------|-----------|',
  ]

  for (const r of results) {
    const statusStr = r.chain.map((s) => s.status).join(' → ')
    const chainStr = formatChain(r.chain).replace(/\|/g, '\\|').replace(/\n/g, ' ')
    const finalStr = r.finalUrl.replace(/\|/g, '\\|')
    const urlCell = r.url.replace(/\|/g, '\\|')
    lines.push(`| ${urlCell} | ${statusStr} | ${chainStr} | ${finalStr} |`)
  }

  lines.push('')
  lines.push('## Failed URLs (if any)')
  lines.push('')
  if (failed.length === 0) {
    lines.push('None.')
  } else {
    for (const r of failed) {
      lines.push(`- ${r.url} (status ${r.status})`)
    }
  }

  const report = lines.join('\n')
  const fs = await import('fs')
  const path = await import('path')
  const outPath = path.join(process.cwd(), 'scripts', 'gsc-404-report.md')
  fs.writeFileSync(outPath, report, 'utf8')
  console.log('Report written to scripts/gsc-404-report.md')
  console.log(report.split('\n').slice(0, 20).join('\n'))
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
