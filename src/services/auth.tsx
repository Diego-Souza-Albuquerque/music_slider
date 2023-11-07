type singInRequestData = {
  email: string;
  password: string;
};

const delay = (amount = 750) =>
  new Promise((resolve) => setTimeout(resolve, amount));

export async function singInRequest(data: singInRequestData) {
  await delay();

  return {
    token: "12345678910",
    user: {
      name: "Diego Albuquerque",
      email: "ds_albuquerque@hotmail.com",
      avatar: "https://github.com/Diego-Souza-Albuquerque.png",
    },
  };
}
