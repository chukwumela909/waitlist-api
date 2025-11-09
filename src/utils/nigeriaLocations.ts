/**
 * Nigeria States and Major Cities
 * Used for location validation in waitlist registration
 */

export const NIGERIA_STATES = [
  'Abia',
  'Adamawa',
  'Akwa Ibom',
  'Anambra',
  'Bauchi',
  'Bayelsa',
  'Benue',
  'Borno',
  'Cross River',
  'Delta',
  'Ebonyi',
  'Edo',
  'Ekiti',
  'Enugu',
  'FCT', // Federal Capital Territory (Abuja)
  'Gombe',
  'Imo',
  'Jigawa',
  'Kaduna',
  'Kano',
  'Katsina',
  'Kebbi',
  'Kogi',
  'Kwara',
  'Lagos',
  'Nasarawa',
  'Niger',
  'Ogun',
  'Ondo',
  'Osun',
  'Oyo',
  'Plateau',
  'Rivers',
  'Sokoto',
  'Taraba',
  'Yobe',
  'Zamfara'
] as const;

export type NigeriaState = typeof NIGERIA_STATES[number];

// Major cities by state for additional validation (optional use)
export const CITIES_BY_STATE: Record<string, string[]> = {
  'Abia': ['Umuahia', 'Aba', 'Arochukwu', 'Ohafia', 'Bende'],
  'Adamawa': ['Yola', 'Jimeta', 'Mubi', 'Numan', 'Ganye'],
  'Akwa Ibom': ['Uyo', 'Eket', 'Ikot Ekpene', 'Oron', 'Abak'],
  'Anambra': ['Awka', 'Onitsha', 'Nnewi', 'Ekwulobia', 'Ihiala'],
  'Bauchi': ['Bauchi', 'Azare', 'Misau', 'Katagum', 'Jama\'are'],
  'Bayelsa': ['Yenagoa', 'Brass', 'Sagbama', 'Ekeremor', 'Ogbia'],
  'Benue': ['Makurdi', 'Gboko', 'Otukpo', 'Katsina-Ala', 'Vandeikya'],
  'Borno': ['Maiduguri', 'Bama', 'Biu', 'Konduga', 'Damboa'],
  'Cross River': ['Calabar', 'Ugep', 'Ogoja', 'Ikom', 'Obudu'],
  'Delta': ['Asaba', 'Warri', 'Sapele', 'Ughelli', 'Agbor'],
  'Ebonyi': ['Abakaliki', 'Afikpo', 'Onueke', 'Ezza', 'Ishielu'],
  'Edo': ['Benin City', 'Auchi', 'Ekpoma', 'Uromi', 'Ubiaja'],
  'Ekiti': ['Ado-Ekiti', 'Ikere', 'Aramoko', 'Ijero', 'Omuo'],
  'Enugu': ['Enugu', 'Nsukka', 'Agbani', 'Oji River', 'Udi'],
  'FCT': ['Abuja', 'Gwagwalada', 'Kubwa', 'Nyanya', 'Karu', 'Lugbe', 'Maitama', 'Garki', 'Wuse', 'Asokoro'],
  'Gombe': ['Gombe', 'Kumo', 'Deba', 'Billiri', 'Kaltungo'],
  'Imo': ['Owerri', 'Orlu', 'Okigwe', 'Mbaise', 'Oguta'],
  'Jigawa': ['Dutse', 'Hadejia', 'Gumel', 'Kazaure', 'Ringim'],
  'Kaduna': ['Kaduna', 'Zaria', 'Kafanchan', 'Kagoro', 'Sabon Gari'],
  'Kano': ['Kano', 'Wudil', 'Bichi', 'Gwarzo', 'Rano'],
  'Katsina': ['Katsina', 'Daura', 'Funtua', 'Malumfashi', 'Dutsin-Ma'],
  'Kebbi': ['Birnin Kebbi', 'Argungu', 'Yauri', 'Zuru', 'Jega'],
  'Kogi': ['Lokoja', 'Okene', 'Kabba', 'Idah', 'Ankpa'],
  'Kwara': ['Ilorin', 'Offa', 'Jebba', 'Lafiagi', 'Pategi'],
  'Lagos': ['Ikeja', 'Lagos Island', 'Victoria Island', 'Lekki', 'Ikoyi', 'Surulere', 'Yaba', 'Apapa', 'Epe', 'Badagry', 'Ikorodu', 'Ajah', 'Festac', 'Maryland', 'Gbagada'],
  'Nasarawa': ['Lafia', 'Keffi', 'Akwanga', 'Doma', 'Nasarawa'],
  'Niger': ['Minna', 'Bida', 'Kontagora', 'Suleja', 'Lapai'],
  'Ogun': ['Abeokuta', 'Ijebu Ode', 'Sagamu', 'Ota', 'Ilaro'],
  'Ondo': ['Akure', 'Ondo', 'Owo', 'Ikare', 'Ore'],
  'Osun': ['Osogbo', 'Ile-Ife', 'Ilesa', 'Ede', 'Iwo'],
  'Oyo': ['Ibadan', 'Ogbomosho', 'Oyo', 'Iseyin', 'Saki'],
  'Plateau': ['Jos', 'Bukuru', 'Pankshin', 'Shendam', 'Vom'],
  'Rivers': ['Port Harcourt', 'Obio-Akpor', 'Eleme', 'Okrika', 'Bonny'],
  'Sokoto': ['Sokoto', 'Tambuwal', 'Gwadabawa', 'Wurno', 'Goronyo'],
  'Taraba': ['Jalingo', 'Wukari', 'Ibi', 'Bali', 'Mutum Biyu'],
  'Yobe': ['Damaturu', 'Potiskum', 'Gashua', 'Nguru', 'Geidam'],
  'Zamfara': ['Gusau', 'Kaura Namoda', 'Talata Mafara', 'Anka', 'Bungudu']
};

/**
 * Validates if a state is a valid Nigerian state
 */
export function isValidNigeriaState(state: string): boolean {
  return NIGERIA_STATES.includes(state as NigeriaState);
}

/**
 * Get all cities for a given state
 */
export function getCitiesForState(state: string): string[] {
  return CITIES_BY_STATE[state] || [];
}

/**
 * Validates if a city exists in the given state (case-insensitive)
 */
export function isValidCityForState(city: string, state: string): boolean {
  const cities = CITIES_BY_STATE[state];
  if (!cities) return false;
  
  const normalizedCity = city.toLowerCase().trim();
  return cities.some(c => c.toLowerCase() === normalizedCity);
}
