import {
  createStyles,
  Header,
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { useDisclosure, useViewportSize  } from '@mantine/hooks';
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
  IconBarrierBlock,
  IconExternalLink,
  IconMenu2
} from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan('sm')]: {
      height: rem(42),
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    }),

    '&:active': theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  header: {
    [theme.fn.largerThan('md')]: {
      marginRight: rem(40),
      marginTop: rem(30),
      paddingLeft: rem(30),
      paddingRight: rem(30),
      borderRadius:"100px"
    },
    [theme.fn.smallerThan('md')]: {
      marginRight: "0",
      marginTop: rem(30),
      paddingLeft: rem(30),
      paddingRight: rem(20),
      borderRadius:"100px 0px 0px 100px"
    },
    backgroundColor:'white',
    border: "1px solid #DEE2E6" 
  },

  hiddenMobile: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('md')]: {
      display: 'none',
    },
  },
}));

const path = [
  {
    icon: IconCode,
    title: 'イベントスペース',
    description: 'This Pokémon’s cry is very loud and distracting',
  },
  {
    icon: IconCoin,
    title: 'セミナールーム',
    description: 'The fluid of Smeargle’s tail secretions changes',
  },
  {
    icon: IconBook,
    title: '会議室',
    description: 'Yanma is capable of seeing 360 degrees without',
  },
  {
    icon: IconFingerprint,
    title: '個別ブース',
    description: 'The shell’s rounded shape and the grooves on its.',
  },
  {
    icon: IconChartPie3,
    title: 'シェアオフィス',
    description: 'This Pokémon uses its flying ability to quickly chase',
  },
  {
    icon: IconNotification,
    title: '高集中ブース',
    description: 'Combusken battles with the intensely hot flames it spews',
  },
  {
    icon: IconNotification,
    title: '受付',
    description: 'Combusken battles with the intensely hot flames it spews',
  },
  {
    icon: IconNotification,
    title: 'アクセス',
    description: 'Combusken battles with the intensely hot flames it spews',
  },
];

export default function HeaderMenu({setTarget}: any) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();
  const { height, width } = useViewportSize();

  const openTalkTagForm = () =>
    modals.openConfirmModal({
      title: 'Delete your profile',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete your profile? This action is destructive and you will have
          to contact support to restore your data.
        </Text>
      ),
      labels: { confirm: 'Delete account', cancel: "No don't delete it" },
      confirmProps: { color: 'red' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => console.log('Confirmed'),
    });

  const links = path.map((item, index) => (
    <UnstyledButton className={classes.subLink} key={item.title} onClick={() => { setTarget(index); closeDrawer();}}>
      <Group noWrap align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon size={rem(22)} color="#7A9D54" />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" color="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <Group position="right" h={rem(100)} w={width} >
      <Header height={rem(60)} className={classes.header}>
        <Group position="right" sx={{ height: '100%' }} className={classes.hiddenMobile}>

          <Group sx={{ height: '100%' }} spacing={0} >
            <a href="/" className={classes.link}>
              Home
            </a>
            <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
              {setTarget !== null && 
                <HoverCard.Target>
                  <a href="#" className={classes.link}>
                    <Center inline>
                      <Box component="span" mr={5} >
                        施設
                      </Box>
                      <IconChevronDown size={16} color="#7A9D54"/>
                    </Center>
                  </a>
                </HoverCard.Target>
              }

              <HoverCard.Dropdown sx={{ overflow: 'hidden' }} >
                <Group position="apart" px="md">
                  <Text fw={500}>施設</Text>
                  <Anchor href="#" fz="xs" color="#7A9D54">
                    一覧
                  </Anchor>
                </Group>

                <Divider
                  my="sm"
                  mx="md"
                  color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
                />

                <SimpleGrid cols={2} spacing={0}>
                  {links}
                </SimpleGrid>

                <div className={classes.dropdownFooter}>
                  <Group position="right">
                  <Anchor color="dimmed" href="https://www.gymlabo.kyutech.jp/blog/" target="_blank" >
                      <Text size="xs">
                        GYMLABO公式サイト
                      </Text>
                    </Anchor>
                  </Group>
                </div>
              </HoverCard.Dropdown>
            </HoverCard>
            <a href="" className={classes.link}>
              <Text color="dimmed">イベント情報</Text>
            </a>
            <a href="" className={classes.link}>
              <Text color="dimmed">予約状況</Text>
            </a>
            <a href="/talktag"  className={classes.link}>
              <Text color="dark">話したい札</Text>
            </a>
            <a href="" className={classes.link}>
              <Text color="dark">お問い合わせ</Text>
            </a>
          </Group>



        </Group>
            <Group className={classes.hiddenDesktop} sx={{ height: '100%' }}>
              <UnstyledButton onClick={toggleDrawer} sx={{ height: '100%' }}>
                    <Group noWrap>
                      <IconMenu2 size={18} color="#7A9D54" />
                      <div>
                        <Text weight={600}>Menu</Text>
                      </div>
                    </Group>
              </UnstyledButton>
            </Group>
      </Header>

      <Drawer
        style={{right:0}}
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title={<Text weight={800} color="#7A9D54">Menu</Text>}
        position="top" 
        className={classes.hiddenDesktop}
        zIndex={10000}
      >
        <ScrollArea h={`calc(100vh - ${rem(100)})`} mx="-md">
          <Divider mt="none" mb="md" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

          <a href="#" className={classes.link}>
            Home
          </a>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                施設
              </Box>
              <IconChevronDown size={16} color="#7A9D54" />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>
          <a className={classes.link} >
            <Text color="dimmed" mr={5}><IconBarrierBlock size={16}/></Text>
            <Box component="span" mr={5} >
              <Text color="dimmed">イベント情報</Text>
            </Box>
          </a>
          <a className={classes.link} >
            <Text color="dimmed" mr={5}><IconBarrierBlock size={16}/></Text>
            <Box component="span" mr={5} >
              <Text color="dimmed">予約状況</Text>
            </Box>
          </a>
          <a href="https://www.gymlabo.kyutech.jp/blog/" target="_blank" className={classes.link}>
            <Box component="span" mr={5}>
              公式ブログ
            </Box>
            <IconExternalLink size={16}/>
          </a>
          <a href="https://www.gymlabo.kyutech.jp/contact/" target="_blank" className={classes.link}>
            <Box component="span" mr={5}>
              お問い合わせ
            </Box>
            <IconExternalLink size={16}/>
          </a>

          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />
        </ScrollArea>
      </Drawer>
    </Group>
  );
}