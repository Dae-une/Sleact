import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { NavLink } from 'react-router-dom';

const EachChannel = ({ channel }) => {
  const { workspace } = useParams();
  const location = useLocation();
  const { data: userData } = useSWR(`/api/users`, fetcher, { dedupingInterval: 2000 });

  const date = localStorage.getItem(`${workspace}-${channel.name}`) || 0;
  const { data: count, mutate } = useSWR(
    userData ? `/api/workspaces/${workspace}/channels/${channel.name}/unreads?after=${date}` : null,
    fetcher,
  );

  useEffect(() => {
    if (location.pathname === `/workspace/${workspace}/channel/${channel.name}`) {
      mutate(0);
    }
  }, [mutate, channel, workspace, location.pathname]);

  return (
    <NavLink key={channel.name} activeClassName="selected" to={`/workspace/${workspace}/channel/${channel.name}`}>
      <span className={count !== undefined && count > 0 ? 'bold' : undefined}>#{channel.name}</span>
      {count !== undefined && count > 0 && <span className="count">{count}</span>}
    </NavLink>
  );
};

export default EachChannel;
