import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_DEPARTMENT, DELETE_DEPARTMENT } from '../graphql/mutations';
import { DepartmentItemProps, Department, UpdateDepartmentInput } from '../types';

const DepartmentItem: React.FC<DepartmentItemProps> = ({ department, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>(department.name);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  
  const [updateDepartment, { loading: updateLoading }] = useMutation<
    { updateDepartment: Department },
    { input: UpdateDepartmentInput }
  >(UPDATE_DEPARTMENT);
  
  const [deleteDepartment, { loading: deleteLoading }] = useMutation<
    { deleteDepartment: boolean },
    { id: number }
  >(DELETE_DEPARTMENT);

  const handleUpdate = async () => {
    try {
      await updateDepartment({
        variables: {
          input: {
            id: department.id,
            name,
          },
        },
      });
      setIsEditing(false);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Error updating department:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this department? This will also delete all sub-departments.')) {
      try {
        await deleteDepartment({
          variables: {
            id: department.id,
          },
        });
        if (onDelete) onDelete();
      } catch (error) {
        console.error('Error deleting department:', error);
      }
    }
  };

  return (
    <tr>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
        {department.id}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {isEditing ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        ) : (
          department.name
        )}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <div className="flex items-center">
          <span className="mr-2">{department.subDepartments?.length || 0} sub-departments</span>
          {department.subDepartments?.length > 0 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-indigo-600 hover:text-indigo-900"
            >
              {isExpanded ? 'Hide' : 'Show'}
            </button>
          )}
        </div>
        {isExpanded && department.subDepartments?.length > 0 && (
          <ul className="mt-2 pl-4 list-disc">
            {department.subDepartments.map((subDept) => (
              <li key={subDept.id}>{subDept.name}</li>
            ))}
          </ul>
        )}
      </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
        {isEditing ? (
          <div className="flex space-x-2 justify-end">
            <button
              onClick={handleUpdate}
              disabled={updateLoading}
              className="text-indigo-600 hover:text-indigo-900 disabled:text-gray-400"
            >
              {updateLoading ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setName(department.name);
              }}
              className="text-gray-600 hover:text-gray-900"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex space-x-3 justify-end">
            <button
              onClick={() => setIsEditing(true)}
              className="text-indigo-600 hover:text-indigo-900"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={deleteLoading}
              className="text-red-600 hover:text-red-900 disabled:text-gray-400"
            >
              {deleteLoading ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default DepartmentItem;