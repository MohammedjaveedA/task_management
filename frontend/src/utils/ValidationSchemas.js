import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export const registerSchema = yup.object({
  firstName: yup
    .string()
    .required('First name is required')
    .max(50, 'First name cannot exceed 50 characters'),
  lastName: yup
    .string()
    .required('Last name is required')
    .max(50, 'Last name cannot exceed 50 characters'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
});

export const taskSchema = yup.object({
  title: yup
    .string()
    .required('Title is required')
    .max(200, 'Title cannot exceed 200 characters'),
  description: yup
    .string()
    .max(1000, 'Description cannot exceed 1000 characters'),
  priority: yup
    .string()
    .oneOf(['low', 'medium', 'high'], 'Invalid priority')
    .default('medium'),
  status: yup
    .string()
    .oneOf(['pending', 'in-progress', 'completed'], 'Invalid status')
    .default('pending'),
  dueDate: yup
    .date()
    .nullable(),
  tags: yup
    .array()
    .of(yup.string())
    .default([]),
});