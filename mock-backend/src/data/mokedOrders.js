const userOrders = {
  totalElements: 0,
  totalPages: 0,
  sort: {
    sorted: true,
    unsorted: true,
    empty: true,
  },
  first: true,
  last: true,
  number: 0,
  pageable: {
    page: 0,
    size: 1,
    sort: ["string"],
  },
  numberOfElements: 0,
  size: 0,
  empty: true,
  content: [
    {
      id: "f4831fef-35a8-4766-b50e-dcb25d7b2e7b",
      isPaid: true,
      orderStatus: "IN_PROGRESS",
      createdAt: "2024-07-05T12:35:14.396Z",
      total: 4796,
      receiver: {
        firstName: "Eugene",
        lastName: "Hetsyanyn",
        email: "eugene.hetsyanyn@gmail.com",
      },
      postAddress: {
        deliveryMethod: "NOVA",
        city: "Kyiv",
        department: "№5",
      },
      orderItems: [
        {
          price: 1799,
          quantity: 1,
          product: {
            id: "126",
            name: 'Laptop Dell XPS 13 (9310) 13.4" FHD+ Touchscreen',
            description:
              "Device type, operation system, etc.Device type, operation system, etc.Device type, operation system, etc.Device type, operation system, etc.",
            status: "AVAILABLE",
            tags: ["category:electronics"],
            image:
              "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/computer_2-KjjXijfL9U0rd3P4Jfk06KwUHkSRRl.webp",
            price: 1799,
          },
        },
        {
          price: 2997,
          quantity: 4,
          product: {
            id: "125",
            name: "APPLE iPhone",
            description:
              "Device type, operation system, etc.Device type, operation system, etc.Device type, operation system, etc.Device type, operation system, etc.",
            status: "AVAILABLE",
            tags: ["category:electronics"],
            image:
              "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/phone_2-tTDYhyoyqsEkwPzySFdXflYCe7TkUb.jpg",
            price: 999,
          },
        },
      ],
    },
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa61",
      isPaid: false,
      orderStatus: "COMPLETED",
      createdAt: "2024-07-15T14:25:15.396Z",
      receiver: {
        firstName: "Eugene",
        lastName: "Hetsyanyn",
        email: "eugene.hetsyanyn@gmail.com",
      },
      postAddress: {
        deliveryMethod: "NOVA",
        city: "Kyiv",
        department: "№7",
      },
      total: 4995,
      orderItems: [
        {
          price: 2997,
          quantity: 3,
          product: {
            id: "124",
            name: "APPLE iPhone",
            description:
              "Device type, operation system, etc.Device type, operation system, etc.Device type, operation system, etc.Device type, operation system, etc.",
            status: "AVAILABLE",
            tags: ["category:electronics"],
            image:
              "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/phone_2-tTDYhyoyqsEkwPzySFdXflYCe7TkUb.jpg",
            price: 999,
          },
        },
        {
          price: 1999,
          quantity: 1,
          product: {
            id: "123",
            name: 'Laptop HP Spectre x360 14" (2023) Intel Core i7 1TB SSD Nightfall Black',
            description:
              'Screen: 14" UHD OLED, 3840x2160 / Intel Core i7-1260P / RAM 16 GB / 1TB SSD / Wi-Fi 6E / Bluetooth 5.2 / Windows 11 Home / 66 Wh battery',
            status: "AVAILABLE",
            tags: ["category:electronics"],
            image:
              "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/computer_1-J0a7bI2jB5NozuSaXnzyMtxHyijWoD.jpg",
            price: 1999,
          },
        },
      ],
    },
  ],
};

