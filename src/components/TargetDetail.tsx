import React from 'react'
import { Text, rem, Flex, Group, Button, createStyles, Drawer, Title, ThemeIcon, Divider } from '@mantine/core'
import path from "../config/camera.json"


const useStyles = createStyles((theme) => ({

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

export default function TargetDetail({target}: any) {
  const { classes, theme } = useStyles();
  
  return (
    <>
      {target >= 0 && 
        <Group position='center' w="30%" noWrap className={classes.hiddenMobile}>
          <Flex  mt={"20vh"} ml="40%" direction="column" align="left" wrap="nowrap">
            <Text 
              bg="black"
              color="white"
              size={rem(45)}
              w={path.camera_path[target].name.length + 1 + "em"}
              weight={800}
              px="lg"
            >
              {path.camera_path[target].name}
            </Text>
            <Text 
              mt="lg"
              color="black"
              size="md"
            >
              {path.camera_path[target].description}
            </Text>
            <Button variant="outline" mt="md" color="dark" w="8em" >
              More
            </Button>
          </Flex>
        </Group>
      }

      </>
  )
}
