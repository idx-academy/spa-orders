const orders = {
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
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      isPaid: true,
      orderStatus: "IN_PROGRESS",
      createdAt: "2024-06-27T12:35:14.396Z",
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
            id: "123e4567-e89b-12d3-a456-426614174000123",
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
            id: "123e4567-e89b-12d3-a456-426614174000111",
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
      isPaid: true,
      orderStatus: "COMPLETED",
      createdAt: "2024-06-30T14:25:15.396Z",
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
  ],
};

module.exports = orders;
