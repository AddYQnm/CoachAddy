import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, phone, goals } = await request.json();

    if (!name || !email || !goals) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 });
    }

    // Crée le transporteur SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});


    await transporter.sendMail({
      from: email, // l’adresse du client
      to: process.env.GMAIL_USER, // ta boîte Gmail
      subject: `Nouvelle candidature de ${name}`,
      text: `Nom: ${name}\nEmail: ${email}\nTéléphone: ${phone}\nObjectifs: ${goals}`,
    });

    return NextResponse.json({ success: true, message: 'Message reçu' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
