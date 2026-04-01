import React, { useState } from 'react';
import styles from './EditProfilepopup.module.css';

// SVG Icons
const PencilIcon = () => (
  <svg className={styles.headerIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
  </svg>
);

const CloseIcon = () => (
  <svg className={styles.closeIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 6 6 18M6 6l12 12"/>
  </svg>
);

const CameraIcon = () => (
  <svg className={styles.cameraIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
);

const EditProfilepopup = ({ onClose, onSave }) => {
  const [fullName, setFullName] = useState('Alex Rivera');
  const [email, setEmail] = useState('alex.rivera@university.edu');
  const [bio, setBio] = useState('');
  const maxBioLength = 120;

  const handleSave = () => {
    if (onSave) {
      onSave({ fullName, email, bio });
    }
    onClose();
  };

  const handleUploadPhoto = () => {
    // Trigger file upload
    console.log('Opening file selector...');
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <button className={styles.closeButton} onClick={onClose}>
          <CloseIcon />
        </button>
        <div className={styles.header}>
          <PencilIcon />
          <h2 className={styles.title}>Edit Profile</h2>
        </div>
        <p className={styles.subtitle}>Update your personal information and profile picture.</p>
        <div className={styles.volumeBar}></div>

        {/* Avatar Section */}
        <div className={styles.avatarSection}>
          <div className={styles.avatarContainer} onClick={handleUploadPhoto}>
            <span className={styles.avatarText}>AR</span>
            <div className={styles.avatarOverlay}>
              <CameraIcon />
            </div>
          </div>
          <button className={styles.uploadButton} onClick={handleUploadPhoto}>
            Upload Photo
          </button>
          <p className={styles.uploadHint}>Max 2MB JPG or PNG</p>
        </div>

        {/* Form Fields */}
        <div className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Full Name</label>
            <input
              type="text"
              className={styles.input}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email Address</label>
            <input
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={`${styles.formGroup} ${styles.bioGroup}`}>
            <label className={styles.label}>Bio</label>
            <textarea
              className={styles.textarea}
              placeholder="Tell us about your coding journey..."
              value={bio}
              onChange={(e) => setBio(e.target.value.slice(0, maxBioLength))}
              rows={4}
            />
            <span className={styles.charCount}>{bio.length}/{maxBioLength}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.saveButton} onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfilepopup;
