import React, { useState, FormEvent } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_DEPARTMENT } from '../graphql/mutations';
import { CreateDepartmentFormProps, CreateDepartmentInput, Department, SubDepartment } from '../types';

const CreateDepartmentForm: React.FC<CreateDepartmentFormProps> = ({ onSuccess }) => {
  const [name, setName] = useState<string>('');
  const [hasSubDepartments, setHasSubDepartments] = useState<boolean>(false);
  const [subDepartments, setSubDepartments] = useState<SubDepartment[]>([{ name: '' }]);
  const [error, setError] = useState<string>('');
  
  const [createDepartment, { loading }] = useMutation<
    { createDepartment: Department },
    { input: CreateDepartmentInput }
  >(CREATE_DEPARTMENT);

  const addSubDepartment = () => {
    setSubDepartments([...subDepartments, { name: '' }]);
  };

  const updateSubDepartment = (index: number, value: string) => {
    const updatedSubDepts = [...subDepartments];
    updatedSubDepts[index].name = value;
    setSubDepartments(updatedSubDepts);
  };

  const removeSubDepartment = (index: number) => {
    const updatedSubDepts = [...subDepartments];
    updatedSubDepts.splice(index, 1);
    setSubDepartments(updatedSubDepts);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (name.length < 2) {
      setError('Department name must be at least 2 characters long');
      return;
    }

    if (hasSubDepartments) {
      // Validate sub-departments
      for (const subDept of subDepartments) {
        if (subDept.name.length < 2) {
          setError('All sub-department names must be at least 2 characters long');
          return;
        }
      }

      // Filter out any empty sub-departments
      const validSubDepts = subDepartments.filter(dept => dept.name.trim() !== '');
      
      if (validSubDepts.length === 0) {
        setError('Please add at least one valid sub-department or disable sub-departments');
        return;
      }
    }

    try {
      await createDepartment({
        variables: {
          input: {
            name,
            subDepartments: hasSubDepartments ? subDepartments : null,
          },
        },
      });
      
      // Reset form
      setName('');
      setHasSubDepartments(false);
      setSubDepartments([{ name: '' }]);
      
      if (onSuccess) onSuccess();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">Create New Department</h3>
          <p className="mt-1 text-sm text-gray-500">
            Fill in the details to create a new department.
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}

        <div>
          <label htmlFor="department-name" className="block text-sm font-medium leading-6 text-gray-900">
            Department Name
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="department-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="e.g., Finance"
              required
              minLength={2}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center">
            <input
              id="has-sub-departments"
              type="checkbox"
              checked={hasSubDepartments}
              onChange={(e) => setHasSubDepartments(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label htmlFor="has-sub-departments" className="ml-2 block text-sm font-medium leading-6 text-gray-900">
              Include Sub-Departments
            </label>
          </div>
        </div>

        {hasSubDepartments && (
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Sub-Departments
            </label>
            <div className="mt-2 space-y-2">
              {subDepartments.map((subDept, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    type="text"
                    value={subDept.name}
                    onChange={(e) => updateSubDepartment(index, e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Sub-department name"
                    required
                    minLength={2}
                  />
                  <button
                    type="button"
                    onClick={() => removeSubDepartment(index)}
                    className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-red-600 shadow-sm hover:bg-gray-50"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addSubDepartment}
                className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-indigo-600 shadow-sm ring-1 ring-inset ring-indigo-600 hover:bg-gray-50"
              >
                Add Sub-Department
              </button>
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => onSuccess()}
            className="rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="ml-3 inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400"
          >
            {loading ? 'Creating...' : 'Create Department'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateDepartmentForm;