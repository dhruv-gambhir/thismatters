"use client";
import SideBar from "../Components/SideBar";
import { useState } from "react";
import { changePassword } from "../Authentication/auth";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async () => {
    if (!currentPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      alert("All fields are required!");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New Password and Confirm Password do not match!");
      return;
    }

    try {
      await changePassword(currentPassword, newPassword);
      alert("Password updated successfully!");
      // Optionally, you can redirect the user or reset the form here
    } catch (error) {
      console.error("Error changing password:", error);
      alert(`Failed to update password: ${error.message}`);
    }
  };

  return (
    <main className="min-h-screen flex flex-row">
      <SideBar />
            <div className="w-1/6"></div>
      <div className="flex-grow p-8">
        <h1 className="text-2xl font-bold mb-4">Change Password</h1>
        <div className="mb-4">
          <label className="block text-gray-700">Current Password</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">New Password</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Confirm New Password</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
          onClick={handleChangePassword}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Password
        </button>
      </div>
    </main>
  );
}
