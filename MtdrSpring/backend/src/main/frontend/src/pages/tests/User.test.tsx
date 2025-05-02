import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import User from "../user";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("User Component", () => {
    it("should display different information based on the user's role", async () => {
        const mockUserDataAdmin = {
            idUsuario: 1,
            nombre: "Admin User",
            correo: "admin@example.com",
            rol: "Admin",
            fechaCreacion: "2023-01-01",
            equipo: {
                id: 1,
                nombre: "Admin Team",
            },
        };

        const mockUserDataDeveloper = {
            idUsuario: 2,
            nombre: "Developer User",
            correo: "developer@example.com",
            rol: "Developer",
            fechaCreacion: "2023-02-01",
            equipo: {
                id: 2,
                nombre: "Dev Team",
            },
        };

        mockedAxios.get.mockImplementation((url) => {
            if (url === "/api/usuarios/1") {
                return Promise.resolve({ data: mockUserDataAdmin });
            } else if (url === "/api/usuarios/2") {
                return Promise.resolve({ data: mockUserDataDeveloper });
            }
            return Promise.reject(new Error("User not found"));
        });

        // Test for Admin User
        render(<User userData={mockUserDataAdmin} />);
        await waitFor(() => {
            expect(screen.getByText("Admin User")).toBeInTheDocument();
            expect(screen.getByText("Admin Team")).toBeInTheDocument();
            expect(screen.getAllByText("Admin")[0]).toBeInTheDocument(); // Más específico
        });

        // Test for Developer User
        render(<User userData={mockUserDataDeveloper} />);
        await waitFor(() => {
            expect(screen.getByText("Developer User")).toBeInTheDocument();
            expect(screen.getByText("Dev Team")).toBeInTheDocument();
            expect(screen.getAllByText("Developer")[0]).toBeInTheDocument(); // Más específico
        });
    });
});