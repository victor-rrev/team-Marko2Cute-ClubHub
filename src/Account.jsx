import { useState } from 'react'
import AccountProfile from './AccountProfile'

function Account() {
  const [displayName, setDisplayName] = useState('Your Name')
  const [description, setDescription] = useState('Add a short summary about yourself here.')
  const [isEditing, setIsEditing] = useState(true)
  const [saveMessage, setSaveMessage] = useState('')

  const userClubs = ['Robotics Club', 'Art Society', 'Eco Action']
  const upcomingEvents = [
    'Robotics Workshop — Apr 30',
    'Art Show — May 5',
    'Campus Cleanup — May 10',
    'Science Fair — May 15',
    'Spring Concert — May 18',
    'Debate Championship — May 22',
    'Art Gallery Opening — May 25',
    'End of Year Picnic — Jun 1'
  ]

  const handleSave = () => {
    setIsEditing(false)
    setSaveMessage('Profile draft is ready to persist to Firestore.')
    // TODO: connect this handler to Firestore save logic once the user profile service is available.
  }

  return (
    <div className="account-page">
      <div className="account-column">
        <div className="account-box profile-box">
          <AccountProfile variant="large" />

          <div className="profile-details">
            <div className="profile-details-header">
              <div>
                <h2>{displayName || 'Unnamed Student'}</h2>
                <p className="profile-subtitle">Update your name and bio below.</p>
              </div>
              <button
                type="button"
                className="edit-button"
                onClick={() => setIsEditing((value) => !value)}
              >
                {isEditing ? 'Preview' : 'Edit'}
              </button>
            </div>

            <label className="profile-field">
              <span className="profile-label">Full name</span>
              <input
                className="profile-input"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your name"
                readOnly={!isEditing}
              />
            </label>

            <label className="profile-field">
              <span className="profile-label">Short description</span>
              <textarea
                className="profile-textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                placeholder="Tell people about yourself"
                readOnly={!isEditing}
              />
            </label>

            <div className="button-row">
              <button type="button" className="save-button" onClick={handleSave}>
                Save profile
              </button>
              {saveMessage && <span className="save-message">{saveMessage}</span>}
            </div>
          </div>
        </div>

        <div className="account-box">
          <h3>My Clubs</h3>
          <ul className="account-list">
            {userClubs.map((club) => (
              <li key={club}>{club}</li>
            ))}
          </ul>
        </div>

        <div className="account-box">
          <h3>My Upcoming Events</h3>
          <ul className="account-list">
            {upcomingEvents.map((eventItem) => (
              <li key={eventItem}>{eventItem}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Account;
