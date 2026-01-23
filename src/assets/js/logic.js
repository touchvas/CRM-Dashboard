import { contacts } from "./dummydata.js";

// Simple filter function
export function applyRule(rule) {
    return contacts.filter(contact => {
        const fieldValue = contact[rule.field];
        const ruleValue = rule.value;

        if (rule.operator === "equals") return fieldValue === ruleValue;
        if (rule.operator === "contains") return fieldValue && fieldValue.includes(ruleValue);
        if (rule.operator === "gte") return fieldValue >= ruleValue;
        if (rule.operator === "lte") return fieldValue <= ruleValue;
        if (rule.operator === "before") return fieldValue && new Date(fieldValue) < new Date(ruleValue);
        if (rule.operator === "after") return fieldValue && new Date(fieldValue) > new Date(ruleValue);

        return true;
    });
}

// logic.js
export function filterContacts(contacts, rule) {
  if (!rule.field || !rule.operator || rule.value === '' || rule.value === null) return contacts;

  return contacts.filter(contact => {
    const value = contact[rule.field];

    switch (rule.operator) {
      case 'equals': return value == rule.value;
      case 'not equals': return value != rule.value;
      case 'contains': return String(value).includes(rule.value);
      case '>': return value > rule.value;
      case '<': return value < rule.value;
      case '>=': return value >= rule.value;
      case '<=': return value <= rule.value;
      case 'before': return new Date(value) < new Date(rule.value);
      case 'after': return new Date(value) > new Date(rule.value);
      default: return true;
    }
  });
}

export function saveSegment(name, rule) {
  const savedSegments = JSON.parse(localStorage.getItem('segments') || '[]');
  savedSegments.push({ name, rules: [ { ...rule } ] });
  localStorage.setItem('segments', JSON.stringify(savedSegments));
  return savedSegments;
}

