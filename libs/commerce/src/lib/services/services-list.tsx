import './services-list.module.css';

const services = [
  {
    title: 'Web Development',
    price: '$2,500+',
    duration: '2-6 weeks',
    description:
      'Custom websites and web applications built with modern technologies',
    features: [
      'Responsive Design',
      'SEO Optimized',
      'Fast Loading',
      'Mobile-First',
    ],
    button: 'Get Started',
    type: 'web',
  },
  {
    title: 'Digital Marketing',
    price: '$1,200/month',
    duration: 'Ongoing',
    description:
      'Comprehensive marketing strategies to grow your online presence',
    features: ['Social Media Management', 'Content Creation', 'Analytics'],
    badge: 'Most Popular',
    type: 'marketing',
  },
];

export default function ServicesList() {
  return (
    <div className="services-section">
      <h2 className="headline">Our Services</h2>
      <p className="subtitle">
        Professional services tailored to help your business grow and succeed in
        the digital world
      </p>
      <div className="services-cards">
        {services.map((service) => (
          <div
            className={`service-card${
              service.type === 'marketing' ? ' popular' : ''
            }`}
            key={service.title}
          >
            <div className="card-header">
              <span className={`icon ${service.type}`}></span>
              <h3>{service.title}</h3>
              {service.badge && <span className="badge">{service.badge}</span>}
            </div>
            <div className="description">{service.description}</div>
            <div className="price-row">
              <span className="price">{service.price}</span>
              <span className="duration">{service.duration}</span>
            </div>
            <ul className="features">
              {service.features.map((f) => (
                <li key={f}>
                  <span className="checkmark">✔</span> {f}
                </li>
              ))}
            </ul>
            {service.button && (
              <button className="cta">{service.button}</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
