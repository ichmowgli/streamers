import { Config } from "tailwindcss";

const tailwindConfig: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'rubik': ['Rubik', 'sans-serif']
      },
    },
  },
  plugins: [],
};

export default tailwindConfig;