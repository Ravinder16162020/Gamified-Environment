import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './EditProfilepopup.module.css';

const EditProfilepopup = ({ onClose }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    fullName: 'Alex Rivers',
    email: 'alex.rivers@ecosprint.io',
    bio: 'Passionate about urban gardening and renewable energy solutions. Always sprinting for a greener future. 🌱⚡'
  });
  
  const [bioCharCount, setBioCharCount] = useState(104);
  const maxBioLength = 150;
  
  const [selectedInterests, setSelectedInterests] = useState([
    'Climate', 'Energy', 'Waste'
  ]);
  
  const availableInterests = [
    'Climate', 'Energy', 'Water', 'Waste', 'Solar', 'EVs', 'Recycling', 'Policy'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'bio') {
      setBioCharCount(value.length);
    }
  };

  const handleInterestToggle = (interest) => {
    setSelectedInterests(prev => {
      if (prev.includes(interest)) {
        return prev.filter(i => i !== interest);
      }
      return [...prev, interest];
    });
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Uploading file:', file.name);
      // Handle file upload logic here
    }
  };

  const handleSave = () => {
    // Save changes and close popup
    console.log('Saving profile:', formData, selectedInterests);
    onClose();
    navigate('/profile');
  };

  const handleCancel = () => {
    // Close popup and go back to profile
    onClose();
    navigate('/profile');
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className={styles.modalOverlay}>
      {/* Modal Card */}
      <div className={styles.modalCard}>
        {/* Close Button */}
        <button onClick={handleCancel} className={styles.closeButton}>
          <svg className={styles.closeIcon} viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.titleWrapper}>
            <svg className={styles.editIcon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>
            <h2 className={styles.title}>Edit Profile</h2>
          </div>
          <p className={styles.subtitle}>Update your personal information</p>
        </div>

        {/* Scrollable Content */}
        <div className={styles.content}>
          {/* Avatar Upload Section */}
          <div className={styles.avatarSection}>
            <div className={styles.avatarWrapper} onClick={handleUploadClick}>
              <div className={styles.avatar}>
                {getInitials(formData.fullName)}
              </div>
              {/* Overlay Camera Icon */}
              <div className={styles.avatarOverlay}>
                <svg className={styles.cameraIcon} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9.4 10.5l4.77-8.26C13.47 2.09 12.75 2 12 2c-2.4 0-4.6.85-6.32 2.25l3.66 6.35.06-.1zM21.54 9c-.92-2.92-3.15-5.26-6-6.34L11.88 9h9.66zm.28 2h-7.49l.29.5 4.17 7.23c.91-1.32 1.44-2.92 1.44-4.64 0-.52-.05-1.02-.14-1.51-.03-.19-.06-.38-.1-.57-.05-.23-.11-.46-.19-.68zM5.79 13.11L5.3 12l-.09-.19-.03-.06c-.02-.05-.05-.1-.06-.16l-.02-.06c-.02-.06-.04-.12-.05-.19l-.02-.09-.02-.11c-.01-.04-.02-.07-.02-.11V11.8c0-.05.01-.09.02-.14 0-.03.01-.06.02-.09.01-.06.03-.12.05-.18l.03-.08.06-.15.04-.08 3.73-6.44c-.58-.53-1.23-.97-1.94-1.32-.62-.3-1.28-.53-1.97-.69L2.24 9.17c-.57 1.25-.89 2.63-.89 4.09 0 .52.05 1.02.14 1.51.04.22.09.44.15.65.05.22.12.44.19.65.08.23.17.45.27.66l.11.22 4.5-7.79c.09.05.18.09.26.15l.07.05c.09.06.18.12.26.19.06.05.12.1.18.16l-.55.95zm7.63 8.53l-.62-1.08-.81-1.4-1.94-3.37H5.79l4.5 7.79c.58.53 1.23.97 1.94 1.32.62.3 1.28.53 1.97.69l.71-1.23c-.13-.08-.26-.17-.38-.27l-.45-.45zm5.15-8.92l-.03.06-.06.16-.02.06c-.02.05-.05.1-.06.16l-.02.06c-.02.06-.04.12-.05.19l-.02.09-.02.11c-.01.04-.02.07-.02.11v.09c0 .05-.01.09-.02.14 0 .03-.01.06-.02.09-.01.06-.03.12-.05.18l-.03.08-.06.15-.04.08-3.73 6.44c.58.53 1.23.97 1.94 1.32.62.3 1.28.53 1.97.69l2.35-4.07c.57-1.25.89-2.63.89-4.09 0-.52-.05-1.02-.14-1.51-.04-.22-.09-.44-.15-.65-.05-.22-.12-.44-.19-.65-.08-.23-.17-.45-.27-.66l-.11-.22-4.5 7.79c-.09-.05-.18-.09-.26-.15l-.07-.05c-.09-.06-.18-.12-.26-.19-.06-.05-.12-.1-.18-.16l.55-.95zM12 17.27l-.46.8.45.45.46-.46-.45-.79z"/>
                </svg>
              </div>
            </div>
            <button onClick={handleUploadClick} className={styles.uploadBtn}>
              Upload Photo
            </button>
            <p className={styles.uploadHint}>Max 2MB JPG PNG</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png"
              className={styles.fileInput}
              onChange={handleFileChange}
            />
          </div>

          {/* Form Fields */}
          <div className={styles.formFields}>
            {/* Full Name */}
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                className={styles.textInput}
              />
            </div>

            {/* Email */}
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className={styles.textInput}
              />
            </div>

            {/* Bio */}
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Bio</label>
              <div className={styles.textareaWrapper}>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about your sustainability journey..."
                  className={styles.textarea}
                  maxLength={maxBioLength}
                />
                <span className={styles.charCount}>
                  {bioCharCount}/{maxBioLength}
                </span>
              </div>
            </div>

            {/* Interests (Chips) */}
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Interests</label>
              <div className={styles.interestsWrapper}>
                {availableInterests.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => handleInterestToggle(interest)}
                    className={`${styles.interestChip} ${
                      selectedInterests.includes(interest) ? styles.interestChipActive : ''
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Button Actions */}
        <div className={styles.buttonGroup}>
          <button onClick={handleCancel} className={styles.cancelBtn}>
            Cancel
          </button>
          <button onClick={handleSave} className={styles.saveBtn}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfilepopup;
