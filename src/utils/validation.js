
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
export const validatePhoneNumber = (number) => {
    const phoneRegex = /^\d{8,10}$/;
    return phoneRegex.test(number);
  };
  
export const validatePassword = (password) => {
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
return passwordRegex.test(password);
};
  