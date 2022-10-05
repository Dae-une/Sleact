import React, { useCallback } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

import Modal from '@components/Modal';
import useInput from '@hooks/useInput';
import fetcher from '@utils/fetcher';

import { Button, Input, Label } from '@pages/SignUp/styles';

const InviteWorkspaceModal = ({ show, onCloseModal, setShowInviteWorkspaceModal }) => {
  const [newMember, onChangeNewMember, setNewMember] = useInput('');

  const { workspace } = useParams();

  const { data: userData } = useSWR('/api/users', fetcher);
  const { mutate } = useSWR(userData ? `/api/workspaces/${workspace}/members` : null, fetcher);

  const onInviteMember = useCallback(
    (e) => {
      e.preventDefault();
      if (!newMember || !newMember.trim()) {
        return;
      }
      axios
        .post(`/api/workspaces/${workspace}/members`, {
          email: newMember,
        })
        .then((response) => {
          mutate(response.data);
          setShowInviteWorkspaceModal(false);
          setNewMember('');
        })
        .catch((error) => {
          console.dir(error);
          toast.error(error.response?.data, { position: 'bottom-center' });
        });
    },
    [workspace, newMember],
  );

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={onInviteMember}>
        <Label id="member-label">
          <span>이메일</span>
          <Input id="member" type="email" value={newMember} onChange={onChangeNewMember} />
        </Label>
        <Button type="submit">초대하기</Button>
      </form>
    </Modal>
  );
};

export default InviteWorkspaceModal;
