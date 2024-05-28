/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#32313F',
        darkCardBg: '#1A0A2F',
        lightBg: '#F0F0F0',
        inputTextColor: "#7F7F7F",
        borderColor: "#A8A6A6",
        blueTheme: "#854CFF",
        darkBgBorder: "#7B01BE",
        darkFocusBorder: "#F610E3",
        darkage : "#BFBFBF"
      },
      boxShadow: {
        darkShadow: '12px  12px 30px rgba(0, 0, 0, 0.3 ), 12px 12px 30px rgba(0, 0, 0, 0.5)', 
       
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [
   
  ],
}

