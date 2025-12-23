export interface ObfuscationMapping {
  placeholder: string;
  original: string;
  type: 'name' | 'email' | 'phone' | 'ssn' | 'credit_card' | 'address' | 'date' | 'number' | 'custom';
}

interface ObfuscationResult {
  obfuscated: string;
  mappings: ObfuscationMapping[];
}

const patterns = {
  email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
  phone: /\b(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g,
  ssn: /\b\d{3}-\d{2}-\d{4}\b/g,
  creditCard: /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g,
  // Common name patterns - capitalized words that are likely names
  name: /\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)+\b/g,
  // Dates in various formats
  date: /\b(?:\d{1,2}[-/]\d{1,2}[-/]\d{2,4}|\d{4}[-/]\d{1,2}[-/]\d{1,2})\b/g,
  // Street addresses
  address: /\b\d+\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\s+(?:Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Lane|Ln|Drive|Dr|Court|Ct|Way)\b/gi,
  // Social security-like numbers or ID numbers
  number: /\b[A-Z]{2}\d{6,}\b/g,
};

export function obfuscateText(text: string, customWords: string[] = []): ObfuscationResult {
  const mappings: ObfuscationMapping[] = [];
  let obfuscated = text;
  const counters: Record<string, number> = {
    name: 0,
    email: 0,
    phone: 0,
    ssn: 0,
    credit_card: 0,
    address: 0,
    date: 0,
    number: 0,
    custom: 0,
  };

  // Process custom words FIRST (highest priority)
  customWords.forEach((word) => {
    if (word.trim() && text.includes(word)) {
      counters.custom++;
      const placeholder = `[CUSTOM_${counters.custom}]`;
      mappings.push({ placeholder, original: word, type: 'custom' });
      obfuscated = obfuscated.replace(new RegExp(escapeRegex(word), 'g'), placeholder);
    }
  });

  // Process emails
  const emails = text.match(patterns.email) || [];
  emails.forEach((email) => {
    if (!mappings.some(m => m.original === email)) {
      counters.email++;
      const placeholder = `[EMAIL_${counters.email}]`;
      mappings.push({ placeholder, original: email, type: 'email' });
      obfuscated = obfuscated.replace(new RegExp(escapeRegex(email), 'g'), placeholder);
    }
  });

  // Process phone numbers
  const phones = text.match(patterns.phone) || [];
  phones.forEach((phone) => {
    if (!mappings.some(m => m.original === phone)) {
      counters.phone++;
      const placeholder = `[PHONE_${counters.phone}]`;
      mappings.push({ placeholder, original: phone, type: 'phone' });
      obfuscated = obfuscated.replace(new RegExp(escapeRegex(phone), 'g'), placeholder);
    }
  });

  // Process SSNs
  const ssns = text.match(patterns.ssn) || [];
  ssns.forEach((ssn) => {
    if (!mappings.some(m => m.original === ssn)) {
      counters.ssn++;
      const placeholder = `[SSN_${counters.ssn}]`;
      mappings.push({ placeholder, original: ssn, type: 'ssn' });
      obfuscated = obfuscated.replace(new RegExp(escapeRegex(ssn), 'g'), placeholder);
    }
  });

  // Process credit cards
  const cards = text.match(patterns.creditCard) || [];
  cards.forEach((card) => {
    if (!mappings.some(m => m.original === card)) {
      counters.credit_card++;
      const placeholder = `[CARD_${counters.credit_card}]`;
      mappings.push({ placeholder, original: card, type: 'credit_card' });
      obfuscated = obfuscated.replace(new RegExp(escapeRegex(card), 'g'), placeholder);
    }
  });

  // Process addresses
  const addresses = text.match(patterns.address) || [];
  addresses.forEach((address) => {
    if (!mappings.some(m => m.original === address)) {
      counters.address++;
      const placeholder = `[ADDRESS_${counters.address}]`;
      mappings.push({ placeholder, original: address, type: 'address' });
      obfuscated = obfuscated.replace(new RegExp(escapeRegex(address), 'gi'), placeholder);
    }
  });

  // Process dates
  const dates = text.match(patterns.date) || [];
  dates.forEach((date) => {
    if (!mappings.some(m => m.original === date)) {
      counters.date++;
      const placeholder = `[DATE_${counters.date}]`;
      mappings.push({ placeholder, original: date, type: 'date' });
      obfuscated = obfuscated.replace(new RegExp(escapeRegex(date), 'g'), placeholder);
    }
  });

  // Process names (do this last to avoid conflicts)
  const names = text.match(patterns.name) || [];
  names.forEach((name) => {
    // Skip if already processed as part of an address or other pattern
    if (!mappings.some(m => m.original.includes(name)) && obfuscated.includes(name)) {
      counters.name++;
      const placeholder = `[NAME_${counters.name}]`;
      mappings.push({ placeholder, original: name, type: 'name' });
      obfuscated = obfuscated.replace(new RegExp(escapeRegex(name), 'g'), placeholder);
    }
  });

  // Process ID numbers
  const numbers = text.match(patterns.number) || [];
  numbers.forEach((number) => {
    if (!mappings.some(m => m.original === number)) {
      counters.number++;
      const placeholder = `[ID_${counters.number}]`;
      mappings.push({ placeholder, original: number, type: 'number' });
      obfuscated = obfuscated.replace(new RegExp(escapeRegex(number), 'g'), placeholder);
    }
  });

  return { obfuscated, mappings };
}

export function deobfuscateText(text: string, mappings: ObfuscationMapping[]): string {
  let restored = text;
  
  // Replace placeholders with original values
  mappings.forEach(({ placeholder, original }) => {
    restored = restored.replace(new RegExp(escapeRegex(placeholder), 'g'), original);
  });

  return restored;
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}