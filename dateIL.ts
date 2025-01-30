export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("he-IL");
};

export const calculateAge = (birthDate: string): number => {
  const today = new Date();
  const birthDateObj = new Date(birthDate);
  let age = today.getFullYear() - birthDateObj.getFullYear();
  const monthDiff = today.getMonth() - birthDateObj.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
    age--;
  }
  return age;
};
