"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";
import { OnRampStatus } from "@prisma/client";

export const createOnRampTransaction = async (
  amount: number,
  provider: string
) => {
  // you should not pass the userid to any serverside code from client side.
  // as hacker can manipulate the id in between and change it.
  // instead you should check the session from the next auth.
  const session = await getServerSession(authOptions);
  if (!session?.user || !session.user?.id) {
    return {
      message: "Unauthenticated user",
    };
  }

  const userId = session?.user?.id;
  // when you hit add money button your paytm frontend will send request to bank server that i am sending someone to your way with amount to deduct from their account. So that the bank knows that someone is comming to them for transaction.
  // bank will send a token and tells paytm that give this token to the user so that i can know from whome what amount is need to be deducted.

  const token = Math.random().toString();
  // in real word above token comes from the bank api
  //   like: token = axios.post("https://api.hdfcbank.com/getoken", {
  //     amount,
  //   });

  await prisma.onRampTransaction.create({
    data: {
      userId: Number(userId),
      amount,
      status: OnRampStatus.Processing,
      startTime: new Date(),
      provider,
      token,
    },
  });

  return {
    message: "On ramp transaction added",
  };
};
