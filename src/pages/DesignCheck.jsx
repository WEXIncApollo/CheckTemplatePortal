import React, { useState, useRef, useEffect } from 'react'
import DraggableCheckPreview from '../components/DraggableCheckPreview'
import ExportButton from '../components/ExportButton'
import TemplateGallery from '../components/TemplateGallery'
import { Save, FolderOpen, Trash2, Palette, Download } from 'lucide-react'

// Dummy data for the check preview
const dummyCheckData = {
  payTo: 'Sample Payee Name',
  amount: '1,234.56',
  amountWords: 'One Thousand Two Hundred Thirty Four Dollars And Fifty Six Cents',
  date: new Date().toISOString().split('T')[0],
  checkNumber: '001234',
  memo: 'Sample Memo',
  accountHolder: 'Your Business Name',
  bankName: 'Bank Name',
  address: '123 Bank Street Address\nCity, State 12345',
  routingNumber: '123456789',
  accountNumber: '987654321',
  signature: 'Sample Signature',
  participantId: 'PART123',
  reimbursementType: 'Sample Reimbursement',
  // Claims data for the stub section
  claims: [
    { date: '2024-01-15', description: 'Sample Claim 1', amount: '500.00' },
    { date: '2024-01-20', description: 'Sample Claim 2', amount: '734.56' }
  ],
  // Balance data for the stub section
  balances: {
    previousBalance: '2,500.00',
    currentBalance: '1,265.44',
    availableBalance: '1,265.44'
  }
}

const DesignCheck = () => {
  const [savedTemplates, setSavedTemplates] = useState([])
  const [showTemplates, setShowTemplates] = useState(false)
  const [layoutData, setLayoutData] = useState({})
  const [selectedBaseTemplate, setSelectedBaseTemplate] = useState(null)
  const checkPreviewRef = useRef()

  // Load saved templates on component mount
  useEffect(() => {
    const templates = JSON.parse(localStorage.getItem('checkTemplates') || '[]')
    setSavedTemplates(templates)
  }, [])

  const handleLayoutChange = (elementId, position) => {
    setLayoutData(prev => ({
      ...prev,
      [elementId]: position
    }))
  }

  const handleTemplateSelect = (template) => {
    if (template) {
      setSelectedBaseTemplate(template)
      setLayoutData(template.layout || {})
    } else {
      // Start blank
      setSelectedBaseTemplate(null)
      setLayoutData({})
    }
  }

  const saveTemplate = () => {
    if (Object.keys(layoutData).length === 0) {
      alert('Please customize the layout before saving a template')
      return
    }

    const templateName = prompt('Enter a name for this layout template:')
    if (!templateName) return

    const template = {
      id: `template_${Date.now()}`,
      name: templateName,
      data: { ...dummyCheckData },
      layout: { ...layoutData },
      createdAt: new Date().toISOString()
    }

    const updatedTemplates = [...savedTemplates, template]
    setSavedTemplates(updatedTemplates)
    localStorage.setItem('checkTemplates', JSON.stringify(updatedTemplates))

    alert('Layout template saved successfully!')
  }

  const loadTemplate = (template) => {
    if (template.layout) {
      setLayoutData(template.layout)
    }
    setShowTemplates(false)
  }

  const deleteTemplate = (templateId) => {
    if (confirm('Are you sure you want to delete this template?')) {
      const updatedTemplates = savedTemplates.filter(t => t.id !== templateId)
      setSavedTemplates(updatedTemplates)
      localStorage.setItem('checkTemplates', JSON.stringify(updatedTemplates))
    }
  }

  const exportLayoutData = () => {
    const layoutJson = JSON.stringify(layoutData, null, 2)
    const blob = new Blob([layoutJson], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `check-layout-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <Palette className="w-8 h-8 mr-3 text-blue-600" />
          Design Check Template
        </h1>
        <p className="text-lg text-gray-600">
          Create and customize your check layout with drag-and-drop functionality
        </p>
      </div>

      {/* Template Gallery */}
      <TemplateGallery
        onTemplateSelect={handleTemplateSelect}
        selectedTemplate={selectedBaseTemplate}
      />

      {/* Template Management */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Layout Templates</h2>
          <div className="flex space-x-2">
            <button
              onClick={exportLayoutData}
              className="btn-secondary flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Layout
            </button>
            <button
              onClick={saveTemplate}
              className="btn-secondary flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Layout
            </button>
            <button
              onClick={() => setShowTemplates(!showTemplates)}
              className="btn-secondary flex items-center"
            >
              <FolderOpen className="w-4 h-4 mr-2" />
              Load Layout ({savedTemplates.length})
            </button>
          </div>
        </div>

        {showTemplates && (
          <div className="border-t pt-4">
            {savedTemplates.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No saved layout templates. Customize the layout and save your first template!
              </p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedTemplates.map((template) => (
                  <div key={template.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{template.name}</h3>
                      <button
                        onClick={() => deleteTemplate(template.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>Layout Template</div>
                      <div className="text-xs text-blue-600">
                        {template.layout ? '🎨 Custom Layout' : '📄 Standard Layout'}
                      </div>
                      <div className="text-xs text-gray-400">
                        Created: {new Date(template.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <button
                      onClick={() => loadTemplate(template)}
                      className="mt-3 w-full btn-primary text-sm py-2"
                    >
                      Load Layout
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Draggable Preview and Export */}
        <div className="space-y-6">
          {/* Draggable Preview Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Palette className="w-6 h-6 mr-2 text-blue-600" />
              Draggable Design Preview
            </h2>
            <div className="overflow-x-auto">
              <DraggableCheckPreview
                ref={checkPreviewRef}
                checkData={dummyCheckData}
                onLayoutChange={handleLayoutChange}
                initialLayout={layoutData}
              />
            </div>
          </div>

          {/* Export Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Export Options</h2>
            <ExportButton
              checkRef={checkPreviewRef}
              checkData={dummyCheckData}
            />
          </div>

          {/* Design Tips Section */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
              <Palette className="w-5 h-5 mr-2" />
              Design Tips
            </h3>
            <div className="text-sm text-blue-800 space-y-2">
              <p>• <strong>Enable Drag Mode:</strong> Click the lock button to start repositioning elements</p>
              <p>• <strong>Drag Elements:</strong> Use the blue handles to move components around</p>
              <p>• <strong>Reset Layout:</strong> Use the reset button to return to default positions</p>
              <p>• <strong>Save Layouts:</strong> Templates now include your custom positioning</p>
              <p>• <strong>Export Layout:</strong> Download your layout configuration as JSON</p>
              <p>• <strong>Live Preview:</strong> Changes update in real-time as you drag</p>
            </div>
          </div>

          {/* Layout Information */}
          {Object.keys(layoutData).length > 0 && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Current Layout Data</h4>
              <div className="text-xs text-gray-600 max-h-32 overflow-y-auto">
                <pre>{JSON.stringify(layoutData, null, 2)}</pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DesignCheck
