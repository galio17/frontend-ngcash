import { useUserContext } from "../../providers";

function ProfileData() {
  const { user } = useUserContext();
  const { username, balance } = user;

  return (
    <section
      className="
        flex flex-col items-center sm:flex-row justify-between flex-wrap gap-4 rounded-lg p-3
        border-2 border-primary bg-grey-2 dark:bg-grey-0
      "
    >
      <h1 className="font-black text-2xl text-grey-0 dark:text-grey-2">
        {username}
      </h1>
      <strong className="font black text-3xl text-primary">
        {balance?.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </strong>
    </section>
  );
}

export default ProfileData;
