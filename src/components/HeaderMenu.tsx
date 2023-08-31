import {
  createStyles,
  Header,
  HoverCard,
  Group,
  NavLink,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Drawer,
  getStylesRef,
  rem,
  Container,
} from '@mantine/core';
import { useDisclosure, useViewportSize  } from '@mantine/hooks';
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconSignRight,
  IconCoin,
  IconChevronDown,
  IconHome2,
  IconUserPin,
  IconMessageQuestion,
  IconFingerprint,
  IconCalendarStats,
  IconMenu2
} from '@tabler/icons-react';


const useStyles = createStyles((theme) => ({
  link: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    color: theme.colors.dark[5],
    padding: `${theme.spacing.md} ${theme.spacing.xl}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,

      [`& .${getStylesRef('icon')}`]: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef('icon'),
    color: "#7A9D54",
    marginRight: theme.spacing.sm,
  },

  subLink: {
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,
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
  const { classes, cx } = useStyles();
  const { height, width } = useViewportSize();

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

  const header_link = header_links.map((item, index) => (
      <a
        className={classes.link}
        href={item.link}
        key={item.title}
      >
        <item.icon className={classes.linkIcon} stroke={1.5} />
        <span>{item.title}</span>
      </a>
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
                  <a className={classes.link}>
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
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        position="top" 
        className={classes.hiddenDesktop}
        zIndex={10000}
      >
        <Container>
        <NavLink
          label="Home"
          icon={<IconHome2 className={classes.linkIcon} stroke={1.5} />}
          childrenOffset={28}
          onClick={() => window.location.href= "/"}
          className={classes.link}
        />
        <NavLink
          label="施設"
          className={classes.link}
          icon={<IconSignRight className={classes.linkIcon} stroke={1.5} />}
          childrenOffset={28}
        >
          {links}
        </NavLink>
        <NavLink
          label="予約状況"
          icon={<IconCalendarStats className={classes.linkIcon} stroke={1.5} />}
          childrenOffset={28}
          className={classes.link}
        />
        <NavLink
          label="話したい札"
          icon={<IconUserPin className={classes.linkIcon} stroke={1.5} />}
          childrenOffset={28}
          onClick={() => window.location.href= "/talktag"}
          className={classes.link}
        />
        <NavLink
          label="お問い合わせ"
          icon={<IconMessageQuestion className={classes.linkIcon} stroke={1.5} />}
          childrenOffset={28}
          
          className={classes.link}
        />
      </Container>
      </Drawer>
    </Group>
  );
}



const header_links =  [
  
  {
    icon: IconCode,
    title: "施設",
    link: "/"
  },
  {
    icon: IconSignRight,
    title: "イベント情報",
    link: ""
  },
  {
    icon: IconCode,
    title: "予約状況",
    link: ""
  },
  {
    icon: IconCode,
    title: "話したい札",
    link: "/talktag"
  },
  {
    icon: IconCode,
    title: "お問い合わせ",
    link: ""
  }
];

