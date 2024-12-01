import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { submitToGoogleSheets } from '../utils/googleSheets';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    isClient: true,
    isConsultant: false,
    interests: {
      business: false,
      technology: false,
      healthcare: false,
      education: false,
      marketing: false,
      lifestyle: false,
      other: false
    },
    otherInterest: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedInterests = Object.entries(formData.interests)
      .filter(([key, value]) => value)
      .map(([key]) => key === 'other' ? formData.otherInterest : key)
      .join(', ');

    // Submit to Google Sheets
    await submitToGoogleSheets({
      name: formData.name,
      email: formData.email,
      roles: `${formData.isClient ? 'Client' : ''}${formData.isConsultant ? ' Consultant' : ''}`,
      interests: selectedInterests,
    });

    // Create email subject and body with proper line breaks
    const subject = encodeURIComponent('NexProLink Early Access Registration');
    const bodyText = `Dear NexProLink Team,

I would like to join the NexProLink early access program.

My Details:
- Name: ${formData.name}
- Email: ${formData.email}
- Role: ${formData.isClient ? 'Client' : ''}${formData.isConsultant ? ' Consultant' : ''}
- Areas of Interest: ${selectedInterests}

I'm excited to be part of the platform's early access program and looking forward to your response.

Best regards,
${formData.name}`;

    const body = encodeURIComponent(bodyText);

    // Create mailto link
    const mailtoLink = `mailto:support@nexprolink.com?subject=${subject}&body=${body}`;

    // Try multiple methods to open email client
    const openEmail = () => {
      // Method 1: Using window.location
      try {
        window.location.href = mailtoLink;
      } catch (e) {
        console.log('Method 1 failed, trying method 2');
      }

      // Method 2: Using window.open
      setTimeout(() => {
        try {
          const opened = window.open(mailtoLink, '_blank');
          if (!opened) {
            console.log('Method 2 failed, trying method 3');
            // Method 3: Create and click a temporary link
            const link = document.createElement('a');
            link.href = mailtoLink;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        } catch (e) {
          console.error('Failed to open email client:', e);
          // Method 4: Final fallback
          window.location.assign(mailtoLink);
        }
      }, 100);
    };

    // Execute email opening
    openEmail();

    // Close modal after a delay
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 pb-4 pt-5 text-left shadow-2xl transition-all w-[95vw] sm:my-8 sm:w-full sm:max-w-lg sm:p-6 border border-gray-700">
                <div className="absolute right-0 top-0 pr-4 pt-4 sm:pr-6 sm:pt-6">
                  <button
                    type="button"
                    className="rounded-full p-1 text-gray-400 hover:text-gray-200 hover:bg-gray-700 transition-all duration-200"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <Dialog.Title as="h3" className="text-xl sm:text-2xl font-semibold leading-6 text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                      Join Early Access
                    </Dialog.Title>
                    <p className="text-sm text-gray-300 mb-6">
                      Get exclusive benefits as an early adopter. Quick sign-up below!
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Basic Info */}
                      <div className="grid grid-cols-1 gap-4">
                        <div className="group relative">
                          <input
                            type="email"
                            required
                            placeholder="Email"
                            className="w-full rounded-xl bg-gray-800/50 border border-gray-700 text-gray-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 placeholder-gray-500"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        </div>
                        <div className="group relative">
                          <input
                            type="text"
                            required
                            placeholder="Name"
                            className="w-full rounded-xl bg-gray-800/50 border border-gray-700 text-gray-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 placeholder-gray-500"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          />
                        </div>
                      </div>

                      {/* Role Selection */}
                      <div className="rounded-xl bg-gray-800/30 p-4 border border-gray-700">
                        <p className="text-sm font-medium text-gray-300 mb-3">I'm interested in joining as:</p>
                        <div className="space-y-3">
                          <label className="flex items-center group cursor-pointer">
                            <div className="relative">
                              <input
                                type="checkbox"
                                className="peer sr-only"
                                checked={formData.isClient}
                                onChange={(e) => setFormData({ ...formData, isClient: e.target.checked })}
                              />
                              <div className="w-5 h-5 border-2 border-gray-600 rounded-md peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-all duration-200"></div>
                              <div className="absolute inset-0 hidden peer-checked:block text-white">
                                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            </div>
                            <span className="ml-3 text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-200">Client (seeking consultation)</span>
                          </label>
                          <label className="flex items-center group cursor-pointer">
                            <div className="relative">
                              <input
                                type="checkbox"
                                className="peer sr-only"
                                checked={formData.isConsultant}
                                onChange={(e) => setFormData({ ...formData, isConsultant: e.target.checked })}
                              />
                              <div className="w-5 h-5 border-2 border-gray-600 rounded-md peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-all duration-200"></div>
                              <div className="absolute inset-0 hidden peer-checked:block text-white">
                                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            </div>
                            <span className="ml-3 text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-200">Consultant (providing expertise)</span>
                          </label>
                        </div>
                      </div>

                      {/* Interest Areas */}
                      <div className="rounded-xl bg-gray-800/30 p-3 sm:p-4 border border-gray-700">
                        <p className="text-sm font-medium text-gray-300 mb-3">Areas of Interest:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {Object.entries(formData.interests).map(([key, value]) => (
                            <label key={key} className="flex items-center group cursor-pointer">
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  className="peer sr-only"
                                  checked={value}
                                  onChange={(e) => setFormData({
                                    ...formData,
                                    interests: {
                                      ...formData.interests,
                                      [key]: e.target.checked
                                    }
                                  })}
                                />
                                <div className="w-5 h-5 border-2 border-gray-600 rounded-md peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-all duration-200"></div>
                                <div className="absolute inset-0 hidden peer-checked:block text-white">
                                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </div>
                              </div>
                              <span className="ml-3 text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-200 capitalize">{key}</span>
                            </label>
                          ))}
                        </div>

                        <AnimatePresence>
                          {formData.interests.other && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="mt-3"
                            >
                              <input
                                type="text"
                                placeholder="Specify your interest"
                                className="w-full rounded-xl bg-gray-800/50 border border-gray-700 text-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 placeholder-gray-500"
                                value={formData.otherInterest}
                                onChange={(e) => setFormData({ ...formData, otherInterest: e.target.value })}
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="mt-6 sm:flex sm:flex-row-reverse gap-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200"
                        >
                          Join Early Access
                        </motion.button>
                        <button
                          type="button"
                          className="mt-3 sm:mt-0 w-full sm:w-auto px-6 py-3 rounded-xl bg-gray-800 text-gray-300 font-medium border border-gray-700 hover:bg-gray-700 transition-all duration-200"
                          onClick={onClose}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
