import { Elysia, t } from "elysia";
import { cors } from '@elysiajs/cors'
import { swagger } from '@elysiajs/swagger'

const app = new Elysia()
app.use(cors())
app.use(swagger())

app.get('/', 'Goodbye Elysia')

app.get('/:id', ({ params: { id } }) => id, {
  params: t.Object({
    id: t.Numeric()
  })
})


app.listen(3000)

console.log(
  `Elysia is running at ${app.server?.hostname}:${app.server?.port} 🦊`
);
