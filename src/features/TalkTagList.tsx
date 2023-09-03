import { useEffect, useRef, Suspense } from 'react'
import { Switch, rem, Card, Text, Alert, Menu, ActionIcon, ScrollArea, Table, Loader, Center, Anchor, TextInput, Button, Group, AspectRatio, Paper } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import HeaderMenu from '../components/HeaderMenu'
import { Authentication } from './Authentication'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, googleProvider } from '../config/firebase'
import { IconPencil, IconDots, IconMessages, IconTrash, IconReportAnalytics, IconNote } from '@tabler/icons-react';
import {collection, doc, getDocs, query, where, getFirestore } from 'firebase/firestore';
import { db }  from '../config/firebase';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';

const data =  [
    {
      "avatar": "https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
      "name": "Robert Wolfkisser",
      "job": "Engineer",
      "email": "rob_wolf@gmail.com",
      "rate": 22
    },
    {
      "avatar": "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
      "name": "Jill Jailbreaker",
      "job": "Engineer",
      "email": "jj@breaker.com",
      "rate": 45
    },
    {
      "avatar": "https://images.unsplash.com/photo-1632922267756-9b71242b1592?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
      "name": "Henry Silkeater",
      "job": "Designer",
      "email": "henry@silkeater.io",
      "rate": 76
    },
    {
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
      "name": "Bill Horsefighter",
      "job": "Designer",
      "email": "bhorsefighter@gmail.com",
      "rate": 15
    },
    {
      "avatar": "https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
      "name": "Jeremy Footviewer",
      "job": "Manager",
      "email": "jeremy@foot.dev",
      "rate": 98
    }
  ]



export function TalkTagList({user}:any) {

  const talkTagQuery = query(collection(db, "talktag-data"), where("isPublic", "==", true));
  const [talkTagData, loading, error, snapshot, reload] = useCollectionDataOnce(talkTagQuery);
  console.log(talkTagData)

  const rows = talkTagData?.map((item) => (
    <tr key={item.name}>
      <td>
        <Group spacing={0} >
            <Text size="sm" lineClamp={1}>
              {item.name}
            </Text>
            <Text color="dimmed" size="xs" lineClamp={1}>
              {item.affiliation}
            </Text>
        </Group>
      </td>
      <td>
        <Text size="xs" lineClamp={1}>{item.comment}</Text>
      </td>
      <td>
        <Group spacing={0} position="right">
          <Menu
            transitionProps={{ transition: 'pop' }}
            withArrow
            withinPortal
          >
            <Menu.Target>
              <ActionIcon>
                <IconDots size="1rem" stroke={1.5} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item icon={<IconMessages size="1rem" stroke={1.5} />}>Send message</Menu.Item>
              <Menu.Item icon={<IconNote size="1rem" stroke={1.5} />}>Add note</Menu.Item>
              <Menu.Item icon={<IconReportAnalytics size="1rem" stroke={1.5} />}>
                Analytics
              </Menu.Item>
              <Menu.Item icon={<IconTrash size="1rem" stroke={1.5} />} color="red">
                Terminate contract
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </td>
    </tr>
  ));

  return (
    <ScrollArea>
      <Paper withBorder radius="md"  mt="xl">
      <Table verticalSpacing="md">
        <tbody>{rows}</tbody>
      </Table>
      </Paper>
    </ScrollArea>
  );
}
