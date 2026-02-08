export default function Toast({
  message,
  type,
}: {
  message: string;
  type: "success" | "error";
}) {
  const base =
    "fixed bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:right-6 md:translate-x-0 z-[9999] px-5 py-3 rounded-xl shadow-xl text-white font-medium transition-all w-[90%] md:w-auto text-center md:text-left";

  const styles =
    type === "success" ? "bg-green-500" : "bg-red-500";

  return <div className={`${base} ${styles}`}>{message}</div>;
}
