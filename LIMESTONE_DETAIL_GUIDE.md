# Limestone Collection - Interactive Stone Details

## Overview
The limestone collection is now fully interactive! Users can click on any stone color (Blue, Yellow, or Grey) to view detailed information about each stone type, including sizes, finishes, applications, and care instructions.

## Features Implemented

### 1. **Navigation System**
- **Browse Collection Link**: Updated the "BROWSE COLLECTION" link in the Editorial Section to smoothly scroll to the color gallery
- **Stone Detail Pages**: Each color (Blue, Yellow, Grey) now has a dedicated detail page at:
  - `/limestone/blue` for Blue Limestone
  - `/limestone/yellow` for Yellow Limestone
  - `/limestone/grey` for Grey Limestone

### 2. **Color Browse Gallery** (`ColorBrowseGallery.js`)
Enhanced with:
- Direct navigation links on the color tiles
- Click anywhere on the tile OR use the "EXPLORE RANGE" button to navigate to the detail page
- Smooth animations and hover effects
- Real product images from your Pictures folder

### 3. **Limestone Detail Pages** (`LimestoneDetail.js`)
Each detail page includes:

#### Product Information
- High-quality product image
- Product code and comprehensive description
- Key specifications (Density, Compressive Strength, etc.)

#### Available Sizes & Types
- **Tiles**: 30 x 30 to 60 x 120 CM in various thicknesses
- **Cutter Slabs**: 120-150 x 60-90 x 3 & 4 CM
- **Palisades**: 100 x 25 x 6 CM
- **Wall Cladding**: 60 x 15 x 1.5-2.5 CM
- **Step Blocks**: 100-120 x 35-40 x 14-16 CM
- **Mosaic**: 30 x 30 x 1 CM
- **Pool Coping**: 60-100 x 30-60 x 3 CM
- **Cobbles**: 10 x 10 x 3-5-7-9 CM
- **Crazy Paving**: 30-60 x 30-60 x 2.5-3.5 CM
- **Stepping Stones**: 30 x 30, 60 x 40 x 2 & 3 CM

#### Finishing Options (8 finishes available)
- Natural
- Brushed
- Tumbled
- Tumbled and Brushed
- Antique
- Honed + sandblast
- Bush hammered
- Bush Hammered + Brushed

#### Edge Options
- Machine cut
- Hand cut

#### Why Choose This Stone
Each stone has unique benefits:
- **Blue Limestone**: Timeless Elegance, Exceptional Durability, Low Maintenance, Versatile Applications
- **Yellow Limestone**: Warm Aesthetic, Easy Workability, Consistent Coloring, Design Versatility
- **Grey Limestone**: Universal Appeal, Modern Sophistication, Aging Gracefully, Design Flexibility

#### Care & Maintenance
Specific maintenance tips for each stone type to ensure longevity and beauty.

#### Perfect For
Application suggestions for each stone color.

### 4. **User-Friendly Design**
- Responsive design for mobile, tablet, and desktop
- Smooth animations and transitions
- Interactive hover effects
- Intuitive navigation with breadcrumb links
- Clear call-to-action buttons (Request Quote, View Other Colors)

## How to Use

### For End Users:
1. Navigate to the "Browse our range of Exclusive Stone" section
2. Click on any of the three limestone colors (Blue, Yellow, or Grey)
3. You'll be taken to a detailed page showing:
   - Beautiful product image
   - Complete product specifications
   - All available sizes and types
   - Finishing options
   - Why you should choose this stone
   - Care instructions
   - Best applications

### Back Navigation:
- Use the "← Back to Limestone Collection" link at the top to return to the main page
- Use the "View Other Colors" button at the bottom to see other limestone options

## Files Modified

1. **ColorBrowseGallery.js**
   - Added navigation functionality
   - Updated stone data with real images
   - Added click handlers to navigate to detailed pages

2. **EditorialSection.js**
   - Made "BROWSE COLLECTION" link functional
   - Scroll to color gallery section

3. **LimestoneDetail.js**
   - Enhanced data structure with benefit and maintenance information
   - Added new UI sections for "Why Choose This Stone"
   - Added "Care & Maintenance" section
   - Improved visual presentation with hover effects and animations

4. **App.js**
   - Route already configured: `path="/limestone/:colorId"`

## Customization

To add new stone colors or modify information:

1. Open `LimestoneDetail.js`
2. Add new stone data in the `limestoneData` object:
   ```javascript
   newColor: {
     name: 'Stone Name',
     code: 'LST-CODE',
     image: importedImage,
     description: 'Description...',
     story: 'Stone story...',
     benefits: [...],
     types: [...],
     finishes: [...],
     edge: [...],
     maintenance: [...],
     specs: [...],
     applications: [...]
   }
   ```

3. Update `ColorBrowseGallery.js` to include the new color in the `colorTiles` array

## Mobile Responsiveness
The pages are fully responsive with:
- Mobile-optimized typography
- Touch-friendly buttons and links
- Proper spacing and layout on all screen sizes
- Optimized image loading

## Performance
- Optimized images for web
- Lazy loading with framer-motion's viewport detection
- Smooth scrolling with Lenis
- Efficient component re-rendering

---

**Ready to explore the stone collection!** 🪨
