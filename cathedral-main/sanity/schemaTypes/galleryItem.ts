// sanity/schemaTypes/galleryItem.ts
export default {
  name: 'galleryItem',
  title: 'Gallery Album', // Let's call it an Album now!
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Event/Folder Title',
      type: 'string',
      description: 'e.g., Mothering Sunday 2024'
    },
    {
      name: 'cat',
      title: 'Category',
      type: 'string',
      description: 'e.g., Sacraments, Worship, Community'
    },
    {
      name: 'images', // Changed from 'image' to 'images'
      title: 'Images',
      type: 'array', // This is the magic word!
      of: [
        { 
          type: 'image',
          options: { hotspot: true } 
        }
      ],
      options: {
        layout: 'grid', // This makes the Studio display them as a neat photo grid
      },
    },
  ],
};