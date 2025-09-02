import { connectToMongoDB } from "@/lib/database";
import TodoItem from "@/models/list_of_todo";
import { NextResponse, NextRequest } from "next/server";
import type { RouteContext } from "@/types"; // Adjust path as needed

export async function GET(
  _req: NextRequest,
  _context: RouteContext<"/api/todos">
) {
  try {
    await connectToMongoDB();
    const todos = await TodoItem.find().sort({ priority: 1, name: 1 });
    return NextResponse.json({ success: true, todos }, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/todos:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  _context: RouteContext<"/api/todos">
) {
  try {
    const body = await req.json();
    const { name, description, tags, completed, priority } = body;

    if (!name || !description || !tags || !priority) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectToMongoDB();

    const newTodo = await TodoItem.create({
      name,
      description,
      tags,
      completed: completed ?? false,
      priority,
    });

    return NextResponse.json(
      { message: "Todo created", todo: newTodo },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating todo:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
