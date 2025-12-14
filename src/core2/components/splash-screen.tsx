import { Flex, Loader } from "@mantine/core";

export function SplashScreen() {
	return (
		<Flex mih="100vh" w="100%" justify="center" align="center">
			<Loader size={20} />
		</Flex>
	);
}
