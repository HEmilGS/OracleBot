import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Dashboard from "../Dashboard";
import axios from "axios";
import { act } from "react-dom/test-utils";

// Mock de Axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Dashboard", () => {
  beforeEach(() => {
    mockedAxios.get.mockClear();
  });

  test("displays personalized metrics based on user role", async () => {
    // Mock de datos para métricas
    mockedAxios.get.mockResolvedValueOnce({ data: [{ length: 5 }] }); // Pendientes
    mockedAxios.get.mockResolvedValueOnce({ data: [{ length: 3 }] }); // En progreso
    mockedAxios.get.mockResolvedValueOnce({ data: [{ length: 2 }] }); // Completadas

    render(<Dashboard />);

    // Verificar que las métricas se muestran correctamente
    await waitFor(() => {
      expect(screen.getByText("Completada")).toBeInTheDocument();
      expect(screen.getByText("Progreso")).toBeInTheDocument();
      expect(screen.getByText("Pendiente")).toBeInTheDocument();
      expect(screen.getByText("Total")).toBeInTheDocument();
    });

    expect(screen.getByText("5")).toBeInTheDocument(); // Pendientes
    expect(screen.getByText("3")).toBeInTheDocument(); // En progreso
    expect(screen.getByText("2")).toBeInTheDocument(); // Completadas
    expect(screen.getByText("10")).toBeInTheDocument(); // Total
  });

  test("responds to button clicks and updates the view", async () => {
    // Mock de datos para métricas
    mockedAxios.get.mockResolvedValueOnce({ data: [{ length: 5 }] }); // Pendientes
    mockedAxios.get.mockResolvedValueOnce({ data: [{ length: 3 }] }); // En progreso
    mockedAxios.get.mockResolvedValueOnce({ data: [{ length: 2 }] }); // Completadas

    render(<Dashboard />);

    // Esperar a que las métricas iniciales se carguen
    await waitFor(() => {
      expect(screen.getByText("Completada")).toBeInTheDocument();
    });

    // Simular clic en el botón "Important"
    const importantButton = screen.getByText("Important");
    fireEvent.click(importantButton);

    // Verificar que la vista cambia al hacer clic en el botón
    await waitFor(() => {
      expect(screen.getByText("Important")).toHaveClass("border-b-2 border-blue-500");
    });

    // Simular clic en el botón "Notes"
    const notesButton = screen.getByText("Notes");
    fireEvent.click(notesButton);

    // Verificar que la vista cambia al hacer clic en el botón
    await waitFor(() => {
      expect(screen.getByText("Notes")).toHaveClass("border-b-2 border-blue-500");
    });
  });
});