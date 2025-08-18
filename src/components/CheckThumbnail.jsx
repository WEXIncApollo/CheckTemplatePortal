import React from 'react'

const CheckThumbnail = ({ template, className = "w-full h-32" }) => {
  const { data } = template

  return (
    <div className={`${className} bg-white border border-gray-200 rounded-lg p-2 text-xs overflow-hidden relative`}>
      {/* Top Section */}
      <div className="flex justify-between items-start mb-2">
        {/* Left side - Logo and Company Info */}
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-yellow-800">$</span>
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-gray-800 text-xs truncate">{data.bankName || 'Bank Name'}</div>
            <div className="text-gray-600 text-xs truncate">{data.address?.split('\n')[0] || 'Address'}</div>
          </div>
        </div>
        
        {/* Right side - Check Info */}
        <div className="text-right flex-shrink-0">
          <div className="text-xs text-gray-600">No: {data.checkNumber || '001'}</div>
          <div className="text-xs text-gray-600">DATE: {data.date || new Date().toLocaleDateString()}</div>
        </div>
      </div>
      
      {/* Pay To Line */}
      <div className="mb-1">
        <div className="text-xs text-gray-700">PAY TO THE ORDER OF</div>
        <div className="font-semibold text-xs truncate border-b border-gray-300 pb-1">
          {data.payTo || 'Payee Name'}
        </div>
      </div>
      
      {/* Amount and Signature */}
      <div className="flex justify-between items-center mb-2">
        <div className="text-lg font-bold text-green-600">$ {data.amount || '0.00'}</div>
        <div className="text-xs italic text-gray-500 border-b border-gray-300 px-2">Signature</div>
      </div>
      
      {/* Amount in Words */}
      <div className="text-xs text-gray-600 border-b border-gray-300 pb-1 mb-2 truncate">
        {data.amountWords || 'Amount in words'}
      </div>
      
      {/* MICR Line */}
      <div className="text-xs font-mono text-gray-500 truncate">
        C {data.checkNumber || '001'} C {data.accountNumber || '123456789'} {data.routingNumber || '987654321'}
      </div>
      
      {/* Template Type Indicator */}
      {template.category && (
        <div className="absolute top-1 right-1 px-1 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">
          {template.category}
        </div>
      )}
      
      {/* Stub Section Indicator */}
      <div className="absolute bottom-1 left-1 right-1 h-4 bg-gray-100 rounded text-xs flex items-center justify-center text-gray-500">
        Stub Section
      </div>
    </div>
  )
}

export default CheckThumbnail
