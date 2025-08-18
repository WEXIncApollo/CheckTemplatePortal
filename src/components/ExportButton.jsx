import React, { useState } from 'react'
import { Download, Loader2 } from 'lucide-react'

const ExportButton = ({ checkRef, checkData, className = '' }) => {
  const [isExporting, setIsExporting] = useState(false)
  const [exportError, setExportError] = useState('')

  const exportToPDF = async () => {
    if (!checkRef?.current) {
      setExportError('Check preview not available for export')
      return
    }

    setIsExporting(true)
    setExportError('')

    try {
      // Dynamic imports for better bundle splitting
      const html2canvas = (await import('html2canvas')).default
      const jsPDF = (await import('jspdf')).jsPDF

      // Configure html2canvas options for better quality
      const canvas = await html2canvas(checkRef.current, {
        scale: 2, // Higher resolution
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: checkRef.current.offsetWidth,
        height: checkRef.current.offsetHeight,
        scrollX: 0,
        scrollY: 0
      })

      // Create PDF with check dimensions (8.5" x 3.5")
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'in',
        format: [8.5, 3.5]
      })

      // Calculate dimensions to fit the check properly
      const imgWidth = 8.5
      const imgHeight = 3.5
      
      // Convert canvas to image and add to PDF
      const imgData = canvas.toDataURL('image/png', 1.0)
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)

      // Generate filename with timestamp
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-')
      const payeeName = checkData?.payTo ? checkData.payTo.replace(/[^a-zA-Z0-9]/g, '_') : 'Check'
      const filename = `${payeeName}_Check_${timestamp}.pdf`

      // Save the PDF
      pdf.save(filename)

      // Store export record for verification purposes
      const exportRecord = {
        id: `check_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString(),
        checkData: { ...checkData },
        filename,
        hash: await generateCheckHash(checkData)
      }

      // Save to localStorage for verification
      const existingRecords = JSON.parse(localStorage.getItem('exportedChecks') || '[]')
      existingRecords.push(exportRecord)
      localStorage.setItem('exportedChecks', JSON.stringify(existingRecords))

      console.log('Check exported successfully:', filename)
      
    } catch (error) {
      console.error('Export failed:', error)
      setExportError('Failed to export PDF. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  // Generate a simple hash for check verification
  const generateCheckHash = async (data) => {
    const checkString = JSON.stringify({
      payTo: data?.payTo || '',
      amount: data?.amount || '',
      date: data?.date || '',
      checkNumber: data?.checkNumber || '',
      accountHolder: data?.accountHolder || ''
    })
    
    // Simple hash function (in production, use a proper cryptographic hash)
    let hash = 0
    for (let i = 0; i < checkString.length; i++) {
      const char = checkString.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16)
  }

  const isDisabled = !checkData?.payTo || !checkData?.amount || isExporting

  return (
    <div className={`space-y-2 ${className}`}>
      <button
        onClick={exportToPDF}
        disabled={isDisabled}
        className={`
          flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200
          ${isDisabled 
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
            : 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl'
          }
        `}
      >
        {isExporting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Exporting...</span>
          </>
        ) : (
          <>
            <Download className="w-5 h-5" />
            <span>Export to PDF</span>
          </>
        )}
      </button>

      {exportError && (
        <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3">
          {exportError}
        </div>
      )}

      {isDisabled && !isExporting && (
        <div className="text-gray-500 text-sm">
          Please fill in required fields (Pay To and Amount) to enable export
        </div>
      )}

      <div className="text-xs text-gray-500 space-y-1">
        <div>• PDF will be saved with timestamp</div>
        <div>• Export record stored for verification</div>
        <div>• High-resolution output (300 DPI)</div>
      </div>
    </div>
  )
}

export default ExportButton
