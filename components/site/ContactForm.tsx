'use client'

import {useState} from 'react'

const fallbackServiceOptions = [
  'Digital Transformation',
  'Custom Software Solutions',
  'Data, Analytics and Automation',
  'Financial and Operational Advisory',
  'Government Technology and Procurement Support',
  'General Business Inquiry',
  'Government Contracting Inquiry',
]

type ContactFormCopy = {
  nameLabel?: string | null
  organizationLabel?: string | null
  emailLabel?: string | null
  phoneLabel?: string | null
  serviceInterestLabel?: string | null
  messageLabel?: string | null
  serviceOptions?: string[] | null
  defaultServiceOption?: string | null
  submitLabel?: string | null
  nameError?: string | null
  emailError?: string | null
  messageError?: string | null
  validationSummary?: string | null
  inactiveFallback?: string | null
}

export function ContactForm({
  formNote,
  copy,
}: {
  formNote?: string | null
  copy?: ContactFormCopy | null
}) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'validation' | 'inactive'>('idle')

  function validate(formData: FormData) {
    const nextErrors: Record<string, string> = {}
    const name = String(formData.get('name') || '').trim()
    const email = String(formData.get('email') || '').trim()
    const message = String(formData.get('message') || '').trim()

    if (!name) nextErrors.name = copy?.nameError || 'Please enter your name.'
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = copy?.emailError || 'Please enter a valid email address.'
    }
    if (!message)
      nextErrors.message =
        copy?.messageError || 'Please share a short message so we can understand your inquiry.'

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
        <Field label={copy?.nameLabel || 'Name'} name="name" error={errors.name} />
        <Field label={copy?.organizationLabel || 'Organization'} name="organization" />
        <Field label={copy?.emailLabel || 'Email'} name="email" type="email" error={errors.email} />
        <Field label={copy?.phoneLabel || 'Phone'} name="phone" type="tel" />
      </div>

      <div>
        <label
          className="mb-2 block text-sm font-semibold text-[color:var(--fg)]"
          htmlFor="interest"
        >
          {copy?.serviceInterestLabel || 'Service interest'}
        </label>
        <select
          id="interest"
          name="interest"
          className="w-full border border-[color:var(--border-strong)] bg-white px-4 py-3 text-sm text-[color:var(--fg)] outline-none transition focus:border-[color:var(--accent)]"
          defaultValue={copy?.defaultServiceOption || 'General Business Inquiry'}
        >
          {(copy?.serviceOptions?.length ? copy.serviceOptions : fallbackServiceOptions).map(
            (option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ),
          )}
        </select>
      </div>

      <div>
        <label
          className="mb-2 block text-sm font-semibold text-[color:var(--fg)]"
          htmlFor="message"
        >
          {copy?.messageLabel || 'Message'}
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
          {copy?.submitLabel || 'Review Inquiry'}
        </button>
        {status === 'validation' ? (
          <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {copy?.validationSummary || 'Please fix the highlighted fields and try again.'}
          </div>
        ) : null}
        {status === 'inactive' ? (
          <div className="border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            {formNote ||
              copy?.inactiveFallback ||
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
