import React from 'react';
import Chat from '../Chat';
import { ChatZone, Section, StickyHeader } from '@components/ChatList/styles';

const ChatList = ({ chatData }) => {
  console.log('chatData', chatData);
  return (
    <ChatZone>
      {chatData?.map((data) => {
        return <Chat key={data.id} data={data} />;
      })}
    </ChatZone>
  );
};

export default ChatList;
