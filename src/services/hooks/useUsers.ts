import { useQuery, UseQueryOptions } from "@tanstack/react-query";

// type User = {
//     id: number;
//     name: string;
//     email: string;
//     createdAt: string;
// }

// type GetUsersResponse = {
//     users: User[];
//     totalCount: number;
// }

// export async function getUsers(page: number): Promise<GetUsersResponse> {
//     const { data, headers } = await api.get('users', {
//         params: {
//             page,
//         }
//     })
//     const totalCount = Number(headers['x-total-count'])


//     const users = data.users.map((user: User) => ({
//         ...user,
//         createdAt: new Date(user['created_at']).toLocaleDateString('pt-BR', {
//             day: '2-digit',
//             month: 'long',
//             year: 'numeric'
//         }),
//     }))

//     return {
//         users,
//         totalCount,
//     };
// }

// export function UseUsers(page: number, options: UseQueryOptions) {
//     return useQuery(['users', page], () => getUsers(page), {
//         staleTime: 1000 * 60 * 10, // 10 minutes
//         ...options
//     })
// }