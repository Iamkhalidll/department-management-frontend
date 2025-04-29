import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import DepartmentList from '../components/DepartmentList';
import { NextPage } from 'next';

const Dashboard: NextPage = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout title="Dashboard">
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Department Management</h1>
        <DepartmentList />
      </div>
    </Layout>
  );
};

export default Dashboard;