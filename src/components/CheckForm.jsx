import React, { useState, useEffect } from 'react'
import { Save, RotateCcw } from 'lucide-react'

const CheckForm = ({ onFormChange, initialData = {} }) => {
  const [formData, setFormData] = useState({
    payTo: 'ConsumerCSP1314-1 ConsumerCSP1314-1',
    amount: '0.01',
    amountWords: 'Zero Dollars And One Cent',
    date: '2025-08-19',
    memo: '',
    checkNumber: '0000003743',
    accountNumber: '131400001',
    routingNumber: '000000374',
    bankName: 'NiSmothB Automation - Do Not USE!',
    accountHolder: 'Nick\'s',
    address: 'Fake Street 586\nChicago, IL 55555',
    signature: '',
    participantId: 'CSP1314',
    reimbursementType: 'Reimbursement',
    ...initialData
  })

  const [errors, setErrors] = useState({})

  // Convert number to words (simplified version)
  const numberToWords = (num) => {
    if (!num || isNaN(num)) return ''
    
    const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
    const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']
    const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']
    
    const convertHundreds = (n) => {
      let result = ''
      if (n >= 100) {
        result += ones[Math.floor(n / 100)] + ' hundred '
        n %= 100
      }
      if (n >= 20) {
        result += tens[Math.floor(n / 10)] + ' '
        n %= 10
      } else if (n >= 10) {
        result += teens[n - 10] + ' '
        return result
      }
      if (n > 0) {
        result += ones[n] + ' '
      }
      return result
    }

    const dollars = Math.floor(num)
    const cents = Math.round((num - dollars) * 100)
    
    let result = ''
    if (dollars === 0) {
      result = 'zero'
    } else if (dollars < 1000) {
      result = convertHundreds(dollars).trim()
    } else {
      // Simplified for thousands
      const thousands = Math.floor(dollars / 1000)
      const remainder = dollars % 1000
      result = convertHundreds(thousands).trim() + ' thousand'
      if (remainder > 0) {
        result += ' ' + convertHundreds(remainder).trim()
      }
    }
    
    result += ' dollars'
    if (cents > 0) {
      result += ` and ${cents}/100`
    }
    
    return result.charAt(0).toUpperCase() + result.slice(1)
  }

  // Validation rules
  const validateForm = (data) => {
    const newErrors = {}
    
    if (!data.payTo.trim()) {
      newErrors.payTo = 'Pay to field is required'
    }
    
    if (!data.amount || isNaN(data.amount) || parseFloat(data.amount) <= 0) {
      newErrors.amount = 'Valid amount is required'
    }
    
    if (!data.date) {
      newErrors.date = 'Date is required'
    }
    
    if (!data.accountHolder.trim()) {
      newErrors.accountHolder = 'Account holder name is required'
    }
    
    if (!data.bankName.trim()) {
      newErrors.bankName = 'Bank name is required'
    }
    
    return newErrors
  }

  const handleInputChange = (field, value) => {
    const updatedData = { ...formData, [field]: value }
    
    // Auto-convert amount to words
    if (field === 'amount' && value && !isNaN(value)) {
      updatedData.amountWords = numberToWords(parseFloat(value))
    }
    
    setFormData(updatedData)
    
    // Clear specific field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
    
    // Pass data to parent component
    if (onFormChange) {
      onFormChange(updatedData)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validateForm(formData)
    setErrors(newErrors)
    
    if (Object.keys(newErrors).length === 0) {
      // Form is valid - this could trigger save or export
      console.log('Form submitted:', formData)
    }
  }

  const resetForm = () => {
    const resetData = {
      payTo: 'ConsumerCSP1314-1 ConsumerCSP1314-1',
      amount: '0.01',
      amountWords: 'Zero Dollars And One Cent',
      date: '2025-08-19',
      memo: '',
      checkNumber: '0000003743',
      accountNumber: '131400001',
      routingNumber: '000000374',
      bankName: 'NiSmothB Automation - Do Not USE!',
      accountHolder: 'Nick\'s',
      address: 'Fake Street 586\nChicago, IL 55555',
      signature: '',
      participantId: 'CSP1314',
      reimbursementType: 'Reimbursement'
    }
    setFormData(resetData)
    setErrors({})
    if (onFormChange) {
      onFormChange(resetData)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Check Details</h2>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={resetForm}
            className="btn-secondary flex items-center"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Check Information */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pay to the Order of *
            </label>
            <input
              type="text"
              value={formData.payTo}
              onChange={(e) => handleInputChange('payTo', e.target.value)}
              className={`input-field ${errors.payTo ? 'border-red-500' : ''}`}
              placeholder="Enter payee name"
            />
            {errors.payTo && <p className="text-red-500 text-sm mt-1">{errors.payTo}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount ($) *
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => handleInputChange('amount', e.target.value)}
              className={`input-field ${errors.amount ? 'border-red-500' : ''}`}
              placeholder="0.00"
            />
            {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount in Words (Auto-generated)
          </label>
          <input
            type="text"
            value={formData.amountWords}
            onChange={(e) => handleInputChange('amountWords', e.target.value)}
            className="input-field bg-gray-50"
            placeholder="Amount will appear here automatically"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date *
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              className={`input-field ${errors.date ? 'border-red-500' : ''}`}
            />
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Check Number
            </label>
            <input
              type="text"
              value={formData.checkNumber}
              onChange={(e) => handleInputChange('checkNumber', e.target.value)}
              className="input-field"
              placeholder="001"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Memo
          </label>
          <input
            type="text"
            value={formData.memo}
            onChange={(e) => handleInputChange('memo', e.target.value)}
            className="input-field"
            placeholder="Optional memo"
          />
        </div>

        {/* Reimbursement Information */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Reimbursement Information</h3>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reimbursement Type
              </label>
              <input
                type="text"
                value={formData.reimbursementType}
                onChange={(e) => handleInputChange('reimbursementType', e.target.value)}
                className="input-field"
                placeholder="Reimbursement"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Participant ID
              </label>
              <input
                type="text"
                value={formData.participantId}
                onChange={(e) => handleInputChange('participantId', e.target.value)}
                className="input-field"
                placeholder="CSP1314"
              />
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Holder Name *
              </label>
              <input
                type="text"
                value={formData.accountHolder}
                onChange={(e) => handleInputChange('accountHolder', e.target.value)}
                className={`input-field ${errors.accountHolder ? 'border-red-500' : ''}`}
                placeholder="John Doe"
              />
              {errors.accountHolder && <p className="text-red-500 text-sm mt-1">{errors.accountHolder}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bank Name *
              </label>
              <input
                type="text"
                value={formData.bankName}
                onChange={(e) => handleInputChange('bankName', e.target.value)}
                className={`input-field ${errors.bankName ? 'border-red-500' : ''}`}
                placeholder="First National Bank"
              />
              {errors.bankName && <p className="text-red-500 text-sm mt-1">{errors.bankName}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <textarea
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className="input-field"
              rows="2"
              placeholder="123 Main St, City, State 12345"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Routing Number
              </label>
              <input
                type="text"
                value={formData.routingNumber}
                onChange={(e) => handleInputChange('routingNumber', e.target.value)}
                className="input-field"
                placeholder="123456789"
                maxLength="9"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Number
              </label>
              <input
                type="text"
                value={formData.accountNumber}
                onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                className="input-field"
                placeholder="1234567890"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Signature
            </label>
            <input
              type="text"
              value={formData.signature}
              onChange={(e) => handleInputChange('signature', e.target.value)}
              className="input-field font-signature text-xl"
              placeholder="Your signature"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-6 border-t">
          <button type="submit" className="btn-primary flex items-center">
            <Save className="w-4 h-4 mr-2" />
            Validate Form
          </button>
        </div>
      </form>
    </div>
  )
}

export default CheckForm
