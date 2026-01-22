// Sistema de email usando Nodemailer
// Configure as variáveis de ambiente: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS

export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string
  subject: string
  html: string
  text?: string
}) {
  // Em produção, implemente com Nodemailer ou serviço como SendGrid, Resend, etc.
  // Por enquanto, apenas log para desenvolvimento
  
  console.log('📧 Email enviado:', {
    to,
    subject,
    html,
    text,
  })

  // Exemplo com Nodemailer (descomente e configure):
  /*
  const nodemailer = require('nodemailer')
  
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to,
    subject,
    html,
    text,
  })
  */

  return { success: true }
}

export async function sendEventConfirmationEmail({
  to,
  userName,
  eventName,
  eventDate,
  amount,
  receiptUrl,
}: {
  to: string
  userName: string
  eventName: string
  eventDate: Date
  amount: number
  receiptUrl?: string | null
}) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #000; color: #FFD700; padding: 20px; text-align: center; }
          .content { background: #f9f9f9; padding: 20px; }
          .button { display: inline-block; background: #FFD700; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Sul Brasileiro de Motovelocidade</h1>
          </div>
          <div class="content">
            <h2>Confirmação de Inscrição</h2>
            <p>Olá, <strong>${userName}</strong>!</p>
            <p>Sua inscrição no evento <strong>${eventName}</strong> foi confirmada com sucesso!</p>
            <p><strong>Data do Evento:</strong> ${new Date(eventDate).toLocaleDateString('pt-BR', { 
              day: '2-digit', 
              month: 'long', 
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
            <p><strong>Valor Pago:</strong> R$ ${amount.toFixed(2)}</p>
            ${receiptUrl ? `<p><a href="${receiptUrl}" class="button">Ver Comprovante</a></p>` : ''}
            <p>Nos vemos no evento!</p>
            <p>Atenciosamente,<br>Equipe SBM</p>
          </div>
        </div>
      </body>
    </html>
  `

  const text = `
    Confirmação de Inscrição
    
    Olá, ${userName}!
    
    Sua inscrição no evento ${eventName} foi confirmada com sucesso!
    
    Data do Evento: ${new Date(eventDate).toLocaleDateString('pt-BR')}
    Valor Pago: R$ ${amount.toFixed(2)}
    
    ${receiptUrl ? `Comprovante: ${receiptUrl}` : ''}
    
    Nos vemos no evento!
    
    Atenciosamente,
    Equipe SBM
  `

  return sendEmail({
    to,
    subject: `Confirmação de Inscrição - ${eventName}`,
    html,
    text,
  })
}
