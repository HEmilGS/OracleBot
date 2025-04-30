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
    mockedAxios.get.mockResolvedValueOnce({ data: [{ length: 5 }] }); 
    mockedAxios.get.mockResolvedValueOnce({ data: [{ length: 3 }] });
    mockedAxios.get.mockResolvedValueOnce({ data: [{ length: 2 }] }); 

    render(<Dashboard />);


    await waitFor(() => {
      expect(screen.getByText("Completada")).toBeInTheDocument();
      expect(screen.getByText("Progreso")).toBeInTheDocument();
      expect(screen.getByText("Pendiente")).toBeInTheDocument();
      expect(screen.getByText("Total")).toBeInTheDocument();
    });

    expect(screen.getByText("5")).toBeInTheDocument(); 
    expect(screen.getByText("3")).toBeInTheDocument(); 
    expect(screen.getByText("2")).toBeInTheDocument(); 
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  test("responds to button clicks and updates the view", async () => {

    mockedAxios.get.mockResolvedValueOnce({ data: [{ length: 5 }] }); 
    mockedAxios.get.mockResolvedValueOnce({ data: [{ length: 3 }] }); 
    mockedAxios.get.mockResolvedValueOnce({ data: [{ length: 2 }] });

    render(<Dashboard />);


    await waitFor(() => {
      expect(screen.getByText("Completada")).toBeInTheDocument();
    });


    const importantButton = screen.getByText("Important");
    fireEvent.click(importantButton);


    await waitFor(() => {
      expect(screen.getByText("Important")).toHaveClass("border-b-2 border-blue-500");
    });


    const notesButton = screen.getByText("Notes");
    fireEvent.click(notesButton);


    await waitFor(() => {
      expect(screen.getByText("Notes")).toHaveClass("border-b-2 border-blue-500");
    });
  });
});