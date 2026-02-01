#!/usr/bin/env node
/**
 * Hyper-local, service-focused asset checklist.
 * Run: node scripts/asset-checklist.js
 * See: public/images/ASSETS.md
 */

const path = require('path')
const fs = require('fs')

const base = path.join(__dirname, '..', 'public', 'images')
const folders = [
  { name: 'logo', focus: 'Summerlin West, Dr. Jan Duffy Real Estate, services branding' },
  { name: 'og', focus: '1200×630 social images; Summerlin + open houses, listings, new construction' },
  { name: 'hero', focus: 'Hero banners; hyper-local photos, neighborhoods, open houses, luxury' },
]

console.log('Hyper-local, service-focused assets\n')
console.log('Base:', base)
console.log('')

folders.forEach(({ name, focus }) => {
  const dir = path.join(base, name)
  const exists = fs.existsSync(dir)
  const files = exists ? fs.readdirSync(dir).filter(f => !f.startsWith('.')) : []
  const hasAsset = files.some(f => /\.(svg|png|jpg|jpeg|webp)$/i.test(f))
  console.log(`${name}/: ${focus}`)
  console.log(`  Files: ${files.length ? files.join(', ') || '(none)' : '(folder missing)'} ${hasAsset ? '✓' : '→ add image/photo/logo'}`)
  console.log('')
})

console.log('Full checklist: public/images/ASSETS.md')
