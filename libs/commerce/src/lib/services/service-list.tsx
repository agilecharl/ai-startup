import {
  CheckCircle,
  Headphones,
  Shield,
  Star,
  Users,
  Zap,
} from 'lucide-react';

const ServicesList = () => {
  const services = [
    {
      id: 1,
      name: 'Web Development',
      description:
        'Custom websites and web applications built with modern technologies',
      price: '$2,500+',
      duration: '2-6 weeks',
      features: [
        'Responsive Design',
        'SEO Optimized',
        'Fast Loading',
        'Mobile-First',
      ],
      icon: <Zap className="w-8 h-8" />,
      popular: false,
    },
    {
      id: 2,
      name: 'Digital Marketing',
      description:
        'Comprehensive marketing strategies to grow your online presence',
      price: '$1,200/month',
      duration: 'Ongoing',
      features: [
        'Social Media Management',
        'Content Creation',
        'Analytics',
        'Ad Campaigns',
      ],
      icon: <Users className="w-8 h-8" />,
      popular: true,
    },
    {
      id: 3,
      name: 'Brand Identity Design',
      description:
        'Complete brand identity packages including logo, colors, and guidelines',
      price: '$1,800+',
      duration: '3-4 weeks',
      features: [
        'Logo Design',
        'Brand Guidelines',
        'Color Palette',
        'Typography',
      ],
      icon: <Star className="w-8 h-8" />,
      popular: false,
    },
    {
      id: 4,
      name: 'Technical Support',
      description:
        '24/7 technical support and maintenance for your digital assets',
      price: '$99/month',
      duration: 'Ongoing',
      features: [
        '24/7 Support',
        'Regular Updates',
        'Bug Fixes',
        'Performance Monitoring',
      ],
      icon: <Headphones className="w-8 h-8" />,
      popular: false,
    },
    {
      id: 5,
      name: 'Security Consulting',
      description: 'Comprehensive security audits and implementation services',
      price: '$3,500+',
      duration: '1-3 weeks',
      features: [
        'Security Audit',
        'Penetration Testing',
        'Compliance Check',
        'Risk Assessment',
      ],
      icon: <Shield className="w-8 h-8" />,
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional services tailored to help your business grow and
            succeed in the digital world
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                service.popular ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              {service.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                <div className="flex items-center mb-4">
                  <div className="text-blue-500 mr-3">{service.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {service.name}
                  </h3>
                </div>

                <p className="text-gray-600 mb-6">{service.description}</p>

                <div className="flex justify-between items-center mb-6">
                  <div>
                    <span className="text-2xl font-bold text-blue-600">
                      {service.price}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {service.duration}
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200 ${
                    service.popular
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Need a custom solution? We'd love to help!
          </p>
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicesList;
