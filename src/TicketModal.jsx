import React, { useRef } from "react";
import QRCodeSVG from "qrcode-svg";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const TicketModal = ({ ticketData, onClose }) => {
  const ticketContainerRef = useRef(null);

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto ticket-container"
        ref={ticketContainerRef}
      >
        <h2 className="text-lg font-bold text-gray-800 mb-4">Your Ticket</h2>
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

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketModal;
