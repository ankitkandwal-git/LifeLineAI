// import React, { useState } from "react";
// import { Link } from "react-router-dom"; // Import Link
// import { useNavigate } from "react-router-dom"; // Import useNavigate
// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error,setError] = useState(null);
//   const handleSubmit = async(e) => {
//     e.preventDefault();
//     setError(null); // Clear previous errors
//     if(!email || !password){
//       setError("Please fill in all fields.");
//       return;
//     }
//     const response = await fetch("http://localhost:5000/api/login", {
//         method: "POST",
//         headers:{
//             "Content-Type":"application/json"
//         },
//         body: JSON.stringify({email,password})
//     })
//     const data = await response.json();
//     if(response.ok){
//         localStorage.setItem("token",data.token);
//         navigate('/hero')
//     }
//     else{
//         setError(data.message || "Login failed. Please try again.");
//     }
    
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4">
//       <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-2xl ring-1 ring-blue-200/50 dark:ring-blue-900/50 w-full max-w-md transform transition-all duration-300 hover:scale-[1.01] hover:shadow-blue-500/30">
//         <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
//           Login LifeLineAI
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Email Input */}
//           <div className="flex flex-row items-center gap-4">
//             <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300 w-1/3">
//               Email Address
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white dark:placeholder-gray-400"
//               placeholder="you@example.com"
//             />
//           </div>

//           {/* Password Input */}
//           <div className="flex flex-row items-center gap-4">
//             <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300 w-1/3">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white dark:placeholder-gray-400"
//               placeholder="••••••••"
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
//           >
//             Login
//           </button>
//           {error && (
//             <p className="mt-4 text-center text-sm text-red-600 dark:text-red-400">
//               {error}
//             </p>
//           )}
//           <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
//             Don't have an account?{" "}
//             <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
//               Register here
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
