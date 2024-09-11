/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Inclua todos os arquivos JS/JSX/TS/TSX dentro da pasta src
  ],
  theme: {
    extend: {
      backgroundImage: {
        "fundo-perfil": "url('/fotofundo.png')",
        "fundo-historico": "url('/fundohistorico.png')",
        bandeira: "url('/bandeira-removebg-preview.png')",
      },
    },
  },
  plugins: [],
};
