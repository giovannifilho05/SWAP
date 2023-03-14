import { Text, TextProps } from "@chakra-ui/react";

export function Logo(props: TextProps) {
  return (
    <Text
      fontSize={["2xl", "3xl"]}
      fontWeight="bold"
      letterSpacing="tight"
      {...props}
    >
      SWAP
      <Text as="span" ml="1" color="pink.500">.</Text>
    </Text>
  )
}