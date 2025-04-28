import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get("/api/todo/:taskId/username", ({ params }) => {
    const { taskId } = params;
    return HttpResponse.json({ username: `User ${taskId}` });
  }),
];