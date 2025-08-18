import React, { useState } from 'react'
import { Check, FileText, Heart, Building, User, DollarSign, Filter } from 'lucide-react'
import { baseTemplates, templateCategories } from '../data/checkTemplates'
import CheckThumbnail from './CheckThumbnail'

const TemplateGallery = ({ onTemplateSelect, selectedTemplate }) => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isExpanded, setIsExpanded] = useState(true)

  const getCategoryIcon = (categoryId) => {
    const icons = {
      reimbursement: <FileText className="w-4 h-4" />,
      healthcare: <Heart className="w-4 h-4" />,
      benefits: <Check className="w-4 h-4" />,
      business: <Building className="w-4 h-4" />,
      personal: <User className="w-4 h-4" />,
      payroll: <DollarSign className="w-4 h-4" />
    }
    return icons[categoryId] || <FileText className="w-4 h-4" />
  }

  const getCategoryColorClasses = (categoryId) => {
    const colorMap = {
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      green: 'bg-green-100 text-green-800 border-green-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200',
      indigo: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      pink: 'bg-pink-100 text-pink-800 border-pink-200',
      yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      gray: 'bg-gray-100 text-gray-800 border-gray-200'
    }
    const category = templateCategories.find(cat => cat.id === categoryId)
    return colorMap[category?.color] || colorMap.gray
  }

  const filteredTemplates = selectedCategory === 'all' 
    ? baseTemplates 
    : baseTemplates.filter(template => 
        template.category.toLowerCase() === selectedCategory.replace('all', '')
      )



  return (
    <div className="mb-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Choose a Template</h2>
              <p className="text-sm text-gray-600">Select a base template to start designing your check</p>
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
      </div>

      {isExpanded && (
        <>
          {/* Category Filter */}
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center space-x-2 mb-3">
              <Filter className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Filter by Category:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {templateCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? getCategoryColorClasses(category.id)
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {category.id !== 'all' && getCategoryIcon(category.id.replace('all', ''))}
                  <span>{category.name}</span>
                  <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                    {category.id === 'all'
                      ? baseTemplates.length
                      : baseTemplates.filter(t => t.category.toLowerCase() === category.id).length
                    }
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Template Grid */}
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTemplates.map(template => (
                <div
                  key={template.id}
                  className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedTemplate?.id === template.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => onTemplateSelect(template)}
                >
                  {/* Template Preview */}
                  <div className="mb-3">
                    <CheckThumbnail template={template} />
                  </div>

                  {/* Template Info */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">{template.name}</h3>
                      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getCategoryColorClasses(template.category.toLowerCase())}`}>
                        {getCategoryIcon(template.category.toLowerCase())}
                        <span>{template.category}</span>
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{template.description}</p>
                  </div>

                  {/* Selection Indicator */}
                  {selectedTemplate?.id === template.id && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-blue-500 bg-opacity-0 hover:bg-opacity-5 rounded-lg transition-all pointer-events-none" />
                </div>
              ))}
            </div>

            {filteredTemplates.length === 0 && (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
                <p className="text-gray-600">Try selecting a different category or check back later for more templates.</p>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''} available
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onTemplateSelect(null)}
                  className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Start Blank
                </button>
                {selectedTemplate && (
                  <button
                    onClick={() => onTemplateSelect(selectedTemplate)}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Use This Template
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default TemplateGallery
