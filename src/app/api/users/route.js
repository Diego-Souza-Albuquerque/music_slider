import Users from "../../../models/users";
import { NextResponse } from "next/server";

export async function GET() {
  try {
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

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");

  await Users.findByIdAndDelete(id);
  return NextResponse.json({ message: "Usuário deletado" }, { status: 200 });
}

/* export async function GET_ID(req) {
  try {
    const userId = req.query.id; // Obtém o parâmetro de ID da requisição
    const user = await Users.findById(userId);

    if (!user) {
      return NextResponse.json({ message: "Usuário não encontrado" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
} */

export async function POST(req) {
  try {
    /* const body = await req.json();
    const usersData = body.formData;
    await Users.create(usersData); */

    const { name, email } = await req.json();
    await Users.create({ name, email });
    return NextResponse.json(
      { message: "Usuário Criado com sucesso" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

/* 
router.post("/users", async (req, res) => {
  let { name } = req.body;
  try {
    let users = await Users.create({ name });
    res.status(200).json(users);
  } catch (error) {
    res.status(422).json(error);
  }
});

router.put("/users/:id", async (req, res) => {
  let { name } = req.body;
  try {
    let users = await Users.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    res.status(200).json(users);
  } catch (error) {
    res.status(422).json(error);
  }
});
 */
