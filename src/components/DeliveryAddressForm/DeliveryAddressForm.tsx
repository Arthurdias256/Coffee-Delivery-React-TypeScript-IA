import { MapPinLine } from "@phosphor-icons/react";
import { useFormContext } from "react-hook-form";
import type { useCepLookup } from "../../hooks/useCepLookup";
import type { AddressFormValues } from "../../schemas/checkoutSchema";

const addressFields = [
  { name: "street", label: "Rua", autoComplete: "address-line1" },
  { name: "number", label: "Número", autoComplete: "off" },
  { name: "complement", label: "Complemento (opcional)", autoComplete: "address-line2" },
  { name: "neighborhood", label: "Bairro", autoComplete: "address-level3" },
  { name: "city", label: "Cidade", autoComplete: "address-level2" },
  { name: "state", label: "UF", autoComplete: "address-level1" },
] as const;

export function DeliveryAddressForm({ status, update, retry }: ReturnType<typeof useCepLookup>) {
  const { register, formState: { errors } } = useFormContext<AddressFormValues>();

  return (
    <section className="delivery-card" aria-labelledby="delivery-address-title">
      <div className="delivery-card-heading">
        <MapPinLine size={22} aria-hidden="true" />
        <div>
          <h2 id="delivery-address-title">Endereço de entrega</h2>
          <p>Informe o endereço onde deseja receber seu pedido</p>
        </div>
      </div>
      <div className="delivery-fields">
        <div className="delivery-field delivery-field--cep">
          <label htmlFor="delivery-cep">CEP</label>
          <input
            {...register("cep")}
            id="delivery-cep"
            inputMode="numeric"
            autoComplete="postal-code"
            placeholder="00000-000"
            maxLength={9}
            required
            aria-invalid={Boolean(errors.cep || (status?.kind === "error" && status.notFound))}
            aria-describedby={`delivery-cep-status${errors.cep ? " delivery-cep-error" : ""}`}
            onChange={(event) => update(event.target.value, Boolean(errors.cep))}
          />
          {errors.cep && <span id="delivery-cep-error" role="alert">{errors.cep.message}</span>}
          <p id="delivery-cep-status" role="status" data-kind={status?.kind}>
            {status?.message}
          </p>
          {status?.kind === "error" && (
            <button type="button" onClick={retry}>
              Tentar novamente
            </button>
          )}
        </div>

        {addressFields.map(({ name, label, autoComplete }) => (
          <div key={name} className={`delivery-field delivery-field--${name}`}>
            <label htmlFor={`delivery-${name}`}>{label}</label>
            <input
              {...register(name)}
              id={`delivery-${name}`}
              autoComplete={autoComplete}
              required={name !== "complement"}
              maxLength={name === "state" ? 2 : undefined}
              aria-invalid={Boolean(errors[name])}
              aria-describedby={errors[name] ? `delivery-${name}-error` : undefined}
            />
            {errors[name] && (
              <span id={`delivery-${name}-error`} role="alert">{errors[name]?.message}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
