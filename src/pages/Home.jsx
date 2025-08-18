import React from 'react'
import { Link } from 'react-router-dom'
import { PlusCircle, Shield, Download, Eye, Palette } from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: Palette,
      title: 'Drag & Drop Design',
      description: 'Advanced check designer with drag-and-drop element positioning and template gallery.',
      link: '/design',
      buttonText: 'Design Check'
    },
    {
      icon: PlusCircle,
      title: 'Template Gallery',
      description: 'Choose from professional check templates including reimbursement, HSA, and business checks.',
      link: '/design',
      buttonText: 'Browse Templates'
    },
    {
      icon: Download,
      title: 'Export to PDF',
      description: 'Download your finished checks as high-quality PDF files with custom layouts.',
      link: '/design',
      buttonText: 'Start Designing'
    },
    {
      icon: Shield,
      title: 'Verify Authenticity',
      description: 'Verify the authenticity of checks using our secure verification portal.',
      link: '/verify',
      buttonText: 'Verify Check'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center py-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Professional Check
          <span className="text-primary-600"> Design Portal</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Design and customize professional checks with our advanced drag-and-drop platform.
          Choose from templates, customize layouts, and export high-quality PDFs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/design"
            className="btn-primary text-lg px-8 py-3 inline-flex items-center justify-center"
          >
            <Palette className="w-5 h-5 mr-2" />
            Design Your Check
          </Link>
          <Link
            to="/verify"
            className="btn-secondary text-lg px-8 py-3 inline-flex items-center justify-center"
          >
            <Shield className="w-5 h-5 mr-2" />
            Verify a Check
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 py-16">
        {features.map((feature, index) => {
          const IconComponent = feature.icon
          return (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4">
                <IconComponent className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {feature.description}
              </p>
              <Link
                to={feature.link}
                className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center"
              >
                {feature.buttonText}
                <span className="ml-1">→</span>
              </Link>
            </div>
          )
        })}
      </div>

      {/* Stats Section */}
      <div className="bg-primary-600 rounded-2xl text-white py-16 px-8 text-center">
        <h2 className="text-3xl font-bold mb-8">Trusted by Professionals</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="text-4xl font-bold mb-2">10,000+</div>
            <div className="text-primary-100">Checks Created</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">99.9%</div>
            <div className="text-primary-100">Uptime</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">24/7</div>
            <div className="text-primary-100">Support</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
