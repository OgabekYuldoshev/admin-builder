import { Center, Flex, Text, ThemeIcon } from "@mantine/core";
import { IconMoodEmpty } from "@tabler/icons-react";

export function NoRecord() {
  return (
    <Flex
      justify={"center"}
      align={"center"}
      direction={"column"}
      h={"100%"}
      gap="xs"
    >
      <ThemeIcon w={48} h={48} radius="100%">
        <IconMoodEmpty />
      </ThemeIcon>
      <Center>
        <Text size="xs" c={"gray.6"}>
          Ma'lumotlar topilmadi
        </Text>
      </Center>
    </Flex>
  );
}
