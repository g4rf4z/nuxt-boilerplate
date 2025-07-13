// =============================================================================
// Base Component Types
// =============================================================================

export type ComponentColor = 'primary' | 'info' | 'success' | 'warning' | 'error'
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

// =============================================================================
// UI Component Types
// =============================================================================

// Button
export type ButtonColor = ComponentColor
export type ButtonSize = ComponentSize
export type ButtonType = 'button' | 'submit'
export type ButtonVariant = 'solid' | 'outline' | 'soft' | 'ghost' | 'link'

// FormField
export type FormFieldSize = ComponentSize

// Input
export type InputSize = ComponentSize
export type InputType = 'text' | 'number' | 'email' | 'password' | 'search'

// Link
export type LinkColor = ComponentColor
export type LinkVariant = 'link' | 'ghost' | 'underline'

// Textarea
export type TextareaSize = Extract<ComponentSize, 'sm' | 'md' | 'lg'>

// =============================================================================
// Utility Types
// =============================================================================

export type PlainObject = Record<string, any>
