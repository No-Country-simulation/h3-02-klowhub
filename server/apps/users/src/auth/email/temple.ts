export const Temple_Verific_Email = ({
  email,
  verificationLink,
  logoUrl,
}: {
  email: string;
  verificationLink: string;
  logoUrl: string;
}) => {
  return {
    from: '"klowhub" <klowhub@gmail.com>', // Nombre visible
    to: email, // Recibe el email como parámetro
    subject: 'Verifica tu cuenta',
    html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f9f9f9;
                margin: 0;
                padding: 0;
              }
              .container {
                max-width: 600px;
                margin: 20px auto;
                background: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              }
              .header {
                text-align: center;
              }
              .header img {
                max-width: 150px;
              }
              .content {
                margin-top: 20px;
                text-align: center;
              }
              .button {
                display: inline-block;
                padding: 10px 20px;
                margin-top: 20px;
                background-color: #007bff;
                color: #ffffff;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
              }
              .footer {
                margin-top: 20px;
                font-size: 12px;
                color: #888888;
                text-align: center;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <img src="${logoUrl}" alt="Logo de tu empresa" />
              </div>
              <div class="content">
                <h1>Verifica tu cuenta</h1>
                <p>Haz clic en el botón de abajo para verificar tu cuenta.</p>
                <a class="button" href="${verificationLink}" target="_blank">Verificar mi cuenta</a>
              </div>
              <div class="footer">
                <p>Si no solicitaste esta verificación, ignora este correo.</p>
              </div>
            </div>
          </body>
        </html>
      `,
  };
};
