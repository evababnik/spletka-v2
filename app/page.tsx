import {
  Box,
  Button,
  Center,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Link from "next/link";
export default function Home() {
  return (
    <Box bg="black">
      <Center>
        <Stack align="center" maw="500" p="lg" pt='xl' pb='xl'>
          <Title order={1} ta="center" c="white">
          PRIJATELJI IŠČEMO POPOLNO PUNCO ZA GREGA
          </Title>
          <Image radius="md" src="/grega.jpg" maw={{base: '80%', sm:"400"}} />
          <Text fz="xl" fw='700' c="white" ta='center'>Športnik po duši, direktor v službi, romantik v srcu</Text>
          <Text fz="lg" c="white" ta='center'>
            Iskreno iščem punco – to ni šala. Naveličan sem samskega življenja
            in upam, da bom spoznal pravo osebo.
          </Text>
          <Text fw="700" fz="lg" c="white" ta='center'>
            Če bi šla na zmenek z mano ali bi me rada spoznala, me dodaj.
          </Text>

          <Button color="black" bd="1px solid white" radius="md">
            <Link
            style={{textDecoration: 'none'}}
            color='white'
              href="https://www.instagram.com/gregapotokar/"
              target="_blank"
            >
              <Group gap="xs">
                {" "}
                <svg
                  width={25}
                  height={25}
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.3333 5C8.73167 5 5 8.73167 5 13.3333V26.6667C5 31.2683 8.73167 35 13.3333 35H26.6667C31.2683 35 35 31.2683 35 26.6667V13.3333C35 8.73167 31.2683 5 26.6667 5H13.3333ZM30 8.33333C30.92 8.33333 31.6667 9.08 31.6667 10C31.6667 10.92 30.92 11.6667 30 11.6667C29.08 11.6667 28.3333 10.92 28.3333 10C28.3333 9.08 29.08 8.33333 30 8.33333ZM20 11.6667C24.6017 11.6667 28.3333 15.3983 28.3333 20C28.3333 24.6017 24.6017 28.3333 20 28.3333C15.3983 28.3333 11.6667 24.6017 11.6667 20C11.6667 15.3983 15.3983 11.6667 20 11.6667ZM20 15C18.6739 15 17.4021 15.5268 16.4645 16.4645C15.5268 17.4021 15 18.6739 15 20C15 21.3261 15.5268 22.5979 16.4645 23.5355C17.4021 24.4732 18.6739 25 20 25C21.3261 25 22.5979 24.4732 23.5355 23.5355C24.4732 22.5979 25 21.3261 25 20C25 18.6739 24.4732 17.4021 23.5355 16.4645C22.5979 15.5268 21.3261 15 20 15Z"
                    fill="white"
                  />
                </svg>
                <Text td='none' ta='left'  c='white'>Gregov Instagram</Text>
              </Group>
            </Link>
          </Button>
        </Stack>
      </Center>
    </Box>
  );
}
