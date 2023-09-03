import { useState, useRef, Suspense } from 'react'
import { Container, rem, Breadcrumbs, Text, Alert, px, LoadingOverlay, createStyles, Textarea, Loader, Center, Anchor, TextInput, Button, Group, AspectRatio, Paper } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import HeaderMenu from '../components/HeaderMenu'
import { Authentication } from './Authentication'
import { Vector3, Mesh, Plane } from 'three';
import { IconUserPin } from '@tabler/icons-react';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, addTalkTag } from '../config/firebase'
import { RichTextEditor, Link } from '@mantine/tiptap';
import { Preload, OrbitControls, useGLTF, Html } from '@react-three/drei'
import { useEditor } from '@tiptap/react';
import { useDrag } from "@use-gesture/react";
import StarterKit from '@tiptap/starter-kit';
import { Canvas, ThreeEvent } from '@react-three/fiber'
import { Loading } from './Canvas/Loading'
import Scene from './Canvas/Scene'
import Test from './Canvas/Test'
import JumpCharacter from './Canvas/JumpCharacter';
import { Banner } from './Canvas/Banner'
import { useForm } from '@mantine/form';
import { IconZoomQuestion } from '@tabler/icons-react';

// import Underline from '@tiptap/extension-underline';
// import TextAlign from '@tiptap/extension-text-align';
// import Superscript from '@tiptap/extension-superscript';
// import SubScript from '@tiptap/extension-subscript';

export function TalkTagForm() {

  const form = useForm({
    initialValues: {
      name: '',
      affiliation: '',
      comment: '',
      message: '',
      isPublic: false,
    },

    validate: {
      
    },
  });
  
  const gltf = useGLTF('/gymlabo_sub.glb');
  const player = useRef<any>();
  let _pos = new Vector3();
  const plane = new Plane(new Vector3(0, 1, 0), 0);  
  const [loading, setLoading] = useState(false);

  // 2本指で操作した場合の処理
  const twoFing = useRef(false);
  window.addEventListener('touchstart', function(e) {
    if (e.targetTouches.length > 1) twoFing.current = true;
  }, false);
  window.addEventListener('touchend', function(e) {
    twoFing.current = false;
  }, false);
  window.addEventListener('mousedown', (e) => {
    if(e.button === 2) {
      twoFing.current = true;
    }
  });
  window.addEventListener('mouseup', (e) => {
    twoFing.current = false;
  });

  const bind = useDrag<ThreeEvent<MouseEvent>>(
    ({event}) => {
      if(!twoFing.current) event.ray.intersectPlane(plane, _pos);
      if(player.current !== undefined){
        console.log(event)
        player.current.position.x = event.intersections[0].point.x;
        player.current.position.y = event.intersections[0].point.y;
        player.current.position.z = event.intersections[0].point.z;
      }
    }
  );

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
    onUpdate(props) {
      form.setFieldValue('message', props.editor.getHTML());
    },
    content,
  });

  const submit = async (isPublic: boolean) => {
    if(!user) return;
    setLoading(true);
    await addTalkTag(
      form.getInputProps("name").value,         // name 
      user.uid,                                 // uuid
      form.getInputProps("affiliation").value,  // affiliation
      form.getInputProps("comment").value,      // comment
      form.getInputProps("message").value,      // message
      new Vector3(0, 0, 0),                     // position
      isPublic                                  // isPublic
    )
    setLoading(false);
  }


  return (
    <>
      <HeaderMenu setTarget={null} />
      
      <Container size="sm">
      <Breadcrumbs separator=">">
        <Anchor size="xs" td="underline" component="a" href="/" color="dimmed">ホーム</Anchor>
        <Anchor size="xs" td="underline" component="a" href="/talktag" color="dimmed">話したい札</Anchor>
        <Text size="xs" color="dimmed">新規作成</Text>
      </Breadcrumbs>
      {initialising ? 
        <Center h={height-px(rem(200))}>
          <Loader />
        </Center>
        :
        <>
        {user ? 
        <>
          <LoadingOverlay 
            overlayColor="#c5c5c5"
            visible={loading}
          />
          <form
            onSubmit={form.onSubmit((values) => console.log(values))}
          >
            
          <TextInput
            mt={rem(100)}
            mb="xl"
            placeholder="ひいらぎ"
            {...form.getInputProps('name')} 
            label="表示する名前"
            withAsterisk
          />
          <TextInput
            my="xl"
            placeholder="情報工学府 修士2年"
            {...form.getInputProps('affiliation')} 
            label="所属"
            withAsterisk
          />
          <Textarea
            my="xl"
            placeholder="○○時までいるのでいつでも話しかけてください～"
            {...form.getInputProps('comment')} 
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
            <mesh {...bind() as any}>
              <primitive 
                object={gltf.scene.clone()}
              />
            </mesh>
            <group ref={player}>
              <mesh>
                <Html position={[0, 0.26, 0]} sprite distanceFactor={0.8}> 
                  <Banner name={"ひいらぎ"} comment={"○○時までいるので話しかけてください～"} />
                </Html>
              </mesh>
              <JumpCharacter ref={player} position={[0, 0.035, 0]} rotation-y={0} path={"/character/character2.glb"} scale={[0.023, 0.023, 0.023]} />
            </group>
            </Suspense>
            <OrbitControls />
            <Preload all />
            <Test />
          </Canvas> 
        </Paper>
          </AspectRatio>
        <Group position="right" mt={rem(50)} mb={rem(100)}>
          <Group position="apart">
          <Button variant="default" w={rem(100)} onClick={()=> submit(false)}>一時保存</Button>
          <Button w={rem(100)} onClick={()=> submit(true)}>投稿</Button>
          </Group>
        </Group>
        </form>
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
