import Users from "../../../../models/users";
import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../config/database";
import jwt from "jsonwebtoken";

export async function POST(req, res) {
  connectMongoDB();
  try {
    const { email, password } = await req.json();
    console.log("Entrou no try", email, password);

    const user = await Users.findOne({ email }).select("+password");

    if (!user) {
      NextResponse.json({ message: "Usuário não encontrado" });
      return;
    }

    if (password !== user.password) {
      res.status(401).json({ msg: "E-mail e/ou senha incorreta" });
      return;
    }

    user.password = undefined; // retirando a senha pra não mostrar

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      subject: String(user.id),
      expiresIn: 86400,
    }); // gerando o token... 68400 é para expirar em 1 dia

    return NextResponse.json({ user, token, status: 200 });
  } catch (error) {
    return Response.json({ message: "Error", error }, { status: 500 });
  }
}
