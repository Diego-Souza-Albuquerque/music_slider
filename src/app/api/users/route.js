import Users from "../../../models/users";
import { NextResponse } from "next/server";
import connectMongoDB from "../../../../config/database";
import bcryptjs from "bcryptjs";

export async function GET() {
  try {
    connectMongoDB();
    const users = await Users.find();

    return NextResponse.json({ users }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Error", err },
      { status: 500 }
    ); /* ou 422 */
  }
}

export async function POST(req) {
  connectMongoDB();
  try {
    const { name, email, password } = await req.json();
    const user = await Users.findOne({ email: email });
    console.log(user);

    if (user) {
      return NextResponse.json(
        {
          message:
            "Infelizmente este email já está sendo utilizado, tente outro email!",
        },
        { status: 201 }
      );
    }
    /*  const hash = await bcryptjs.hash(this.password, 10); //dando 10 saltos */

    const User = await Users.create({ name, email, password });
    console.log(User);
    /* User.password = undefined; */

    console.log(password);

    return NextResponse.json(
      { message: "Usuário cadastrado com sucesso" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function DELETE(request) {
  connectMongoDB();
  const id = request.nextUrl.searchParams.get("id");

  try {
    const userToDelete = await Users.findById(id);

    if (!userToDelete) {
      return NextResponse.json(
        { message: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    const deletedUser = await Users.findByIdAndDelete(id);

    return NextResponse.json(
      { message: `Usuário ${deletedUser.nome} deletado` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    return NextResponse.json(
      { message: "Erro ao excluir usuário" },
      { status: 500 }
    );
  }
}
