import { NextResponse } from 'next/server';
import { query, initDatabase } from '@/lib/db';

const EVENT_IMAGES = [
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
  'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80',
  'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
  'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
  'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80',
  'https://images.unsplash.com/photo-1524178232363-1fb2b95b8446?w=800&q=80',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80',
  'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
  'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80',
  'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
  'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80',
];

export async function GET() {
  try {
    await initDatabase();
    
    // Get all blogs
    const blogs = await query('SELECT id, slug FROM blogs ORDER BY id');
    
    // Update each blog with an image if missing
    for (let i = 0; i < blogs.rows.length; i++) {
      const blog = blogs.rows[i];
      const imageUrl = EVENT_IMAGES[i % EVENT_IMAGES.length];
      
      await query(
        'UPDATE blogs SET image_url = $1 WHERE id = $2',
        [imageUrl, blog.id]
      );
    }
    
    return NextResponse.json({ 
      success: true,
      message: `Updated images for ${blogs.rows.length} blogs`
    });
  } catch (error: any) {
    console.error('Error fixing blog images:', error);
    return NextResponse.json(
      { error: 'Failed to fix blog images', details: error.message },
      { status: 500 }
    );
  }
}

