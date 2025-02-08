const calculateAge = async (bDay) => {
    const birthDate = new Date(bDay);
    const today = new Date();
    const ageInMils = today - birthDate;

    const ageDate = new Date(ageInMils);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);  // Get the age in years

    return age;
}

module.exports = {
    calculateAge
}