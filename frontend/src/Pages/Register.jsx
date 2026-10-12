import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios.js'
import { authContext } from '../Context/AuthContextProvider.jsx';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const {setUser} = useContext(authContext);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/api/auth/register", formData);

            if (res.data.success) {
                setUser(res.data.user)
                navigate("/dashboard");
            }
        } catch (error) {
            console.log(error.response?.data?.message || "Something went wrong");
        }


    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 font-sans text-slate-900">

            <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-8">


                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">Create an account</h2>
                    <p className="text-sm text-slate-500 mt-2">Join TeamSync and start collaborating</p>
                </div>


                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="name">
                            Full Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                            placeholder="John Doe"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            minLength="6"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                            placeholder="••••••••"
                        />
                        <p className="text-xs text-slate-500 mt-2">Must be at least 6 characters long.</p>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors  mt-2"
                    >
                        Create Account
                    </button>
                </form>


                <p className="mt-8 text-center text-sm text-slate-600">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-blue-600 hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;