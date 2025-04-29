import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_DEPARTMENTS } from '../graphql/queries';
import DepartmentItem from './DepartmentItem';
import CreateDepartmentForm from './CreateDepartmentForm';
import Pagination from './Pagination';
import { DepartmentsResponse } from '../types';

const DepartmentList: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  // Using a constant instead of state since we're not changing it
  const limit = 5;
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
  
  const { loading, error, data, refetch } = useQuery<
    { getDepartments: DepartmentsResponse },
    { page: number; limit: number }
  >(GET_DEPARTMENTS, {
    variables: { page, limit },
    fetchPolicy: 'network-only',
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRefresh = () => {
    refetch();
  };

  if (loading) return <p className="py-4 text-center">Loading departments...</p>;
  if (error) return <p className="py-4 text-center text-red-500">Error: {error.message}</p>;

  const { departments, total } = data?.getDepartments || { departments: [], total: 0 };
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium text-gray-900">Departments</h2>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {showCreateForm ? 'Cancel' : 'Add Department'}
        </button>
      </div>

      {showCreateForm && (
        <div className="mb-6 p-4 bg-gray-50 rounded-md">
          <CreateDepartmentForm onSuccess={() => {
            setShowCreateForm(false);
            handleRefresh();
          }} />
        </div>
      )}

      {departments.length === 0 ? (
        <p className="py-4 text-center text-gray-500">No departments found. Create one to get started.</p>
      ) : (
        <>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                          ID
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Department Name
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Sub-Departments
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {departments.map((department) => (
                        <DepartmentItem 
                          key={department.id} 
                          department={department} 
                          onDelete={handleRefresh}
                          onUpdate={handleRefresh}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <Pagination 
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default DepartmentList;