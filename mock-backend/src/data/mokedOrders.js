const userOrders = {
  totalElements: 10,
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
    size: 10,
    sort: ["string"],
  },
  numberOfElements: 10,
  size: 10,
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
    size: 8,
    sort: ["string"],
  },
  numberOfElements: 0,
  size: 8,
  empty: true,
  content: [
    {
      id: "126bf189-9f8c-46ed-9138-f74d9d93206e",
      isPaid: true,
      orderStatus: "IN_PROGRESS",
      availableStatuses: ["SHIPPED", "DELIVERED", "COMPLETED", "CANCELED"],
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
      availableStatuses: [],
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
      orderStatus: "CANCELED",
      availableStatuses: [],
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
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa63",
      isPaid: false,
      orderStatus: "CANCELED",
      availableStatuses: [],
      createdAt: "2024-06-10T10:20:30.456Z",
      receiver: {
        firstName: "Anna",
        lastName: "Smith",
        email: "anna.smith@gmail.com",
      },
      postAddress: {
        deliveryMethod: "UKRPOSHTA",
        city: "Berlin",
        department: "№10",
      },
      total: 3999,
      orderItems: [
        {
          price: 1999,
          quantity: 1,
          product: {
            id: "123e4567-e89b-12d3-a456-426614174000133",
            name: "Samsung Galaxy S21",
            description:
              "Device type, operation system, etc.Device type, operation system, etc.Device type, operation system, etc.Device type, operation system, etc.",
            status: "AVAILABLE",
            tags: ["category:electronics"],
            image:
              "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/phone_3-Samsung.jpg",
            price: 1999,
          },
        },
        {
          price: 2000,
          quantity: 1,
          product: {
            id: "123e4567-e89b-12d3-a456-426614174000144",
            name: 'Laptop Asus ZenBook 14"',
            description:
              'Screen: 14" FHD OLED, 1920x1080 / Intel Core i5 / RAM 8 GB / 512GB SSD / Wi-Fi 6 / Bluetooth 5.2 / Windows 11 Home / 50 Wh battery',
            status: "AVAILABLE",
            tags: ["category:electronics"],
            image:
              "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/computer_3-Asus.jpg",
            price: 2000,
          },
        },
      ],
    },
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa64",
      isPaid: true,
      orderStatus: "IN_PROGRESS",
      availableStatuses: ["SHIPPED", "DELIVERED", "COMPLETED", "CANCELED"],
      createdAt: "2024-07-12T09:15:25.123Z",
      receiver: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@gmail.com",
      },
      postAddress: {
        deliveryMethod: "UKRPOSHTA",
        city: "New York",
        department: "№2",
      },
      total: 2499,
      orderItems: [
        {
          price: 999,
          quantity: 1,
          product: {
            id: "123e4567-e89b-12d3-a456-426614174000155",
            name: "Google Pixel 6",
            description:
              "Device type, operation system, etc.Device type, operation system, etc.Device type, operation system, etc.Device type, operation system, etc.",
            status: "AVAILABLE",
            tags: ["category:electronics"],
            image:
              "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/phone_4-Google.jpg",
            price: 999,
          },
        },
        {
          price: 1500,
          quantity: 1,
          product: {
            id: "123e4567-e89b-12d3-a456-426614174000166",
            name: "Laptop Lenovo ThinkPad X1",
            description:
              'Screen: 14" FHD IPS, 1920x1080 / Intel Core i7 / RAM 16 GB / 1TB SSD / Wi-Fi 6 / Bluetooth 5.2 / Windows 11 Pro / 80 Wh battery',
            status: "AVAILABLE",
            tags: ["category:electronics"],
            image:
              "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/computer_4-Lenovo.jpg",
            price: 1500,
          },
        },
      ],
    },
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa65",
      isPaid: false,
      orderStatus: "COMPLETED",
      availableStatuses: [],
      createdAt: "2024-07-18T11:30:40.789Z",
      receiver: {
        firstName: "Alice",
        lastName: "Johnson",
        email: "alice.johnson@gmail.com",
      },
      postAddress: {
        deliveryMethod: "UKRPOSHTA",
        city: "Paris",
        department: "№3",
      },
      total: 3299,
      orderItems: [
        {
          price: 1299,
          quantity: 1,
          product: {
            id: "123e4567-e89b-12d3-a456-426614174000177",
            name: "Sony Xperia 5 II",
            description:
              "Device type, operation system, etc.Device type, operation system, etc.Device type, operation system, etc.Device type, operation system, etc.",
            status: "AVAILABLE",
            tags: ["category:electronics"],
            image:
              "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/phone_5-Sony.jpg",
            price: 1299,
          },
        },
        {
          price: 2000,
          quantity: 1,
          product: {
            id: "123e4567-e89b-12d3-a456-426614174000188",
            name: "Laptop Acer Predator Helios 300",
            description:
              'Screen: 15.6" FHD, 1920x1080 / Intel Core i7 / RAM 32 GB / 1TB SSD / Wi-Fi 6 / Bluetooth 5.2 / Windows 11 Home / 90 Wh battery',
            status: "AVAILABLE",
            tags: ["category:electronics"],
            image:
              "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/computer_5-Acer.jpg",
            price: 2000,
          },
        },
      ],
    },
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa66",
      isPaid: true,
      orderStatus: "DELIVERED",
      availableStatuses: ["COMPLETED", "CANCELED"],
      createdAt: "2024-07-22T16:45:55.456Z",
      receiver: {
        firstName: "David",
        lastName: "Brown",
        email: "david.brown@gmail.com",
      },
      postAddress: {
        deliveryMethod: "UKRPOSHTA",
        city: "London",
        department: "№8",
      },
      total: 2799,
      orderItems: [
        {
          price: 1299,
          quantity: 1,
          product: {
            id: "123e4567-e89b-12d3-a456-426614174000199",
            name: "OnePlus 9 Pro",
            description:
              "Device type, operation system, etc.Device type, operation system, etc.Device type, operation system, etc.Device type, operation system, etc.",
            status: "AVAILABLE",
            tags: ["category:electronics"],
            image:
              "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/phone_6-OnePlus.jpg",
            price: 1299,
          },
        },
        {
          price: 1500,
          quantity: 1,
          product: {
            id: "123e4567-e89b-12d3-a456-426614174000200",
            name: "Laptop Dell G5 15",
            description:
              'Screen: 15.6" FHD, 1920x1080 / Intel Core i7 / RAM 16 GB / 512GB SSD / Wi-Fi 6 / Bluetooth 5.2 / Windows 11 Home / 60 Wh battery',
            status: "AVAILABLE",
            tags: ["category:electronics"],
            image:
              "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/computer_6-Dell.jpg",
            price: 1500,
          },
        },
      ],
    },
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa67",
      isPaid: false,
      orderStatus: "CANCELED",
      availableStatuses: [],
      createdAt: "2024-07-25T18:55:30.123Z",
      receiver: {
        firstName: "Emily",
        lastName: "White",
        email: "emily.white@gmail.com",
      },
      postAddress: {
        deliveryMethod: "UKRPOSHTA",
        city: "Rome",
        department: "№12",
      },
      total: 2399,
      orderItems: [
        {
          price: 1399,
          quantity: 1,
          product: {
            id: "123e4567-e89b-12d3-a456-426614174000211",
            name: "Huawei P40 Pro",
            description:
              "Device type, operation system, etc.Device type, operation system, etc.Device type, operation system, etc.Device type, operation system, etc.",
            status: "AVAILABLE",
            tags: ["category:electronics"],
            image:
              "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/phone_7-Huawei.jpg",
            price: 1399,
          },
        },
        {
          price: 1000,
          quantity: 1,
          product: {
            id: "123e4567-e89b-12d3-a456-426614174000222",
            name: 'Laptop Apple MacBook Air 13"',
            description:
              'Screen: 13" Retina, 2560x1600 / Apple M1 / RAM 8 GB / 256GB SSD / Wi-Fi 6 / Bluetooth 5.0 / macOS Big Sur',
            status: "AVAILABLE",
            tags: ["category:electronics"],
            image:
              "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/computer_7-MacBook.jpg",
            price: 1000,
          },
        },
      ],
    },
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa68",
      isPaid: true,
      orderStatus: "SHIPPED",
      availableStatuses: ["DELIVERED", "COMPLETED", "CANCELED"],
      createdAt: "2024-07-28T10:00:50.678Z",
      receiver: {
        firstName: "Michael",
        lastName: "Green",
        email: "michael.green@gmail.com",
      },
      postAddress: {
        deliveryMethod: "UKRPOSHTA",
        city: "Sydney",
        department: "№4",
      },
      total: 2199,
      orderItems: [
        {
          price: 1199,
          quantity: 1,
          product: {
            id: "123e4567-e89b-12d3-a456-426614174000233",
            name: "Samsung Galaxy S21 Ultra",
            description:
              "Device type, operation system, etc.Device type, operation system, etc.Device type, operation system, etc.Device type, operation system, etc.",
            status: "AVAILABLE",
            tags: ["category:electronics"],
            image:
              "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/phone_8-Samsung.jpg",
            price: 1199,
          },
        },
        {
          price: 1000,
          quantity: 1,
          product: {
            id: "123e4567-e89b-12d3-a456-426614174000244",
            name: "Laptop Microsoft Surface Laptop 4",
            description:
              'Screen: 13.5" PixelSense, 2256x1504 / Intel Core i5 / RAM 8 GB / 512GB SSD / Wi-Fi 6 / Bluetooth 5.0 / Windows 11 Home',
            status: "AVAILABLE",
            tags: ["category:electronics"],
            image:
              "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/computer_8-Microsoft.jpg",
            price: 1000,
          },
        },
      ],
    },
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa64",
      isPaid: true,
      orderStatus: "IN_PROGRESS",
      availableStatuses: ["SHIPPED", "DELIVERED", "COMPLETED", "CANCELED"],
      createdAt: "2024-07-12T09:15:25.123Z",
      receiver: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@gmail.com",
      },
      postAddress: {
        deliveryMethod: "UKRPOSHTA",
        city: "New York",
        department: "№2",
      },
      total: 2499,
      orderItems: [
        {
          price: 999,
          quantity: 1,
          product: {
            id: "123e4567-e89b-12d3-a456-426614174000155",
            name: "Google Pixel 6",
            description:
              "Device type, operation system, etc.Device type, operation system, etc.Device type, operation system, etc.Device type, operation system, etc.",
            status: "AVAILABLE",
            tags: ["category:electronics"],
            image:
              "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/phone_4-Google.jpg",
            price: 999,
          },
        },
        {
          price: 1500,
          quantity: 1,
          product: {
            id: "123e4567-e89b-12d3-a456-426614174000166",
            name: "Laptop Lenovo ThinkPad X1",
            description:
              'Screen: 14" FHD IPS, 1920x1080 / Intel Core i7 / RAM 16 GB / 1TB SSD / Wi-Fi 6 / Bluetooth 5.2 / Windows 11 Pro / 80 Wh battery',
            status: "AVAILABLE",
            tags: ["category:electronics"],
            image:
              "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/computer_4-Lenovo.jpg",
            price: 1500,
          },
        },
      ],
    },
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa65",
      isPaid: false,
      orderStatus: "IN_PROGRESS",
      availableStatuses: ["SHIPPED", "DELIVERED", "COMPLETED", "CANCELED"],
      createdAt: "2024-07-18T11:30:40.789Z",
      receiver: {
        firstName: "Alice",
        lastName: "Johnson",
        email: "alice.johnson@gmail.com",
      },
      postAddress: {
        deliveryMethod: "UKRPOSHTA",
        city: "Paris",
        department: "№3",
      },
      total: 3299,
      orderItems: [
        {
          price: 1299,
          quantity: 1,
          product: {
            id: "123e4567-e89b-12d3-a456-426614174000177",
            name: "Sony Xperia 5 II",
            description:
              "Device type, operation system, etc.Device type, operation system, etc.Device type, operation system, etc.Device type, operation system, etc.",
            status: "AVAILABLE",
            tags: ["category:electronics"],
            image:
              "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/phone_5-Sony.jpg",
            price: 1299,
          },
        },
        {
          price: 2000,
          quantity: 1,
          product: {
            id: "123e4567-e89b-12d3-a456-426614174000188",
            name: "Laptop Acer Predator Helios 300",
            description:
              'Screen: 15.6" FHD, 1920x1080 / Intel Core i7 / RAM 32 GB / 1TB SSD / Wi-Fi 6 / Bluetooth 5.2 / Windows 11 Home / 90 Wh battery',
            status: "AVAILABLE",
            tags: ["category:electronics"],
            image:
              "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/computer_5-Acer.jpg",
            price: 2000,
          },
        },
      ],
    },
  ],
};

exports.userOrders = userOrders;
exports.adminOrders = adminOrders;
