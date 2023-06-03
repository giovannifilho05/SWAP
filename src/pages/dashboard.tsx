import { useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { doc, where } from 'firebase/firestore'
import { Center, Spinner, Flex } from '@chakra-ui/react'

import { useAuth } from '@hooks/useAuth'
import { DashboardTemplate } from '@template/Dashboard'
import { ProjectCard } from '@components/ProjectCard'
import { getAllDataFromCollection } from '@utils/firebaseMethods'
import { db } from '@services/firebase'
import { useQuery } from '@tanstack/react-query'

type Roles = any
type Project = {
  id: string
  name: string
  description: string
  roles: Roles
}

const Dashboard: NextPage = () => {
  const { user, isLoading, isAuthenticated } = useAuth()
  const router = useRouter()
  // const [projects, setProjects] = useState<Project[]>([])

  const { data: projects, isLoading: isLoadingProjects } = useQuery({
    queryKey: ['projects', user?.uid],
    queryFn: async (): Promise<Project[]> => {
      const projects = await getAllDataFromCollection<Project>(
        'project',
        where('participants', 'array-contains', doc(db, `user/${user.uid}`)),
      )

      return projects
    },
    staleTime: 1000 * 60 * 10, // 10 minuto
    retry: true,
    enabled: !!user,
  })

  useEffect(() => {
    const { success, redirect } = isAuthenticated()

    if (!isLoading) {
      if (!success) router.replace(redirect.path)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, user])

  if (isLoadingProjects) {
    return (
      <DashboardTemplate pageTitle="Dashboard">
        <Center w="100%" h="100%">
          <Spinner size="xl" color="teal.500" />
        </Center>
      </DashboardTemplate>
    )
  }

  return (
    <DashboardTemplate pageTitle="Dashboard">
      <Flex flexDirection="row" justifyContent="flex-start" wrap="wrap" gap={4}>
        {projects?.map(({ id, name, description, roles }) => (
          <ProjectCard
            key={id}
            id={id}
            title={name}
            description={description}
            tag={roles[user.uid]}
          />
        ))}
      </Flex>

      {/* <TextEditor /> */}
    </DashboardTemplate>
  )
}

export default Dashboard
