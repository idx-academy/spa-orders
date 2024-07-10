import { AdminOrder } from "@/types/order.types";

export const tableColumns = [
  "ordersTable.columns.id",
  "ordersTable.columns.status",
  "ordersTable.columns.createdAt",
  "ordersTable.columns.receiver",
  "ordersTable.columns.deliveryMethod",
  "ordersTable.columns.totalPrice",
  "ordersTable.columns.isPaid"
];

//@TODO: will be replaced with real data from the server
export const ordersContent: AdminOrder[] = [
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f6фівфі6afa6",
    isPaid: true,
    total: 12499,
    orderStatus: "CANCELED",
    createdAt: "2024-06-27T12:35:14.396Z",
    receiver: {
      firstName: "Eugene",
      lastName: "Hetsyanyn",
      email: "eugene.hetsyanyn@gmail.com"
    },
    postAddress: {
      deliveryMethod: "NOVA",
      city: "Kyiv",
      department: "№5"
    },
    orderItems: [
      {
        price: 1799,
        quantity: 1,
        product: {
          id: "123e4567-e89b-12d3-a456-426614174000123",
          name: 'Laptop Dell XPS 13 (9310) 13.4" FHD+ Touchscreen',
          description:
            "Device type, operation system, etc.Device type, operation system, etc.Device type, operation system, etc.Device type, operation system, etc.",
          status: "AVAILABLE",
          tags: ["category:electronics"],
          image:
            "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/computer_2-KjjXijfL9U0rd3P4Jfk06KwUHkSRRl.webp",
          price: 1799
        }
      },
      {
        price: 2997,
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
          price: 999
        }
      }
    ]
  },
  {
    id: "3fa85f64-5717-4562-b33fc-2c963f66afa6",
    isPaid: false,
    orderStatus: "IN_PROGRESS",
    total: 5999,
    createdAt: "2024-06-27T12:35:14.396Z",
    receiver: {
      firstName: "Eugene",
      lastName: "Hetsyanyn",
      email: "eugene.hetsyanyn@gmail.com"
    },
    postAddress: {
      deliveryMethod: "NOVA",
      city: "Kyiv",
      department: "№5"
    },
    orderItems: [
      {
        price: 1799,
        quantity: 1,
        product: {
          id: "123e45617-e89b-12d3-a456-426614174000123",
          name: 'Laptop Dell XPS 13 (9310) 13.4" FHD+ Touchscreen',
          description:
            "Device type, operation system, etc.Device type, operation system, etc.Device type, operation system, etc.Device type, operation system, etc.",
          status: "AVAILABLE",
          tags: ["category:electronics"],
          image:
            "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/computer_2-KjjXijfL9U0rd3P4Jfk06KwUHkSRRl.webp",
          price: 1799
        }
      },
      {
        price: 2997,
        quantity: 4,
        product: {
          id: "123e45673-e89b-12d3-a456-426614174000111",
          name: "APPLE iPhone",
          description:
            "Device type, operation system, etc.Device type, operation system, etc.Device type, operation system, etc.Device type, operation system, etc.",
          status: "AVAILABLE",
          tags: ["category:electronics"],
          image:
            "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/phone_2-tTDYhyoyqsEkwPzySFdXflYCe7TkUb.jpg",
          price: 999
        }
      }
    ]
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    isPaid: true,
    total: 8999,
    orderStatus: "IN_PROGRESS",
    createdAt: "2024-06-27T12:35:14.396Z",
    receiver: {
      firstName: "Eugene",
      lastName: "Hetsyanyn",
      email: "eugene.hetsyanyn@gmail.com"
    },
    postAddress: {
      deliveryMethod: "NOVA",
      city: "Kyiv",
      department: "№5"
    },
    orderItems: [
      {
        price: 1799,
        quantity: 1,
        product: {
          id: "123e4567-e89b-12d3-a456-426614174000123",
          name: 'Laptop Dell XPS 13 (9310) 13.4" FHD+ Touchscreen',
          description:
            "Device type, operation system, etc.Device type, operation system, etc.Device type, operation system, etc.Device type, operation system, etc.",
          status: "AVAILABLE",
          tags: ["category:electronics"],
          image:
            "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/computer_2-KjjXijfL9U0rd3P4Jfk06KwUHkSRRl.webp",
          price: 1799
        }
      },
      {
        price: 2997,
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
          price: 999
        }
      }
    ]
  }
];
