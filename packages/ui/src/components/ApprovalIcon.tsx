import React from "react";
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { MdPendingActions } from 'react-icons/md';
import { ApprovalStatus } from '@amen24/shared';

interface Props {
  status: ApprovalStatus;
}

export const ApprovalIcon: React.FC<Props> = ({ status }) => {
  switch (status) {
    case ApprovalStatus.Approved:
      return <FaCheckCircle color="#22c55e" title="Approved" />;
    case ApprovalStatus.Rejected:
      return <FaTimesCircle color="#ef4444" title="Rejected" />;
    case ApprovalStatus.Pending:
    default:
      return <MdPendingActions color="#facc15" title="Pending" />;
  }
};

