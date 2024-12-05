/**
 * Vérifie si le code s'exécute côté client
 * @returns True si dans un navigateur, sinon False
 */
const isBrowser = (): boolean => typeof window !== "undefined";

/**
 * Sauvegarde une valeur dans le localStorage
 * @param key - La clé sous laquelle les données seront stockées
 * @param value - La valeur à stocker
 */
export const saveToLocalStorage = (key: string, value: any): void => {
  if (isBrowser()) {
    try {
      const serializedValue = JSON.stringify(value); // Sérialise l'objet en JSON
      localStorage.setItem(key, serializedValue); // Sauvegarde dans localStorage
    } catch (error) {
      console.error("Erreur lors de la sauvegarde dans localStorage", error);
    }
  }
};

/**
 * Récupère une valeur depuis le localStorage
 * @param key - La clé des données à récupérer
 * @returns La valeur désérialisée ou null si inexistante
 */
export const getFromLocalStorage = (key: string): any => {
  if (isBrowser()) {
    try {
      const serializedValue = localStorage.getItem(key); // Récupère la valeur
      return serializedValue ? JSON.parse(serializedValue) : null; // Désérialise la chaîne JSON
    } catch (error) {
      console.error("Erreur lors de la récupération depuis localStorage", error);
      return null;
    }
  }
  return null; // Retourne null si côté serveur
};

/**
 * Supprime une valeur du localStorage
 * @param key - La clé des données à supprimer
 */
export const removeFromLocalStorage = (key: string): void => {
  if (isBrowser()) {
    try {
      localStorage.removeItem(key); // Supprime la clé du localStorage
    } catch (error) {
      console.error("Erreur lors de la suppression dans localStorage", error);
    }
  }
};

/**
 * Vérifie si le localStorage est accessible
 * @returns True si localStorage est disponible, sinon False
 */
export const isLocalStorageAvailable = (): boolean => {
  if (isBrowser()) {
    try {
      const testKey = "__test__";
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (error) {
      console.warn("localStorage n'est pas disponible", error);
      return false;
    }
  }
  return false; // Retourne False si côté serveur
};
