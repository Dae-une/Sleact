import React, { useCallback, useEffect, useRef } from 'react';
import autosize from 'autosize';
import { Mention } from 'react-mentions';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import gravatar from 'gravatar';

import { ChatArea, EachMention, Form, MentionsTextarea, SendButton, Toolbox } from '@components/ChatBox/styles';
import { useParams } from 'react-router';

const ChatBox = ({ chat, onSubmitForm, onChangeChat, placeholder }) => {
  const { channel, workspace } = useParams();
  const textRef = useRef(null);

  const { data: userData, mutate } = useSWR('/api/users', fetcher);
  const { data: membersData } = useSWR(userData ? `/api/workspaces/${workspace}/members` : null, fetcher);

  useEffect(() => {
    if (textRef.current) {
      autosize(textRef.current);
    }
  }, []);

  const renderUserSuggestion = useCallback(
    (suggestion, search, highlightedDisplay, index, focused) => {
      if (!membersData) return;

      return (
        <EachMention focus={focused}>
          <img
            src={gravatar.url(membersData[index]?.email, { s: '20px', d: 'retro' })}
            alt={membersData[index].nickname}
          />
          <span>{highlightedDisplay}</span>
        </EachMention>
      );
    },
    [membersData],
  );

  const onKeydownChat = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        if (!e.shiftKey) {
          e.preventDefault();
          onSubmitForm(e);
        }
      }
    },
    [onSubmitForm],
  );

  return (
    <ChatArea>
      <Form onSubmit={onSubmitForm}>
        <MentionsTextarea
          id="editor-chat"
          value={chat}
          onChange={onChangeChat}
          onKeyPress={onKeydownChat}
          placeholder={placeholder}
          inputRef={textRef}
          allowSuggestionsAboveCursor
        >
          <Mention
            appendSpaceOnAdd
            trigger="@"
            data={membersData?.map((v) => ({ id: v.id, display: v.nickname })) || []}
            renderSuggestion={renderUserSuggestion}
          />
        </MentionsTextarea>
        <Toolbox>
          <SendButton
            className={
              'c-button-unstyled c-icon_button c-icon_button--light c-icon_button--size_medium c-texty_input__button c-texty_input__button--send' +
              (chat?.trim() ? '' : ' c-texty_input__button--disabled')
            }
            data-qa="texty_send_button"
            aria-label="Send message"
            data-sk="tooltip_parent"
            type="submit"
            disabled={!chat?.trim()}
          >
            <i className="c-icon c-icon--paperplane-filled" aria-hidden="true" />
          </SendButton>
        </Toolbox>
      </Form>
    </ChatArea>
  );
};

export default ChatBox;
