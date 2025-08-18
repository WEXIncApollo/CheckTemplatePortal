// Validation utilities for Check Template Portal

/**
 * Check form validation rules and functions
 */

// Regular expressions for validation
const PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?[\d\s\-\(\)]+$/,
  routingNumber: /^\d{9}$/,
  accountNumber: /^\d{4,17}$/,
  checkNumber: /^\d{1,10}$/,
  amount: /^\d+(\.\d{1,2})?$/,
  zipCode: /^\d{5}(-\d{4})?$/
}

// Validation error messages
const ERROR_MESSAGES = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  phone: 'Please enter a valid phone number',
  routingNumber: 'Routing number must be exactly 9 digits',
  accountNumber: 'Account number must be 4-17 digits',
  checkNumber: 'Check number must be 1-10 digits',
  amount: 'Please enter a valid amount (e.g., 123.45)',
  amountMin: 'Amount must be greater than 0',
  amountMax: 'Amount cannot exceed $999,999.99',
  dateFormat: 'Please enter a valid date',
  dateFuture: 'Date cannot be in the future',
  textLength: (min, max) => `Must be between ${min} and ${max} characters`,
  zipCode: 'Please enter a valid ZIP code'
}

/**
 * Individual field validators
 */
export const validators = {
  // Required field validator
  required: (value) => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return ERROR_MESSAGES.required
    }
    return null
  },

  // Email validator
  email: (value) => {
    if (value && !PATTERNS.email.test(value)) {
      return ERROR_MESSAGES.email
    }
    return null
  },

  // Phone number validator
  phone: (value) => {
    if (value && !PATTERNS.phone.test(value)) {
      return ERROR_MESSAGES.phone
    }
    return null
  },

  // Routing number validator
  routingNumber: (value) => {
    if (value && !PATTERNS.routingNumber.test(value)) {
      return ERROR_MESSAGES.routingNumber
    }
    return null
  },

  // Account number validator
  accountNumber: (value) => {
    if (value && !PATTERNS.accountNumber.test(value)) {
      return ERROR_MESSAGES.accountNumber
    }
    return null
  },

  // Check number validator
  checkNumber: (value) => {
    if (value && !PATTERNS.checkNumber.test(value)) {
      return ERROR_MESSAGES.checkNumber
    }
    return null
  },

  // Amount validator
  amount: (value) => {
    if (!value) return null
    
    if (!PATTERNS.amount.test(value)) {
      return ERROR_MESSAGES.amount
    }
    
    const numValue = parseFloat(value)
    if (numValue <= 0) {
      return ERROR_MESSAGES.amountMin
    }
    
    if (numValue > 999999.99) {
      return ERROR_MESSAGES.amountMax
    }
    
    return null
  },

  // Date validator
  date: (value) => {
    if (!value) return null
    
    const date = new Date(value)
    if (isNaN(date.getTime())) {
      return ERROR_MESSAGES.dateFormat
    }
    
    // Check if date is in the future (allowing today)
    const today = new Date()
    today.setHours(23, 59, 59, 999) // End of today
    if (date > today) {
      return ERROR_MESSAGES.dateFuture
    }
    
    return null
  },

  // Text length validator
  textLength: (min, max) => (value) => {
    if (!value) return null
    
    const length = value.trim().length
    if (length < min || length > max) {
      return ERROR_MESSAGES.textLength(min, max)
    }
    
    return null
  },

  // ZIP code validator
  zipCode: (value) => {
    if (value && !PATTERNS.zipCode.test(value)) {
      return ERROR_MESSAGES.zipCode
    }
    return null
  }
}

/**
 * Composite validators for complex validation rules
 */
export const compositeValidators = {
  // Validate multiple rules for a single field
  combine: (...validatorFunctions) => (value) => {
    for (const validator of validatorFunctions) {
      const error = validator(value)
      if (error) return error
    }
    return null
  },

  // Conditional validator - only validate if condition is met
  conditional: (condition, validator) => (value, allData) => {
    if (condition(allData)) {
      return validator(value)
    }
    return null
  }
}

/**
 * Check form validation schema
 */
export const checkFormValidation = {
  payTo: compositeValidators.combine(
    validators.required,
    validators.textLength(1, 100)
  ),
  
  amount: compositeValidators.combine(
    validators.required,
    validators.amount
  ),
  
  date: compositeValidators.combine(
    validators.required,
    validators.date
  ),
  
  checkNumber: validators.checkNumber,
  
  memo: validators.textLength(0, 100),
  
  accountHolder: compositeValidators.combine(
    validators.required,
    validators.textLength(1, 100)
  ),
  
  bankName: compositeValidators.combine(
    validators.required,
    validators.textLength(1, 100)
  ),
  
  address: validators.textLength(0, 200),
  
  routingNumber: validators.routingNumber,
  
  accountNumber: validators.accountNumber,
  
  signature: validators.textLength(0, 50)
}

/**
 * Validate entire check form
 */
export const validateCheckForm = (formData) => {
  const errors = {}
  
  // Validate each field according to schema
  Object.keys(checkFormValidation).forEach(field => {
    const validator = checkFormValidation[field]
    const error = validator(formData[field], formData)
    if (error) {
      errors[field] = error
    }
  })
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

/**
 * Template validation
 */
export const validateTemplate = (templateData) => {
  const errors = {}
  
  // Template name is required
  if (!templateData.name || !templateData.name.trim()) {
    errors.name = 'Template name is required'
  } else if (templateData.name.length > 50) {
    errors.name = 'Template name must be 50 characters or less'
  }
  
  // Validate the check data within the template
  if (templateData.data) {
    const checkValidation = validateCheckForm(templateData.data)
    if (!checkValidation.isValid) {
      errors.checkData = checkValidation.errors
    }
  } else {
    errors.data = 'Template must contain check data'
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

/**
 * Search query validation
 */
export const validateSearchQuery = (query) => {
  if (!query || !query.trim()) {
    return {
      isValid: false,
      error: 'Search query is required'
    }
  }
  
  if (query.length < 2) {
    return {
      isValid: false,
      error: 'Search query must be at least 2 characters'
    }
  }
  
  if (query.length > 100) {
    return {
      isValid: false,
      error: 'Search query must be 100 characters or less'
    }
  }
  
  return {
    isValid: true,
    error: null
  }
}

/**
 * Utility functions
 */
export const validationUtils = {
  // Clean and format input values
  cleanInput: (value, type = 'text') => {
    if (!value) return ''
    
    switch (type) {
      case 'amount':
        return value.replace(/[^\d.]/g, '')
      case 'number':
        return value.replace(/\D/g, '')
      case 'text':
      default:
        return value.trim()
    }
  },

  // Format amount for display
  formatAmount: (amount) => {
    const num = parseFloat(amount)
    return isNaN(num) ? '0.00' : num.toFixed(2)
  },

  // Format date for input
  formatDateForInput: (date) => {
    if (!date) return ''
    const d = new Date(date)
    return d.toISOString().split('T')[0]
  },

  // Check if form has any errors
  hasErrors: (errors) => {
    return Object.values(errors).some(error => error !== null && error !== '')
  }
}
