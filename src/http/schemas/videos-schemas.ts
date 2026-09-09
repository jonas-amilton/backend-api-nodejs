import { z } from 'zod'

export const createVideoBodySchema = z.object({
  title: z.string().min(1, 'O título é obrigatório'),
  description: z.string().min(3, 'A descrição é obrigatória'),
  duration: z.number().min(0),
})

export const videoParamsSchema = z.object({
  id: z.uuid({ message: 'ID inválido' }),
})

export const videoQuerySchema = z.object({
  search: z.string().optional(),
})
