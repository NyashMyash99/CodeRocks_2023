declare global {
  interface String {
    capitalize(): string;
  }
}

/**
 * Makes first letter of string capitalized.
 */
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

export {};
