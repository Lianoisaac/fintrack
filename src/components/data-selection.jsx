import { useEffect, useState } from 'react'
import { DatePickerWithRange } from './ui/date-picker-with-range'
import { addMonths } from 'date-fns'
import { format } from 'date-fns'
import { useNavigate, useSearchParams } from 'react-router'
import { useAuthContext } from '@/context/auth'
import { useQueryClient } from '@tanstack/react-query'

const formatDate = (date) => format(date, 'yyyy-MM-dd')

const DateSelection = () => {
  const [searchParams] = useSearchParams()
  const { user } = useAuthContext()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [date, setDate] = useState({
    from: searchParams.get('from')
      ? new Date(searchParams.get('from'))
      : new Date(),
    to: searchParams.get('to')
      ? new Date(searchParams.get('to'))
      : addMonths(new Date(), 1),
  })

  useEffect(() => {
    if (!date?.from || !date?.to) return
    const queryParams = new URLSearchParams()
    queryParams.set('from', formatDate(date.from))
    queryParams.set('to', formatDate(date.to))
    navigate(`/?${queryParams.toString()}`)
    queryClient.invalidateQueries({
      querykey: ['balance', user.id],
    })
  }, [date, navigate, queryClient, user])

  //Componenete de seleção de data que utiliza o DatePickerWithRange
  return <DatePickerWithRange value={date} onChange={setDate} />
}

export default DateSelection
