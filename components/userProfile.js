import React from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { signOut } from '../utils/auth';

export default function UserProfile() {
  const { user } = useAuth();
  return (
    <div><h1>{user.displayName}</h1>
      <Image src={user.photoURL} alt="user" width="100px" height="100px" />
      <h3><b>Email: </b> {user.email}</h3>
      <h4><b>Last Log In:</b> {user.metadata.lastSignInTime}</h4>
      <Button type="button" size="lg" className="copy-btn" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}

UserProfile.propTypes = {
  userObj: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string,
    lastSignInTime: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
};
