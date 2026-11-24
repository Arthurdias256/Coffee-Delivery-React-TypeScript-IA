import { useEffect, useState } from "react";
import { useWatch, type UseFormReturn } from "react-hook-form";
import type { CheckoutFormValues } from "../schemas/checkoutSchema";
import { CepError, fetchAddress, isValidCep, maskCep } from "../utils/cep";

const autofillFields = ["street", "neighborhood", "city", "state"] as const;

type LookupStatus =
  | { kind: "loading" | "success"; message: string }
  | { kind: "error"; message: string; notFound: boolean };

type LookupForm = Pick<UseFormReturn<CheckoutFormValues>, "control" | "getValues" | "setValue">;

export function useCepLookup({ control, getValues, setValue }: LookupForm) {
  const cep = useWatch({ control, name: "cep" });
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState<{ request: string; status: LookupStatus }>();
  const request = `${cep}:${attempt}`;
  const validCep = isValidCep(cep);
  const status: LookupStatus | undefined = !validCep ? undefined : result?.request === request
    ? result.status
    : { kind: "loading", message: "Consultando CEP…" };

  function retry() {
    setAttempt((current) => current + 1);
  }

  function update(value: string, shouldValidate: boolean) {
    const masked = maskCep(value);
    setValue("cep", masked, { shouldDirty: true, shouldValidate });
    if (masked !== cep) retry();
  }

  useEffect(() => {
    if (!validCep) return;

    const controller = new AbortController();
    const previous = getValues();

    void fetchAddress(cep, controller.signal).then((address) => {
      if (controller.signal.aborted || getValues("cep") !== cep) return;

      const filled = autofillFields.filter((field) => {
        if (!address[field] || getValues(field) !== previous[field]) return false;
        setValue(field, address[field], { shouldValidate: true });
        return true;
      });

      setResult({
        request,
        status: {
          kind: "success",
          message: filled.length
            ? "CEP consultado. Confira e complete o endereço."
            : "CEP consultado. Complete os campos manualmente.",
        },
      });
    }).catch((error: unknown) => {
      if (controller.signal.aborted || getValues("cep") !== cep) return;
      setResult({
        request,
        status: {
          kind: "error",
          message: error instanceof Error ? error.message : "Falha na consulta do CEP.",
          notFound: error instanceof CepError && error.kind === "not-found",
        },
      });
    });

    return () => controller.abort();
  }, [cep, getValues, request, setValue, validCep]);

  return { status, update, retry };
}
