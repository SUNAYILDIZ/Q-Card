/* eslint-disable no-undef */

const $ = (id) => document.getElementById(id)

const socialProfiles = [
  { key: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/kullanici' },
  { key: 'github', label: 'GitHub', placeholder: 'https://github.com/kullanici' },
  { key: 'linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/in/kullanici' },
  { key: 'x', label: 'X (Twitter)', placeholder: 'https://x.com/kullanici' },
  { key: 'youtube', label: 'YouTube', placeholder: 'https://youtube.com/@kanal' },
  { key: 'tiktok', label: 'TikTok', placeholder: 'https://tiktok.com/@kullanici' },
  { key: 'facebook', label: 'Facebook', placeholder: 'https://facebook.com/kullanici' },
  { key: 'telegram', label: 'Telegram', placeholder: 'https://t.me/kullanici' },
  { key: 'whatsapp', label: 'WhatsApp', placeholder: 'https://wa.me/90XXXXXXXXXX' },
  { key: 'website', label: 'Website', placeholder: 'https://site.com' }
]

const socialFieldId = (key) => `${key}Url`
const socialHelpId = (key) => `${key}Help`

const state = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  title: '',
  company: '',
  ...Object.fromEntries(socialProfiles.map((p) => [socialFieldId(p.key), '']))
}

const selectors = {
  form: $('contactForm'),
  downloadBtn: $('downloadBtn'),
  clearBtn: $('clearBtn'),
  statusText: $('statusText'),
  socialFields: $('socialFields'),
  qrCode: $('qrCode'),
  vcardPreview: $('vcardPreview'),
  inputs: {
    firstName: $('firstName'),
    lastName: $('lastName'),
    phone: $('phone'),
    email: $('email'),
    title: $('title'),
    company: $('company')
  }
}

const trimOrEmpty = (value) => (value ? String(value).trim() : '')

const normalizeUrl = (value) => {
  const raw = trimOrEmpty(value)
  if (!raw) return ''

  const tryParseUrl = (candidate) => {
    try {
      const parsed = new URL(candidate)
      const hostname = parsed.hostname.trim()

      // Tek kelime veya dotsuz host'lari geçerli URL sayma
      if (!hostname || !hostname.includes('.')) return ''

      return parsed.toString()
    } catch {
      return ''
    }
  }

  const direct = tryParseUrl(raw)
  if (direct) return direct

  // Kullanici https:// belirtmeden de girebiliyor
  return tryParseUrl(`https://${raw}`)
}

const isProbablyUrl = (value) => {
  const v = trimOrEmpty(value)
  if (!v) return true
  return Boolean(normalizeUrl(v))
}

const sanitizeText = (value) => trimOrEmpty(value).replace(/\r?\n/g, ' ')

const sanitizeVCardValue = (value) => {
  // VCF için satır atlamalarını yok et, ayırıcılar için basit temizleme yap
  return sanitizeText(value).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,')
}

