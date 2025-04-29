test('renders dashboard for a specific role', async () => {
  render(<Dashboard role="developer" />);

  expect(screen.getByText('Developer Dashboard')).toBeInTheDocument();
});


test('renders completed tasks with required information', async () => {
    render(<Tasks tasks={[{ id: 1, title: 'Task 1', developer: 'User A', estimatedHours: 5, actualHours: 4 }]} />);
  
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('User A')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });