// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, phone, goal, instagram } = await request.json();

    // Vérification des champs requis
    if (!name || !email || !phone || !goal || !instagram) {
      return NextResponse.json(
        { error: 'Champs requis manquants' },
        { status: 400 }
      );
    }

    // Création du transporteur SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // ton mail Gmail
        pass: process.env.GMAIL_PASS, // mot de passe ou App Password
      },
    });

    // Envoi de l’email
    await transporter.sendMail({
      from: email, // mail du client
      to: process.env.GMAIL_USER, // ta boîte Gmail
      subject: `Nouvelle candidature de ${name}`,
      text: `
Nom: ${name}
Email: ${email}
Téléphone: ${phone}
Objectif: ${goal}
Instagram: ${instagram}
      `,
    });

    return NextResponse.json(
      { success: true, message: 'Message reçu' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur serveur :', error);
    return NextResponse.json(
      { error: 'Erreur serveur, veuillez réessayer plus tard' },
      { status: 500 }
    );
  }
}
