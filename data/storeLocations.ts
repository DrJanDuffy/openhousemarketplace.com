/**
 * Store / office locations for the "Find our stores" map.
 * Add or edit entries to show all your locations on the website.
 */
export interface StoreLocation {
  id: string
  name: string
  address: string
  city: string
  state: string
  zip: string
  lat: number
  lng: number
  phone?: string
  /** Optional: e.g. "Mon–Fri 9am–6pm" */
  hours?: string
  /** Google Maps directions URL */
  directionsUrl: string
}

// Pin for office — must match NAP in config/gbp.ts (11773 Cashmere Mist Ave, Las Vegas, NV 89138)
const OFFICE_89138 = { lat: 36.1729722, lng: -115.3540974 }

export const storeLocations: StoreLocation[] = [
  {
    id: 'summerlin-west',
    name: 'Dr. Jan Duffy Real Estate',
    address: '11773 Cashmere Mist Ave',
    city: 'Las Vegas',
    state: 'NV',
    zip: '89138',
    lat: OFFICE_89138.lat,
    lng: OFFICE_89138.lng,
    phone: '(702) 200-3422',
    hours: 'Open daily 9:00 AM–5:00 PM (matches Google Business Profile). By appointment outside hours.',
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=11773+Cashmere+Mist+Ave,+Las+Vegas,+NV+89138',
  },
  // Add more locations here, e.g.:
  // {
  //   id: 'henderson',
  //   name: 'Dr. Jan Duffy Real Estate – Henderson',
  //   address: '123 Main St',
  //   city: 'Henderson',
  //   state: 'NV',
  //   zip: '89012',
  //   lat: 36.0395,
  //   lng: -115.9818,
  //   phone: '(702) 200-3422',
  //   hours: 'Mon–Fri 9am–5pm',
  //   directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=36.0395,-115.9818',
  // },
]
