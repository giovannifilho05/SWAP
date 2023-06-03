import { NextPage } from 'next'

import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { CreateProjectForm } from '../../components/Form/CreateProjectForm'
import { DashboardTemplate } from '@template/Dashboard'

const CreateProject: NextPage = () => {
  const { user, isLoading, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const { success, redirect } = isAuthenticated()

    if (!isLoading) {
      if (!success) router.replace(redirect.path)
    }
  }, [isLoading, user])

  function onCreateProject() {
    router.replace('/')
  }

  return (
    <DashboardTemplate pageTitle="Criar Novo Projeto">
      <CreateProjectForm onCreateProject={onCreateProject} />
    </DashboardTemplate>
  )
}

export default CreateProject
