import type { Metadata } from "next";
import { CustomersPage } from "@/views/customers/ui/customers-page";

export const metadata: Metadata = { title: "Customers" };

export default function Page() {
  return <CustomersPage />;
}
