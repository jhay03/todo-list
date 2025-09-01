import { connectToMongoDB } from "@/lib/database";
import TodoItem from "@/models/list_of_todo";
import { NextResponse } from "next/server";

export async function GET() {
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
export async function POST(req: Request) {
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

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToMongoDB();

    const todo = await TodoItem.findById(params.id);

    if (!todo) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    // Toggle the completed status
    todo.completed = !todo.completed;
    await todo.save();

    return NextResponse.json(
      { message: "Todo updated", todo },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in PATCH /api/todos/[id]/complete:", error);
    return NextResponse.json(
      { message: "Error updating todo" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { _id } = await req.json();
    if (!_id) {
      return NextResponse.json(
        { message: "Missing required fields _id" },
        { status: 400 }
      );
    }

    await connectToMongoDB();
    const deleted = await TodoItem.findByIdAndDelete(_id);

    if (!deleted) {
      return NextResponse.json({ message: "_id not found " }, { status: 404 });
    }
    return NextResponse.json({ message: "Todo deleted" }, { status: 201 });
  } catch (error) {
    console.log(error, "error in DELETE /api/todos");
    return NextResponse.json(
      { message: "An error occurred while deleting the doctor " },
      { status: 500 }
    );
  }
}
