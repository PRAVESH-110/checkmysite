export default function Toast({
  message,
  type,
}: {
  message: string;
  type: "success" | "error";
}) {
  const base =
    "fixed bottom-6 right-6 z-[1000] px-5 py-3 rounded-xl shadow-xl text-white font-medium transition-all";

  const styles =
    type === "success" ? "bg-green-500" : "bg-red-500";

  return <div className={`${base} ${styles}`}>{message}</div>;
}
