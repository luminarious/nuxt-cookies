<script setup lang="ts">
const {
  showBanner,
  acceptAll,
  declineAll,
  acceptSelected,
  loadConsent,
  consentCategories,
} = useCookieConsent()

const dialogRef = ref<HTMLDialogElement | null>(null)
const showPreferences = ref(false)

const preferences = ref({
  functional: false,
  tracking: false,
  marketing: false,
})

watch(showBanner, (show) => {
  if (import.meta.client && dialogRef.value) {
    if (show) {
      dialogRef.value.showModal()
    } else {
      dialogRef.value.close()
    }
  }
})

const handleAccept = () => {
  acceptAll()
}

const handleDecline = () => {
  declineAll()
}

const handleShowPreferences = () => {
  showPreferences.value = true
  preferences.value = {
    functional: consentCategories.value.functional,
    tracking: consentCategories.value.tracking,
    marketing: consentCategories.value.marketing,
  }
}

const handleSavePreferences = () => {
  acceptSelected({
    necessary: true,
    ...preferences.value,
  })
}

const handleBackToMain = () => {
  showPreferences.value = false
}

onMounted(() => {
  loadConsent()
})
</script>

<template>
  <dialog
    ref="dialogRef"
    class="cookie-consent-dialog"
    @cancel.prevent
  >
    <div
      v-if="!showPreferences"
      class="cookie-consent-main"
    >
      <h2>We Value Your Privacy</h2>
      <p>
        We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
        By clicking "Accept", you consent to our use of cookies.
      </p>
      <p>
        <NuxtLink
          to="/privacy-policy"
          class="privacy-link"
        >
          Read our Privacy Policy
        </NuxtLink>
      </p>
      <div class="button-group">
        <button
          type="button"
          class="btn btn-primary"
          @click="handleAccept"
        >
          Accept
        </button>
        <button
          type="button"
          class="btn btn-secondary"
          @click="handleDecline"
        >
          Decline
        </button>
        <button
          type="button"
          class="btn btn-link"
          @click="handleShowPreferences"
        >
          Change my preferences
        </button>
      </div>
    </div>

    <div
      v-else
      class="cookie-consent-preferences"
    >
      <button
        type="button"
        class="back-button"
        @click="handleBackToMain"
      >
        ← Back
      </button>
      <h2>Cookie Preferences</h2>
      <p>Choose which types of cookies you want to accept. You can change these settings at any time.</p>

      <div class="preference-item">
        <div class="preference-header">
          <input
            type="checkbox"
            id="necessary"
            checked
            disabled
          >
          <label for="necessary">
            <strong>Necessary</strong>
          </label>
        </div>
        <p class="preference-description">
          Essential cookies required for the website to function properly. These cannot be disabled.
        </p>
      </div>

      <div class="preference-item">
        <div class="preference-header">
          <input
            type="checkbox"
            id="functional"
            v-model="preferences.functional"
          >
          <label for="functional">
            <strong>Functional</strong>
          </label>
        </div>
        <p class="preference-description">
          Enable enhanced functionality and personalization, such as remembering your preferences.
        </p>
      </div>

      <div class="preference-item">
        <div class="preference-header">
          <input
            type="checkbox"
            id="tracking"
            v-model="preferences.tracking"
          >
          <label for="tracking">
            <strong>Analytics</strong>
          </label>
        </div>
        <p class="preference-description">
          Help us understand how visitors interact with our website by collecting anonymous information.
        </p>
      </div>

      <div class="preference-item">
        <div class="preference-header">
          <input
            type="checkbox"
            id="marketing"
            v-model="preferences.marketing"
          >
          <label for="marketing">
            <strong>Marketing</strong>
          </label>
        </div>
        <p class="preference-description">
          Used to track visitors across websites to display relevant and engaging advertisements.
        </p>
      </div>

      <div class="button-group">
        <button
          type="button"
          class="btn btn-primary"
          @click="handleSavePreferences"
        >
          Save Preferences
        </button>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
.cookie-consent-dialog {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0;
  max-width: 100%;
  width: 100%;
  border: none;
  border-radius: 12px 12px 0 0;
  box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.15);
  padding: 0;
  background: white;
  max-height: 90vh;
  overflow-y: auto;
}

.cookie-consent-dialog::backdrop {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
}

.cookie-consent-main,
.cookie-consent-preferences {
  padding: 32px;
}

h2 {
  margin: 0 0 16px 0;
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
}

p {
  margin: 0 0 16px 0;
  line-height: 1.6;
  color: #4a4a4a;
}

.privacy-link {
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;
}

.privacy-link:hover {
  text-decoration: underline;
}

.button-group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 24px;
}

.btn {
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
}

.btn-primary {
  background: #2563eb;
  color: white;
}

.btn-primary:hover {
  background: #1d4ed8;
}

.btn-secondary {
  background: #e5e7eb;
  color: #1a1a1a;
}

.btn-secondary:hover {
  background: #d1d5db;
}

.btn-link {
  background: transparent;
  color: #2563eb;
  padding: 12px 16px;
}

.btn-link:hover {
  text-decoration: underline;
}

.back-button {
  background: transparent;
  border: none;
  color: #2563eb;
  font-size: 16px;
  cursor: pointer;
  padding: 8px 12px;
  margin: -8px -12px 16px -12px;
  border-radius: 6px;
  transition: background 0.2s ease;
}

.back-button:hover {
  background: #eff6ff;
}

.preference-item {
  margin-bottom: 24px;
  padding: 16px;
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.preference-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.preference-header input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #2563eb;
}

.preference-header input[type="checkbox"]:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.preference-header label {
  cursor: pointer;
  font-size: 16px;
  color: #1a1a1a;
}

.preference-header input[type="checkbox"]:disabled + label {
  cursor: not-allowed;
}

.preference-description {
  margin: 0 0 0 32px;
  font-size: 14px;
  line-height: 1.5;
  color: #6b7280;
}

@media (min-width: 768px) {
  .cookie-consent-dialog {
    bottom: 24px;
    left: 24px;
    right: auto;
    max-width: 480px;
    border-radius: 12px;
  }
}
</style>
