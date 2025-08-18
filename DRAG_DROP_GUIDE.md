# Drag-and-Drop Check Designer Guide

## 🎯 Overview

The Check Template Portal now includes advanced drag-and-drop functionality that allows users to customize the layout of check elements by repositioning them visually. This feature provides unprecedented flexibility in check design while maintaining professional standards.

## ✨ New Features Added

### 1. **DraggableCheckPreview Component**
- **Drag Mode Toggle**: Switch between static and draggable preview modes
- **Visual Drag Handles**: Blue circular handles appear on each element in drag mode
- **Real-time Positioning**: Elements move smoothly as you drag them
- **Boundary Constraints**: Elements stay within the check boundaries

### 2. **Advanced Layout Controls**
- **Grid Snapping**: Snap elements to a 10px grid for precise alignment
- **Reset Functionality**: Return all elements to default positions
- **Save Layouts**: Save custom layouts as named templates
- **Export/Import**: Export layout configurations as JSON files

### 3. **Enhanced Template System**
- **Layout Persistence**: Templates now include element positioning data
- **Layout Presets**: Create and share layout configurations
- **Visual Indicators**: Templates show whether they include custom layouts

### 4. **New Pages and Navigation**
- **Design Check Page** (`/design`): Full-featured drag-and-drop designer
- **Enhanced Create Page**: Toggle between static and draggable previews
- **Updated Navigation**: Easy access to design tools

## 🚀 How to Use Drag-and-Drop

### Getting Started

1. **Navigate to Design Check**
   - Go to `/design` or click "Design Check" in navigation
   - Or use the toggle in the regular Create Check page

2. **Enable Drag Mode**
   - Click the "Enable Drag Mode" button
   - Blue handles will appear on each check element

3. **Drag Elements**
   - Click and drag the blue handles to reposition elements
   - Elements will move in real-time as you drag

4. **Use Grid Snapping** (Optional)
   - Click "Grid: OFF" to enable grid snapping
   - Elements will snap to a 10px grid for precise alignment

5. **Save Your Layout**
   - Click "Save Layout" to save your custom positioning
   - Give your layout a descriptive name

### Advanced Features

#### Grid Snapping
- **Purpose**: Ensures precise alignment and professional appearance
- **Grid Size**: 10px intervals
- **Toggle**: Click the Grid button to enable/disable
- **Visual Feedback**: Purple indicator shows when grid is active

#### Layout Management
- **Save Layouts**: Store custom positioning for reuse
- **Load Layouts**: Apply saved layouts to new checks
- **Export Layouts**: Download layout configurations as JSON
- **Reset Layouts**: Return to default positioning

#### Template Integration
- **Enhanced Templates**: Now include both data and layout information
- **Visual Indicators**: Templates show 🎨 for custom layouts, 📄 for standard
- **Backward Compatibility**: Old templates still work with default layouts

## 🎨 Design Elements

### Draggable Components

Each check element can be independently positioned:

#### Top Check Section
- **Logo Area**: Company logo placeholder
- **Company Info**: Bank name and address
- **Reimbursement Type**: Payment type indicator
- **Check Number**: Check identification number
- **Date**: Check date
- **Pay To Line**: Payee information
- **Amount**: Monetary amount in numbers
- **Amount Words**: Amount spelled out in words
- **Participant Info**: Account holder details
- **Signature**: Signature line
- **MICR Line**: Bank routing information

#### Bottom Stub Section
- **Stub Participant**: Participant account details
- **Claims Table**: Payment breakdown table
- **Balances Table**: Account balance information

### Visual Design

#### Drag Mode Indicators
- **Blue Handles**: Circular drag handles on each element
- **Dashed Borders**: Elements show dashed blue borders when draggable
- **Hover Effects**: Enhanced visual feedback on hover
- **Z-Index Management**: Dragged elements appear above others

#### Grid System
- **10px Grid**: Invisible grid for precise alignment
- **Snap Feedback**: Visual indication when snapping occurs
- **Grid Toggle**: Easy on/off control

## 🔧 Technical Implementation

### Dependencies Added
```json
{
  "react-draggable": "^4.4.6"
}
```

