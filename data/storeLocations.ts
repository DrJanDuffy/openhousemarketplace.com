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

export const storeLocations: StoreLocation[] = [
  {
    id: 'summerlin-west',
    name: 'Dr. Jan Duffy Real Estate',
    address: 'Summerlin West',
    city: 'Las Vegas',
    state: 'NV',
    zip: '89135',
    lat: 36.1699,
    lng: -115.3301,
    phone: '(702) 200-3422',
    hours: 'Monday–Friday 9am–6pm, Saturday–Sunday 10am–4pm. By appointment outside hours.',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=36.1699,-115.3301',
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
