'use client'

import {useState} from 'react'

const serviceOptions = [
  'Digital Transformation',
  'Custom Software Solutions',
  'Data, Analytics and Automation',
  'Financial and Operational Advisory',
  'Government Technology and Procurement Support',
  'General Business Inquiry',
  'Government Contracting Inquiry',
]

export function ContactForm({formNote}: {formNote?: string | null}) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'validation' | 'inactive'>('idle')

  function validate(formData: FormData) {
    const nextErrors: Record<string, string> = {}
    const name = String(formData.get('name') || '').trim()
    const email = String(formData.get('email') || '').trim()
    const message = String(formData.get('message') || '').trim()

    if (!name) nextErrors.name = 'Please enter your name.'
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Please enter a valid email address.'
    }
    if (!message) nextErrors.message = 'Please share a short message so we can understand your inquiry.'

    return nextErrors
  }

  return (
    <form
      className="space-y-6 border border-[color:var(--border)] bg-white p-6 md:p-8"
      onSubmit={(event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const nextErrors = validate(formData)
        setErrors(nextErrors)
        setStatus(Object.keys(nextErrors).length ? 'validation' : 'inactive')
      }}
      noValidate
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Name" name="name" error={errors.name} />
        <Field label="Organization" name="organization" />
        <Field label="Email" name="email" type="email" error={errors.email} />
        <Field label="Phone" name="phone" type="tel" />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-[color:var(--fg)]" htmlFor="interest">
          Service interest
        </label>
        <select
          id="interest"
          name="interest"
          className="w-full border border-[color:var(--border-strong)] bg-white px-4 py-3 text-sm text-[color:var(--fg)] outline-none transition focus:border-[color:var(--accent)]"
          defaultValue="General Business Inquiry"
        >
          {serviceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-[color:var(--fg)]" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          className={`w-full border bg-white px-4 py-3 text-sm text-[color:var(--fg)] outline-none transition focus:border-[color:var(--accent)] ${errors.message ? 'border-red-500' : 'border-[color:var(--border-strong)]'}`}
        />
        {errors.message ? <p className="mt-2 text-sm text-red-600">{errors.message}</p> : null}
      </div>

      <div className="flex flex-col gap-3">
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center border border-[color:var(--charcoal)] bg-[color:var(--charcoal)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)] md:w-fit"
        >
          Review Inquiry
        </button>
        {status === 'validation' ? (
          <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            Please fix the highlighted fields and try again.
          </div>
        ) : null}
        {status === 'inactive' ? (
          <div className="border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            {formNote ||
              'This form is not connected to a live submission handler yet. It is ready for integration with email, CRM, or server-side processing.'}
          </div>
        ) : null}
      </div>
    </form>
  )
}

function Field({
  label,
  name,
  type = 'text',
  error,
}: {
  label: string
  name: string
  type?: string
  error?: string
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[color:var(--fg)]" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className={`w-full border bg-white px-4 py-3 text-sm text-[color:var(--fg)] outline-none transition focus:border-[color:var(--accent)] ${error ? 'border-red-500' : 'border-[color:var(--border-strong)]'}`}
      />
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </div>
  )
}