### New Components
- `DraggableCheckPreview.jsx`: Main draggable preview component
- `DesignCheck.jsx`: Full-featured design page
- `layoutManager.js`: Layout persistence utilities

### Key Features
- **React Draggable**: Smooth drag-and-drop interactions
- **Position Persistence**: Layouts saved to localStorage
- **Boundary Constraints**: Elements stay within check bounds
- **Performance Optimized**: Efficient re-rendering and state management

## 📱 User Experience

### Intuitive Controls
- **Clear Visual Feedback**: Users immediately understand what's draggable
- **Progressive Enhancement**: Static preview works, drag mode adds functionality
- **Responsive Design**: Works on desktop and tablet devices
- **Accessibility**: Keyboard navigation and screen reader support

### Professional Results
- **Precise Positioning**: Grid snapping ensures professional alignment
- **Consistent Spacing**: Visual guides help maintain proper spacing
- **Print-Ready Output**: Dragged layouts export correctly to PDF
- **Template Reusability**: Save and share custom layouts

## 🎯 Use Cases

### Business Applications
- **Custom Branding**: Position logos and company info optimally
- **Regulatory Compliance**: Adjust layouts for different requirements
- **Multi-Format Support**: Create layouts for different check sizes
- **Brand Consistency**: Save standard layouts for organization-wide use

### Design Flexibility
- **Creative Layouts**: Move beyond standard check formats
- **Space Optimization**: Make better use of available space
- **Visual Hierarchy**: Emphasize important elements through positioning
- **Accessibility**: Adjust layouts for better readability

## 🔒 Data Management

### Layout Storage
- **localStorage**: Layouts stored locally in browser
- **JSON Format**: Standardized, portable layout format
- **Version Control**: Layout versioning for future compatibility
- **Export/Import**: Share layouts between users/systems

### Template Integration
- **Enhanced Templates**: Include both form data and layout
- **Backward Compatibility**: Old templates work with default layouts
- **Migration Path**: Easy upgrade from static to draggable templates

## 🚀 Getting Started Checklist

### For New Users
- [ ] Navigate to `/design` page
- [ ] Fill in basic check information
- [ ] Click "Enable Drag Mode"
- [ ] Experiment with moving elements
- [ ] Try grid snapping feature
- [ ] Save your first custom layout

### For Advanced Users
- [ ] Create multiple layout presets
- [ ] Export layouts for sharing
- [ ] Integrate with existing templates
- [ ] Test PDF export with custom layouts
- [ ] Set up organization-wide layout standards

## 🎨 Design Best Practices

### Layout Guidelines
- **Maintain Readability**: Ensure text remains legible
- **Preserve Hierarchy**: Keep important elements prominent
- **Check Standards**: Follow banking industry layout conventions
- **Print Considerations**: Test layouts with actual printing

### Professional Tips
- **Use Grid Snapping**: Enables precise, professional alignment
- **Save Frequently**: Create incremental layout saves
- **Test Thoroughly**: Verify layouts work with different data
- **Document Layouts**: Use descriptive names for saved layouts

## 🔧 Troubleshooting

### Common Issues
- **Elements Not Moving**: Ensure drag mode is enabled
- **Layout Not Saving**: Check browser localStorage permissions
- **PDF Export Issues**: Verify layout doesn't exceed boundaries
- **Performance**: Disable grid snapping for smoother dragging

### Browser Compatibility
- **Chrome**: Full support (recommended)
- **Firefox**: Full support
- **Safari**: Full support
- **Edge**: Full support
- **Mobile**: Limited support (touch devices)

## 🚀 Future Enhancements

### Planned Features
- **Resize Handles**: Adjust element sizes
- **Rotation**: Rotate elements for creative layouts
- **Layers**: Z-index management for overlapping elements
- **Guides**: Visual alignment guides
- **Undo/Redo**: Layout change history
- **Collaboration**: Real-time collaborative editing

### Advanced Tools
- **Layout Templates**: Pre-designed layout options
- **Auto-Layout**: AI-powered layout suggestions
- **Responsive Layouts**: Layouts that adapt to different sizes
- **Animation**: Smooth transitions between layouts

The drag-and-drop functionality transforms the Check Template Portal from a simple form-based tool into a powerful design platform, giving users unprecedented control over their check layouts while maintaining ease of use and professional results.
