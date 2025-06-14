import { useTranslation } from '@/app/i18n'
import DashboardContent from './dashboard-content'

export default async function DashboardPage({ params: { lng } }: { params: { lng: string } }) {
  const { t } = await useTranslation(lng, 'common')
  
  return <DashboardContent lng={lng} />
}
