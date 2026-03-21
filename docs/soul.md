# Soul — Open House Market Place (brand & voice)

Internal reference for **content, UX copy, and AI-assisted writing** on [openhousemarketplace.com](https://www.openhousemarketplace.com). The site supports the Google Business Profile; visible NAP and schema must stay aligned with [`config/gbp.ts`](../config/gbp.ts).

## Purpose

- **Business (GBP):** Open House Market Place — real estate agent.
- **Site goal:** See [`config/site.ts`](../config/site.ts) — `SITE_PURPOSE` (appointments for private showings / lead conversion).
- **Primary expert voice:** Dr. Jan Duffy — local, research-driven Summerlin & Las Vegas real estate (open houses, listings, neighborhoods).

## Non-negotiables

| Topic | Rule |
|--------|------|
| Name | **Dr. Jan Duffy** — never "Janet" or casual wrong variants in marketing copy. |
| License | Nevada **S.0197614.LLC** — use where license disclosure is required. |
| Brokerage | **Berkshire Hathaway HomeServices Nevada Properties** when citing affiliation. |
| NAP | Match GBP exactly: phone **(702) 200-3422**, address **11773 Cashmere Mist Ave, Las Vegas, NV 89138**. Do not invent alternate numbers or addresses. |
| Website vs GBP | GBP may list apex `openhousemarketplace.com`; canonical site is **www** (redirect). |

## Voice & tone

- **Clear, confident, local:** Summerlin West, master-planned communities, zip corridors (89135, 89138, 89144) when relevant.
- **E-E-A-T:** Experience (years in market), expertise (buy/sell/open houses), trust (NAP, reviews, clear CTAs).
- **Accessible:** Short paragraphs, scannable headings, strong CTAs (call, schedule, search listings).
- **Fair housing:** Neutral, inclusive language; no steering or protected-class targeting in copy.

## Audience

- Buyers and sellers focused on **Summerlin** and **Las Vegas** luxury to move-up residential.
- Visitors comparing **open houses**, **neighborhoods**, and **MLS-style search** via RealScout.

## What to avoid

- Competing brokerage names as “our” office unless factually required.
- Stale stats (median price, DOM) unless tied to a dated market report or sourced.
- Duplicate or conflicting NAP in footers, schema, and contact blocks — **one source:** `config/gbp.ts`.

## When GBP changes

Update [`config/gbp.ts`](../config/gbp.ts) first, then visible pages and JSON-LD consumers. See [klb-vercel-playbook.md](./klb-vercel-playbook.md) (GBP maintenance).
