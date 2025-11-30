'use client'

import Image from "next/image";
import styles from "./page.module.css";
import React, { useEffect, useState } from 'react';


export default function Home() {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any | null>(null);
  const [isTelegramEnv, setIsTelegramEnv] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).Telegram?.WebApp) {
      setIsTelegramEnv(true);
      initTelegramApp();
    } else {
      setIsLoading(false);
      setError('This app only works in Telegram');
    }
  }, []);

  const initTelegramApp = () => {
    try {
      const tg = (window as any).Telegram.WebApp;
      
      tg.expand();
      
      tg.enableClosingConfirmation();
      
      // Get user info
      const user = tg.initDataUnsafe?.user;
      
      if (user) {
        setUserInfo({
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name || '',
          username: user.username || undefined, 
          languageCode: user.language_code || 'en',
          isPremium: user.is_premium || false,
          photoUrl: user.photo_url || null,
          addedToAttachmentMenu: user.added_to_attachment_menu || false
        });
      } else {
        setError('Cannot get user info');
      }
      
      setIsLoading(false);
      
      // Theme config
      tg.setHeaderColor('#2563eb');
      tg.setBackgroundColor('#f3f4f6');
      
    } catch (err) {
      setError('Error when initing');
      setIsLoading(false);
    }
  };

  const sendDataToBot = () => {
    if ((window as any).Telegram?.WebApp) {
      const tg = (window as any).Telegram.WebApp;
      tg.sendData(JSON.stringify(userInfo));
      tg.close();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md">
          <div className="text-red-500 text-5xl mb-4 text-center">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">Error occurred</h2>
          <p className="text-gray-600 text-center">{error}</p>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>NOTE:</strong> Open this app in Telegram.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      Welcome {userInfo.firstName}!
    </div>
  );
}
