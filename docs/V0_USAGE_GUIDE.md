# Using v0.dev with shadcn/ui - Quick Guide

## 🚀 Quick Start

1. **Go to [v0.dev](https://v0.dev)**
2. **Describe your component** in natural language
3. **Copy the generated code** - it uses shadcn components automatically
4. **Paste into your project** - it just works!

## 📝 Example Prompts for Real Estate Site

### Property Cards
```
Create a property card component with:
- Image at the top
- Price, address, and neighborhood
- Bed, bath, and square footage icons
- Open house badge if available
- Schedule Tour and View Details buttons
- Use shadcn Card, Button, and Badge components
```

### Contact Forms
```
Build a contact form with:
- Name, email, phone fields
- Dropdown for contact type (buyer/seller/investor)
- Message textarea
- Submit button with loading state
- Error and success messages
- Use shadcn Input, Label, Select, Textarea, Button, and Card
```

### Neighborhood Info Cards
```
Create a neighborhood information card showing:
- Neighborhood name and description
- Market stats (median price, days on market)
- Top 3 schools with ratings
- Key amenities list
- CTA button to view homes
- Use shadcn Card, Badge, and Button components
```

### Market Report Section
```
Design a market report section with:
- Monthly statistics in a grid
- Price trends chart area
- Key metrics cards
- Download report button
- Use shadcn Card, Button, and Badge
```

## 🎨 v0.dev Best Practices

### 1. Be Specific
❌ "Make a form"
✅ "Create a contact form with validation, loading states, and error handling using shadcn components"

### 2. Mention shadcn
Always include "use shadcn components" in your prompt:
```
Create a property search filter using shadcn Select, Checkbox, and Button components
```

### 3. Describe Functionality
Include behavior, not just appearance:
```
Build a property card that shows image, price, details, and has hover effects. 
Include a "Schedule Tour" button that opens a dialog. Use shadcn Card, Button, and Dialog.
```

### 4. Request Real Estate Specifics
```
Create a lead capture form for real estate with:
- Name, email, phone
- Property interest dropdown
- Price range selector
- Preferred contact method
- Terms checkbox
- Use shadcn form components
```

## 🔄 Workflow

```
1. Design in v0.dev
   ↓
2. Generate component code
   ↓
3. Copy to your project
   ↓
4. Customize colors/branding
   ↓
5. Add your business logic
```

## 📦 Components You Can Request

### Forms
- Contact forms
- Lead capture forms
- Property inquiry forms
- Newsletter signup
- Market report download

### Cards
- Property cards
- Neighborhood cards
- Agent profile cards
- Testimonial cards
- Market stat cards

### Navigation
- Header with search
- Footer with links
- Breadcrumbs
- Tabs for property details
- Accordion for FAQs

### Modals & Dialogs
- Property detail modals
- Schedule tour dialogs
- Contact form dialogs
- Image galleries

## 🎯 Real Estate Specific Examples

### Example 1: Property Search Filters
**Prompt:**
```
Create a property search filter sidebar with:
- Price range slider
- Bedroom/bathroom selectors
- Property type checkboxes
- Neighborhood multi-select
- Search button
- Reset filters button
Use shadcn Select, Checkbox, Slider, and Button components
```

### Example 2: Neighborhood Comparison
**Prompt:**
```
Build a comparison table showing 3 neighborhoods with:
- Name and image
- Median price
- Days on market
- School ratings
- Amenities count
- View homes button for each
Use shadcn Card, Table, and Button components
```

### Example 3: Agent Contact Card
**Prompt:**
```
Create an agent contact card with:
- Profile image
- Name and title
- Phone and email
- Social media links
- Call and email buttons
- Schedule meeting button
Use shadcn Card, Button, and Avatar components
```

## 💡 Pro Tips

1. **Start Simple**: Begin with basic components, then add complexity
2. **Iterate**: Generate, test, refine your prompt, regenerate
3. **Combine**: Generate multiple components and combine them
4. **Customize**: v0 generates the structure, you add your branding
5. **Reuse**: Save good prompts for similar components

## 🔗 Integration with Your Setup

All v0.dev components will automatically use:
- ✅ Your shadcn/ui components from `@/components/ui`
- ✅ Your `cn()` utility from `@/lib/utils`
- ✅ Your Tailwind config and CSS variables
- ✅ Your existing design tokens

Just paste and go! 🎉

