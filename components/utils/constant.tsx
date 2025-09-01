export const generateId = (pre: string) => {
  return `${pre}-${Math.random().toString(36).substr(2, 9)}`;
};
export const mockTodos = [
  {
    // id: generateId("todos"),
    id: "1",
    title: "Cosmetic Issue",
    description: "This is a Cosmetic Issue",
    tags: ["UI"],
    completed: false,
    priority: "high",
  },
  {
    // id: generateId("todos"),
    id: "2",
    title: "Mis-alignment",
    description: "This is a Mis-alignment Issue",
    tags: ["UI"],
    completed: false,
    priority: "high",
  },
  {
    // id: generateId("todos"),
    id: "3",
    title: "Pipeline not working",
    description: "This is a Pipeline Issue",
    tags: ["Dev-ops"],
    completed: false,
    priority: "med",
  },
  {
    // id: generateId("todos"),
    id: "4",
    title: "PS and UI Issue",
    description: "This is a PS and UI Issue",
    tags: ["Dev-ops", "UI"],
    completed: false,
    priority: "low",
  },
  {
    // id: generateId("todos"),
    id: "5",
    title: "QA automation not working",
    description: "Automation script is failing",
    tags: ["QA"],
    completed: false,
    priority: "low",
  },
];
