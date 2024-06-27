import React, { useEffect } from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import qrCodeImage from "./assets/qrCode.png"; // Replace with actual QR code image import

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 20,
    fontFamily: "Helvetica",
  },
  section: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#333",
    borderStyle: "solid",
    borderRadius: 8,
    width: "80%",
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
    textDecoration: "underline",
  },
  seatInfo: {
    fontSize: 18,
    marginBottom: 5,
    textAlign: "center",
  },
  priceInfo: {
    fontSize: 14,
    textAlign: "center",
  },
  flightInfo: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 5,
  },
  qrCode: {
    alignSelf: "center",
    marginTop: 10,
    width: 100,
    height: 100,
  },
});

const PaymentPDF = ({
  totalPrice,
  selectedSeats,
  selectedFlight,
  seatPreference,
}) => {
  // Function to render PDF document
  const renderPDFDocument = () => (
    <Document>
      <Page size="A6" style={styles.page}>
        <Text style={styles.header}>Flight Ticket</Text>
        <Text style={{ marginBottom: 20, textAlign: "center" }}>
          Seat Preference: {seatPreference}
        </Text>
        {selectedSeats.map((seat, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.seatInfo}>Seat: {seat}</Text>
            <Text style={styles.priceInfo}>Price: ₱{totalPrice}</Text>
            <Text style={styles.flightInfo}>
              Flight: {selectedFlight.flightNumber}
            </Text>
            <Image src={qrCodeImage} style={styles.qrCode} />
          </View>
        ))}
      </Page>
    </Document>
  );

  useEffect(() => {
    const handleDownload = () => {
      // Redirect to Booking after download
      window.location.href = "/booking"; // Replace with your booking page URL
    };

    // Listen for PDF download completion
    window.addEventListener("focus", handleDownload);

    return () => {
      // Clean up event listener
      window.removeEventListener("focus", handleDownload);
    };
  }, []);

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold text-gray-700 mb-4 text-center">
        Payment Details
      </h3>
      <div className="text-center">
        <h4 className="text-lg font-bold text-gray-700 mb-2">
          Total Amount: ₱{totalPrice}
        </h4>
        <p className="text-sm text-gray-500">
          Selected Seats: {selectedSeats.join(", ")}
        </p>
        <p className="text-sm text-gray-500">
          Flight: {selectedFlight.flightNumber}
        </p>
        {/* Render PDF download link */}
        <PDFDownloadLink
          document={renderPDFDocument()}
          fileName="booking_details.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : "Download PDF"
          }
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default PaymentPDF;
