import countries from "world-countries";

export const countryOptions = countries.map((c) => c.name.common).sort();
