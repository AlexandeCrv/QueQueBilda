/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Inclua todos os arquivos JS/JSX/TS/TSX dentro da pasta src
  ],
  theme: {
    extend: {
      colors: {
        dourado: "#463714",
        fundopreto: "#02070f",
        azul: "#E84057",
        vermelho: "#5383E8",
        vermelhomaisescuro: "#59343b",
        azulmaisescuro: "#28344e",
      },
      backgroundImage: {
        "fundo-login": "url('/fundologin.png')",
        "fundo-historico": "url('/fundohistorico.png')",
        "fundo-perfil": "url('/fundoperfil.png')",
        bandeira: "url('/bandeira-removebg-preview.png')",
      },
    },
  },
  plugins: [],
};
