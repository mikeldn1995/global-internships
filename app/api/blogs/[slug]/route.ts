import { NextRequest, NextResponse } from 'next/server';
import { query, initDatabase } from '@/lib/db';
import { validateSession, getSessionFromCookies } from '@/lib/auth';

// GET - Get single blog by slug
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await initDatabase();
    
    const result = await query(
      'SELECT * FROM blogs WHERE slug = $1',
      [params.slug]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ blog: result.rows[0] });
  } catch (error: any) {
    console.error('Error fetching blog:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog' },
      { status: 500 }
    );
  }
}

// PUT - Update blog (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
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

    // Generate new slug if title changed
    const newSlug = title
      ? title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
      : null;

    const updateFields = [];
    const values = [];
    let paramCount = 1;

    if (title) {
      updateFields.push(`title = $${paramCount++}`);
      values.push(title);
    }
    if (newSlug) {
      updateFields.push(`slug = $${paramCount++}`);
      values.push(newSlug);
    }
    if (content !== undefined) {
      updateFields.push(`content = $${paramCount++}`);
      values.push(content);
    }
    if (excerpt !== undefined) {
      updateFields.push(`excerpt = $${paramCount++}`);
      values.push(excerpt);
    }
    if (image_url !== undefined) {
      updateFields.push(`image_url = $${paramCount++}`);
      values.push(image_url);
    }
    if (published_date) {
      updateFields.push(`published_date = $${paramCount++}`);
      values.push(published_date);
    }

    updateFields.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(params.slug);

    const result = await query(
      `UPDATE blogs SET ${updateFields.join(', ')} WHERE slug = $${paramCount} RETURNING *`,
      values
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ blog: result.rows[0] });
  } catch (error: any) {
    console.error('Error updating blog:', error);
    return NextResponse.json(
      { error: 'Failed to update blog' },
      { status: 500 }
    );
  }
}

// DELETE - Delete blog (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
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
    
    const result = await query(
      'DELETE FROM blogs WHERE slug = $1 RETURNING *',
      [params.slug]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog' },
      { status: 500 }
    );
  }
}

