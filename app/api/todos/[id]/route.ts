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

export async function DELETE(req: NextRequest) {
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
      { message: "An error occurred while deleting the todo " },
      { status: 500 }
    );
  }
}
