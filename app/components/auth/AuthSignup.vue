<script setup lang="ts">
import { authSignupSchema } from '~~/shared/validation/user'
import UIForm from '../ui/UIForm.vue'

const { t, locale } = useTranslation()
const form = useTemplateRef<typeof UIForm>('form')

const signupData = ref({
  locale: locale.value,
  email: '',
  password: '',
  passwordConfirmation: '',
})

async function signup(data: Record<string, unknown>) {
  await $fetch('/api/auth/signup', {
    method: 'POST',
    body: data,
  })
  // navigateTo({ name: 'SIGNIN' })
}
</script>

<template>
  <AuthCard :title="t('TITLE')">
    <!-- <template #description>
      {{ t('ALREADY_HAVE_AN_ACCOUNT') }}
      <UILink :to="{ name: 'SIGNIN' }">
        {{ t('SIGNIN') }}
      </UILink>
    </template> -->

    <UIForm ref="form" :schema="authSignupSchema" :data="signupData" :on-submit="signup">
      <UIInput v-model="signupData.email" name="email" :label="t('EMAIL.LABEL')" :placeholder="t('EMAIL.PLACEHOLDER')" block />
      <UIInput v-model="signupData.password" type="password" name="password" :label="t('PASSWORD.LABEL')" :placeholder="t('PASSWORD.PLACEHOLDER')" block />
      <UIInput v-model="signupData.passwordConfirmation" type="password" name="passwordConfirmation" :label="t('PASSWORD_CONFIRMATION.LABEL')" :placeholder="t('PASSWORD_CONFIRMATION.PLACEHOLDER')" block />

      <UIButton :label="t('SIGNUP')" type="submit" size="xl" block class="mt-2" :loading="form?.isLoading" />
      <UIFormField v-if="form?.formRef?.getErrors('formGlobalError').length" name="formGlobalError" />
    </UIForm>
  </AuthCard>
</template>

<i18n lang="json">
{
  "en-US": {
    "TITLE": "Signup",
    "ALREADY_HAVE_AN_ACCOUNT": "Already have an account ?",
    "SIGNIN": "Signin",
    "SIGNUP": "Create account",
    "EMAIL": {
      "LABEL": "Email",
      "PLACEHOLDER": "sanji.vinsmoke{'@'}onepiece.com"
    },
    "PASSWORD": {
      "LABEL": "Password",
      "PLACEHOLDER": "************"
    },
    "PASSWORD_CONFIRMATION": {
      "LABEL": "Password (confirmation)",
      "PLACEHOLDER": "************"
    }
  },
  "fr-FR": {
    "TITLE": "Inscription",
    "ALREADY_HAVE_AN_ACCOUNT": "Vous avez déjà un compte ?",
    "SIGNIN": "Connexion",
    "SIGNUP": "Créer un compte",
    "EMAIL": {
      "LABEL": "Email",
      "PLACEHOLDER": "sanji.vinsmoke{'@'}onepiece.fr"
    },
    "PASSWORD": {
      "LABEL": "Mot de passe",
      "PLACEHOLDER": "************"
    },
    "PASSWORD_CONFIRMATION": {
      "LABEL": "Confirmation du mot de passe",
      "PLACEHOLDER": "************"
    }
  }
}
</i18n>
