import React, { useEffect, useState } from 'react';
import QuoteCard from '../components/QuoteCard';
import getQuote from '../untils/quoteApi';
import '../index.css';

import Img1 from '../assets/IMG_1.png';
import Img2 from '../assets/IMG_2.png';
import Img3 from '../assets/IMG_3.png';

const Quotes = () => {
  const [quote, setQuote] = useState('Loading...');

  useEffect(() => {
    getQuote().then(setQuote);
  }, []);

  return (
    <div className="quotes-page">
      <div className="quote-box">
        <h2>Quote of the Day</h2>
        <QuoteCard text={quote} />

        <div className="quote-gallery">
          <img src={Img1} alt="Quote Art 1" className="quote-img" />
          <img src={Img2} alt="Quote Art 2" className="quote-img" />
          <img src={Img3} alt="Quote Art 3" className="quote-img" />
        </div>
      </div>
    </div>
  );
};

export default Quotes;
