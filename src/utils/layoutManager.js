// Layout management utilities for draggable check components

/**
 * Default positions for check elements
 */
export const defaultPositions = {
  logo: { x: 0, y: 0 },
  companyInfo: { x: 0, y: 0 },
  reimbursementType: { x: 0, y: 0 },
  checkNumber: { x: 0, y: 0 },
  date: { x: 0, y: 0 },
  payToLine: { x: 0, y: 0 },
  amount: { x: 0, y: 0 },
  amountWords: { x: 0, y: 0 },
  participantInfo: { x: 0, y: 0 },
  signature: { x: 0, y: 0 },
  micrLine: { x: 0, y: 0 },
  stubParticipant: { x: 0, y: 0 },
  claimsTable: { x: 0, y: 0 },
  balancesTable: { x: 0, y: 0 }
}

/**
 * Layout storage and management functions
 */
export const layoutManager = {
  // Save layout to localStorage
  saveLayout: (layoutName, layoutData) => {
    try {
      const layouts = layoutManager.getAllLayouts()
      layouts[layoutName] = {
        ...layoutData,
        savedAt: new Date().toISOString(),
        id: `layout_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      }
      localStorage.setItem('checkLayouts', JSON.stringify(layouts))
      return layouts[layoutName]
    } catch (error) {
      console.error('Error saving layout:', error)
      throw new Error('Failed to save layout')
    }
  },

  // Load layout from localStorage
  loadLayout: (layoutName) => {
    try {
      const layouts = layoutManager.getAllLayouts()
      return layouts[layoutName] || null
    } catch (error) {
      console.error('Error loading layout:', error)
      return null
    }
  },

  // Get all saved layouts
  getAllLayouts: () => {
    try {
      return JSON.parse(localStorage.getItem('checkLayouts') || '{}')
    } catch (error) {
      console.error('Error loading layouts:', error)
      return {}
    }
  },

  // Delete a layout
  deleteLayout: (layoutName) => {
    try {
      const layouts = layoutManager.getAllLayouts()
      delete layouts[layoutName]
      localStorage.setItem('checkLayouts', JSON.stringify(layouts))
      return true
    } catch (error) {
      console.error('Error deleting layout:', error)
      return false
    }
  },

  // Export layout as JSON
  exportLayout: (layoutData, filename = null) => {
    try {
      const exportData = {
        layout: layoutData,
        exportedAt: new Date().toISOString(),
        version: '1.0',
        type: 'check-template-layout'
      }
      
      const jsonString = JSON.stringify(exportData, null, 2)
      const blob = new Blob([jsonString], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      
      const a = document.createElement('a')
      a.href = url
      a.download = filename || `check-layout-${Date.now()}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      return true
    } catch (error) {
      console.error('Error exporting layout:', error)
      return false
    }
  },

  // Import layout from JSON file
  importLayout: (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      
      reader.onload = (e) => {
        try {
          const importData = JSON.parse(e.target.result)
          
          // Validate import data
          if (!importData.layout || importData.type !== 'check-template-layout') {
            reject(new Error('Invalid layout file format'))
            return
          }
          
          resolve(importData.layout)
        } catch (error) {
          reject(new Error('Failed to parse layout file'))
        }
      }
      
      reader.onerror = () => {
        reject(new Error('Failed to read layout file'))
      }
      
      reader.readAsText(file)
    })
  },

  // Validate layout data
  validateLayout: (layoutData) => {
    if (!layoutData || typeof layoutData !== 'object') {
      return { isValid: false, error: 'Layout data must be an object' }
    }

    const requiredElements = Object.keys(defaultPositions)
    const missingElements = requiredElements.filter(element => 
      !layoutData[element] || 
      typeof layoutData[element].x !== 'number' || 
      typeof layoutData[element].y !== 'number'
    )

    if (missingElements.length > 0) {
      return { 
        isValid: false, 
        error: `Missing or invalid elements: ${missingElements.join(', ')}` 
      }
    }

    return { isValid: true, error: null }
  },

  // Merge layout with defaults
  mergeWithDefaults: (layoutData) => {
    return {
      ...defaultPositions,
      ...layoutData
    }
  },

  // Reset layout to defaults
  resetToDefaults: () => {
    return { ...defaultPositions }
  },

  // Calculate layout bounds
  getLayoutBounds: (layoutData) => {
    const positions = Object.values(layoutData)
    if (positions.length === 0) return { minX: 0, minY: 0, maxX: 0, maxY: 0 }

    const bounds = positions.reduce((acc, pos) => ({
      minX: Math.min(acc.minX, pos.x),
      minY: Math.min(acc.minY, pos.y),
      maxX: Math.max(acc.maxX, pos.x),
      maxY: Math.max(acc.maxY, pos.y)
    }), {
      minX: positions[0].x,
      minY: positions[0].y,
      maxX: positions[0].x,
      maxY: positions[0].y
    })

    return bounds
  },

  // Normalize layout positions (ensure no negative positions)
  normalizeLayout: (layoutData) => {
    const bounds = layoutManager.getLayoutBounds(layoutData)
    const offsetX = bounds.minX < 0 ? Math.abs(bounds.minX) : 0
    const offsetY = bounds.minY < 0 ? Math.abs(bounds.minY) : 0

    if (offsetX === 0 && offsetY === 0) return layoutData

    const normalizedLayout = {}
    Object.keys(layoutData).forEach(key => {
      normalizedLayout[key] = {
        x: layoutData[key].x + offsetX,
        y: layoutData[key].y + offsetY
      }
    })

    return normalizedLayout
  },

  // Create layout preset
  createPreset: (name, layoutData, description = '') => {
    const preset = {
      name,
      description,
      layout: layoutManager.normalizeLayout(layoutData),
      createdAt: new Date().toISOString(),
      id: `preset_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }

    try {
      const presets = layoutManager.getAllPresets()
      presets[name] = preset
      localStorage.setItem('layoutPresets', JSON.stringify(presets))
      return preset
    } catch (error) {
      console.error('Error creating preset:', error)
      throw new Error('Failed to create layout preset')
    }
  },

  // Get all layout presets
  getAllPresets: () => {
    try {
      return JSON.parse(localStorage.getItem('layoutPresets') || '{}')
    } catch (error) {
      console.error('Error loading presets:', error)
      return {}
    }
  },

  // Load layout preset
  loadPreset: (presetName) => {
    try {
      const presets = layoutManager.getAllPresets()
      return presets[presetName] || null
    } catch (error) {
      console.error('Error loading preset:', error)
      return null
    }
  },

  // Delete layout preset
  deletePreset: (presetName) => {
    try {
      const presets = layoutManager.getAllPresets()
      delete presets[presetName]
      localStorage.setItem('layoutPresets', JSON.stringify(presets))
      return true
    } catch (error) {
      console.error('Error deleting preset:', error)
      return false
    }
  }
}

/**
 * Layout utility functions
 */
export const layoutUtils = {
  // Convert layout to CSS transform strings
  positionToTransform: (position) => {
    return `translate(${position.x}px, ${position.y}px)`
  },

  // Calculate distance between two positions
  calculateDistance: (pos1, pos2) => {
    const dx = pos2.x - pos1.x
    const dy = pos2.y - pos1.y
    return Math.sqrt(dx * dx + dy * dy)
  },

  // Snap position to grid
  snapToGrid: (position, gridSize = 10) => {
    return {
      x: Math.round(position.x / gridSize) * gridSize,
      y: Math.round(position.y / gridSize) * gridSize
    }
  },

  // Check if position is within bounds
  isWithinBounds: (position, bounds) => {
    return position.x >= bounds.left && 
           position.x <= bounds.right && 
           position.y >= bounds.top && 
           position.y <= bounds.bottom
  },

  // Generate layout statistics
  getLayoutStats: (layoutData) => {
    const positions = Object.values(layoutData)
    const bounds = layoutManager.getLayoutBounds(layoutData)
    
    return {
      elementCount: positions.length,
      bounds,
      area: (bounds.maxX - bounds.minX) * (bounds.maxY - bounds.minY),
      averagePosition: {
        x: positions.reduce((sum, pos) => sum + pos.x, 0) / positions.length,
        y: positions.reduce((sum, pos) => sum + pos.y, 0) / positions.length
      }
    }
  }
}
