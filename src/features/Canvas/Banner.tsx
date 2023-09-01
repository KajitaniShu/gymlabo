import {
  UnstyledButton,
  Group,
  rem,
  Text,
  createStyles,
  Paper
} from '@mantine/core';
import { IconMapPinFilled } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  user: {
    display: 'block',
    width: '100%',
    color: theme.black,
    borderRadius: theme.spacing.xs,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
    },
  },
}));

export function Banner({ name, comment}: any) {
  const { classes } = useStyles();

  return (
      <Paper radius="md">
    <UnstyledButton p="xs" className={classes.user} w={rem(200)}>
      <Group>
      <IconMapPinFilled size="0.9rem" stroke={1.5} style={{marginLeft: "0.3rem"}}/>
        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {name}
          </Text>

          <Text color="dimmed" size="xs">
            {comment}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
    </Paper>
  );
}