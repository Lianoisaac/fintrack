import AddTransactionButtom from '@/components/add-transaction-buttom'
import Balance from '@/components/balance'
import DateSelection from '@/components/data-selection'
import Header from '@/components/Header'
import { useAuthContext } from '@/context/auth'
import { Navigate } from 'react-router'

const HomePage = () => {
  const { user, isInitializing } = useAuthContext()

  if (isInitializing) return null
  if (!user) {
    return <Navigate to="/login" />
  }
  return (
    <>
      <Header />

      <div className="space-y-6 p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <div className="flex items-center justify-between gap-2">
            <DateSelection />
            <AddTransactionButtom />
          </div>
        </div>
        <div className="grid grid-cols-[2fr,1fr]">
          <Balance />
        </div>
      </div>
    </>
  )
}

export default HomePage
