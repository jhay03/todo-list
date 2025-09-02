import { connectToMongoDB } from "@/lib/database";
import TodoItem from "@/models/list_of_todo";
import { NextResponse, NextRequest } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const { name, description, tags, completed, priority } = body;

    if (!name || !description || !tags || !priority) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectToMongoDB();

    const updatedTodo = await TodoItem.findByIdAndUpdate(
      id,
      { name, description, tags, completed, priority },
      { new: true }
    );

    if (!updatedTodo) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Todo successfully updated", todo: updatedTodo },
      { status: 200 }
    );
  } catch (error) {
    console.error("[TODO_UPDATE_ERROR]", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const { completed } = body;

    if (typeof completed !== "boolean") {
      return NextResponse.json(
        { message: "Completed must be a boolean" },
        { status: 400 }
      );
    }

    await connectToMongoDB();

    const updatedTodo = await TodoItem.findByIdAndUpdate(
      id,
      { completed },
      { new: true }
    );

    if (!updatedTodo) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Todo completion status updated", todo: updatedTodo },
      { status: 200 }
    );
  } catch (error) {
    console.error("[TODO_COMPLETE_UPDATE_ERROR]", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
