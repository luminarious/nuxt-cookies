export interface ConsentCategories {
  necessary: boolean
  functional: boolean
  tracking: boolean
  marketing: boolean
}

export interface ConsentState {
  categories: ConsentCategories
  timestamp: number
  version: string
}

const CONSENT_KEY = 'cookie-consent'
const CONSENT_VERSION = '1.0'
const CONSENT_DURATION = 365 * 24 * 60 * 60 * 1000

export function useCookieConsent() {
  const consentGiven = ref(false)
  const showBanner = ref(false)
  const consentCategories = ref<ConsentCategories>({
    necessary: true,
    functional: false,
    tracking: false,
    marketing: false,
  })

  const loadConsent = () => {
    if (import.meta.client) {
      try {
        const stored = localStorage.getItem(CONSENT_KEY)
        if (stored) {
          const state: ConsentState = JSON.parse(stored)

          const isExpired = Date.now() - state.timestamp > CONSENT_DURATION
          const isOutdated = state.version !== CONSENT_VERSION

          if (!isExpired && !isOutdated) {
            consentCategories.value = state.categories
            consentGiven.value = true
            showBanner.value = false
            return
          }
        }
      } catch (error) {
        console.error('Error loading consent:', error)
      }

      showBanner.value = true
    }
  }

  const saveConsent = (categories: ConsentCategories) => {
    if (import.meta.client) {
      const state: ConsentState = {
        categories,
        timestamp: Date.now(),
        version: CONSENT_VERSION,
      }

      localStorage.setItem(CONSENT_KEY, JSON.stringify(state))
      consentCategories.value = categories
      consentGiven.value = true
      showBanner.value = false
    }
  }

  const acceptAll = () => {
    saveConsent({
      necessary: true,
      functional: true,
      tracking: true,
      marketing: true,
    })
  }

  const declineAll = () => {
    saveConsent({
      necessary: true,
      functional: false,
      tracking: false,
      marketing: false,
    })
  }

  const acceptSelected = (categories: ConsentCategories) => {
    saveConsent({
      ...categories,
      necessary: true,
    })
  }

  const resetConsent = () => {
    if (import.meta.client) {
      localStorage.removeItem(CONSENT_KEY)
      consentGiven.value = false
      showBanner.value = true
      consentCategories.value = {
        necessary: true,
        functional: false,
        tracking: false,
        marketing: false,
      }
    }
  }

  return {
    consentGiven: readonly(consentGiven),
    showBanner: readonly(showBanner),
    consentCategories: readonly(consentCategories),
    loadConsent,
    acceptAll,
    declineAll,
    acceptSelected,
    resetConsent,
  }
}
