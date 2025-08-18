import React, { useState } from 'react'
import { Search, CheckCircle, XCircle, AlertTriangle, Eye, Calendar, DollarSign, User } from 'lucide-react'

const VerifyCheck = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [verificationResult, setVerificationResult] = useState(null)
  const [isSearching, setIsSearching] = useState(false)
  const [searchHistory, setSearchHistory] = useState([])

  const searchCheck = async () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)
    setVerificationResult(null)

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Get exported checks from localStorage
      const exportedChecks = JSON.parse(localStorage.getItem('exportedChecks') || '[]')
      
      // Search by various criteria
      const foundCheck = exportedChecks.find(check => 
        check.id === searchQuery ||
        check.hash === searchQuery ||
        check.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
        check.checkData?.checkNumber === searchQuery ||
        (check.checkData?.payTo && check.checkData.payTo.toLowerCase().includes(searchQuery.toLowerCase()))
      )

      if (foundCheck) {
        setVerificationResult({
          status: 'verified',
          check: foundCheck,
          message: 'Check verified successfully'
        })
      } else {
        setVerificationResult({
          status: 'not_found',
          message: 'No matching check found in our records'
        })
      }

      // Add to search history
      const newSearch = {
        query: searchQuery,
        timestamp: new Date().toISOString(),
        found: !!foundCheck
      }
      setSearchHistory(prev => [newSearch, ...prev.slice(0, 4)]) // Keep last 5 searches

    } catch (error) {
      setVerificationResult({
        status: 'error',
        message: 'Verification service temporarily unavailable'
      })
    } finally {
      setIsSearching(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchCheck()
    }
  }

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-6 h-6 text-green-500" />
      case 'not_found':
        return <XCircle className="w-6 h-6 text-red-500" />
      case 'error':
        return <AlertTriangle className="w-6 h-6 text-yellow-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return 'bg-green-50 border-green-200 text-green-800'
      case 'not_found':
        return 'bg-red-50 border-red-200 text-red-800'
      case 'error':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800'
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800'
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Check Verification Portal
        </h1>
        <p className="text-lg text-gray-600">
          Verify the authenticity of checks using our secure database
        </p>
      </div>

      {/* Search Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Search for Check
        </h2>
        
        <div className="flex space-x-4">
          <div className="flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter check ID, hash, filename, check number, or payee name..."
              className="input-field"
            />
          </div>
          <button
            onClick={searchCheck}
            disabled={!searchQuery.trim() || isSearching}
            className="btn-primary flex items-center space-x-2 px-6"
          >
            {isSearching ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Searching...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Verify</span>
              </>
            )}
          </button>
        </div>

        <div className="mt-4 text-sm text-gray-500">
          <p>You can search by:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Check ID (e.g., check_1234567890_abc123def)</li>
            <li>Check hash (e.g., a1b2c3d4)</li>
            <li>Filename (e.g., John_Doe_Check_2024-01-15)</li>
            <li>Check number (e.g., 001)</li>
            <li>Payee name (e.g., John Doe)</li>
          </ul>
        </div>
      </div>

      {/* Verification Result */}
      {verificationResult && (
        <div className={`rounded-lg border-2 p-6 ${getStatusColor(verificationResult.status)}`}>
          <div className="flex items-start space-x-4">
            {getStatusIcon(verificationResult.status)}
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">
                Verification Result
              </h3>
              <p className="mb-4">{verificationResult.message}</p>

              {verificationResult.check && (
                <div className="bg-white rounded-lg p-4 space-y-4">
                  <h4 className="font-semibold text-gray-900 flex items-center">
                    <Eye className="w-4 h-4 mr-2" />
                    Check Details
                  </h4>
                  
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">Payee:</span>
                        <span>{verificationResult.check.checkData?.payTo || 'N/A'}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">Amount:</span>
                        <span>${verificationResult.check.checkData?.amount || 'N/A'}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">Check #:</span>
                        <span>{verificationResult.check.checkData?.checkNumber || 'N/A'}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">Date:</span>
                        <span>{verificationResult.check.checkData?.date || 'N/A'}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">Exported:</span>
                        <span>{formatDate(verificationResult.check.timestamp)}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">Hash:</span>
                        <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                          {verificationResult.check.hash}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <CheckCircle className="w-3 h-3" />
                      <span>This check was created and exported through our secure portal</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Search History */}
      {searchHistory.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Searches
          </h3>
          <div className="space-y-2">
            {searchHistory.map((search, index) => (
              <div key={index} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-mono">{search.query}</span>
                  {search.found ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                </div>
                <span className="text-xs text-gray-500">
                  {formatDate(search.timestamp)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Help Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">
          How Verification Works
        </h3>
        <div className="text-sm text-blue-800 space-y-2">
          <p>• Each exported check receives a unique ID and cryptographic hash</p>
          <p>• Our system stores check metadata securely for verification purposes</p>
          <p>• Verification confirms the check was created through our portal</p>
          <p>• Search results show creation timestamp and key check details</p>
        </div>
      </div>
    </div>
  )
}

export default VerifyCheck
