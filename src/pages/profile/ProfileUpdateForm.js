import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProfileUpdateForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchUserSettings = async () => {
            try {
                const response = await axios.get('http://3.218.8.102/api/account');
                setFormData({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    email: response.data.email,
                });
                setLoading(false);
            } catch (err) {
                setError('Failed to load user settings.');
                setLoading(false);
            }
        };

        fetchUserSettings();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage('');
        try {
            const payload = {
                ...formData,
                id: 2,
                login: 'user',
                activated: true,
                langKey: 'en',
                createdBy: 'system',
                lastModifiedBy: 'admin',
            };

            await axios.post('http://3.218.8.102/api/account', payload);
            setSuccessMessage('Profile updated successfully!');
        } catch (err) {
            setError('Failed to update profile. Please try again.');
        }
    };

    if (loading) {
        return <div className="text-center mt-6">Loading...</div>;
    }

    return (
        <div className="bg-white shadow-lg p-8 rounded-lg w-full max-w-lg">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Update Personal Information</h1>

            {error && (
                <div className="bg-red-100 text-red-800 p-3 rounded-md mb-4">
                    {error}
                </div>
            )}

            {successMessage && (
                <div className="bg-green-100 text-green-800 p-3 rounded-md mb-4">
                    {successMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition duration-300"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
}

export default ProfileUpdateForm;
