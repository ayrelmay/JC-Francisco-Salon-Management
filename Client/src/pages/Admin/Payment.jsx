import { useNavigate } from "react-router-dom";

const payments = [
  {
    id: "1",
    chair: "Chair 6",
    name: "Cathy C.",
    beautyTech: "Momo Jerez",
    time: "1pm-3pm",
    amount: 8000,
  },
  {
    id: "2",
    chair: "Chair 5",
    name: "Janus M.",
    beautyTech: "Momo Jerez",
    time: "1pm-3pm",
    amount: 8000,
  },
  {
    id: "3",
    chair: "Chair 4",
    name: "Gem B.",
    beautyTech: "Momo Jerez",
    time: "1pm-3pm",
    amount: 8000,
  },
  {
    id: "4",
    chair: "Chair 3",
    name: "Sebastian C.",
    beautyTech: "Momo Jerez",
    time: "1pm-3pm",
    amount: 8000,
  },
  {
    id: "5",
    chair: "Chair 1",
    name: "Cy B.",
    beautyTech: "Momo Jerez",
    time: "1pm-3pm",
    amount: 8000,
  },
  {
    id: "6",
    chair: "Chair 2",
    name: "Popoy R.",
    beautyTech: "Momo Jerez",
    time: "1pm-3pm",
    amount: 8000,
  },
  {
    id: "7",
    chair: "Chair 7",
    name: "Maria S.",
    beautyTech: "Momo Jerez",
    time: "1pm-3pm",
    amount: 8000,
  },
  {
    id: "8",
    chair: "Chair 8",
    name: "John D.",
    beautyTech: "Momo Jerez",
    time: "1pm-3pm",
    amount: 8000,
  },
  {
    id: "9",
    chair: "Chair 9",
    name: "Anna P.",
    beautyTech: "Momo Jerez",
    time: "1pm-3pm",
    amount: 8000,
  },
  {
    id: "10",
    chair: "Chair 10",
    name: "Mike R.",
    beautyTech: "Momo Jerez",
    time: "1pm-3pm",
    amount: 8000,
  },
];

const PaymentTable = () => {
  const navigate = useNavigate();

  const handleRowClick = (paymentId) => {
    navigate(`/payment/paymentServices/${paymentId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Payment</h1>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Chair
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Beauty Tech
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Time
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {payments.slice(0, 10).map((payment) => (
                  <tr
                    key={payment.id}
                    onClick={() => handleRowClick(payment.id)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.chair}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.beautyTech}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₱ {payment.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentTable;
