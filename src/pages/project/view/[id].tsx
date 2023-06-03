import { DashboardTemplate } from '@template/Dashboard'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

const ViewProject: NextPage = () => {
  const router = useRouter()
  return (
    <DashboardTemplate pageTitle="Projeto">
      <h1>{JSON.stringify(router.query, null, 2)}</h1>
    </DashboardTemplate>
  )
}

export default ViewProject
