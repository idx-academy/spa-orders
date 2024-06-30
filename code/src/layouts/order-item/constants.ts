import { OrderResponse } from "@/types/order.types";

//@TODO: Replace with mock backend
export const item: OrderResponse = {
  totalElements: 0,
  totalPages: 0,
  sort: {
    sorted: true,
    unsorted: true,
    empty: true
  },
  first: true,
  last: true,
  number: 0,
  pageable: {
    page: 0,
    size: 1,
    sort: ["string"]
  },
  numberOfElements: 0,
  size: 0,
  empty: true,
  content: [
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      isPaid: true,
      orderStatus: "IN_PROGRESS",
      createdAt: "2024-06-27T12:35:14.396Z",
      receiver: {
        firstName: "Eugene",
        lastName: "Hetsyanyn",
        email: "eugene.hetsyanyn@gmail.com"
      },
      postAddress: {
        deliveryMethod: "NOVA",
        city: "string",
        department: "string"
      },
      orderItems: [
        {
          price: 4 * 999,
          quantity: 4,
          product: {
            id: "123e4567-e89b-12d3-a456-426614174000123",
            name: "APPLE iPhone",
            description:
              "Device type, operation system, etc.Device type, operation system, etc.Device type, operation system, etc.Device type, operation system, etc.",
            status: "AVAILABLE",
            tags: ["category:electronics"],
            image:
              "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/phone_2-tTDYhyoyqsEkwPzySFdXflYCe7TkUb.jpg",
            price: 999.99
          }
        },
        {
          price: 4 * 999,
          quantity: 4,
          product: {
            id: "123e4567-e89b-12d3-a456-426614174000111",
            name: "APPLE iPhone",
            description:
              "Device type, operation system, etc.Device type, operation system, etc.Device type, operation system, etc.Device type, operation system, etc.",
            status: "AVAILABLE",
            tags: ["category:electronics"],
            image:
              "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/phone_2-tTDYhyoyqsEkwPzySFdXflYCe7TkUb.jpg",
            price: 999.99
          }
        },
        {
          price: 4 * 999,
          quantity: 4,
          product: {
            id: "123e4567-e89b-12d3-a456-42661417123124000",
            name: "APPLE iPhone",
            description:
              "Device type, operation system, etc.Device type, operation system, etc.Device type, operation system, etc.Device type, operation system, etc.",
            status: "AVAILABLE",
            tags: ["category:electronics"],
            image:
              "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/phone_2-tTDYhyoyqsEkwPzySFdXflYCe7TkUb.jpg",
            price: 999.99
          }
        }
      ]
    }
  ]
};
