import React from "react";
import { useRouter } from "next/router";
import PropTypes from 'prop-types';
import { FloatingLabel } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from "../../utils/context/authContext";  
import { createTeam, updateTeam } from '../../api/teamData';

const initialState = {
  team_name: '',
  
}
