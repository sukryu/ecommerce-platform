import React from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiBox, FiStar, FiBarChart2, FiUserCheck, FiBriefcase, FiImage } from 'react-icons/fi';

const AdminDashboardPage: React.FC = () => {
  const adminFeatures = [
    { name: 'User Management', icon: FiUsers, link: '/admin/users' },
    { name: 'Product Management', icon: FiBox, link: '/admin/products' },
    { name: 'Review Management', icon: FiStar, link: '/admin/reviews' },
    { name: 'Rating Management', icon: FiBarChart2, link: '/admin/ratings' },
    { name: 'Role Management', icon: FiUserCheck, link: '/admin/roles' },
    { name: 'Company Management', icon: FiBriefcase, link: '/admin/companies' },
    { name: 'Banner Management', icon: FiImage, link: '/admin/banners' },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminFeatures.map((feature, index) => (
          <Link 
            key={index} 
            to={feature.link}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center"
          >
            <feature.icon className="text-3xl text-blue-500 mr-4" />
            <span className="text-xl font-semibold">{feature.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardPage;