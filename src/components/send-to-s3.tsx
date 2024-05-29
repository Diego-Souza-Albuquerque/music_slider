import AWS from "aws-sdk";

  const uploadToS3 = async (pptxBlob: any, props: any) => {
  try {
    // Configuração das informações necessárias para fazer upload para o Amazon S3

    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

    if (!accessKeyId || !secretAccessKey) {
      throw new Error("AWS credentials are not set properly.");
    }

    const s3Config = {
      region: "us-east-1",
       credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      },
    };

    // Configurando as credenciais e região para o serviço S3
    AWS.config.update(s3Config);

    // Criando uma instância do serviço S3 da AWS
    const s3 = new AWS.S3();

    // Configurações para o upload do arquivo
    const uploadParams = {
      Bucket: "musicslider",
      Key: `${props.title}-${props.author}.pptx`, // Nome do arquivo no S3
      Body: pptxBlob,
      ContentType: "application/octet-stream",
      ACL: "public-read", // Permite que o arquivo seja acessível publicamente
    };

    // Fazendo o upload do arquivo para o Amazon S3
    const uploadResult = await s3.upload(uploadParams).promise();
    return uploadResult.Location
  } catch (error) {
    console.error("Erro ao enviar arquivo para o Amazon S3:", error);
  }
};

export default uploadToS3