<script setup lang="ts">
const { consentCategories } = useCookieConsent()

useScriptTriggerConsent({
  tracking: computed(() => consentCategories.value.tracking),
  marketing: computed(() => consentCategories.value.marketing),
})

useScript({
  key: 'matomo',
  src: 'https://tehikhardidesign.matomo.cloud/matomo.js',
}, {
  trigger: 'onConsentGranted',
  consent: 'tracking',
  use() {
    if (window._paq) {
      window._paq.push(['trackPageView'])
      window._paq.push(['enableLinkTracking'])
    }
  },
})
</script>

<template>
  <div>
    <NuxtPage />
    <CookieConsent />
  </div>
</template>
