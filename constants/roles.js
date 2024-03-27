export const ROLES = {
  ADMIN: 1,
  HOTEL_EMPLOYEE: 2,
  CUSTOMER: 3
};

export const ROLE_TO_API_PATH_MAPPING = {
  [ROLES.ADMIN]: [
    {
      method: 'GET',
      path: '/hotel/bookings/api/hotel'
    },
    {
      method: 'POST',
      path: '/hotel/bookings/api/hotel'
    },
    {
      method: 'PUT',
      path: '/hotel/bookings/api/hotel'
    },
    {
      method: 'DELETE',
      path: '/hotel/bookings/api/hotel'
    },
    {
      method: 'POST',
      path: '/hotel/bookings/api/hotel/employee'
    }
  ],
  [ROLES.HOTEL_EMPLOYEE]: [
    {
      method: 'GET',
      path: '/hotel/bookings/api/room'
    },
    {
      method: 'POST',
      path: '/hotel/bookings/api/room'
    },
    {
      method: 'PUT',
      path: '/hotel/bookings/api/room'
    },
    {
      method: 'DELETE',
      path: '/hotel/bookings/api/room'
    },
    {
      method: 'GET',
      path: '/hotel/bookings/api/booking/employee'
    },
    {
      method: 'DELETE',
      path: '/hotel/bookings/api/booking'
    }
  ],
  [ROLES.CUSTOMER]: [
    {
      method: 'GET',
      path: '/hotel/bookings/api/hotel'
    },
    {
      method: 'GET',
      path: '/hotel/bookings/api/booking'
    },
    {
      method: 'POST',
      path: '/hotel/bookings/api/booking'
    },
    {
      method: 'DELETE',
      path: '/hotel/bookings/api/booking'
    }
  ]
};
