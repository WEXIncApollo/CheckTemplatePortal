import React, { forwardRef, useState, useCallback, useEffect, useRef } from 'react'
import { Move, Lock, Unlock, RotateCcw, Grid, Save } from 'lucide-react'
import { layoutManager, defaultPositions } from '../utils/layoutManager'

const DraggableCheckPreview = forwardRef(({ checkData = {}, onLayoutChange, initialLayout = null }, ref) => {
  const [isDragMode, setIsDragMode] = useState(false)
  const [elementPositions, setElementPositions] = useState(defaultPositions)
  const [snapToGrid, setSnapToGrid] = useState(false)
  const [gridSize] = useState(10)
  const [dragState, setDragState] = useState({ isDragging: false, elementId: null, startPos: null, offset: null })
  const containerRef = useRef(null)

  // Load initial layout if provided
  useEffect(() => {
    if (initialLayout) {
      setElementPositions(layoutManager.mergeWithDefaults(initialLayout))
    }
  }, [initialLayout])

  const {
    payTo = 'ConsumerCSP1314-1 ConsumerCSP1314-1',
    amount = '0.01',
    amountWords = 'Zero Dollars And One Cent',
    date = '8/19/2025',
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
    if (dateStr.includes('/')) return dateStr
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    })
  }

  // Custom drag handlers
  const handleMouseDown = useCallback((e, elementId) => {
    if (!isDragMode) return

    e.preventDefault()
    const rect = e.currentTarget.getBoundingClientRect()
    const containerRect = containerRef.current?.getBoundingClientRect()

    if (!containerRect) return

    const offset = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }

    setDragState({
      isDragging: true,
      elementId,
      startPos: { x: e.clientX, y: e.clientY },
      offset
    })
  }, [isDragMode])

  const handleMouseMove = useCallback((e) => {
    if (!dragState.isDragging || !dragState.elementId) return

    e.preventDefault()
    const containerRect = containerRef.current?.getBoundingClientRect()
    if (!containerRect) return

    let newX = e.clientX - containerRect.left - dragState.offset.x
    let newY = e.clientY - containerRect.top - dragState.offset.y

    // Apply grid snapping if enabled
    if (snapToGrid) {
      newX = Math.round(newX / gridSize) * gridSize
      newY = Math.round(newY / gridSize) * gridSize
    }

    // Keep within bounds
    newX = Math.max(0, Math.min(newX, containerRect.width - 100))
    newY = Math.max(0, Math.min(newY, containerRect.height - 50))

    const position = { x: newX, y: newY }

    setElementPositions(prev => ({
      ...prev,
      [dragState.elementId]: position
    }))

    if (onLayoutChange) {
      onLayoutChange(dragState.elementId, position)
    }
  }, [dragState, snapToGrid, gridSize, onLayoutChange])

  const handleMouseUp = useCallback(() => {
    setDragState({ isDragging: false, elementId: null, startPos: null, offset: null })
  }, [])

  // Add global mouse event listeners
  useEffect(() => {
    if (dragState.isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)

      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [dragState.isDragging, handleMouseMove, handleMouseUp])

  const resetPositions = () => {
    setElementPositions(defaultPositions)
    if (onLayoutChange) {
      Object.keys(defaultPositions).forEach(key => {
        onLayoutChange(key, defaultPositions[key])
      })
    }
  }

  const saveCurrentLayout = () => {
    const layoutName = prompt('Enter a name for this layout:')
    if (!layoutName) return

    try {
      layoutManager.saveLayout(layoutName, elementPositions)
      alert('Layout saved successfully!')
    } catch (error) {
      alert('Failed to save layout: ' + error.message)
    }
  }

  const DraggableElement = ({ id, children, className = '', style = {} }) => {
    const position = elementPositions[id] || { x: 0, y: 0 }
    const isBeingDragged = dragState.isDragging && dragState.elementId === id

    const elementStyle = {
      ...style,
      transform: `translate(${position.x}px, ${position.y}px)`,
      cursor: isDragMode ? 'move' : 'default',
      zIndex: isBeingDragged ? 1000 : 1,
      transition: isBeingDragged ? 'none' : 'transform 0.2s ease'
    }

    const handleElementMouseDown = (e) => {
      if (!isDragMode) return
      e.stopPropagation()
      handleMouseDown(e, id)
    }

    return (
      <div
        className={`${className} ${isDragMode ? 'draggable-element no-select' : ''} ${isBeingDragged ? 'dragging' : ''}`}
        style={elementStyle}
        onMouseDown={handleElementMouseDown}
      >
        {isDragMode && (
          <div
            className="drag-handle"
            onMouseDown={handleElementMouseDown}
            title={`Drag to move ${id}`}
          >
            <Move className="w-2 h-2 text-white" />
          </div>
        )}
        <div className={isDragMode ? 'pointer-events-none' : ''}>
          {children}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white p-4">
      {/* Drag Mode Controls */}
      <div className="mb-4 bg-gray-100 p-3 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsDragMode(!isDragMode)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                isDragMode
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {isDragMode ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              <span>{isDragMode ? 'Exit Drag Mode' : 'Enable Drag Mode'}</span>
            </button>

            {isDragMode && (
              <>
                <button
                  onClick={resetPositions}
                  className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset</span>
                </button>

                <button
                  onClick={saveCurrentLayout}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Layout</span>
                </button>

                <button
                  onClick={() => setSnapToGrid(!snapToGrid)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    snapToGrid
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                  <span>Grid: {snapToGrid ? 'ON' : 'OFF'}</span>
                </button>
              </>
            )}
          </div>

          {isDragMode && (
            <div className="text-sm text-gray-600">
              💡 Drag the blue handles to reposition elements
            </div>
          )}
        </div>

        {isDragMode && snapToGrid && (
          <div className="text-xs text-purple-600 bg-purple-50 px-3 py-1 rounded">
            Grid snapping enabled ({gridSize}px grid)
          </div>
        )}
      </div>

      <div
        ref={(el) => {
          if (ref) {
            if (typeof ref === 'function') ref(el)
            else ref.current = el
          }
          containerRef.current = el
        }}
        className="relative mx-auto bg-white border border-gray-300 overflow-hidden"
        style={{
          width: '8.5in',
          height: '11in',
          minWidth: '680px',
          minHeight: '880px',
          fontFamily: 'Arial, sans-serif'
        }}
      >
        {/* Top Check Section */}
        <div className="border-b-2 border-gray-400 relative" style={{ height: '3.5in', padding: '12px' }}>
          {/* Logo */}
          <DraggableElement 
            id="logo" 
            className="absolute"
            style={{ top: '12px', left: '12px' }}
          >
            <div className="w-16 h-12 bg-gray-200 flex items-center justify-center text-xs font-bold">
              {accountHolder}<br/>LOGO
            </div>
          </DraggableElement>

          {/* Company Info */}
          <DraggableElement 
            id="companyInfo" 
            className="absolute text-sm"
            style={{ top: '12px', left: '80px' }}
          >
            <div>
              <div className="font-bold">{bankName}</div>
              <div className="whitespace-pre-line text-xs">{address}</div>
            </div>
          </DraggableElement>

          {/* Reimbursement Type */}
          <DraggableElement 
            id="reimbursementType" 
            className="absolute text-sm font-bold"
            style={{ top: '12px', left: '300px' }}
          >
            <div>{reimbursementType}</div>
          </DraggableElement>

          {/* Check Number */}
          <DraggableElement 
            id="checkNumber" 
            className="absolute text-right"
            style={{ top: '12px', right: '12px' }}
          >
            <div className="text-sm">No: <span className="font-bold">{checkNumber}</span></div>
          </DraggableElement>

          {/* Date */}
          <DraggableElement 
            id="date" 
            className="absolute text-right"
            style={{ top: '50px', right: '12px' }}
          >
            <div className="text-sm">DATE: <span className="font-bold">{formatDate(date)}</span></div>
          </DraggableElement>

          {/* Pay To Line */}
          <DraggableElement 
            id="payToLine" 
            className="absolute"
            style={{ top: '100px', left: '12px', right: '120px' }}
          >
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-sm font-bold">PAY TO THE ORDER OF</span>
              <div className="flex-1 border-b border-gray-400 pb-1">
                <span className="text-sm">{payTo}</span>
              </div>
            </div>
          </DraggableElement>

          {/* Amount */}
          <DraggableElement 
            id="amount" 
            className="absolute text-right font-bold text-lg"
            style={{ top: '100px', right: '12px' }}
          >
            <div className="border border-gray-400 px-3 py-1 bg-white">
              {formatAmount(amount)}
            </div>
          </DraggableElement>

          {/* Amount in Words */}
          <DraggableElement 
            id="amountWords" 
            className="absolute"
            style={{ top: '140px', left: '12px', right: '80px' }}
          >
            <div className="border-b border-gray-400 pb-1">
              <span className="text-sm">{amountWords}</span>
            </div>
          </DraggableElement>

          {/* Participant Info */}
          <DraggableElement 
            id="participantInfo" 
            className="absolute text-sm"
            style={{ top: '180px', left: '12px' }}
          >
            <div>
              <div>ConsumerCSP1314-1 ConsumerCSP1314-1</div>
              <div>1</div>
              <div>1, AL 15651</div>
            </div>
          </DraggableElement>

          {/* Signature */}
          <DraggableElement 
            id="signature" 
            className="absolute"
            style={{ top: '180px', right: '12px' }}
          >
            <div className="w-48 border-b border-gray-400 pb-1 text-center">
              <div className="signature-text text-lg">{signature}</div>
            </div>
          </DraggableElement>

          {/* MICR Line */}
          <DraggableElement 
            id="micrLine" 
            className="absolute text-center"
            style={{ bottom: '12px', left: '50%', transform: 'translateX(-50%)' }}
          >
            <div className="font-mono text-lg font-bold">
              ⑆{routingNumber}⑆ ⑈{accountNumber}⑈
            </div>
          </DraggableElement>
        </div>

        {/* Bottom Stub Section */}
        <div className="p-4 text-sm relative">
          {/* Stub Participant Info */}
          <DraggableElement 
            id="stubParticipant" 
            className="absolute"
            style={{ top: '16px', left: '16px' }}
          >
            <div>
              <div>ConsumerCSP1314-1 ConsumerCSP1314-1</div>
              <div>Participant Account ID: {accountNumber}</div>
              <div>{participantId}</div>
            </div>
            <div className="text-right mt-4">
              <div>No. {checkNumber}</div>
              <div>Date: {formatDate(date)}</div>
            </div>
          </DraggableElement>

          {/* Claims Table */}
          <DraggableElement 
            id="claimsTable" 
            className="absolute"
            style={{ top: '120px', left: '16px', right: '16px' }}
          >
            <div>
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
          </DraggableElement>

          {/* Account Balances Table */}
          <DraggableElement 
            id="balancesTable" 
            className="absolute"
            style={{ top: '280px', left: '16px', right: '16px' }}
          >
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
          </DraggableElement>
        </div>
      </div>
    </div>
  )
})

DraggableCheckPreview.displayName = 'DraggableCheckPreview'

export default DraggableCheckPreview
