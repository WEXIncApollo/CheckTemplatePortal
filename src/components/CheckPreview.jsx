import React, { forwardRef } from 'react'

const CheckPreview = forwardRef(({ checkData = {} }, ref) => {
  const {
    payTo = '',
    amount = '',
    amountWords = '',
    date = '',
    memo = '',
    checkNumber = '0000003743',
    accountNumber = '131400001',
    routingNumber = '000000374',
    bankName = 'NiSmothB Automation - Do Not USE!',
    accountHolder = 'Nick\'s',
    address = 'Fake Street 586\nChicago, IL 55555',
    signature = '',
    participantId = 'CSP1314',
    reimbursementType = 'Reimbursement'
  } = checkData

  const formatAmount = (amt) => {
    if (!amt) return '$0.01'
    const num = parseFloat(amt)
    return isNaN(num) ? '$0.01' : `$${num.toFixed(2)}`
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return '8/19/2025'
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="bg-white p-4">
      <div
        ref={ref}
        className="relative mx-auto bg-white border border-gray-300"
        style={{
          width: '8.5in',
          height: '11in',
          minWidth: '680px',
          minHeight: '880px',
          fontFamily: 'Arial, sans-serif'
        }}
      >
        {/* Top Check Section */}
        <div className="border-b-2 border-gray-400" style={{ height: '3.5in', padding: '12px' }}>
          {/* Header Row */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-12 bg-gray-200 flex items-center justify-center text-xs font-bold">
                {accountHolder}<br/>LOGO
              </div>
              <div className="text-sm">
                <div className="font-bold">{bankName}</div>
                <div className="whitespace-pre-line text-xs">{address}</div>
              </div>
              <div className="text-sm font-bold ml-8">
                {reimbursementType}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm">No: <span className="font-bold">{checkNumber}</span></div>
              <div className="text-sm mt-4">DATE: <span className="font-bold">{formatDate(date)}</span></div>
            </div>
          </div>

          {/* Pay To Section */}
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-sm font-bold">PAY TO THE ORDER OF</span>
              <div className="flex-1 border-b border-gray-400 pb-1">
                <span className="text-sm">{payTo || 'ConsumerCSP1314-1 ConsumerCSP1314-1'}</span>
              </div>
              <div className="text-right font-bold text-lg ml-4">
                {formatAmount(amount)}
              </div>
            </div>
            <div className="border-b border-gray-400 pb-1 mb-4">
              <span className="text-sm">{amountWords || 'Zero Dollars And One Cent'}</span>
            </div>
          </div>

          {/* Memo and Signature Section */}
          <div className="flex justify-between items-end mb-4">
            <div className="text-sm">
              <div>ConsumerCSP1314-1 ConsumerCSP1314-1</div>
              <div>1</div>
              <div>1, AL 15651</div>
            </div>
            <div className="w-48 border-b border-gray-400 pb-1 text-center">
              <div className="signature-text text-lg">{signature}</div>
            </div>
          </div>

          {/* MICR Line */}
          <div className="text-center mt-6">
            <div className="font-mono text-lg font-bold">
              ⑆{routingNumber}⑆ ⑈{accountNumber}⑈
            </div>
          </div>
        </div>

        {/* Bottom Stub Section */}
        <div className="p-4 text-sm">
          {/* Participant Info */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <div>ConsumerCSP1314-1 ConsumerCSP1314-1</div>
              <div>Participant Account ID: {accountNumber}</div>
              <div>{participantId}</div>
            </div>
            <div className="text-right">
              <div>No. {checkNumber}</div>
              <div className="mt-2">Date: {formatDate(date)}</div>
            </div>
          </div>

          {/* Claims Section */}
          <div className="mb-6">
            <div className="font-bold mb-2">Claims Included In this Payment</div>
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-1">Plan</th>
                  <th className="text-left py-1">Date Of Service</th>
                  <th className="text-left py-1">Claim Amount</th>
                  <th className="text-left py-1">Paid</th>
                  <th className="text-left py-1">Pending</th>
                  <th className="text-left py-1">Denied</th>
                  <th className="text-left py-1">Amt This Cycle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-1">TRN-M-CX-00</td>
                  <td className="py-1">7/29/2025</td>
                  <td className="py-1">$0.01</td>
                  <td className="py-1">$0.01</td>
                  <td className="py-1">$0.00</td>
                  <td className="py-1">$0.00</td>
                  <td className="py-1">$0.01</td>
                </tr>
              </tbody>
            </table>
            <div className="text-right mt-2 font-bold">
              Total: <span className="ml-4">{formatAmount(amount)}</span>
            </div>
          </div>

          {/* Account Balances Section */}
          <div>
            <div className="font-bold mb-2">Current Year Account Balances</div>
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-1">Plan</th>
                  <th className="text-left py-1">Eligible Amount</th>
                  <th className="text-left py-1">Submitted</th>
                  <th className="text-left py-1">Paid</th>
                  <th className="text-left py-1">Pending</th>
                  <th className="text-left py-1">Denied</th>
                  <th className="text-left py-1">Plan Year Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-1">TRN-M-CX-00</td>
                  <td className="py-1">-</td>
                  <td className="py-1">$13.39</td>
                  <td className="py-1">$11.84</td>
                  <td className="py-1">$1.55</td>
                  <td className="py-1">$0.00</td>
                  <td className="py-1">$31,186.61</td>
                </tr>
                <tr>
                  <td className="py-1">TRN-P-CX-00</td>
                  <td className="py-1">-</td>
                  <td className="py-1">$0.03</td>
                  <td className="py-1">$0.03</td>
                  <td className="py-1">$0.00</td>
                  <td className="py-1">$0.00</td>
                  <td className="py-1">$31,199.97</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
})

CheckPreview.displayName = 'CheckPreview'

export default CheckPreview
