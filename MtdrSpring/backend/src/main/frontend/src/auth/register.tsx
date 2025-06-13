"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useSignUp } from "@clerk/clerk-react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

interface FormData {
  name: string
  email: string
  role: string
  phone: string
  city: string
  team: string
  password: string
  confirmPassword: string
}

export default function RegisterPage() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    role: "",
    phone: "",
    city: "",
    team: "",
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData & { general: string }>>({})
  const [teams, setTeams] = useState<{ id: string; name: string }[]>([])

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get("/api/equipos");
        // Mapea los equipos al formato que espera el select
        const equipos = Array.isArray(response.data)
          ? response.data.map((eq: any) => ({
              id: eq.idEquipo,
              name: eq.nombre,
            }))
          : [];
        setTeams(equipos);
        console.log("Teams fetched:", equipos);
      } catch (error) {
        setTeams([]);
        console.error("Error fetching Teams:", error);
      }
    };

    fetchTeams();
  }, []);



  const roles = [
    { id: "ADMIN", name: "ADMIN" },
    { id: "DEVELOPER", name: "DEVELOPER" }
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name as keyof FormData]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.name.trim()) newErrors.name = "El nombre es requerido"
    if (!formData.email.trim()) newErrors.email = "El correo es requerido"
    if (!formData.role) newErrors.role = "El rol es requerido"
    if (!formData.phone.trim()) newErrors.phone = "El teléfono es requerido"
    if (!formData.city.trim()) newErrors.city = "La ciudad es requerida"
    // if (!formData.team) newErrors.team = "El equipo es requerido"; // <--- Elimina o comenta esta línea
    if (!formData.password) newErrors.password = "La contraseña es requerida"
    if (formData.password.length < 8) newErrors.password = "La contraseña debe tener al menos 8 caracteres"
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Fragmento para el submit del registro
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    if (!isLoaded) return;

    try {
      // 1. Registrar en Clerk
      const result = await signUp.create({
        emailAddress: formData.email,
        password: formData.password,
        firstName: formData.name.split(" ")[0] || "",
        lastName: formData.name.split(" ").slice(1).join(" ") || "",
      });

      // Set publicMetadata after user creation
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });

        // 2. Registrar en tu backend
        const usuarioPayload: any = {
          nombre: formData.name,
          correo: formData.email,
          rol: formData.role,
          telefono: formData.phone,
          ciudad: formData.city,
        };
        if (formData.team) {
          usuarioPayload.equipo = { idEquipo: formData.team };
        }

        await axios.post("/api/usuarios", usuarioPayload);

        navigate("/");
      } else {
        setErrors({ general: "No se pudo completar el registro. Estado: " + result.status });
        console.log("SignUp result:", result);
      }
    } catch (err: any) {
      setErrors({ general: err.errors?.[0]?.message || "Error al registrarse." });
    } finally {
      setIsLoading(false);
    }
  };





  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Registro de Usuario</h2>
          <p className="text-gray-600 mt-2">Crea una nueva cuenta para acceder al sistema</p>
        </div>

        {errors.general && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-600 text-sm">{errors.general}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre completo *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Juan Pérez"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="correo@ejemplo.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Rol *
            </label>
            <select
              id="role"
              name="role"
              required
              value={formData.role}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 ${
                errors.role ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Selecciona un rol</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
            {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono *
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="+34 123 456 789"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              Ciudad *
            </label>
            <input
              id="city"
              name="city"
              type="text"
              required
              value={formData.city}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 ${
                errors.city ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Madrid"
            />
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
          </div>

          <div>
            <label htmlFor="team" className="block text-sm font-medium text-gray-700 mb-1">
              Equipo *
            </label>
            <select
              id="team"
              name="team"
              value={formData.team}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 ${
                errors.team ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Sin equipo (puedes crear uno después)</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
            {errors.team && <p className="text-red-500 text-xs mt-1">{errors.team}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña *
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirmar contraseña *
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="••••••••"
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading || !isLoaded}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 mt-6"
          >
            {isLoading ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}