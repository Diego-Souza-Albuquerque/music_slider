import Users from "../../../../models/users";
import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../config/database";

export async function GET(req, { params }) {
  try {
    connectMongoDB;
    const { id } = params;
    const user = await Users.findOne({ _id: id });
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    connectMongoDB;
    const { id } = params;
    const { newName: name, newEmail: email } = await req.json();
    await Users.findByIdAndUpdate(id, { name, email });
    return NextResponse.json(
      { message: "Atualização realizada" },
      { status: 200 }
    );
  } catch (error) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
