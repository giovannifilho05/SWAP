import { Card, CardBody, CardFooter, CardProps } from '@chakra-ui/card'
import { Stack, Heading, Button, Text, Tag, HStack } from '@chakra-ui/react'
import Link from 'next/link'

interface ProjectCardProps extends CardProps {
  id: string
  title: string
  description: string
  tag: string
}

export function ProjectCard({
  id,
  title,
  description,
  tag,
  ...rest
}: ProjectCardProps) {
  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow="hidden"
      variant="outline"
      w="clamp(300px, 100%, 450px)"
      flexDirection="column"
      {...rest}
    >
      <CardBody display="flex" flexDirection="column" alignItems="baseline">
        <Heading size="md">{title}</Heading>
        <Text my="2" noOfLines={3}>
          {description}
        </Text>

        <Tag my={2} ml="full" variant="solid" colorScheme="teal">
          {tag}
        </Tag>
      </CardBody>

      <CardFooter pt={0}>
        <Link href={`/project/view/${id}`}>
          <Button variant="solid" colorScheme="teal">
            Ver
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
