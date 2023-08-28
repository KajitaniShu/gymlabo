import { useState, useRef, Suspense } from 'react'
import { Container, rem, Breadcrumbs, Text, px, Title, Textarea, Loader, Center, Anchor, TextInput, Button, Group, AspectRatio, Paper } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import HeaderMenu from '../components/HeaderMenu'
import { Authentication } from './Authentication'
import { IconUserPin } from '@tabler/icons-react';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, googleProvider } from '../config/firebase'
import { RichTextEditor, Link } from '@mantine/tiptap';
import { Preload, OrbitControls } from '@react-three/drei'
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Canvas } from '@react-three/fiber'
import { Loading } from '../features/Canvas/Loading'
import Scene from '../features/Canvas/Scene'


// import Underline from '@tiptap/extension-underline';
// import TextAlign from '@tiptap/extension-text-align';
// import Superscript from '@tiptap/extension-superscript';
// import SubScript from '@tiptap/extension-subscript';

export function TalkTagForm() {
  const [user, initialising] = useAuthState(auth);
  const content = '';
  const { height } = useViewportSize();
  const editor = useEditor({
    extensions: [
      StarterKit,
      //Underline,
      Link,
      //Superscript,
      //SubScript,
      //Highlight,
      //TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content,
  });

  return (
    <>
      <HeaderMenu setTarget={null} />
      
      <Container size="sm">
      <Breadcrumbs separator=">">
        <Anchor size="xs" td="underline" component="a" href="/" color="dimmed">ホーム</Anchor>
        <Text size="xs" color="dimmed">話したい札</Text>
      </Breadcrumbs>
      {initialising ? 
        <Center h={height-px(rem(200))}>
          <Loader />
        </Center>
        :
        <>
        {user ? 
        <>
          <Title mt="xl" mb={rem(70)} order={3} size="h1" color="dark.5">
              話したい札
          </Title>
          <TextInput
            my="xl"
            placeholder=""
            label="表示する名前"
            withAsterisk
          />
          <Textarea
            my="xl"
            placeholder=""
            label="コメント"
            withAsterisk
          />
          <Text size="sm" mt="xl">さらに伝えたいこと</Text>
          <RichTextEditor editor={editor}>
          <RichTextEditor.Toolbar sticky stickyOffset={60}>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold />
              <RichTextEditor.Italic />
              <RichTextEditor.Underline />
              <RichTextEditor.Strikethrough />
              <RichTextEditor.ClearFormatting />
              <RichTextEditor.Highlight />
              <RichTextEditor.Code />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.H1 />
              <RichTextEditor.H2 />
              <RichTextEditor.H3 />
              <RichTextEditor.H4 />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Blockquote />
              <RichTextEditor.Hr />
              <RichTextEditor.BulletList />
              <RichTextEditor.OrderedList />
              <RichTextEditor.Subscript />
              <RichTextEditor.Superscript />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Link />
              <RichTextEditor.Unlink />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.AlignLeft />
              <RichTextEditor.AlignCenter />
              <RichTextEditor.AlignJustify />
              <RichTextEditor.AlignRight />
            </RichTextEditor.ControlsGroup>
          </RichTextEditor.Toolbar>

          <RichTextEditor.Content />
        </RichTextEditor>

        <Text size="sm" mt="xl">あなたのいる位置</Text>
          <AspectRatio ratio={16 / 9} w="100%" >
        <Paper withBorder>
          <Canvas
            style={{
              backgroundColor: "transparent",
            }}
            camera={{ position: [-3,3,3],  fov: 60}}
          
          >
            <color attach="background" args={["#C9DBB2"]} />
            <ambientLight intensity={2.6}/>
            <directionalLight
              color="white"
              position={[-10,20,0]}
              intensity={2.5}
            />
            <Suspense fallback={<Loading />}>
                <Scene
                  modelPath={'/gymlabo_sub.glb'}
                />
            </Suspense>
            <OrbitControls />
            <Preload all />
          </Canvas> 
        </Paper>
          </AspectRatio>
        <Group position="right" mt={rem(50)} mb={rem(100)}>
          <Group position="apart">
          <Button variant="default" w={rem(100)}>一時保存</Button>
          <Button w={rem(100)}>投稿</Button>
          </Group>
        </Group>
        </>
        :
          <Authentication />
        }
        </>
      }
      </Container>
    </>
  )
}
