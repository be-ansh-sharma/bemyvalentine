'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [hearts, setHearts] = useState([]);

  // Generate hearts on client side only to avoid hydration issues
  useEffect(() => {
    setHearts(
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 8,
        size: Math.random() * 25 + 10,
        duration: Math.random() * 3 + 4,
      })),
    );
  }, []);

  const noMessages = [
    'No',
    'Nope 😊',
    "You can't escape it!",
    'Please Nikki 🥺',
    'Pretty please?',
    'With a cherry on top?',
    'Come on! 💕',
    "Don't be like that!",
    'Think about it!',
    'Just say yes!',
    'Please please please!',
    'You know you want to!',
    "I'm begging you! 🥺",
    'Last chance!',
    'NIKKI PLEASE! 😭',
  ];

  // Main sticker when asking
  const mainSticker = '/sticker1.gif';

  // Bubu and Dudu sad/crying stickers when clicking No
  const noStickers = [
    '/sticker-no-1.gif',
    '/sticker-no-2.gif',
    '/sticker-no-3.gif',
    '/sticker-no-4.gif',
    '/sticker-no-5.gif',
    '/sticker-no-6.gif',
    '/sticker-no-7.gif',
  ];

  // Happy sticker when saying Yes
  const yesSticker = '/sticker-yes.gif';

  const getNoButtonText = () => {
    return noMessages[Math.min(noCount, noMessages.length - 1)];
  };

  const getCurrentSticker = () => {
    if (yesPressed) return yesSticker;
    if (noCount === 0) return mainSticker;
    // Cycle through sticker-no-1 to sticker-no-7
    const stickerIndex = (noCount - 1) % noStickers.length;
    return noStickers[stickerIndex];
  };

  const getYesButtonSize = () => {
    return Math.min(20 + noCount * 5, 40);
  };

  const handleNoClick = () => {
    setNoCount(noCount + 1);
  };

  return (
    <div className='valentine-container'>
      <div className='hearts-background'>
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className='heart'
            style={{
              left: `${heart.left}%`,
              top: `${heart.top}%`,
              animationDelay: `${heart.delay}s`,
              animationDuration: `${heart.duration}s`,
              fontSize: `${heart.size}px`,
            }}
          >
            💕
          </div>
        ))}
      </div>

      {!yesPressed ? (
        <div className='content-wrapper'>
          <div className='sticker-container'>
            <Image
              src={getCurrentSticker()}
              alt='Bubu and Dudu'
              width={200}
              height={200}
              className='sticker-image'
            />
          </div>

          <h1 className='valentine-title'>
            Nikki, Will you be my Valentine? 💝
          </h1>

          <p className='valentine-subtitle'>
            {noCount === 0 && 'Please say yes! 🥺💕'}
            {noCount === 1 && 'Are you really gonna say no? 😢'}
            {noCount === 2 && 'Nikki please! I love you so much! 💕'}
            {noCount === 3 && 'You know you want to say yes! 🥺'}
            {noCount === 4 && 'Come on Nikki, my heart is breaking! 💔'}
            {noCount === 5 && "I'm literally begging you! 🥹"}
            {noCount === 6 && 'Just click Yes already! 😭💕'}
            {noCount === 7 && 'This is torture Nikki! 😢'}
            {noCount === 8 && "I promise I'll make you so happy! 💖"}
            {noCount === 9 && 'One little click on Yes? Please? 🥺'}
            {noCount === 10 && 'NIKKI BABY PLEASE! 😭💕'}
            {noCount > 10 && "I'm not giving up until you say yes! 💕💕💕"}
          </p>

          <div className='buttons-container'>
            <button
              className='yes-button'
              onClick={() => setYesPressed(true)}
              style={{
                fontSize: `${getYesButtonSize()}px`,
                padding: `${10 + noCount * 2}px ${30 + noCount * 5}px`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              Yes! 💖
            </button>

            <button
              className='no-button'
              onClick={handleNoClick}
              style={{
                fontSize: `${Math.max(18 - noCount * 1.5, 10)}px`,
                padding: `${Math.max(15 - noCount, 5)}px ${Math.max(35 - noCount * 3, 15)}px`,
              }}
            >
              {getNoButtonText()}
            </button>
          </div>
        </div>
      ) : (
        <div className='content-wrapper success-animation'>
          <div className='sticker-container'>
            <Image
              src={getCurrentSticker()}
              alt='Bubu and Dudu Happy'
              width={250}
              height={250}
              className='sticker-image celebration'
            />
          </div>

          <h1 className='valentine-title success'>Yaaay Nikki! 🎉💕</h1>

          <p className='valentine-message'>
            I knew you'd say yes! You just made me the happiest person ever!
            💖✨
          </p>

          <div className='celebration-text'>
            I love you so much Nikki! 💕💕💕
          </div>

          <p className='valentine-date'>
            Can't wait to hold you in my arms again! 💝✨
          </p>

          <p className='valentine-date'>Forever and always, you and me! 💕</p>
        </div>
      )}
    </div>
  );
}

