'use client';
import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { FaCheckCircle } from 'react-icons/fa';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    designation: '',
    organisation: '',
    engagement: '',
    // exploreDiscuss: '',
    hearAbout: '',    
    // hearFrom: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAnimationVisible, setIsAnimationVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateForm({ ...formData, [name]: value });
  };

  const validateForm = (data) => {
    let errors = {};
    let isValid = true;

    if (!data.fullName.trim()) {
      errors.fullName = 'Full Name is required';
      isValid = false;
    }

    if (!data.designation.trim()) {
      errors.designation = 'Designation is required';
      isValid = false;
    }

    if (!data.organisation.trim()) {
      errors.organisation = 'Organisation is required';
      isValid = false;
    }

    if (!data.engagement) {
      errors.engagement = 'Engagement is required';
      isValid = false;
    }

    if (!data.hearAbout.trim()) {
      errors.hearAbout = 'Please specify how you heard about us';
      isValid = false;
    }



    setFormErrors(errors);
    setIsFormValid(isValid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateForm(formData);

    if (!isFormValid) return;

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const response = await axios.post(
        'https://docs.catalysts.global/wp-json/contact-form-7/v1/contact-forms/7/feedback',
        formDataToSend,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      if (response.status === 200) {
        setIsSubmitted(true);
      } else {
        setFormErrors({ submit: 'Failed to submit form. Please try again.' });
      }
    } catch (err) {
      setFormErrors({ submit: 'An error occurred. Please try again.' });
    }
  };

  return (
    <>
      <div className="flex items-center justify-center py-10">
        <div className="w-auto lg:max-w-3xl p-8 bg-white shadow-lg rounded-lg border-2 border-gray-300">
          {!isSubmitted && (
            <>
              <div className="flex justify-center">
                <Image width={300} height={100} src="/logo_dark.svg" alt="Logo" />
              </div>
              <p className="text-center text-[#622F88] my-4 font-bold iec-title">Expression of Interest Form</p>
            </>
          )}

          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center">
              <div className={`check-circle ${isAnimationVisible ? 'animate' : ''}`}>
                <FaCheckCircle className="text-green" />
              </div>
              <p className="text-green-500 text-center text-3xl font-bold mt-5">Form submitted successfully!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${formErrors.fullName ? 'border-red' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#622F88]`}
                  placeholder="Full Name"
                  required
                />
                {formErrors.fullName && <p className="text-red text-sm p-1 mt-1">{formErrors.fullName}</p>}
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${formErrors.designation ? 'border-red' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#622F88]`}
                  placeholder="Designation"
                  required
                />
                {formErrors.designation && <p className="text-red text-sm p-1 mt-1">{formErrors.designation}</p>}
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  name="organisation"
                  value={formData.organisation}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${formErrors.organisation ? 'border-red' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#622F88]`}
                  placeholder="Organisation/Professional Affiliation"
                  required
                />
                {formErrors.organisation && <p className="text-red text-sm p-1 mt-1">{formErrors.organisation}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-[#232A35] text-sm font-bold mb-2 px-2" htmlFor="engagement">
                  How would you like to engage with the Catalyst Foundation IEC? Please select all options that apply.
                </label>
                <select
  name="engagement"
  value={formData.engagement}
  onChange={handleChange}
  className={`w-full px-3 text-gray-700 py-2 border ${formErrors.engagement ? 'border-red' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#622F88]`}
  required
>
  <option value="">Select Option</option>
  <option value="Keen to know more about the IEC and its work, processes etc.">
    Keen to know more about the IEC and its work, processes etc.
  </option>
  <option value="Interested in applying to the IEC regarding a research study (Must be of a non-clinical/non-biomedical nature and involve only human participants)">
    Interested in applying to the IEC regarding a research study (Must be of a non-clinical/non-biomedical nature and involve only human participants)
  </option>
  <option value="Other">Other</option>
</select>

                {formErrors.engagement && <p className="text-red text-sm p-1 mt-1">{formErrors.engagement}</p>}
              </div>
              {formData.engagement === 'Other' && (
                <div className="mb-4">
                  <input
                    type="text"
                    name="exploreDiscuss"
                    value={formData.exploreDiscuss || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#622F88]"
                    placeholder="WOULD LIKE TO EXPLORE / DISCUSS WITH US"
                  />
                </div>
              )}


              <div className="mb-4">
                <label className="block text-[#232A35] text-sm font-bold mb-2 px-2" htmlFor="hearAbout">
                  How do you hear about the Catalyst Foundation IEC?
                </label>
               
<select
  name="hearAbout"
  value={formData.hearAbout}
  onChange={handleChange}
  className={`w-full px-3 py-2 text-gray-700 border ${formErrors.hearAbout ? 'border-red' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#622F88]`}
  required
>
  <option value="">Select Option</option>
  <option value="LinkedIn">LinkedIn</option>
  <option value="Facebook">Facebook</option>
  <option value="Twitter">X</option>
  <option value="Google Search">Google Search</option>
  <option value="Referral">Referral</option>
</select>
                {formErrors.hearAbout && <p className="text-red text-sm p-1 mt-1">{formErrors.hearAbout}</p>}
              </div>

              {formData.hearAbout === 'Referral' && (
                <div className="mb-4">
                  <input
                    type="text"
                    name="hearFrom"
                    value={formData.hearFrom || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#622F88]"
                    placeholder="Who did you hear from?"
                  />
                </div>
              )}

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="px-10 py-2 bg-[#622F88] text-white font-bold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#622F88]"
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <style jsx>{`
        .check-circle {
          width: 50px;
          height: 50px;
          border: 5px solid #22c55e;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .check-circle.animate {
          animation: pop 0.3s ease-in-out forwards;
        }
        @keyframes pop {
          0% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
}
