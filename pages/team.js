/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { Button } from 'react-bootstrap';
import { getMembers } from '../api/memberData';
import { useAuth } from '../utils/context/authContext';
import MemberCard from '../components/memberCard';
import SearchBar from '../components/searchBar';

export default function Team() {
  const [members, setMembers] = useState([]);

  const { user } = useAuth();

  const getAllTheMembers = () => {
    getMembers(user.uid).then(setMembers);
  };

  useEffect(() => {
    getAllTheMembers();
  }, []);

  const filterResult = (query) => {
    if (!query) {
      getAllTheMembers();
    } else {
      const filter = members.filter((member) => member.name.toLowerCase().includes(query) || member.role.toLowerCase().includes(query));
      setMembers(filter);
    }
  };

  return (
    <div>
      <SearchBar onKeyUp={(query) => filterResult(query)} />
      <div className="member-card">
        {members.map((member) => (
          <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={getAllTheMembers} />
        ))}
      </div>
    </div>
  );
}
