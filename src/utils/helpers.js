
export const secretEmail = (email) => {
    const [username, domain] = email?.split("@");
    const secretUser = username?.substring(0, 2) + "*".repeat(username?.length - 2);
    return `${secretUser}@${domain}`;
}
export const readTime = (desc) => {
    const averageReading = 225;
    const div = document.createElement("div");
    div.innerHTML = desc.__html;
    const textContent = div.textContent || div.innerHTML;
    const words = textContent.trim().split(/\s+/);
    return Math.ceil(words?.length / averageReading);
}

export const formatNumber = (number) => {
    if(number >= 1e9) return (number / 1e9).toFixed(1) + "B";
    else if(number >= 1e6) return (number / 1e6).toFixed(1) + "M";
    else if(number >= 1e3) return (number / 1e3).toFixed(1) + "k";
    else return number.toString();
}