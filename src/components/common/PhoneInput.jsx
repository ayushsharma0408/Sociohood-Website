import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  COUNTRY_CODES,
  DEFAULT_COUNTRY_CODE,
  findCountryByDial,
  searchCountries,
} from "../../data/countryCodes.js";

const PhoneInput = ({
  countryCode = DEFAULT_COUNTRY_CODE,
  phoneNumber = "",
  onCountryCodeChange,
  onPhoneNumberChange,
  invalid = false,
  disabled = false,
  name = "phone",
  placeholder = "98765 43210",
}) => {
  const listId = useId();
  const rootRef = useRef(null);
  const searchRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState(0);
  const [selectedIso, setSelectedIso] = useState(
    () => findCountryByDial(countryCode)?.iso || "IN"
  );

  const selected = useMemo(() => {
    const byIso = COUNTRY_CODES.find(
      (country) => country.iso === selectedIso && country.dial === countryCode
    );
    return byIso || findCountryByDial(countryCode);
  }, [countryCode, selectedIso]);

  const results = useMemo(() => searchCountries(query), [query]);

  useEffect(() => {
    setSelectedIso((current) => {
      const stillValid = COUNTRY_CODES.some(
        (country) => country.iso === current && country.dial === countryCode
      );
      if (stillValid) return current;
      return findCountryByDial(countryCode)?.iso || "IN";
    });
  }, [countryCode]);

  useEffect(() => {
    if (!open) return undefined;

    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false);
        setQuery("");
      }
    };

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        setOpen(false);
        setQuery("");
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown, true);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    setHighlight(0);
    window.requestAnimationFrame(() => searchRef.current?.focus());
  }, [open]);

  useEffect(() => {
    if (!open) return;
    setHighlight(0);
  }, [open, query]);

  const selectCountry = (country) => {
    setSelectedIso(country.iso);
    onCountryCodeChange?.(country.dial);
    setOpen(false);
    setQuery("");
  };

  const onSearchKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlight((current) => Math.min(current + 1, Math.max(results.length - 1, 0)));
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlight((current) => Math.max(current - 1, 0));
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const country = results[highlight];
      if (country) selectCountry(country);
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      setOpen(false);
      setQuery("");
    }
  };

  return (
    <div
      ref={rootRef}
      className={`phone-input${invalid ? " is-invalid" : ""}${open ? " is-open" : ""}`}
    >
      <button
        type="button"
        className="phone-input-country"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`Country code ${selected.name} ${selected.dial}`}
        disabled={disabled}
        onClick={() => setOpen((current) => !current)}
      >
        <span className="phone-input-flag" aria-hidden="true">
          {selected.flag}
        </span>
        <span className="phone-input-dial">{selected.dial}</span>
        <ChevronDown size={14} strokeWidth={2.2} aria-hidden="true" />
      </button>

      <input
        className="phone-input-number"
        name={name}
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        required
        maxLength={20}
        disabled={disabled}
        placeholder={placeholder}
        value={phoneNumber}
        aria-invalid={invalid}
        aria-label="Phone number"
        onChange={(event) => onPhoneNumberChange?.(event.target.value)}
      />

      {open ? (
        <div className="phone-input-dropdown" role="presentation">
          <input
            ref={searchRef}
            type="search"
            className="phone-input-search"
            placeholder="Search country..."
            value={query}
            aria-label="Search country"
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onSearchKeyDown}
          />
          <ul id={listId} className="phone-input-list" role="listbox" aria-label="Country codes">
            {results.length === 0 ? (
              <li className="phone-input-empty">No countries found</li>
            ) : (
              results.map((country, index) => {
                const active = country.iso === selected.iso;
                return (
                  <li key={country.iso} role="option" aria-selected={active}>
                    <button
                      type="button"
                      className={`phone-input-option${active ? " is-active" : ""}${
                        index === highlight ? " is-highlight" : ""
                      }`}
                      onMouseEnter={() => setHighlight(index)}
                      onClick={() => selectCountry(country)}
                    >
                      <span className="phone-input-option-flag" aria-hidden="true">
                        {country.flag}
                      </span>
                      <span className="phone-input-option-name">{country.name}</span>
                      <span className="phone-input-option-dial">{country.dial}</span>
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default PhoneInput;
