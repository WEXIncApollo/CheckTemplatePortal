// LocalStorage utility functions for Check Template Portal

/**
 * Template Management
 */
export const templateStorage = {
  // Get all saved templates
  getAll: () => {
    try {
      return JSON.parse(localStorage.getItem('checkTemplates') || '[]')
    } catch (error) {
      console.error('Error loading templates:', error)
      return []
    }
  },

  // Save a new template
  save: (templateData) => {
    try {
      const templates = templateStorage.getAll()
      const newTemplate = {
        id: `template_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: templateData.name,
        data: templateData.data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      templates.push(newTemplate)
      localStorage.setItem('checkTemplates', JSON.stringify(templates))
      return newTemplate
    } catch (error) {
      console.error('Error saving template:', error)
      throw new Error('Failed to save template')
    }
  },

  // Update an existing template
  update: (templateId, updates) => {
    try {
      const templates = templateStorage.getAll()
      const index = templates.findIndex(t => t.id === templateId)
      
      if (index === -1) {
        throw new Error('Template not found')
      }
      
      templates[index] = {
        ...templates[index],
        ...updates,
        updatedAt: new Date().toISOString()
      }
      
      localStorage.setItem('checkTemplates', JSON.stringify(templates))
      return templates[index]
    } catch (error) {
      console.error('Error updating template:', error)
      throw new Error('Failed to update template')
    }
  },

  // Delete a template
  delete: (templateId) => {
    try {
      const templates = templateStorage.getAll()
      const filteredTemplates = templates.filter(t => t.id !== templateId)
      localStorage.setItem('checkTemplates', JSON.stringify(filteredTemplates))
      return true
    } catch (error) {
      console.error('Error deleting template:', error)
      throw new Error('Failed to delete template')
    }
  },

  // Get a specific template
  getById: (templateId) => {
    try {
      const templates = templateStorage.getAll()
      return templates.find(t => t.id === templateId) || null
    } catch (error) {
      console.error('Error loading template:', error)
      return null
    }
  }
}

/**
 * Export Records Management
 */
export const exportStorage = {
  // Get all export records
  getAll: () => {
    try {
      return JSON.parse(localStorage.getItem('exportedChecks') || '[]')
    } catch (error) {
      console.error('Error loading export records:', error)
      return []
    }
  },

  // Save a new export record
  save: (exportData) => {
    try {
      const exports = exportStorage.getAll()
      const newExport = {
        id: exportData.id || `check_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString(),
        checkData: exportData.checkData,
        filename: exportData.filename,
        hash: exportData.hash,
        verified: false
      }
      
      exports.push(newExport)
      localStorage.setItem('exportedChecks', JSON.stringify(exports))
      return newExport
    } catch (error) {
      console.error('Error saving export record:', error)
      throw new Error('Failed to save export record')
    }
  },

  // Search export records
  search: (query) => {
    try {
      const exports = exportStorage.getAll()
      const searchTerm = query.toLowerCase()
      
      return exports.filter(exp => 
        exp.id.toLowerCase().includes(searchTerm) ||
        exp.hash.toLowerCase().includes(searchTerm) ||
        exp.filename.toLowerCase().includes(searchTerm) ||
        exp.checkData?.checkNumber?.toLowerCase().includes(searchTerm) ||
        exp.checkData?.payTo?.toLowerCase().includes(searchTerm) ||
        exp.checkData?.accountHolder?.toLowerCase().includes(searchTerm)
      )
    } catch (error) {
      console.error('Error searching exports:', error)
      return []
    }
  },

  // Get export by ID
  getById: (exportId) => {
    try {
      const exports = exportStorage.getAll()
      return exports.find(exp => exp.id === exportId) || null
    } catch (error) {
      console.error('Error loading export:', error)
      return null
    }
  },

  // Mark export as verified
  markVerified: (exportId) => {
    try {
      const exports = exportStorage.getAll()
      const index = exports.findIndex(exp => exp.id === exportId)
      
      if (index !== -1) {
        exports[index].verified = true
        exports[index].verifiedAt = new Date().toISOString()
        localStorage.setItem('exportedChecks', JSON.stringify(exports))
        return exports[index]
      }
      
      return null
    } catch (error) {
      console.error('Error marking export as verified:', error)
      return null
    }
  }
}

/**
 * Application Settings
 */
export const settingsStorage = {
  // Get application settings
  get: () => {
    try {
      return JSON.parse(localStorage.getItem('appSettings') || '{}')
    } catch (error) {
      console.error('Error loading settings:', error)
      return {}
    }
  },

  // Save application settings
  save: (settings) => {
    try {
      const currentSettings = settingsStorage.get()
      const updatedSettings = { ...currentSettings, ...settings }
      localStorage.setItem('appSettings', JSON.stringify(updatedSettings))
      return updatedSettings
    } catch (error) {
      console.error('Error saving settings:', error)
      throw new Error('Failed to save settings')
    }
  },

  // Get a specific setting
  getValue: (key, defaultValue = null) => {
    try {
      const settings = settingsStorage.get()
      return settings[key] !== undefined ? settings[key] : defaultValue
    } catch (error) {
      console.error('Error getting setting value:', error)
      return defaultValue
    }
  },

  // Set a specific setting
  setValue: (key, value) => {
    try {
      const settings = settingsStorage.get()
      settings[key] = value
      localStorage.setItem('appSettings', JSON.stringify(settings))
      return value
    } catch (error) {
      console.error('Error setting value:', error)
      throw new Error('Failed to set setting value')
    }
  }
}

/**
 * Data cleanup and maintenance
 */
export const maintenanceStorage = {
  // Clear all data
  clearAll: () => {
    try {
      localStorage.removeItem('checkTemplates')
      localStorage.removeItem('exportedChecks')
      localStorage.removeItem('appSettings')
      return true
    } catch (error) {
      console.error('Error clearing data:', error)
      return false
    }
  },

  // Get storage usage statistics
  getStats: () => {
    try {
      const templates = templateStorage.getAll()
      const exports = exportStorage.getAll()
      const settings = settingsStorage.get()
      
      return {
        templates: {
          count: templates.length,
          size: JSON.stringify(templates).length
        },
        exports: {
          count: exports.length,
          size: JSON.stringify(exports).length
        },
        settings: {
          keys: Object.keys(settings).length,
          size: JSON.stringify(settings).length
        },
        total: {
          size: JSON.stringify(templates).length + 
                JSON.stringify(exports).length + 
                JSON.stringify(settings).length
        }
      }
    } catch (error) {
      console.error('Error getting storage stats:', error)
      return null
    }
  },

  // Clean up old records (older than specified days)
  cleanup: (daysOld = 30) => {
    try {
      const cutoffDate = new Date()
      cutoffDate.setDate(cutoffDate.getDate() - daysOld)
      
      // Clean up old exports
      const exports = exportStorage.getAll()
      const recentExports = exports.filter(exp => 
        new Date(exp.timestamp) > cutoffDate
      )
      localStorage.setItem('exportedChecks', JSON.stringify(recentExports))
      
      return {
        exportsRemoved: exports.length - recentExports.length,
        exportsRemaining: recentExports.length
      }
    } catch (error) {
      console.error('Error during cleanup:', error)
      return null
    }
  }
}
