import { useEffect, useRef, Suspense } from 'react'
import { Container, rem, Breadcrumbs, Text, Alert, px, Title, Pagination, Textarea, Loader, Center, Anchor, TextInput, Button, Group, AspectRatio, Paper } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import HeaderMenu from '../components/HeaderMenu'
import { Authentication } from './Authentication'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../config/firebase'
import { IconZoomQuestion } from '@tabler/icons-react';
import { TalkTagList } from './TalkTagList'

export function TalkTag() {
  const [user, initialising] = useAuthState(auth);
  const { height } = useViewportSize();

  return (
    <>
      <HeaderMenu setTarget={null} />
      
      <Container size="sm">
      <Breadcrumbs separator=">">
        <Anchor size="xs" td="underline" component="a" href="/" color="dimmed">ホーム</Anchor>
        <Text size="xs" color="dimmed">話したい札</Text>
      </Breadcrumbs>
      <Title my="xl" order={3} size="h1" color="dark.5">
        話したい札
      </Title>
      <Group my="xl" position="right">
        <Button component="a" href="./talktag/form">新規作成</Button>
      </Group>
      <Alert p="lg" radius="md" my="xl" icon={<IconZoomQuestion size="1rem" />} title="話したい札とは" color="gray">
        <Text mr="md" color="dimmed">GYMLABOで誰かに話しかけてほしいとき、自分の居場所とコメントを表示して気づいてもらいましょう　登録したメッセージは最大1日間、バーチャルGYMLABOのサイトを開いた全ての人に表示されます</Text>
      </Alert>
      <TalkTagList />
      </Container>
    </>
  )
}
