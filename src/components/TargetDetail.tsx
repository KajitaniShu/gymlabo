import { useDisclosure } from '@mantine/hooks';
import { Drawer, Group, rem, Text, Paper, ActionIcon } from '@mantine/core';
import { useViewportSize  } from '@mantine/hooks';
import { IconChevronRight } from '@tabler/icons-react';
import path from "../config/camera.json"


export function TargetDetail({target}: any) {
  const [opened, { open, close }] = useDisclosure(false);
  const { width } = useViewportSize();


  return (
      <Drawer.Root
        opened={target >= 0}
        onClose={close}
        title="Authentication"
        position="bottom"
        size="auto"
      >
        <Drawer.Content bg="transparent">
        <Drawer.Body>
          <Paper shadow="sm" radius="lg" px="xl" py="md"  w={width > 500 ? rem(400) : "100%"}>
            <Group position='apart'>
              <div>
                <Text size="lg" weight="bold">{target >= 0 && path.camera_path[target].name}</Text>
                <Text size="md" color="dimmed">{target >= 0 && path.camera_path[target].description}</Text>
              </div>
                <ActionIcon size="lg">
                  <IconChevronRight size="1.625rem" />
                </ActionIcon>
            </Group>
          </Paper>
        </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
  );
}