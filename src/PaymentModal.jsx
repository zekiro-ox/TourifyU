import { useState } from "react";
import TicketModal from "./TicketModal";

const PaymentModal = ({ isOpen, onClose, onSubmitPayment, totalPrice }) => {
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [isPaymentSubmitted, setIsPaymentSubmitted] = useState(false);
  const [ticketData, setTicketData] = useState(null);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting payment...");

    try {
      const ticket = await onSubmitPayment();
      console.log("Ticket Data from Payment:", ticket); // Log the ticket data

      // Simulate ticket generation
      const ticketInfo = {
        id: "123456",
        totalPrice,
        paymentMethod,
      };

      setTicketData(ticketInfo);
      setIsPaymentSubmitted(true);
    } catch (error) {
      console.error("Payment submission failed:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {isPaymentSubmitted ? (
        <TicketModal ticketData={ticketData} onClose={onClose} />
      ) : (
        // ... rest of the code
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Payment Details
            </h2>
            <div className="mb-4">
              <p className="text-md font-semibold text-gray-800">
                Total Price: ${totalPrice.toFixed(2)}
              </p>
            </div>

            {/* Payment Method Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="creditCard"
                    checked={paymentMethod === "creditCard"}
                    onChange={() => setPaymentMethod("creditCard")}
                    className="mr-2"
                  />
                  Credit Card
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={paymentMethod === "paypal"}
                    onChange={() => setPaymentMethod("paypal")}
                    className="mr-2"
                  />
                  PayPal
                </label>
              </div>
            </div>

            <form onSubmit={handlePaymentSubmit}>
              {paymentMethod === "creditCard" && (
                <>
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Card Holder Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="cardNumber"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Card Number{" "}
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="expiryDate"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      id="expiryDate"
                      placeholder="MM/YY"
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="cvv"
                      className="block text-sm font-medium text-gray-700"
                    >
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                    />
                  </div>
                </>
              )}

              {paymentMethod === "paypal" && (
                <div className="mb-4">
                  <label
                    htmlFor="paypalEmail"
                    className="block text-sm font-medium text-gray-700"
                  >
                    PayPal Email
                  </label>
                  <input
                    type="email"
                    id="paypalEmail"
                    required
                    placeholder="your-email@example.com"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                  />
                </div>
              )}

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600"
                >
                  Submit Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentModal;
