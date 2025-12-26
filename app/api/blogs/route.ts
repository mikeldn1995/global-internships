import { NextRequest, NextResponse } from 'next/server';
import { query, initDatabase } from '@/lib/db';
import { validateSession, getSessionFromCookies } from '@/lib/auth';

// GET - List all blogs
export async function GET(request: NextRequest) {
  try {
    await initDatabase();
    
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    const result = await query(
      `SELECT id, title, slug, excerpt, image_url, published_date, created_at, updated_at
       FROM blogs
       ORDER BY published_date DESC
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    const countResult = await query('SELECT COUNT(*) FROM blogs');
    const total = parseInt(countResult.rows[0].count);

    return NextResponse.json({
      blogs: result.rows,
      total,
      limit,
      offset,
    });
  } catch (error: any) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

// POST - Create new blog (admin only)
export async function POST(request: NextRequest) {
  try {
    const token = await getSessionFromCookies();
    const isAuthenticated = await validateSession(token);

    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await initDatabase();
    const body = await request.json();
    const { title, content, excerpt, image_url, published_date } = body;

    if (!title || !content || !published_date) {
      return NextResponse.json(
        { error: 'Title, content, and published_date are required' },
        { status: 400 }
      );
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const result = await query(
      `INSERT INTO blogs (title, slug, content, excerpt, image_url, published_date)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [title, slug, content, excerpt || null, image_url || null, published_date]
    );

    return NextResponse.json({ blog: result.rows[0] }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating blog:', error);
    if (error.code === '23505') {
      return NextResponse.json(
        { error: 'A blog with this title already exists' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create blog' },
      { status: 500 }
    );
  }
}

