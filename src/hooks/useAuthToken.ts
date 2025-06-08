'use client'
import { useState } from "react";
import Cookies from 'js-cookie'
import { COOKIE_KEY } from '../config/constants'

export const useAuthToken = () => {
  // Get token from cookie initially
  const [token, setToken] = useState(() => Cookies.get(COOKIE_KEY) || "");

  // Function to save token in cookie
  const saveToken = (newToken: string) => {
    Cookies.set(COOKIE_KEY, newToken, {
      expires: 365,          // Expires in 365 days
      secure: false,        // Only sent over HTTPS
      sameSite: "Strict",  // Helps prevent CSRF attacks
      // sameSite: "Lax",  // Allow cookies across subdomains

    });
    setToken(newToken); // Update state
  };

  // Function to remove token from cookie
  const removeToken = () => {
    Cookies.remove(COOKIE_KEY);
    setToken(""); // Clear state
  };

  return { token, saveToken, removeToken };
};