const buildVCard = (s) => {
  const firstName = sanitizeVCardValue(s.firstName)
  const lastName = sanitizeVCardValue(s.lastName)
  const phone = sanitizeVCardValue(s.phone)
  const email = sanitizeVCardValue(s.email)
  const title = sanitizeVCardValue(s.title)
  const company = sanitizeVCardValue(s.company)
  const socialLines = socialProfiles
    .map((p) => {
      const raw = s[socialFieldId(p.key)]
      const normalized = normalizeUrl(raw)
      if (!normalized) return null
      const safe = sanitizeVCardValue(normalized)
      return `X-SOCIALPROFILE;TYPE=${p.key}:${safe}`
    })
    .filter(Boolean)

  const hasAny =
    firstName ||
    lastName ||
    phone ||
    email ||
    title ||
    company ||
    socialLines.length > 0

  if (!hasAny) return null

  const nameParts = [firstName, lastName].filter(Boolean)
  const fn = nameParts.join(' ').trim()

  // VCard N: Family;Given;Additional;Prefix;Suffix
  const family = lastName
  const given = firstName
  const nField = `${family};${given};;;`

  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${nField}`,
    fn ? `FN:${fn}` : null,
    phone ? `TEL;TYPE=CELL:${phone}` : null,
    email ? `EMAIL;TYPE=INTERNET:${email}` : null,
    title ? `TITLE:${title}` : null,
    company ? `ORG:${company}` : null,
    ...socialLines
  ]

  return lines.filter(Boolean).concat(['END:VCARD']).join('\r\n')
}

const updateSocialHelps = () => {
  for (const profile of socialProfiles) {
    const value = state[socialFieldId(profile.key)]
    const ok = isProbablyUrl(value)
    const el = document.getElementById(socialHelpId(profile.key))
    if (el) el.classList.toggle('hidden', ok)
  }
}

const updateDownloadState = (vcard) => {
  selectors.downloadBtn.disabled = !vcard
}

const downloadVcf = (vcard) => {
  if (!vcard) return

  const first = trimOrEmpty(state.firstName)
  const last = trimOrEmpty(state.lastName)
  const baseName = `${first || last || 'kartvizit'}-${(last || first || '').trim()}`.replace(
    /\s+/g,
    '-'
  )
  const safeBase = baseName.replace(/[^a-zA-Z0-9-_]/g, '').replace(/-+/g, '-').replace(/^-|-$/g, '')

  const filename = `${safeBase || 'kartvizit'}.vcf`
  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' })
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()

  URL.revokeObjectURL(url)
}

let qrInstance = null
let didForceUtf8ForQr = false

const ensureQrUtf8 = () => {
  if (didForceUtf8ForQr) return
  didForceUtf8ForQr = true

  if (typeof QRCode === 'undefined') return
  const utf8Fn = QRCode?.stringToBytesFuncs?.['UTF-8']
  if (typeof utf8Fn === 'function') {
    QRCode.stringToBytes = utf8Fn
  }
}

const renderQr = (vcard) => {
  selectors.qrCode.innerHTML = ''

  if (!vcard) {
    selectors.qrCode.classList.add('opacity-60')
    selectors.statusText.textContent = 'En az bir alan doldurun. QR ve VCF oluşur.'
    return
  }

  const hasInvalidSocial = socialProfiles.some((p) => {
    const v = trimOrEmpty(state[socialFieldId(p.key)])
    if (!v) return false
    return !isProbablyUrl(v)
  })

  selectors.qrCode.classList.remove('opacity-60')
  selectors.statusText.textContent =
    hasInvalidSocial ? 'VCF oluştu. URL formatını kontrol edin.' : 'VCF oluştu. QR kod hazır.'

  const width = 256
  const height = 256

  // global QRCode (qrcodejs) - library HTML icinden yuklenir
  try {
    ensureQrUtf8()
    qrInstance = new QRCode(selectors.qrCode, {
      text: vcard,
      width,
      height,
      correctLevel: QRCode.CorrectLevel.M
    })
  } catch {
    selectors.qrCode.textContent = ''
    selectors.statusText.textContent = 'QR oluşturulamadı.'
  }
}

const render = () => {
  updateSocialHelps()

  const vcard = buildVCard(state)
  updateDownloadState(vcard)

  selectors.vcardPreview.textContent = vcard || ''

  renderQr(vcard)
}

const handleClear = () => {
  for (const key of Object.keys(state)) {
    state[key] = ''
    const input = selectors.inputs[key]
    if (input) input.value = ''
  }

  render()
}

const renderSocialFields = () => {
  const socialFields = document.getElementById('socialFields')
  if (!socialFields) return

  socialFields.innerHTML = socialProfiles
    .map((p) => {
      const inputId = socialFieldId(p.key)
      const helpId = socialHelpId(p.key)

      return `
        <div class="space-y-1">
          <label for="${inputId}" class="text-sm font-medium">${p.label} URL</label>
          <input
            id="${inputId}"
            name="${inputId}"
            type="url"
            inputmode="url"
            autocomplete="url"
            placeholder="${p.placeholder}"
            class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-0 focus:border-slate-500"
          />
          <p id="${helpId}" class="hidden text-xs text-amber-700">URL formatını kontrol edin</p>
        </div>
      `
    })
    .join('')

  for (const profile of socialProfiles) {
    selectors.inputs[socialFieldId(profile.key)] = document.getElementById(socialFieldId(profile.key))
  }
}

const handleDownload = () => {
  const vcard = buildVCard(state)
  downloadVcf(vcard)
}

const wireEvents = () => {
  renderSocialFields()
  selectors.form.addEventListener('submit', (e) => e.preventDefault())

  selectors.form.addEventListener('input', (e) => {
    const target = e.target
    if (!target || !target.id) return

    if (target.id in state) {
      state[target.id] = target.value
      render()
    }
  })

  selectors.clearBtn.addEventListener('click', handleClear)
  selectors.downloadBtn.addEventListener('click', handleDownload)

  render()
}

wireEvents()

