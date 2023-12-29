import Users from "../models/users.js";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
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
};

export const createUser = async (req, res) => {
  connectMongoDB();
  try {
    const { name, email, password } = await req.json();
    const user = await Users.findOne({ email: email });
    console.log(user);

    if (user)
      return NextResponse.json(
        {
          message:
            "Infelizmente este email já está sendo utilizado, tente outro email!",
        },
        { status: 201 }
      );

    const User = await Users.create({ name, email, password });
    User.password = undefined;

    return NextResponse.json(
      { message: "Usuário cadastrado com sucesso" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};

export const deleteUser = async (req, res) => {
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
};

export const login = async (req, res) => {
  connectMongoDB();
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email }).select("+password");
    if (!user) {
      NextResponse.json({ message: "Usuário não encontrado" });
      return;
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { message: "Senha inválida", error },
        { status: 400 }
      );
    }
    user.password = undefined; // retirando a senha pra não mostrar

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 86400,
    }); // gerando o token... 68400 é para expirar em 1 dia
    return res.json({ user, token });
  } catch (error) {
    console.log(error);
  }
};
