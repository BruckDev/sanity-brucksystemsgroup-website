'use client'

import Link from 'next/link'
import {useState} from 'react'

const lifecycle = [
  {
    id: 'design',
    number: '01',
    label: 'Design',
    eyebrow: 'The core difference',
    title: 'One definition.',
    emphasis: 'A shared understanding.',
    description:
      'The workflow is readable development material and executable input. Humans and coding agents navigate the same declared structure.',
    heading: 'Read it. Run it. Navigate it.',
    body: [
      'Versioned Markdown declarations define the workflow. The runtime compiles them for execution; the diagram projects that structure with links to nested components and resources.',
      'Freshness checks help keep the saved view aligned with the declarations.',
    ],
    detail: 'Explicit routes, schemas, guards, and bounded retries give reviewers and coding agents concrete constraints to work with. Accuracy is tested against acceptance scenarios.',
  },
  {
    id: 'run',
    number: '02',
    label: 'Run',
    eyebrow: 'Batteries included. Adaptable by design.',
    title: 'A workbench,',
    emphasis: 'ready for the next step.',
    description:
      'Bring your application logic and APIs. Reuse the development loop, configuration, provider connections, and reporting machinery.',
    heading: 'Obvious actions for people. Explicit commands for agents.',
    body: [
      'The TUI exposes settings, their sources, requirements, test selection, and result details. Missing configuration points to what needs attention.',
      'The same launcher offers explicit modes, selectors, and non-interactive terminal operation for coding agents and automation, subject to authentication and acceptance requirements.',
    ],
    detail:
      'In the core: typed configuration, dependency preparation, provider interfaces, named tools, test selection, failure inspection, and historical reports. In your resource pack: application workflows, prompts, schemas, integrations, and acceptance tests.',
  },
  {
    id: 'diagnose',
    number: '03',
    label: 'Diagnose',
    eyebrow: 'Progressive discovery',
    title: 'Follow the failure.',
    emphasis: 'Leave the rest closed.',
    description:
      'A small summary gives you the next place to look. Each deeper scope adds relevant evidence without requiring the whole execution tree.',
    heading: 'Start with the outcome.',
    body: [
      'The run reports a failed test. Find its result before reading individual calls or payloads.',
      'Other tests and calls stay outside the selected detail, so investigators can orient first and keep unrelated evidence out of context.',
    ],
    detail:
      'A reported root-trace investigation could consume 90 million tokens and cost $90. That experience is motivation—not a general benchmark or a measured api-agent savings claim.',
  },
  {
    id: 'report',
    number: '04',
    label: 'Report',
    eyebrow: 'Historical reporting & audit trail',
    title: 'Keep the history.',
    emphasis: 'Find the exact attempt.',
    description:
      'Preserve the evidence of an experiment, then return to the run, test attempt, or call that matters.',
    heading: 'See the trajectory. Keep the ownership. Explain the change.',
    body: [
      'Browse retained run archives and trends. Invocation, scope, and call identities connect evidence to its recorded owner.',
      'Workflow journals retain captured-resource hashes and owning commits for historical joins. Timing, token counts, and costs remain available where recorded.',
    ],
    detail:
      'This is an engineering audit trail of captured evidence, not a claim of regulatory certification, complete replay, or a tamper-proof ledger.',
  },
]

const executiveCases = [
  {
    title: 'Reduced context',
    summary: 'Read the relevant evidence, in layers.',
    body: 'Progressive discovery starts small, identifies an owner, and opens only necessary detail. Measure tokens spent investigating an error, total investigation cost, and time to identify its cause.',
  },
  {
    title: 'Accuracy through explicit structure',
    summary: 'Constrain, inspect, and test changes.',
    body: 'A shared executable declaration reduces the gap between the workflow a reviewer reads and the structure the runtime executes. Measure correct diagnoses, accepted fixes, regressions, and scenario pass rates.',
  },
  {
    title: 'An adaptable core',
    summary: 'Reuse the workbench. Own the application.',
    body: 'Resource packs separate business workflows, prompts, tests, and integration choices from common machinery. Measure time to the first useful workflow, integration effort, and effort to change a provider.',
  },
  {
    title: 'How it relates to tracing',
    summary: 'Tracing is one part of the loop.',
    body: 'api-agent can use LangFuse or OpenTelemetry for tracing. Its proposition spans executable workflow definitions, development setup, guided operation, testing, scoped evidence, and retained reports.',
  },
]

