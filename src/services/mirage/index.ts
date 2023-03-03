import { createServer, Factory, Model, Response, ActiveModelSerializer } from 'miragejs'
import { faker } from '@faker-js/faker';

type User = {
  name: string;
  email: string;
  created_at: string;
}

export function makeServer() {
  const server = createServer({
    // serializers: {
    //   application: ActiveModelSerializer,
    // },

    // models: {
    //   user: Model.extend<Partial<User>>({})
    // },

    // factories: {
    //   user: Factory.extend({
    //     name(index) {
    //       return `User ${index + 1}`
    //     },
    //     email() {
    //       return faker.internet.email().toLowerCase()
    //     },
    //     createdAt() {
    //       return faker.date.recent(10)
    //     },
    //   })
    // },

    // seeds(server) {
    //   server.createList('user', 25)
    // },

    routes() {
      this.namespace = 'api'
      // this.timing = 0

      // this.get('/users', function (schema, request) {
      //   const { page = 1, per_page = 10 } = request.queryParams

      //   const total = schema.all('user').length
      //   const pageStart = (Number(page) - 1) * Number(per_page)
      //   const pageEnd = pageStart + Number(per_page)

      //   const users = this.serialize(schema.all('user'))
      //   .users.slice(pageStart, pageEnd)

      //   return new Response(
      //     200,
      //     { 'x-total-count': String(total) },
      //     { users }
      //   )
      //   // return new Response(400, { 'x-total-count': String(0) }, { errors: [ 'name cannot be blank'] });
      // })

      // this.post('/users')
      // this.get('/users/:id')

      this.post('/sessions', (schema, request) => {
        console.log(request.requestBody)
        
        return new Response(
          200, {},
          {
            name: faker.name.fullName(),
            token: 'd2f8705c-b338-4fe9-840d-09443d8267bb',
            refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtaXNzaW9ucyI6WyJ1c2Vycy5saXN0IiwidXNlcnMuY3JlYXRlIiwibWV0cmljcy5saXN0Il0sInJvbGVzIjpbImFkbWluaXN0cmF0b3IiXSwiaWF0IjoxNjc1NzMwMDcyLCJleHAiOjE2NzU3MzAwNzcsInN1YiI6InN1Y2Vzc0BzdWNlc3MuY29tIn0.EnAf4jvmNYr8Aw6Ocsz2RS17-eM6aXD6HOw7NcK9J14',
            permissions: [],
            roles: [
              "administrator"
            ]
          }
        )
      })

      this.get('/me', () => {
        return new Response(
          200,
          {},
          {
            name: faker.name.fullName(),
            email: faker.internet.email().toLowerCase(),
            permissions: [],
            roles: [
              "administrator"
            ]
          }
        )
      })

      this.namespace = ''
      this.passthrough()
    }
  })

  return server
}