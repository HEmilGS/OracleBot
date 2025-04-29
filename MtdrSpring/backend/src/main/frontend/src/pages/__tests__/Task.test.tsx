// Task.test.tsx
import { render, screen } from '@testing-library/react';
import Tasks from '../Tasks';
import { Task } from '../../types/Task';

// Mock the axios call for getting usernames
jest.mock('axios', () => ({
  get: jest.fn((url) => {
    if (url.includes('/username')) {
      return Promise.resolve({ data: 'Mock User' });
    }
    return Promise.reject(new Error('Unexpected URL'));
  })
}));

describe('Tasks Component', () => {
  const mockTasks: Task[] = [
    {
      id: 1,
      title: "Implementar función de login",
      type: "feature",
      creation_ts: "2023-05-15T10:00:00Z",
      deadline: "2023-05-30T23:59:59Z",
      description: "Implementar el sistema de autenticación para usuarios",
      assignee: "john.doe@example.com",
      priority: "high",
      status: "in_progress",
      project_id: 5,
      user_id: 42,
      sprint: {
        id: 3,
        // otras propiedades del sprint si las hay
      },
      tiempoEstimado: "3 días",
    },
  ];

  test('renders tasks passed as props', async () => {
    render(<Tasks tasks={mockTasks} />);

    // Check if task titles are rendered
    expect(screen.getByText('Test Task 1')).toBeInTheDocument();
    expect(screen.getByText('Test Task 2')).toBeInTheDocument();

    // Check if task IDs are rendered
    expect(screen.getByText('#1')).toBeInTheDocument();
    expect(screen.getByText('#2')).toBeInTheDocument();

    // Check if creation time is rendered correctly
    expect(screen.getByText('opened 1 days ago')).toBeInTheDocument();
    expect(screen.getByText('opened 2 days ago')).toBeInTheDocument();

    // Check if priority badges are rendered
    expect(screen.getByText('High')).toBeInTheDocument();
    expect(screen.getByText('Low')).toBeInTheDocument();

    // Check if deadline status is rendered correctly
    expect(screen.getByText('due in 1 days')).toBeInTheDocument();
    expect(screen.getByText('deadline passed')).toBeInTheDocument();
  });

  test('renders user names after fetching them', async () => {
    render(<Tasks tasks={mockTasks} />);

    // Since username fetching is async, we need to wait for it
    expect(await screen.findAllByText(/Mock User|Loading.../)).toHaveLength(2);
  });

  test('renders correct priority styling', () => {
    render(<Tasks tasks={mockTasks} />);

    const highPriorityBadge = screen.getByText('High').closest('span');
    expect(highPriorityBadge).toHaveClass('bg-red-500/60');

    const lowPriorityBadge = screen.getByText('Low').closest('span');
    expect(lowPriorityBadge).toHaveClass('bg-green-500');
  });

  test('renders correct deadline styling', () => {
    render(<Tasks tasks={mockTasks} />);

    const futureDeadline = screen.getByText('due in 1 days').closest('span');
    expect(futureDeadline).toHaveClass('bg-[#4BA665]/15');

    const pastDeadline = screen.getByText('deadline passed').closest('span');
    expect(pastDeadline).toHaveClass('bg-[#C74634]/15');
  });
});