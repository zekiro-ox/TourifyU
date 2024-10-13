import { useState, useEffect, useRef } from "react";
import QRCodeSVG from "qrcode-svg";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const PaymentModal = ({ isOpen, onClose, onSubmitPayment, totalPrice }) => {
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [ticketData, setTicketData] = useState(null);
  const [isTicketVisible, setIsTicketVisible] = useState(false);
  const ticketContainerRef = useRef(null);

  useEffect(() => {
    if (ticketData) {
      console.log("Ticket Data State:", ticketData);
    }
  }, [ticketData]);

  const downloadTicket = () => {
    const ticketContainer = ticketContainerRef.current;
    if (ticketContainer) {
      html2canvas(ticketContainer, { useCORS: true, scale: 2 }).then(
        (canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF("p", "mm", [65, 143]);
          pdf.addImage(imgData, "PNG", 0, 0, 65, 143);
          pdf.save(`ticket-${ticketData.id}.pdf`);
        }
      );
    } else {
      console.error("Ticket container not found!");
    }
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    console.log("Submitting payment...");

    // Call the payment submit function
    try {
      await onSubmitPayment(); // Ensure this is awaited if it's async

      // Generate a ticket and show it in the modal
      const ticket = {
        id: "123456", // This would normally come from your backend
        totalPrice,
        paymentMethod,
      };

      console.log("Ticket Data:", ticket);
      setTicketData(ticket);
      setIsTicketVisible(true); // Show the ticket instead of the payment form
    } catch (error) {
      console.error("Payment submission failed:", error);
      // Optionally show an error message to the user here
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
          {!isTicketVisible ? (
            <>
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                Payment Details
              </h2>
              <div className="mb-4">
                <p className="text-md font-semibold text-gray-800">
                  Total Price: ${totalPrice.toFixed(2)}{" "}
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
                {/* Conditional rendering for Credit Card form */}
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

                {/* Conditional rendering for PayPal form */}
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
            </>
          ) : (
            <div
              ref={ticketContainerRef}
              className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto ticket-container"
            >
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                Your Ticket
              </h2>
              <div className="mb-4">
                <p className="text-md font-semibold text-gray-800">
                  Ticket ID: {ticketData.id}
                </p>
                <p className="text-md font-semibold text-gray-800">
                  Total Price: ${ticketData.totalPrice.toFixed(2)}
                </p>
                <p className="text-md font-semibold text-gray-800">
                  Payment Method:{" "}
                  {ticketData.paymentMethod === "creditCard"
                    ? "Credit Card"
                    : "PayPal"}
                </p>
              </div>

              {/* QR Code */}
              <div className="flex justify-center mb-4">
                <QRCodeSVG
                  value={`Ticket ID: ${ticketData.id}, Total: $${ticketData.totalPrice}`}
                  width={128}
                  height={128}
                />
              </div>

              {/* Download Button */}
              <div className="flex justify-end">
                <button
                  onClick={downloadTicket}
                  className="px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600"
                >
                  Download Ticket as PDF
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PaymentModal;