export function ApiAgentProductPage() {
  const [activeLifecycle, setActiveLifecycle] = useState('design')
  const active = lifecycle.find((item) => item.id === activeLifecycle) || lifecycle[0]

  return (
    <div className="overflow-hidden rounded-3xl bg-[#f3f1eb] text-[#1d211c] shadow-[0_24px_70px_rgba(7,26,43,0.12)]">
      <section className="relative overflow-hidden bg-[#1d2d24] px-6 py-14 text-[#f5f2e9] sm:px-10 lg:px-16 lg:py-20">
        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_80%_10%,rgba(141,225,177,0.3),transparent_25%),linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.05)_50%,transparent_100%)]" />
        <div className="relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#a9edc5]">Built for humans & coding agents</p>
            <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              The flow you read.<br />
              <span className="font-serif font-normal italic text-[#a9edc5]">The flow you run.</span>
            </h1>
            <p className="mt-7 max-w-xl text-xl text-white/90">A batteries-included, adaptable core for developing agents.</p>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">
              Readable flows are the executable source of truth. Guided tooling makes the next action clear. Reports let you follow a failure to its evidence, one layer at a time.
            </p>
            <a href="#lifecycle" className="mt-9 inline-flex rounded-full bg-[#a9edc5] px-6 py-3 text-sm font-bold text-[#153121] hover:bg-white">
              Explore the development loop <span className="ml-3" aria-hidden="true">↓</span>
            </a>
            <p className="mt-4 text-sm text-white/55">Build → run → test → investigate → improve.</p>
          </div>

          <div className="border border-[#a9edc5]/30 bg-[#0d2017]/70 p-6 backdrop-blur-sm sm:p-8">
            <div className="flex items-center justify-between gap-4 text-xs font-bold tracking-[0.16em] text-[#a9edc5]">
              <span>ONE CORE / TWO READERS</span><span>● HUMAN + AGENT</span>
            </div>
            <div className="mt-12 border-l border-[#a9edc5]/50 pl-5">
              <p className="text-xs font-bold tracking-[0.16em] text-white/50">READABLE, EXECUTABLE FLOW</p>
              <div className="mt-4 flex flex-wrap items-center gap-3 font-mono text-sm text-white"><span>draft</span><span className="text-[#a9edc5]">→</span><span>execute_tool</span><span className="text-[#a9edc5]">→</span><span>render</span></div>
              <p className="mt-4 text-sm text-white/65">Flow declaration → runtime + diagram</p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="border border-white/15 p-4"><p className="text-xs tracking-[0.14em] text-[#a9edc5]">DEVELOP</p><p className="mt-2 font-semibold">Guided TUI</p><p className="mt-1 text-sm text-white/60">Settings · services · tests</p></div>
              <div className="border border-white/15 p-4"><p className="text-xs tracking-[0.14em] text-[#a9edc5]">INVESTIGATE</p><p className="mt-2 font-semibold">Scoped evidence</p><p className="mt-1 text-sm text-white/60">Run · test · step · call</p></div>
            </div>
            <p className="mt-8 text-sm text-[#a9edc5]">● Retained runs. Linked evidence. Available usage.</p>
          </div>
        </div>
      </section>

      <section className="grid border-b border-[#1d2d24]/15 md:grid-cols-3">
        {[
          ['01', 'The flow is the source.', 'Execution and a readable map share a definition.'],
          ['02', 'The workbench is included.', 'Configure, launch, test, and inspect.'],
          ['03', 'Evidence opens in layers.', 'Keep the history. Read the relevant scope.'],
        ].map(([number, title, text]) => <article key={number} className="border-b border-[#1d2d24]/15 p-7 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"><p className="text-sm font-bold text-[#087b4b]">{number}</p><h2 className="mt-8 text-2xl font-semibold">{title}</h2><p className="mt-3 leading-7 text-[#526174]">{text}</p></article>)}
      </section>

      <section id="lifecycle" className="px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
        <div className="grid gap-7 lg:grid-cols-[1fr_0.8fr] lg:items-end"><div><p className="text-sm font-bold uppercase tracking-[0.18em] text-[#087b4b]">One core / the whole development loop</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Small context.<br /><span className="font-serif font-normal italic text-[#087b4b]">Traceable history.</span></h2></div><p className="max-w-xl text-lg leading-8 text-[#526174]">Explore four stages of the development loop. Open only the detail you need.</p></div>
        <div className="mt-12 grid gap-2 border-y border-[#1d2d24]/15 py-3 sm:grid-cols-4">
          {lifecycle.map((item) => <button key={item.id} type="button" onClick={() => setActiveLifecycle(item.id)} className={`flex items-center gap-3 px-3 py-3 text-left text-sm font-bold ${active.id === item.id ? 'bg-[#1d2d24] text-white' : 'text-[#526174] hover:bg-white'}`} aria-pressed={active.id === item.id}><span className="text-[#a9edc5]">{item.number}</span>{item.label}</button>)}
        </div>
        <div className="mt-10 border border-[#1d2d24]/15 bg-white p-6 sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#087b4b]">{active.eyebrow}</p>
          <div className="mt-6 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]"><div><h3 className="text-4xl font-semibold tracking-[-0.04em]">{active.title}<br /><span className="font-serif font-normal italic text-[#087b4b]">{active.emphasis}</span></h3><p className="mt-5 text-lg leading-8 text-[#526174]">{active.description}</p></div><div className="border-l-2 border-[#a9edc5] pl-6"><h4 className="text-2xl font-semibold">{active.heading}</h4>{active.body.map((paragraph) => <p key={paragraph} className="mt-4 leading-7 text-[#526174]">{paragraph}</p>)}<p className="mt-6 border-t border-[#1d2d24]/15 pt-5 text-sm leading-6 text-[#087b4b]">{active.detail}</p></div></div>
          <div className="mt-10 border border-[#1d2d24]/15 bg-[#f3f1eb] p-5 font-mono text-sm text-[#1d2d24]"><p className="font-bold">BUNDLED FLOW · TOOL PATH</p><p className="mt-3">draft <span className="text-[#087b4b]">→</span> execute_tool <span className="text-[#087b4b]">→</span> render</p><p className="mt-2 text-[#526174]">Also declared: draft → render when no tool is needed.</p></div>
        </div>
      </section>

      <section className="bg-[#e6eee8] px-6 py-16 sm:px-10 lg:px-16 lg:py-24"><div className="grid gap-7 lg:grid-cols-[1fr_0.8fr] lg:items-end"><div><p className="text-sm font-bold uppercase tracking-[0.18em] text-[#087b4b]">The executive case</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Make the development loop<br /><span className="font-serif font-normal italic text-[#087b4b]">easier to reason about.</span></h2></div><p className="text-lg leading-8 text-[#526174]">For companies building or replacing an agent core, the opportunity is less repeated infrastructure work and more focused investigation.</p></div><div className="mt-12 divide-y divide-[#1d2d24]/15 border-y border-[#1d2d24]/15">{executiveCases.map((item) => <details key={item.title} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-6"><span><strong className="text-xl">{item.title}</strong><small className="mt-1 block text-[#526174]">{item.summary}</small></span><span className="text-2xl text-[#087b4b] group-open:rotate-45">+</span></summary><p className="max-w-3xl pt-5 leading-7 text-[#526174]">{item.body}</p></details>)}</div></section>

      <section className="bg-[#1d2d24] px-6 py-16 text-[#f5f2e9] sm:px-10 lg:px-16 lg:py-24"><div className="grid gap-10 lg:grid-cols-[1fr_0.8fr]"><div><p className="text-sm font-bold uppercase tracking-[0.18em] text-[#a9edc5]">Put the model to work</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">A smaller investigation.<br /><span className="font-serif font-normal italic text-[#a9edc5]">A clearer decision.</span></h2></div><div><p className="text-lg leading-8 text-white/70">Bring one real failure and one representative workflow. Evaluate the context needed to diagnose it, the precision of the fix, and the evidence retained afterward.</p><a className="mt-7 inline-flex rounded-full bg-[#a9edc5] px-6 py-3 text-sm font-bold text-[#153121] hover:bg-white" href="https://github.com/gorban/api-agent" target="_blank" rel="noreferrer">Explore api-agent <span className="ml-3">↗</span></a><p className="mt-5 text-sm text-white/50">Open source · BSD 2-Clause · adaptable application packs</p></div></div></section>
      <footer className="flex flex-col gap-3 border-t border-[#1d2d24]/15 px-6 py-7 text-sm text-[#526174] sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-16"><strong className="text-[#1d2d24]">api-agent</strong><span>Small context. Traceable history.</span><Link href="/contact" className="font-semibold text-[#087b4b]">Talk to Bruck Systems Group →</Link></footer>
    </div>
  )
}
