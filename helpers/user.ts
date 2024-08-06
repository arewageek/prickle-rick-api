import User from "../models/user";

type NewUserProps = {
  tgId: number;
  fullname?: string;
};

export async function getProfile(tgId: number): Promise<{
  status: number;
  message?: string;
  data?: typeof User | undefined;
}> {
  try {
    const user = await User.findOne({ telegramId: tgId });
    if (!user)
      return {
        status: 404,
        data: User,
        message: "Could not find any user with that id",
      };
    return { status: 200, data: User };
  } catch (error) {
    console.log({ error });
    return { status: 500, message: "An error occurred getting user data" };
  }
}

export async function createAccount({ tgId, fullname }: NewUserProps): Promise<{
  status: number;
  message: "success" | "unknownError" | "accountExist";
}> {
  try {
    const accountExist = await User.findOne({ telegramId: tgId });
    if (accountExist) return { status: 400, message: "accountExist" };

    // account not exist
    const user = new User({
      telegramId: tgId,
      fullname,
    });

    user.save();

    return {
      status: 201,
      message: "success",
    };
  } catch (error) {
    console.log({ error });
    return { status: 500, message: "unknownError" };
  }
}
