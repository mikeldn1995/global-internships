'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDropzone } from 'react-dropzone';

const signupSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  address: z.string().min(10, 'Please provide a complete address'),
  university: z.string().min(2, 'Please enter your university name'),
  major: z.string().min(2, 'Please enter your major'),
  message: z.string().optional(),
});

type SignupFormData = z.infer<typeof signupSchema>;

interface SignupWizardProps {
  onSuccess: () => void;
}

export default function SignupWizard({ onSuccess }: SignupWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    trigger,
    watch,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setCvFile(acceptedFiles[0]);
      }
    },
  });

  const steps = [
    { number: 1, title: 'Personal Info', fields: ['firstName', 'lastName'] },
    { number: 2, title: 'Contact Details', fields: ['email', 'address'] },
    { number: 3, title: 'Education', fields: ['university', 'major'] },
    { number: 4, title: 'Additional Info', fields: [] },
  ];

  // Watch form values for progress tracking
  const formValues = watch();

  const validateStep = async (step: number): Promise<boolean> => {
    const stepData = steps[step - 1];
    if (!stepData || stepData.fields.length === 0) return true;
    
    const result = await trigger(stepData.fields as (keyof SignupFormData)[]);
    return result;
  };

  const nextStep = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      setError(null);
      // Focus first input of next step
      setTimeout(() => {
        const firstInput = document.querySelector(`[data-step="${currentStep + 1}"] input, [data-step="${currentStep + 1}"] textarea`) as HTMLElement;
        firstInput?.focus();
      }, 100);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setError(null);
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !(e.target instanceof HTMLTextAreaElement)) {
      e.preventDefault();
      if (currentStep < steps.length) {
        await nextStep();
      } else {
        handleSubmit(onSubmit)();
      }
    }
  };

  const onSubmit = async (data: SignupFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('firstName', data.firstName);
      formData.append('lastName', data.lastName);
      formData.append('email', data.email);
      formData.append('address', data.address);
      formData.append('university', data.university);
      formData.append('major', data.major);
      if (data.message) {
        formData.append('message', data.message);
      }
      if (cvFile) {
        formData.append('cv', cvFile);
      }

      const response = await fetch('/api/signup', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong');
      }

      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to submit. Please try again.');
      setIsSubmitting(false);
    }
  };

  // Check if step is complete
  const isStepComplete = (stepNumber: number): boolean => {
    const step = steps[stepNumber - 1];
    if (!step || step.fields.length === 0) return true;
    return step.fields.every(field => {
      const value = formValues[field as keyof SignupFormData];
      return value && typeof value === 'string' && value.length >= 2;
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Progress Steps - Improved Design */}
      <div className="mb-8 sm:mb-12" role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={steps.length} aria-label={`Step ${currentStep} of ${steps.length}`}>
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isActive = currentStep === step.number;
            const isComplete = currentStep > step.number || isStepComplete(step.number);
            const isAccessible = currentStep >= step.number;
            
            return (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1 relative">
                  <button
                    type="button"
                    onClick={() => {
                      if (isAccessible) {
                        setCurrentStep(step.number);
                      }
                    }}
                    disabled={!isAccessible}
                    aria-label={`Go to step ${step.number}: ${step.title}`}
                    className={`
                      w-12 h-12 rounded-full flex items-center justify-center font-semibold text-base
                      transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300
                      ${isActive 
                        ? 'bg-blue-600 text-white shadow-lg scale-110' 
                        : isComplete
                        ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }
                      ${isAccessible && !isActive ? 'hover:bg-gray-200 cursor-pointer' : ''}
                    `}
                  >
                    {isComplete && !isActive ? (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      step.number
                    )}
                  </button>
                  <span
                    className={`
                      mt-3 text-xs font-medium text-center
                      ${isActive ? 'text-blue-600' : isComplete ? 'text-gray-600' : 'text-gray-400'}
                      hidden sm:block
                    `}
                  >
                    {step.title}
                  </span>
                  {isActive && (
                    <span className="sr-only">Current step</span>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`
                      h-0.5 flex-1 mx-2 sm:mx-4 transition-colors duration-300
                      ${isComplete ? 'bg-blue-600' : 'bg-gray-200'}
                    `}
                    aria-hidden="true"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <form 
          onSubmit={handleSubmit(onSubmit)} 
          onKeyDown={handleKeyDown}
          aria-label="Internship application form"
          noValidate
        >
          {/* Step 1: Personal Info */}
          {currentStep === 1 && (
            <div data-step="1" className="p-6 sm:p-8 lg:p-10 space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  Personal Information
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  Let's start with your basic details
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label 
                    htmlFor="firstName" 
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    First Name <span className="text-red-500" aria-label="required">*</span>
                  </label>
                  <input
                    {...register('firstName')}
                    id="firstName"
                    type="text"
                    autoComplete="given-name"
                    aria-invalid={errors.firstName ? 'true' : 'false'}
                    aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                    className={`
                      w-full px-4 py-3 border rounded-lg
                      text-base transition-all duration-200
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                      ${errors.firstName 
                        ? 'border-red-300 bg-red-50' 
                        : touchedFields.firstName 
                        ? 'border-green-300 bg-green-50' 
                        : 'border-gray-300 bg-white hover:border-gray-400'
                      }
                    `}
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <p 
                      id="firstName-error" 
                      className="mt-2 text-sm text-red-600 flex items-center gap-1"
                      role="alert"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label 
                    htmlFor="lastName" 
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Last Name <span className="text-red-500" aria-label="required">*</span>
                  </label>
                  <input
                    {...register('lastName')}
                    id="lastName"
                    type="text"
                    autoComplete="family-name"
                    aria-invalid={errors.lastName ? 'true' : 'false'}
                    aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                    className={`
                      w-full px-4 py-3 border rounded-lg
                      text-base transition-all duration-200
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                      ${errors.lastName 
                        ? 'border-red-300 bg-red-50' 
                        : touchedFields.lastName 
                        ? 'border-green-300 bg-green-50' 
                        : 'border-gray-300 bg-white hover:border-gray-400'
                      }
                    `}
                    placeholder="Doe"
                  />
                  {errors.lastName && (
                    <p 
                      id="lastName-error" 
                      className="mt-2 text-sm text-red-600 flex items-center gap-1"
                      role="alert"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Contact Details */}
          {currentStep === 2 && (
            <div data-step="2" className="p-6 sm:p-8 lg:p-10 space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  Contact Details
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  How can we reach you?
                </p>
              </div>

              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email Address <span className="text-red-500" aria-label="required">*</span>
                </label>
                <input
                  {...register('email')}
                  id="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={`
                    w-full px-4 py-3 border rounded-lg
                    text-base transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    ${errors.email 
                      ? 'border-red-300 bg-red-50' 
                      : touchedFields.email 
                      ? 'border-green-300 bg-green-50' 
                      : 'border-gray-300 bg-white hover:border-gray-400'
                    }
                  `}
                  placeholder="john.doe@university.edu"
                />
                {errors.email && (
                  <p 
                    id="email-error" 
                    className="mt-2 text-sm text-red-600 flex items-center gap-1"
                    role="alert"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label 
                  htmlFor="address" 
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Address <span className="text-red-500" aria-label="required">*</span>
                </label>
                <textarea
                  {...register('address')}
                  id="address"
                  rows={4}
                  autoComplete="street-address"
                  aria-invalid={errors.address ? 'true' : 'false'}
                  aria-describedby={errors.address ? 'address-error' : undefined}
                  className={`
                    w-full px-4 py-3 border rounded-lg
                    text-base transition-all duration-200 resize-none
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    ${errors.address 
                      ? 'border-red-300 bg-red-50' 
                      : touchedFields.address 
                      ? 'border-green-300 bg-green-50' 
                      : 'border-gray-300 bg-white hover:border-gray-400'
                    }
                  `}
                  placeholder="Street address, City, State, Country, ZIP code"
                />
                {errors.address && (
                  <p 
                    id="address-error" 
                    className="mt-2 text-sm text-red-600 flex items-center gap-1"
                    role="alert"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.address.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Education */}
          {currentStep === 3 && (
            <div data-step="3" className="p-6 sm:p-8 lg:p-10 space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  Education
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  Tell us about your academic background
                </p>
              </div>

              <div>
                <label 
                  htmlFor="university" 
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  University <span className="text-red-500" aria-label="required">*</span>
                </label>
                <input
                  {...register('university')}
                  id="university"
                  type="text"
                  autoComplete="organization"
                  aria-invalid={errors.university ? 'true' : 'false'}
                  aria-describedby={errors.university ? 'university-error' : undefined}
                  className={`
                    w-full px-4 py-3 border rounded-lg
                    text-base transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    ${errors.university 
                      ? 'border-red-300 bg-red-50' 
                      : touchedFields.university 
                      ? 'border-green-300 bg-green-50' 
                      : 'border-gray-300 bg-white hover:border-gray-400'
                    }
                  `}
                  placeholder="University of Example"
                />
                {errors.university && (
                  <p 
                    id="university-error" 
                    className="mt-2 text-sm text-red-600 flex items-center gap-1"
                    role="alert"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.university.message}
                  </p>
                )}
              </div>

              <div>
                <label 
                  htmlFor="major" 
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Major <span className="text-red-500" aria-label="required">*</span>
                </label>
                <input
                  {...register('major')}
                  id="major"
                  type="text"
                  autoComplete="organization-title"
                  aria-invalid={errors.major ? 'true' : 'false'}
                  aria-describedby={errors.major ? 'major-error' : undefined}
                  className={`
                    w-full px-4 py-3 border rounded-lg
                    text-base transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    ${errors.major 
                      ? 'border-red-300 bg-red-50' 
                      : touchedFields.major 
                      ? 'border-green-300 bg-green-50' 
                      : 'border-gray-300 bg-white hover:border-gray-400'
                    }
                  `}
                  placeholder="Computer Science, Business, Engineering, etc."
                />
                {errors.major && (
                  <p 
                    id="major-error" 
                    className="mt-2 text-sm text-red-600 flex items-center gap-1"
                    role="alert"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.major.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Additional Info */}
          {currentStep === 4 && (
            <div data-step="4" className="p-6 sm:p-8 lg:p-10 space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  Additional Information
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  Optional details to help us match you better
                </p>
              </div>

              <div>
                <label 
                  htmlFor="cv-upload" 
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  CV/Resume <span className="text-gray-500 font-normal text-xs">(Optional)</span>
                </label>
                <div
                  {...getRootProps({
                    onClick: (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    },
                  })}
                  className={`
                    border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
                    transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500
                    ${isDragActive
                      ? 'border-blue-500 bg-blue-50'
                      : cvFile
                      ? 'border-green-300 bg-green-50'
                      : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
                    }
                  `}
                  role="button"
                  tabIndex={0}
                  aria-label="Upload CV or resume"
                >
                  <input 
                    {...getInputProps({
                      onClick: (e) => {
                        e.stopPropagation();
                      },
                    })} 
                    id="cv-upload"
                    aria-label="CV file input"
                  />
                  {cvFile ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-center">
                        <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-sm font-medium text-gray-700">{cvFile.name}</p>
                      <p className="text-xs text-gray-500">
                        {(cvFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCvFile(null);
                        }}
                        className="text-sm text-red-600 hover:text-red-700 font-medium"
                        aria-label="Remove CV file"
                      >
                        Remove file
                      </button>
                    </div>
                  ) : (
                    <div>
                      <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="text-base font-medium text-gray-700 mb-1">
                        {isDragActive ? 'Drop your CV here' : 'Drag & drop your CV here, or click to select'}
                      </p>
                      <p className="text-sm text-gray-500">PDF, DOC, or DOCX (max 5MB)</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label 
                  htmlFor="message" 
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Message to Internship Team <span className="text-gray-500 font-normal text-xs">(Optional)</span>
                </label>
                <textarea
                  {...register('message')}
                  id="message"
                  rows={6}
                  aria-describedby="message-help"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base transition-all duration-200 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white hover:border-gray-400"
                  placeholder="Tell us about your preferred internships, interests, or any questions you have..."
                />
                <p id="message-help" className="mt-2 text-xs text-gray-500">
                  This helps us match you with the most suitable opportunities
                </p>
              </div>
            </div>
          )}

          {error && (
            <div 
              className="mx-6 sm:mx-8 lg:mx-10 mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded"
              role="alert"
              aria-live="polite"
            >
              <div className="flex items-start">
                <svg className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="px-6 sm:px-8 lg:px-10 py-6 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row justify-between gap-4">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              aria-label="Go to previous step"
              className={`
                px-6 py-3 rounded-lg font-semibold text-base
                transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
                ${currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed focus:ring-gray-300'
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 focus:ring-gray-500'
                }
              `}
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </span>
            </button>
            
            {currentStep < steps.length ? (
              <button
                type="button"
                onClick={nextStep}
                aria-label={`Continue to step ${currentStep + 1}`}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold text-base hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <span className="flex items-center justify-center gap-2">
                  Next
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                aria-label="Submit application"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold text-base hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Submit Application
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
