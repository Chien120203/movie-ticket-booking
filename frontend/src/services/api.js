// src/services/api.js
import axios from "axios";

const API_URL = "http://localhost:8080/api";

// Create an axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Function to register a user
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Function to log in a user
export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Function to verify email
export const verifyEmail = async (token) => {
  try {
    const response = await api.get(`/auth/verify-email?token=${token}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Function to log out a user
export const logoutUser = async () => {
  try {
    await api.post("/auth/logout");
    localStorage.removeItem('user');
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Function to update user information
export const updateUser = async (updatedData) => {
  try {
    const userData = JSON.parse(localStorage.getItem('user'));
    const userId = userData?._id;
    const token = userData?.accessToken;
    if (!userId || !token) {
      throw new Error("UserId or Token not found in localStorage");
    }

    const response = await api.put(`/users/${userId}`, updatedData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Update user error:", error);
    throw error.response ? error.response.data : error.message;
  }
};

// Function to get user details by user ID
export const getUser = async () => {
  try {
    const userData = JSON.parse(localStorage.getItem('user'));
    const userId = userData?._id;
    const token = userData?.accessToken;
    if (!userId || !token) {
      throw new Error("UserId or Token not found in localStorage");
    }

    const response = await api.get(`/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Get user error:", error);
    throw error.response ? error.response.data : error.message;
  }
};

// Function to change the user's password
export const changePassword = async (oldPassword, newPassword) => {
  try {
    const userData = JSON.parse(localStorage.getItem('user'));
    const userId = userData?._id;
    const token = userData?.accessToken;

    if (!userId || !token) {
      throw new Error("UserId or Token not found in localStorage");
    }

    const response = await api.post(`/users/change-password/${userId}`, {
      oldPassword,
      newPassword,
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Change password error:", error);
    throw error.response ? error.response.data : error.message;
  }
};

// Function to send forgot password OTP
export const sendForgotPasswordOTP = async (email) => {
  try {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  } catch (error) {
    console.error("Send OTP error:", error);
    throw error.response ? error.response.data : error.message;
  }
};

// Function to reset password with OTP
export const resetPasswordWithOTP = async (email, otp, newPassword) => {
  try {
    const response = await api.post("/auth/reset-password", { email, otp, newPassword });
    return response.data;
  } catch (error) {
    console.error("Reset password error:", error);
    throw error.response ? error.response.data : error.message;
  }
};