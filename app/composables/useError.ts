import { FetchError } from 'ofetch'

interface ApiError {
  message: string
  statusCode?: number
}

interface FormError {
  message: string
  path: string
}

interface FormRef {
  setErrors: (errors: FormError[]) => void
}

interface ZodIssue {
  message: string
  path: string[]
}

export function useApiError() {
  const _extractFormError = (error: FetchError): FormError[] => {
    const issues = error.data?.data?.issues as ZodIssue[]

    if (!issues)
      return []

    return issues.flatMap(issue => issue.path.map(path => ({ message: issue.message, path })))
  }

  function formatApiError(error: unknown, formRef?: FormRef): ApiError {
    if (!(error instanceof FetchError)) {
      return { message: 'Internal server error', statusCode: 500 }
    }

    if (!formRef) {
      return { message: error.data.message, statusCode: error.statusCode }
    }

    const formErrors = error.data.statusCode === 400 && error.data.data?.name === 'ZodError'
      ? _extractFormError(error)
      : [{ message: error.data.message, path: 'formGlobalError' }]

    formRef.setErrors(formErrors)

    return { message: error.data.message, statusCode: error.statusCode }
  }

  return { formatApiError }
}