const adminOrders = {
  totalElements: 0,
  totalPages: 0,
  sort: {
    sorted: true,
    unsorted: true,
    empty: true,
  },
  first: true,
  last: true,
  number: 0,
  pageable: {
    page: 0,
    size: 1,
    sort: ["string"],
  },
  numberOfElements: 0,
  size: 0,
  empty: true,
  content: [
    {
      id: "126bf189-9f8c-46ed-9138-f74d9d93206e",
      isPaid: true,
      orderStatus: "IN_PROGRESS",
      createdAt: "2024-07-05T12:35:14.396Z",
      total: 4796,
      receiver: {
        firstName: "Eugene",
        lastName: "Hetsyanyn",
        email: "eugene.hetsyanyn@gmail.com",
      },
      postAddress: {
        deliveryMethod: "NOVA",
        city: "Kyiv",
        department: "№5",
      },
      orderItems: [
        {
          price: 1799,
          quantity: 1,
          product: {
            id: "126bf189-9f8c-46ed-9138-f74d9d93206e",
            name: 'Laptop Dell XPS 13 (9310) 13.4" FHD+ Touchscreen',
            description:
              "Device type, operation system, etc.Device type, operation system, etc.Device type, operation system, etc.Device type, operation system, etc.",
            status: "AVAILABLE",
            tags: ["category:electronics"],
            image:
              "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/computer_2-KjjXijfL9U0rd3P4Jfk06KwUHkSRRl.webp",
            price: 1799,
          },
        },
        {
          price: 2997,
          quantity: 4,
          product: {
            id: "6394f3b7-ce20-44b5-a2d0-f77395cb780c",
            name: "APPLE iPhone",
            description:
              "Device type, operation system, etc.Device type, operation system, etc.Device type, operation system, etc.Device type, operation system, etc.",
            status: "AVAILABLE",
            tags: ["category:electronics"],
            image:
              "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/phone_2-tTDYhyoyqsEkwPzySFdXflYCe7TkUb.jpg",
            price: 999,
          },
        },
      ],
    },
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa62",
      isPaid: false,
      orderStatus: "COMPLETED",
      createdAt: "2024-07-15T14:25:15.396Z",
      receiver: {
        firstName: "Eugene",
        lastName: "Hetsyanyn",
        email: "eugene.hetsyanyn@gmail.com",
      },
      postAddress: {
        deliveryMethod: "NOVA",
        city: "Kyiv",
        department: "№7",
      },
      total: 4995,
      orderItems: [
        {
          price: 2997,
          quantity: 3,
          product: {
            id: "123e4567-e89b-12d3-a456-42661417400012312",
            name: "APPLE iPhone",
            description:
              "Device type, operation system, etc.Device type, operation system, etc.Device type, operation system, etc.Device type, operation system, etc.",
            status: "AVAILABLE",
            tags: ["category:electronics"],
            image:
              "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/phone_2-tTDYhyoyqsEkwPzySFdXflYCe7TkUb.jpg",
            price: 999,
          },
        },
        {
          price: 1999,
          quantity: 1,
          product: {
            id: "123e4567-e89b-12d3-a456-42661417400011132",
            name: 'Laptop HP Spectre x360 14" (2023) Intel Core i7 1TB SSD Nightfall Black',
            description:
              'Screen: 14" UHD OLED, 3840x2160 / Intel Core i7-1260P / RAM 16 GB / 1TB SSD / Wi-Fi 6E / Bluetooth 5.2 / Windows 11 Home / 66 Wh battery',
            status: "AVAILABLE",
            tags: ["category:electronics"],
            image:
              "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/computer_1-J0a7bI2jB5NozuSaXnzyMtxHyijWoD.jpg",
            price: 1999,
          },
        },
      ],
    },
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa61",
      isPaid: false,
      orderStatus: "DELIVERED",
      createdAt: "2024-07-20T08:31:49.779Z",
      receiver: {
        firstName: "Maksym",
        lastName: "Hevyk",
        email: "mhevyk@gmail.com",
      },
      postAddress: {
        deliveryMethod: "UKRPOSHTA",
        city: "London",
        department: "№5",
      },
      total: 3000,
      orderItems: [
        {
          price: 2000,
          quantity: 4,
          product: {
            id: "123e4567-e89b-12d3-a456-42661417400012312",
            name: "APPLE iPhone",
            description:
              "Device type, operation system, etc.Device type, operation system, etc.Device type, operation system, etc.Device type, operation system, etc.",
            status: "AVAILABLE",
            tags: ["category:electronics"],
            image:
              "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/phone_2-tTDYhyoyqsEkwPzySFdXflYCe7TkUb.jpg",
            price: 500,
          },
        },
        {
          price: 1000,
          quantity: 1,
          product: {
            id: "123e4567-e89b-12d3-a456-42661417400011132",
            name: 'Laptop HP Spectre x360 14" (2023) Intel Core i7 1TB SSD Nightfall Black',
            description:
              'Screen: 14" UHD OLED, 3840x2160 / Intel Core i7-1260P / RAM 16 GB / 1TB SSD / Wi-Fi 6E / Bluetooth 5.2 / Windows 11 Home / 66 Wh battery',
            status: "AVAILABLE",
            tags: ["category:electronics"],
            image:
              "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/computer_1-J0a7bI2jB5NozuSaXnzyMtxHyijWoD.jpg",
            price: 1999,
          },
        },
      ],
    },
  ],
};

exports.userOrders = userOrders;
exports.adminOrders = adminOrders;
