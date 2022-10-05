import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import useSWR from 'swr';

import useInput from '@hooks/useInput';
import Modal from '@components/Modal';
import fetcher from '@utils/fetcher';

import { Button, Input, Label } from '@pages/SignUp/styles';

const CreateChannelModal = ({ onCloseModal, show, setShowcreateChannelModal }) => {
  const [newChannel, onChangeNewChannel, setNewChannel] = useInput('');
  const { workspace, channel } = useParams();

  const { data: userData } = useSWR('/api/users', fetcher, {
    dedupingInterval: 2000, // 2초
  });
  const { data: channelData, mutate } = useSWR(userData ? `/api/workspaces/${workspace}/channels` : null, fetcher);

  const onCreateChannel = useCallback(
    (e) => {
      e.preventDefault();
      axios
        .post(
          `/api/workspaces/${workspace}/channels`,
          {
            name: newChannel,
          },
          {
            withCredentials: true,
          },
        )
        .then(() => {
          setShowcreateChannelModal(false);
          setNewChannel('');
          mutate();
        })
        .catch((error) => {
          console.dir(error);
          toast.error(error.response?.data, { position: 'bottom-center' });
        });
    },
    [newChannel],
  );

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={onCreateChannel}>
        <Label id="channel-label">
          <span>채널</span>
          <Input id="channel" value={newChannel} onChange={onChangeNewChannel} />
        </Label>
        <Button type="submit">생성하기</Button>
      </form>
    </Modal>
  );
};

export default CreateChannelModal;
