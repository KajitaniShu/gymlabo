import React from 'react'
import { useToggle } from '@mantine/hooks';
import { rem, Breadcrumbs, Text, Anchor,Paper, Group, TextInput, PasswordInput, Divider, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { FcGoogle } from 'react-icons/fc';
import { IconUser } from '@tabler/icons-react';
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from '../config/firebase'

export function Authentication() {
  const [type, toggle] = useToggle(['login', 'register']);
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'メールアドレスを入力してください'),
      password: (val) => (val.length <= 6 ? 'パスワードは6文字以上にしてください' : null),
    },
  });
  return (
    <>
      <Group position="center" mt="xl">
        <Text size="lg" mb="sm" color="dark.3" weight={700}>
          ログイン
        </Text>
      </Group>
      <Group position="center" >
      <Paper p="xl" radius="md" w={rem(350)} withBorder>
        <form onSubmit={form.onSubmit(() => {})}>
        <TextInput
          required
          label="Email"
          value={form.values.email}
          onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
          error={form.errors.email && '正しいメールアドレスを入力してください'}
          size="md"
        />

        <PasswordInput
          required
          label="Password"
          value={form.values.password}
          onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
          error={form.errors.password && 'パスワードは6文字以上にしてください'}
          size="md"
        />
        <Button fullWidth mt="xl" type="submit">
          {type === 'register' ? "登録" : "ログイン"}
        </Button>
        </form>
        <Group position="right" mt="sm">
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === 'register'
                ? '既にアカウントを持っている'
                : "新規アカウントを登録する"}
            </Anchor>
          </Group>
        <Divider my="xl" label={<Text size="xs" color="dimmed">または</Text>}  labelPosition="center" />
        <Button onClick={()=>signInWithPopup(auth, googleProvider)} variant="default" leftIcon={<FcGoogle />} color="gray" my="md" fullWidth>
          Googleでログイン
        </Button>
        <Button variant="default" leftIcon={<IconUser size="1rem"/>} color="gray" my="md" fullWidth>
          匿名で続ける
        </Button>
      </Paper>
      </Group>
    </>
  )
}
