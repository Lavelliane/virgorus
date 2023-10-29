import { BookingForm } from "@/components/Guest/Booking/BookingForm";
import BookingPage from "@/components/Guest/Booking/Page";

const Page = ({ params }: { params: { id: string } }) => {
  return <BookingPage />;
};

export default Page;
