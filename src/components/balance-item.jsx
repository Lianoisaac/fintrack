import { Card, CardContent } from './ui/card'

const BalanceItem = ({ icon, title, amount }) => {
  return (
    <Card>
      <CardContent className="space-y-2 p-6">
        <div className="flex items-center gap-2">
          <div className="h8 roundend-lg flex w-8 items-center justify-center bg-muted">
            {icon}
          </div>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
        <h3 className="text-2xl font-semibold">
          {new Intl.NumberFormat('AO', {
            style: 'currency',
            currency: 'AOA',
          }).format(amount)}
        </h3>
      </CardContent>
    </Card>
  )
}

export default BalanceItem
