import { TrainerRegistrationForm } from "@/features/trainer-form/TrainerRegistrationForm";
import { getDate } from "@/lib/fetchers";
import { formatDate } from "@/lib/utils";

export default async function Home() {
  const date = await getDate();


  return <TrainerRegistrationForm date={date} />;
}
