import React from 'react'
import SmallSpinner from '../ui/SmallSpinner';
import { MdVerified } from 'react-icons/md';

interface VerifiedProps {
  isLoading: boolean;
  isFound?: boolean;
  term: string;
}

const Verified: React.FC<VerifiedProps> = ({ isLoading, isFound, term }) => {
  if (!term.trim()) return null;
  if (isLoading) return <SmallSpinner />;
  if (isFound) return <MdVerified color="green" />;
  return null;
};

export default Verified;