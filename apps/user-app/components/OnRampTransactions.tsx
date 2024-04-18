import { Card } from "@repo/ui/card";

export const OnRampTransactions = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    // TODO: Can the type of `status` be more specific?
    status: string;
    provider: string;
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }

  return (
    <Card title="Recent Transactions">
      <div className="pt-2">
        {transactions.map((t) => (
          <div className="flex justify-between my-2 border-b border-indigo-500">
            <div className="flex gap-3 items-center">
              <div>
                <p className="text-sm text-lime-700">Received INR</p>
                <p className="text-slate-700 text-xs font-extralight">
                  {t.time.toDateString()}
                </p>
              </div>
              <div className="text-slate-700 text-xs font-extralight">
                {t.status}
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-lime-700 text-sm">+ Rs {t.amount / 100}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
