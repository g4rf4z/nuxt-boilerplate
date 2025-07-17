<script lang="ts" setup>
import { authSigninSchema } from '~~/shared/validation/user'
import UIForm from '../ui/UIForm.vue'

const { t } = useTranslation()
const { fetch: fetchUserSession } = useUserSession()
const form = useTemplateRef<typeof UIForm>('form')

const signinData = ref({
  email: '',
  password: '',
})

async function signin(data: Record<string, unknown>) {
  await $fetch('/api/auth/signin', {
    method: 'POST',
    body: data,
  })
  await fetchUserSession()
  navigateTo('/')
}
</script>

<template>
  <AuthCard :title="t('TITLE')">
    <template #description>
      {{ t('DONT_HAVE_AN_ACCOUNT') }}
      <UILink :to="{ name: 'SIGNUP' }">
        {{ t('SIGNUP') }}
      </UILink>
    </template>

    <UIForm ref="form" :schema="authSigninSchema" :data="signinData" :on-submit="signin">
      <UIInput v-model="signinData.email" name="email" :label="t('EMAIL.LABEL')" :placeholder="t('EMAIL.PLACEHOLDER')" block />
      <UIInput v-model="signinData.password" type="password" name="password" :label="t('PASSWORD.LABEL')" :placeholder="t('PASSWORD.PLACEHOLDER')" block>
        <template #hint>
          <UILink :to="{ name: 'RESET_PASSWORD' }">
            {{ t('PASSWORD.FORGOT_PASSWORD') }}
          </UILink>
        </template>
      </UIInput>

      <UIButton :label="t('SIGNIN')" type="submit" size="xl" block class="mt-2" :loading="form?.isLoading" />
      <UIFormField v-if="form?.formRef?.getErrors('formGlobalError').length" name="formGlobalError" />
    </UIForm>
  </AuthCard>
</template>

<i18n lang="json">
{
  "en-US": {
    "TITLE": "Signin",
    "DONT_HAVE_AN_ACCOUNT": "Don't have an account ?",
    "SIGNUP": "Signup",
    "SIGNIN": "Signin",
    "EMAIL": {
      "LABEL": "Email",
      "PLACEHOLDER": "sanji.vinsmoke{'@'}onepiece.com"
    },
    "PASSWORD": {
      "LABEL": "Password",
      "PLACEHOLDER": "************",
      "FORGOT_PASSWORD": "Forgot password ?"
    }
  },
  "fr-FR": {
    "TITLE": "Connexion",
    "DONT_HAVE_AN_ACCOUNT": "Pas encore de compte ?",
    "SIGNUP": "Inscription",
    "SIGNIN": "Connexion",
    "EMAIL": {
      "LABEL": "Email",
      "PLACEHOLDER": "sanji.vinsmoke{'@'}onepiece.fr"
    },
    "PASSWORD": {
      "LABEL": "Mot de passe",
      "PLACEHOLDER": "************",
      "FORGOT_PASSWORD": "Mot de passe oublié ?"
    }
  }
}
</i18n>
