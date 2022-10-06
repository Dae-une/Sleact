import React, { useCallback, forwardRef } from 'react';
import Chat from '../Chat';
import { Scrollbars } from 'react-custom-scrollbars';

import { ChatZone, Section, StickyHeader } from '@components/ChatList/styles';

const ChatList = forwardRef(({ chatSections, isReachingEnd, setSize, isEmpty }, scrollRef) => {
  const onScroll = useCallback(
    (values) => {
      if (values.scrollTop === 0 && !isReachingEnd) {
        setSize((prevSize) => prevSize + 1).then(() => {
          //스크롤 위치 유지
          if (scrollRef?.current) {
            scrollRef.current?.scrollTop(scrollRef.current?.getScrollHeight() - values.scrollHeight);
          }
        });
      }
    },
    [setSize, scrollRef, isReachingEnd, isEmpty],
  );

  return (
    <ChatZone>
      <Scrollbars autoHide ref={scrollRef} onScrollFrame={onScroll}>
        {Object.entries(chatSections).map(([date, chats]) => {
          return (
            <Section className={`section-${date}`} key={date}>
              <StickyHeader>
                <button>{date}</button>
              </StickyHeader>
              {chats?.map((chat) => (
                <Chat key={chat.id} data={chat} />
              ))}
            </Section>
          );
        })}
      </Scrollbars>
    </ChatZone>
  );
});

export default ChatList;
