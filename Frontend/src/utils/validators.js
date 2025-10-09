//

// Regular expressions matching the backend rules
const FULL_NAME_REGEX = /^[A-Za-z\s]+$/;      
const ID_NUMBER_REGEX = /^\d{13}$/;          
const ACCOUNT_NUMBER_REGEX = /^\d+$/;         
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/; 

// Helper function to safely test regex
const testRegex = (regex, value) => {
    return regex.test(String(value || "").trim());
};

// ==========================================================
// Exported Client-Side Validation Functions
// ==========================================================

export const isValidFullName = (fullName) => {
    const trimmedName = String(fullName || "").trim();
    // Must contain letters/spaces only, and be between 3 and 50 characters long
    return trimmedName.length >= 3 && trimmedName.length <= 50 && testRegex(FULL_NAME_REGEX, trimmedName);
};

export const isValidIdNumber = (idNumber) => {
    // Must be exactly 13 digits
    return testRegex(ID_NUMBER_REGEX, idNumber);
};

export const isValidAccountNumber = (accountNumber) => {
    const trimmedNumber = String(accountNumber || "").trim();
    // Must contain numbers only, and be between 4 and 20 digits long
    return trimmedNumber.length >= 4 && trimmedNumber.length <= 20 && testRegex(ACCOUNT_NUMBER_REGEX, trimmedNumber);
};

export const isStrongPassword = (password) => {
    // Must be 8 characters minimum, including at least one letter and one number
    return testRegex(PASSWORD_REGEX, password);
};