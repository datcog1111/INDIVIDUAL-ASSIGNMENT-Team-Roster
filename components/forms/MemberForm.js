import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createMember, updateMember } from '../../api/memberData';
import { getTeams } from '../../api/teamData';

const initialState = {
  name: '',
  image: '',
  role: '',
};

function MemberForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [teams, setTeams] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getTeams(user.uid).then(setTeams);
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateMember(formInput).then(() => router.push('/team'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createMember(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMember(patchPayload).then(() => {
          router.push('/team');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Member</h2>

      <FloatingLabel controlId="floatingInput1" label="name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter New Member Name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Member Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter Member Image URL"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingSelect" label="Team">
        <Form.Select
          aria-label="Team"
          name="team_name"
          onChange={handleChange}
          className="mb-3"
          value={obj.team_name}
          required
        >

          <option value="">Select A Team</option>
          {
          teams.map((team) => (
            <option
              key={team.firebaseKey}
              value={team.firebaseKey}
            >
              {team.team_name}
            </option>
          ))
        }
        </Form.Select>
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Role" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Role"
          style={{ height: '100px' }}
          name="role"
          value={formInput.role}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'}Member</Button>
    </Form>
  );
}

MemberForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    role: PropTypes.string,
    team_name: PropTypes.string,
    uid: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

MemberForm.defaultProps = {
  obj: initialState,
};

export default MemberForm;
