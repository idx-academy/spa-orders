import { appApi } from "@/store/api/appApi";
import { httpMethods } from "@/constants/methods";
import { createUrlPath } from "@/utils/createUrlPath";
import { URLS } from "@/constants/requests";

// Example of usage with RTK Query
const todosApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    getTodos: build.query<null, void>({
      query: () => URLS.todos.get
    }),
    addTodo: build.mutation<null, string>({
      query: (todo: string) => ({
        url: URLS.todos.post,
        method: httpMethods.post,
        body: { todo }
      })
    }),
    deleteTodo: build.mutation<null, string>({
      query: (id: string) => ({
        url: createUrlPath(URLS.todos.delete, id),
        method: httpMethods.delete
      })
    })
  })
});

export const { useGetTodosQuery, useAddTodoMutation, useDeleteTodoMutation } =
  todosApi;

