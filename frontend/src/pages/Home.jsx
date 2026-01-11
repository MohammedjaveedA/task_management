import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Zap, Shield, Users, TrendingUp, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Task Management',
      description: 'Create, organize, and prioritize tasks with due dates and tags.',
      color: 'text-green-600 bg-green-100',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure Authentication',
      description: 'JWT-based auth with protected routes and secure API calls.',
      color: 'text-blue-600 bg-blue-100',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Productivity Analytics',
      description: 'Track progress with visual statistics and completion rates.',
      color: 'text-purple-600 bg-purple-100',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'User Profiles',
      description: 'Personalized profiles with activity history and preferences.',
      color: 'text-orange-600 bg-orange-100',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Real-time Updates',
      description: 'Instant task updates with smooth UI transitions.',
      color: 'text-yellow-600 bg-yellow-100',
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'Data Privacy',
      description: 'Your data is encrypted and never shared with third parties.',
      color: 'text-red-600 bg-red-100',
    },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
          Manage Tasks{' '}
          <span className="text-primary-600">Efficiently</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          A modern, full-stack task management application with authentication, 
          real-time dashboard, and beautiful UI built with React & Node.js.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="btn-primary px-8 py-3 text-lg font-semibold"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="btn-primary px-8 py-3 text-lg font-semibold"
              >
                Start Free
              </Link>
              <Link
                to="/login"
                className="btn-secondary px-8 py-3 text-lg font-semibold"
              >
                Live Demo
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-12">Everything You Need</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="card hover:shadow-lg transition-shadow duration-300">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${feature.color}`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-12 bg-gray-50 rounded-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Modern Tech Stack</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Built with cutting-edge technologies for optimal performance and developer experience.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {['React', 'Node.js', 'MongoDB', 'TailwindCSS', 'Express', 'JWT', 'Vite', 'Axios'].map((tech) => (
            <div key={tech} className="bg-white rounded-xl p-4 text-center shadow-sm">
              <div className="font-semibold text-gray-800">{tech}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-12">
        <h2 className="text-3xl font-bold mb-6">Ready to Boost Your Productivity?</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Join thousands of users who have transformed their workflow with TaskFlow.
        </p>
        <Link
          to={isAuthenticated ? "/dashboard" : "/register"}
          className="btn-primary px-10 py-3 text-lg font-semibold inline-block"
        >
          {isAuthenticated ? 'Go to Dashboard' : 'Get Started For Free'}
        </Link>
      </section>
    </div>
  );
};

export default Home;