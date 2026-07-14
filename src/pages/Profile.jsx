import { useState } from "react";
import { Mail, Phone, MapPin, Lock, LogOut, Plus } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, updateProfile, logout, loading, error } = useAuth();
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState(user?.username || "");
  const [phone, setPhone] = useState(user?.phone || "");

  const [newAddress, setNewAddress] = useState({
    country: "",
    city: "",
    street: "",
    building: "",
    postalCode: "",
  });
  const [addressNote, setAddressNote] = useState("");

  const handleSaveProfile = async () => {
    const ok = await updateProfile({ username, phone });
    if (ok) setEditMode(false);
  };

  const handleAddAddress = async () => {
    const updatedAddresses = [...(user.addresses || []), newAddress];
    const ok = await updateProfile({ addresses: updatedAddresses });
    if (ok) {
      setNewAddress({ country: "", city: "", street: "", building: "", postalCode: "" });
      setAddressNote("");
    } else {
      setAddressNote("السيرفر مش بيقبل تحديث العناوين حاليًا من هنا.");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>

      {/* Profile card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-8">
        <div className="flex items-center gap-4 mb-6">
          <img
            src={user?.avatar}
            alt={user?.username}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            {editMode ? (
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="text-lg font-bold text-gray-900 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-indigo-500"
              />
            ) : (
              <h2 className="text-lg font-bold text-gray-900">{user?.username}</h2>
            )}
            <p className="text-gray-500 text-sm">{user?.email}</p>
            <span className="text-indigo-600 text-sm font-medium capitalize">
              {user?.role}
            </span>
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <p className="flex items-center gap-2 text-gray-600 text-sm">
            <Mail size={15} /> {user?.email}
          </p>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <Phone size={15} />
            {editMode ? (
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-indigo-500"
              />
            ) : (
              <span>{user?.phone}</span>
            )}
          </div>
        </div>

        {error && <p className="text-sm text-red-500 mb-3">{error}</p>}

        {editMode ? (
          <div className="flex gap-3">
            <button
              onClick={handleSaveProfile}
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-sm font-semibold px-5 py-2 rounded-xl transition"
            >
              {loading ? "بيحفظ..." : "Save"}
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="border border-gray-200 dark:border-gray-600 text-gray-600 text-sm font-semibold px-5 py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="border border-indigo-600 text-indigo-600 text-sm font-semibold px-5 py-2 rounded-xl hover:bg-indigo-50 dark:hover:bg-gray-700 transition"
          >
            Edit Profile
          </button>
        )}
      </div>

      {/* Addresses card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-8">
        <h3 className="flex items-center gap-2 font-bold text-gray-900 mb-4">
          <MapPin size={18} className="text-indigo-600" /> Addresses
        </h3>

        {user?.addresses?.length ? (
          <div className="space-y-3 mb-4">
            {user.addresses.map((addr, i) => (
              <div key={i} className="text-sm text-gray-600 border border-gray-100 dark:border-gray-700 rounded-xl p-3">
                {addr.street}, {addr.building} — {addr.city}, {addr.country} ({addr.postalCode})
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-sm mb-4">No addresses yet.</p>
        )}

        <div className="grid grid-cols-2 gap-3 mb-3">
          <input
            placeholder="Country"
            value={newAddress.country}
            onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
            className="bg-transparent border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            placeholder="City"
            value={newAddress.city}
            onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
            className="bg-transparent border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            placeholder="Street"
            value={newAddress.street}
            onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
            className="bg-transparent border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            placeholder="Building"
            value={newAddress.building}
            onChange={(e) => setNewAddress({ ...newAddress, building: e.target.value })}
            className="bg-transparent border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            placeholder="Postal code"
            value={newAddress.postalCode}
            onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
            className="col-span-2 bg-transparent border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {addressNote && <p className="text-xs text-amber-600 mb-3">{addressNote}</p>}

        <button
          onClick={handleAddAddress}
          disabled={loading}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition"
        >
          <Plus size={16} /> Add Address
        </button>
      </div>

      {/* Change password card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-8">
        <h3 className="flex items-center gap-2 font-bold text-gray-900 mb-4">
          <Lock size={18} className="text-indigo-600" /> Change Password
        </h3>
        <button
          onClick={() => navigate("/forgot-password")}
          className="border border-indigo-600 text-indigo-600 text-sm font-semibold px-5 py-2 rounded-xl hover:bg-indigo-50 dark:hover:bg-gray-700 transition"
        >
          Change Password
        </button>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-2xl transition"
      >
        <LogOut size={18} /> Logout
      </button>
    </div>
  );
}