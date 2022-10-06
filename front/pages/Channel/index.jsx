import React, { useCallback } from 'react';

import { Container, Header, DragOver } from '@pages/Channel/styles';
import useInput from '@hooks/useInput';
import ChatList from '../../components/ChatList';
import ChatBox from '@components/ChatBox';

const Channel = () => {
  const [chat, onChangeChat] = useInput('');

  const onSubmitForm = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <Container>
      <Header>Channel!</Header>
      <ChatList />
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitForm={onSubmitForm} />
    </Container>
  );
};

export default Channel;
