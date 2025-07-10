const getQuote = async () => {
    try {
      const res = await fetch('https://api.quotable.io/random');
      const data = await res.json();
      return data.content;
    } catch (error) {
      return "Believe you can and you're halfway there.";
    }
  };
  
  export default getQuote;