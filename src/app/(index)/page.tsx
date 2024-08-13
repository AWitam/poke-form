import { TrainerRegistrationForm } from "@/features/trainer-form/TrainerRegistrationForm";
import { getDate } from "@/lib/fetchers";

export default async function Index() {
  const date = await getDate();

  return <TrainerRegistrationForm date={date} />;
}
