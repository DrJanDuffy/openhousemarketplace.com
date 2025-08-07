declare namespace JSX {
  interface IntrinsicElements {
    'realscout-office-listings': {
      'agent-encoded-id'?: string
      'sort-order'?: string
      'listing-status'?: string
      'property-types'?: string
      'price-min'?: string
      'price-max'?: string
      [key: string]: any // Allow other custom attributes
    }
  }
}

// Also declare the global interface for better type safety
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'realscout-office-listings': {
        'agent-encoded-id'?: string
        'sort-order'?: string
        'listing-status'?: string
        'property-types'?: string
        'price-min'?: string
        'price-max'?: string
        [key: string]: any
      }
    }
  }
}

export {}
