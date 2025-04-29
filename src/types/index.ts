// User related interfaces
export interface User {
    id: number;
    username: string;
  }
  
  export interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    user: User | null;
    login: (token: string, user: User) => void;
    logout: () => void;
  }
  
  export interface LoginInput {
    username: string;
    password: string;
  }
  
  export interface LoginResponse {
    access_token: string;
    user: User;
  }
  
  // Department related interfaces
  export interface SubDepartment {
    id?: number;
    name: string;
  }
  
  export interface Department {
    id: number;
    name: string;
    subDepartments: SubDepartment[];
  }
  
  export interface CreateDepartmentInput {
    name: string;
    subDepartments?: SubDepartment[] | null;
  }
  
  export interface UpdateDepartmentInput {
    id: number;
    name: string;
  }
  
  export interface DepartmentsResponse {
    departments: Department[];
    total: number;
  }
  
  // Component props
  export interface LayoutProps {
    children: React.ReactNode;
    title?: string;
  }
  
  export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }
  
  export interface DepartmentItemProps {
    department: Department;
    onDelete: () => void;
    onUpdate: () => void;
  }
  
  export interface CreateDepartmentFormProps {
    onSuccess: () => void;
  }