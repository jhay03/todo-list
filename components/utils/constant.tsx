import { Badge } from "@radix-ui/themes";

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
    tags: ["Devops"],
    completed: false,
    priority: "med",
  },
  {
    // id: generateId("todos"),
    id: "4",
    title: "PS and UI Issue",
    description: "This is a PS and UI Issue",
    tags: ["Devops", "UI"],
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

export const renderTags = (tags: string[]) => {
  return tags.map((tag) => {
    let color = "gray";
    let tagValue = "";
    switch (tag.toLowerCase()) {
      case "frontend":
        color = "cyan";
        tagValue = "Frontend";
        break;
      case "devops":
        color = "orange";
        tagValue = "DevOps";
        break;
      case "ui":
        color = "blue";
        tagValue = "UI";
        break;
      case "qa":
        color = "green";
        tagValue = "QA";
        break;
      default:
        color = "gray";
    }
    return (
      <Badge key={tag} color={color}>
        {tag}
      </Badge>
    );
  });
};

export const renderPriority = (priority: string) => {
  let color = "gray";
  let title = "";
  switch (priority.toLowerCase()) {
    case "1":
      color = "red";
      title = "High";
      break;
    case "2":
      color = "yellow";
      title = "Medium";
      break;
    case "3":
      color = "green";
      title = "Low";
      break;
    default:
      color = "gray";
  }
  return (
    <Badge color={color}>
      {title.charAt(0).toUpperCase() + title.slice(1)}
    </Badge>
  );
};
