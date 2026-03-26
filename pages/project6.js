import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Project6Page() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/notOpen");
  }, [router]);

  return null;
}
