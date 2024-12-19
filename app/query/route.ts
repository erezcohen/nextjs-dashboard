// import { sql } from '@vercel/postgres';
import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';

const client = await db.connect();

export async function GET() {
  try {
    const data = await listInvoices();
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

async function listInvoices() {
  const data = await client.sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666
  `;

  return data.rows;
}
