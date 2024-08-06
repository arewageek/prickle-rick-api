import ShortUniqueId from "short-unique-id";
import User, { type IUser } from "../models/user";

type NewUserProps = {
  tgId: number;
  fullname?: string;
  referredBy?: string;
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

export async function createAccount({
  tgId,
  fullname,
  referredBy,
}: NewUserProps): Promise<{
  status: number;
  message: "success" | "unknownError" | "accountExist";
}> {
  const uid = new ShortUniqueId({ length: 10 });

  const ref = referredBy || "admin";
  const referralCode = uid.rnd();

  try {
    const accountExist = await User.findOne({ telegramId: tgId });
    if (accountExist) return { status: 400, message: "accountExist" };

    // account not exist
    const user = new User({
      telegramId: tgId,
      fullname,
      referredBy: ref,
      referralCode,
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

export async function leaderboard(): Promise<(typeof User)[] | []> {
  const users = await User.find().sort("score");
  if (!users) return [];
  return users;
}

export async function getReferrals({
  telegramId,
}: {
  telegramId: number;
}): Promise<{
  status: 200 | 404 | 500;
  referralsCount: number;
  referrals?: (typeof User)[];
}> {
  try {
    const referralCode = await User.find({ telegramId });
    const referrals = await User.find({ referredBy: referralCode });
    const referralsCount = referrals.length;

    if (!referrals) return { status: 404, referralsCount: 0 };

    return { referrals, referralsCount, status: 200 };
  } catch (error) {
    console.log(error);
    return { referralsCount: 0, status: 500 };
  }
}

export async function updateScore({
  telegramId,
  points,
  action,
}: {
  telegramId: number;
  points: number;
  action: "add" | "replace" | "deduct";
}): Promise<200 | 404 | 500> {
  try {
    const user = await User.findOne({ telegramId });

    if (!user) return 404;

    const initialScore = user.score;
    const newScore =
      action === "add"
        ? initialScore + points
        : action === "deduct"
        ? initialScore - points
        : action === "replace"
        ? points
        : initialScore;

    await User.updateOne({ telegramId }, { score: newScore });

    return 200;
  } catch (error) {
    console.log(error);
    return 500;
  }
}
