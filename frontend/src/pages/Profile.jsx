import React, { useState } from 'react';
import { User, Mail, Calendar } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import { format } from 'date-fns';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    const result = await updateProfile(data);
    setIsLoading(false);
    
    if (result.success) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 text-primary-600 rounded-full mb-4">
            <User size={40} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600 mt-2">Manage your account information</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                label="First Name"
                type="text"
                icon={<User size={20} className="text-gray-400" />}
                {...register('firstName', { required: 'First name is required' })}
                error={errors.firstName?.message}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Input
                label="Last Name"
                type="text"
                icon={<User size={20} className="text-gray-400" />}
                {...register('lastName', { required: 'Last name is required' })}
                error={errors.lastName?.message}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div>
            <Input
              label="Email Address"
              type="email"
              icon={<Mail size={20} className="text-gray-400" />}
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Please enter a valid email'
                }
              })}
              error={errors.email?.message}
              disabled={!isEditing}
            />
          </div>

          {/* Read-only information */}
         <div className="space-y-3 pt-6 border-t">
  <div className="flex items-center text-gray-600">
    <Calendar size={18} className="mr-3 text-gray-400" />
    <div>
      <span className="text-sm">Member since:</span>
      <p className="font-medium">
        {user.createdAt ? format(new Date(user.createdAt), 'MMMM dd, yyyy') : 'N/A'}
      </p>
    </div>
  </div>
  
  <div className="flex items-center text-gray-600">
    <Calendar size={18} className="mr-3 text-gray-400" />
    <div>
      <span className="text-sm">Last updated:</span>
      <p className="font-medium">
        {user.updatedAt ? format(new Date(user.updatedAt), 'MMMM dd, yyyy') : 'N/A'}
      </p>
    </div>
  </div>
</div>

          <div className="flex justify-end space-x-3 pt-6 border-t">
            {isEditing ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  loading={isLoading}
                >
                  Save Changes
                </Button>
              </>
            ) : (
              <Button
                type="button"
                variant="primary"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;